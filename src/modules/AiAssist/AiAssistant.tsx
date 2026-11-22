'use client';

import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Button, Snackbar } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import type { Editor } from '@tiptap/react';
import { AI_ALLOWANCE, AI_ASSIST, type AiAllowance, type AiResult, type AiSurface } from '@/apollo/aiOperations';
import { aiErrorMessage } from './aiCopy';
import { escapeHtml, hasMedia, htmlText, isFilled, sameValue, wordCount } from './aiText';

/**
 * The page-level AI writing assistant: one per form. It owns the brief, the AI call, the review and the
 * fill-with-undo. The card (side column, phone sheet or panel) and the editor chips are views onto it.
 */

export type AiFieldKind = 'line' | 'text' | 'html' | 'enum' | 'list' | 'sections';
export type AiOption = { value: string; label: string };
export type AiLength = 'short' | 'standard' | 'long';
export type AiMode = 'draft' | 'polish' | 'proofread' | 'upgrade';

/** One form field the AI may fill. `key` is the server's name for it. */
export interface AiFormField {
  key: string;
  label: string;
  kind: AiFieldKind;
  /** Form path, used to find the field on the page for the highlight. */
  name: string;
  get: () => unknown;
  set: (value: unknown) => void;
  options?: AiOption[];
}

export interface AiFormConfig {
  surface: AiSurface;
  pageType?: 'text' | 'message' | 'people-list';
  /** "What should this story be about?" */
  question: string;
  placeholder: string;
  keyphrase?: boolean;
  fields: AiFormField[];
  /** Facts already in the form (dates, venue…). Whitelisted again on the server. */
  facts?: () => Record<string, string>;
  factsNote?: string;
  /** The form is saving. */
  busy?: boolean;
}

type EditorTarget = {
  editor: Editor;
  field: string;
  from: number;
  to: number;
  partial: boolean;
  /** The selection sits inside one paragraph, so the answer goes back as plain text. */
  inline: boolean;
  doc: Editor['state']['doc'];
};

type Job = {
  mode: AiMode;
  taskId: string;
  text?: string;
  context: Record<string, unknown>;
  target?: EditorTarget;
  /** Polish: what the form held when asked, to show what changed. */
  before?: Record<string, unknown>;
};

export type AiStatus = 'idle' | 'working' | 'review';

export interface AiAssistant {
  config: AiFormConfig;
  enabled: boolean;
  outOfUses: boolean;
  /** "8 AI uses left today", or the plain out-of-uses sentence. */
  usesNote: string | null;
  busy: boolean;
  hasContent: boolean;
  canUpgrade: boolean;
  brief: string;
  setBrief: (v: string) => void;
  length: AiLength;
  setLength: (v: AiLength) => void;
  keyphrase: string;
  setKeyphrase: (v: string) => void;
  status: AiStatus;
  job: Job | null;
  result: AiResult | null;
  error: string | null;
  used: Set<string>;
  open: boolean;
  setOpen: (v: boolean) => void;
  write: () => void;
  polish: () => void;
  retry: () => void;
  discard: () => void;
  fill: () => void;
  takeField: (key: string) => void;
  applyEditor: () => void;
  runEditor: (mode: 'proofread' | 'upgrade', editor: Editor, field: string) => void;
  /** Field rows for the review: what to show and whether it changed. */
  rows: { field: AiFormField; value: unknown; changed: boolean }[];
  kept: AiFormField[];
  /** The text an editor job will put back. */
  editorHtml: string;
}

const Ctx = React.createContext<AiAssistant | null>(null);

/** The assistant for this form, or null outside one (editors without an assistant show no chips). */
export const useAiAssistant = () => React.useContext(Ctx);

// AI returns text only, so replacing a whole editor would drop its pictures and videos.
const TEXT_ONLY_NODES = new Set([
  'doc',
  'paragraph',
  'text',
  'heading',
  'bulletList',
  'orderedList',
  'listItem',
  'blockquote',
  'hardBreak',
  'horizontalRule',
]);
const MEDIA_COPY = 'This text has pictures or videos. Select the words you want AI to work on, then try again.';
const toParagraphs = (text: string) =>
  text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => `<p>${escapeHtml(p)}</p>`)
    .join('');

const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/** The element a person sees for a form path: an editor, or the input box around a named control. */
const fieldElement = (name: string): HTMLElement | null => {
  if (typeof document === 'undefined') return null;
  const q = CSS.escape(name);
  const el =
    document.querySelector<HTMLElement>(`[data-ai-field="${q}"]`) ||
    document.querySelector<HTMLElement>(`[name="${q}"]`);
  return (el?.closest('.MuiInputBase-root, .MuiAutocomplete-root') as HTMLElement) || el;
};

export function AiAssistantProvider({ config, children }: { config: AiFormConfig; children: React.ReactNode }) {
  const theme = useTheme();
  const { data, refetch } = useQuery<{ aiAllowance: AiAllowance }>(AI_ALLOWANCE, { fetchPolicy: 'cache-and-network' });
  const [assist] = useMutation<{ aiAssist: AiResult }>(AI_ASSIST);
  const [brief, setBrief] = React.useState('');
  const [length, setLength] = React.useState<AiLength>('standard');
  const [keyphrase, setKeyphrase] = React.useState('');
  const [status, setStatus] = React.useState<AiStatus>('idle');
  const [job, setJob] = React.useState<Job | null>(null);
  const [result, setResult] = React.useState<AiResult | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [used, setUsed] = React.useState<Set<string>>(new Set());
  const [open, setOpen] = React.useState(false);
  const [toast, setToast] = React.useState<{ id: number; message: string; undo?: () => void } | null>(null);
  const runId = React.useRef(0);

  const allowance = data?.aiAllowance;
  const enabled = !!allowance?.enabled;
  const outOfUses = !!allowance && (allowance.remaining === 0 || !allowance.available);
  const usesNote = !allowance
    ? null
    : outOfUses
      ? aiErrorMessage({
          graphQLErrors: [
            {
              extensions: {
                code: allowance.available ? 'AI_MEMBER_LIMIT' : 'AI_DAILY_LIMIT',
                resetsAt: allowance.resetsAt,
              },
            },
          ],
        })
      : `${allowance.remaining} AI ${allowance.remaining === 1 ? 'use' : 'uses'} left today`;
  const busy = !!config.busy || status === 'working';
  const writable = config.fields.filter((f) => f.kind !== 'enum' && f.kind !== 'list');
  const hasContent = writable.some((f) => isFilled(f.get()));
  const canUpgrade = !(config.surface === 'page' && config.pageType === 'people-list');

  const flash = React.useCallback(
    (names: string[], scroll = false) => {
      const els = names.map(fieldElement).filter(Boolean) as HTMLElement[];
      if (scroll && els[0]) els[0].scrollIntoView({ block: 'center', behavior: reducedMotion() ? 'auto' : 'smooth' });
      if (reducedMotion()) return;
      const tint = alpha(theme.palette.primary.main, 0.14);
      const ring = alpha(theme.palette.primary.main, 0.5);
      for (const el of els) {
        el.animate?.(
          [
            { backgroundColor: tint, boxShadow: `0 0 0 3px ${ring}` },
            { backgroundColor: 'transparent', boxShadow: '0 0 0 3px transparent' },
          ],
          { duration: 1500, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }
        );
      }
    },
    [theme]
  );

  const run = async (next: Job, fresh = false) => {
    const id = ++runId.current;
    setJob(next);
    setStatus('working');
    setResult(null);
    setError(null);
    setUsed(new Set());
    try {
      const res = await assist({ variables: { taskId: next.taskId, text: next.text, context: next.context, fresh } });
      if (id !== runId.current) return;
      setResult(res.data?.aiAssist ?? null);
      setStatus('review');
    } catch (e) {
      if (id !== runId.current) return;
      setError(aiErrorMessage(e));
      setStatus('idle');
    } finally {
      refetch().catch(() => undefined);
    }
  };

  const fail = (message: string) => {
    runId.current++;
    setJob(null);
    setResult(null);
    setStatus('idle');
    setError(message);
  };

  const write = () => {
    const words = wordCount(brief);
    if (!words) return fail('Describe what you want first, then AI can write it.');
    if (!hasContent && words < 5) return fail('Add a few details: what happened, who, when.');
    const options: Record<string, AiOption[]> = {};
    for (const f of config.fields) if (f.kind === 'enum' && f.options?.length) options[f.key] = f.options;
    run({
      mode: 'draft',
      taskId: `${config.surface}.draft`,
      text: brief.trim(),
      context: {
        length,
        keyphrase: config.keyphrase ? keyphrase.trim() : '',
        pageType: config.pageType,
        facts: config.facts?.() || {},
        options,
      },
    });
  };

  const polish = () => {
    const current: Record<string, unknown> = {};
    for (const f of writable) {
      const v = f.get();
      if (!isFilled(v)) continue;
      current[f.key] =
        f.kind === 'sections' && Array.isArray(v)
          ? v.map((s: any) => ({ heading: s?.heading || '', body: s?.body || '' }))
          : v;
    }
    if (!Object.keys(current).length) return fail('Write something first, then AI can polish it.');
    const media = Object.values(current).some((v) =>
      Array.isArray(v) ? v.some((s: any) => hasMedia(s.body)) : typeof v === 'string' && hasMedia(v)
    );
    if (media)
      return fail(
        'Your text has pictures or videos. Select the words in the editor and use Upgrade selection instead.'
      );
    run({
      mode: 'polish',
      taskId: `${config.surface}.polish`,
      context: { pageType: config.pageType, current },
      before: current,
    });
  };

  const runEditor: AiAssistant['runEditor'] = (mode, editor, field) => {
    setOpen(true);
    const { from, to, empty, $from, $to } = editor.state.selection;
    const partial = !empty;
    if (!partial) {
      let media = false;
      editor.state.doc.descendants((node) => {
        if (!TEXT_ONLY_NODES.has(node.type.name)) media = true;
        return !media;
      });
      if (media) return fail(MEDIA_COPY);
    }
    const body = partial ? toParagraphs(editor.state.doc.textBetween(from, to, '\n\n')) : editor.getHTML();
    if (!htmlText(body)) return fail('Select some words first, then try again.');
    const target: EditorTarget = {
      editor,
      field,
      from,
      to,
      partial,
      inline: partial && $from.sameParent($to),
      doc: editor.state.doc,
    };
    if (mode === 'proofread') {
      run({ mode, taskId: `${config.surface}.proofread`, text: body, context: {}, target });
    } else {
      // Website text pages keep their words in sections, so one editor travels as one section.
      const sections = config.surface === 'page' && config.pageType !== 'message';
      run({
        mode,
        taskId: `${config.surface}.polish`,
        context: { pageType: config.pageType, current: sections ? { sections: [{ heading: '', body }] } : { body } },
        target,
      });
    }
  };

  const discard = () => {
    runId.current++;
    setStatus('idle');
    setJob(null);
    setResult(null);
    setError(null);
  };

  const retry = () => job && run(job, true);

  const offerUndo = (message: string, undo?: () => void) => setToast({ id: Date.now(), message, undo });

  const draft = (result?.draft || {}) as Record<string, unknown>;
  const rows = config.fields
    .filter((f) => f.key in draft)
    .map((field) => ({
      field,
      value: draft[field.key],
      changed: job?.mode !== 'polish' || !sameValue(job.before?.[field.key], draft[field.key]),
    }))
    .filter((r) => r.changed);
  const kept =
    job?.mode === 'polish'
      ? config.fields.filter((f) => job.before && f.key in job.before && !rows.some((r) => r.field === f))
      : [];

  const setFields = (list: AiFormField[], message: string) => {
    const before = list.map((f) => [f, f.get()] as const);
    list.forEach((f) => f.set(draft[f.key]));
    const names = list.map((f) => f.name);
    flash(names, true);
    offerUndo(message, () => {
      // A never-touched field reads as undefined, which a controlled input ignores; clear it instead.
      before.forEach(([f, v]) => f.set(v ?? (f.kind === 'list' || f.kind === 'sections' ? [] : '')));
      flash(names);
    });
  };

  const fill = () => {
    if (!rows.length) return;
    setFields(
      rows.map((r) => r.field),
      job?.mode === 'polish' ? 'Changes added to the form.' : 'Draft added to the form.'
    );
    setOpen(false);
    discard();
  };

  const takeField = (key: string) => {
    const field = rows.find((r) => r.field.key === key)?.field;
    if (!field) return;
    setFields([field], `Added to ${field.label}.`);
    setUsed((u) => new Set(u).add(key));
  };

  const editorHtml =
    job?.mode === 'proofread'
      ? result?.result || ''
      : job?.mode === 'upgrade'
        ? (draft.body as string) || ((draft.sections as any[])?.[0]?.body as string) || ''
        : '';

  const applyEditor = () => {
    const t = job?.target;
    if (!t || !editorHtml) return;
    const { editor } = t;
    if (editor.isDestroyed) return fail("This editor isn't on the page any more.");
    if (t.partial && !editor.state.doc.eq(t.doc)) {
      return fail('Your text changed while AI was working. Select it again and pick an AI action.');
    }
    const prev = editor.getHTML();
    if (t.partial) {
      const content = t.inline ? htmlText(editorHtml).replace(/\s*\n\s*/g, ' ') : editorHtml;
      editor.chain().focus().insertContentAt({ from: t.from, to: t.to }, content).run();
    } else {
      editor.commands.setContent(editorHtml, { emitUpdate: true });
    }
    flash([t.field]);
    offerUndo('Your text is updated.', () => {
      if (!editor.isDestroyed) editor.commands.setContent(prev, { emitUpdate: true });
    });
    setOpen(false);
    discard();
  };

  const value: AiAssistant = {
    config,
    enabled,
    outOfUses,
    usesNote,
    busy,
    hasContent,
    canUpgrade,
    brief,
    setBrief,
    length,
    setLength,
    keyphrase,
    setKeyphrase,
    status,
    job,
    result,
    error,
    used,
    open,
    setOpen,
    write,
    polish,
    retry,
    discard,
    fill,
    takeField,
    applyEditor,
    runEditor,
    rows,
    kept,
    editorHtml,
  };

  return (
    <Ctx.Provider value={value}>
      {children}
      <Snackbar
        key={toast?.id}
        open={!!toast}
        autoHideDuration={10000}
        onClose={(_, reason) => reason !== 'clickaway' && setToast(null)}
        message={toast?.message}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        action={
          toast?.undo && (
            <Button
              color="inherit"
              size="small"
              sx={{ fontWeight: 600 }}
              onClick={() => {
                toast.undo?.();
                setToast(null);
              }}
            >
              Undo
            </Button>
          )
        }
      />
    </Ctx.Provider>
  );
}
