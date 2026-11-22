'use client';

import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import {
  IconArrowsMinimize,
  IconChevronDown,
  IconHeading,
  IconListDetails,
  IconSparkles,
  IconWand,
} from '@tabler/icons-react';
import { useCurrentEditor } from '@tiptap/react';
import { AI_ALLOWANCE, AI_ASSIST, type AiAllowance, type AiResult, type AiSurface } from '@/apollo/aiOperations';
import { aiErrorMessage } from './aiCopy';
import AiPreview from './AiPreview';

export interface AiAssistOptions {
  surface: AiSurface;
  /** Form details the AI may use for "Write with AI" (whitelisted again on the server). */
  getFields?: () => Record<string, string>;
  onTitle?: (title: string) => void;
  onSummary?: (summary: string) => void;
}

type Action = 'write' | 'improve' | 'shorten' | 'title' | 'summary';

const ACTIONS: { action: Action; label: string; hint: string; Icon: typeof IconSparkles }[] = [
  { action: 'write', label: 'Write with AI', hint: 'Turns your notes into full text', Icon: IconWand },
  { action: 'improve', label: 'Improve with AI', hint: 'Fixes grammar and tone', Icon: IconSparkles },
  { action: 'shorten', label: 'Shorten with AI', hint: 'Keeps the key points', Icon: IconArrowsMinimize },
  { action: 'title', label: 'AI title ideas', hint: 'Three options to pick from', Icon: IconHeading },
  { action: 'summary', label: 'AI summary', hint: 'One or two lines', Icon: IconListDetails },
];

type Run = { action: Action; input: string; from: number; to: number; partial: boolean; snapshot?: unknown };

// AI returns text only, so replacing a whole draft would drop its pictures and videos.
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

const AiAssistBar: React.FC<AiAssistOptions & { disabled?: boolean }> = ({
  surface,
  getFields,
  onTitle,
  onSummary,
  disabled,
}) => {
  const { editor } = useCurrentEditor();
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [open, setOpen] = React.useState(false);
  const [run, setRun] = React.useState<Run | null>(null);
  const [result, setResult] = React.useState<AiResult | null>(null);
  const [message, setMessage] = React.useState<string | null>(null);
  const { data, refetch } = useQuery<{ aiAllowance: AiAllowance }>(AI_ALLOWANCE, { fetchPolicy: 'cache-and-network' });
  const [assist, { loading }] = useMutation<{ aiAssist: AiResult }>(AI_ASSIST);
  const allowance = data?.aiAllowance;
  const outOfUses = !!allowance && (allowance.remaining === 0 || !allowance.available);
  const exhaustedCopy = allowance
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
    : null;

  const ask = async (next: Run, fresh = false) => {
    setRun(next);
    setResult(null);
    setMessage(null);
    try {
      const res = await assist({
        variables: {
          taskId: `${surface}.${next.action}`,
          text: next.input,
          fields: next.action === 'write' ? getFields?.() : undefined,
          fresh,
        },
      });
      setResult(res.data?.aiAssist ?? null);
    } catch (error) {
      setMessage(aiErrorMessage(error));
    } finally {
      refetch().catch(() => undefined);
    }
  };

  const start = (action: Action) => {
    setOpen(false);
    if (!editor) return;
    const { from, to, empty } = editor.state.selection;
    // Selected text: work on that part only. Otherwise the whole draft.
    const partial = !empty && (action === 'improve' || action === 'shorten' || action === 'write');
    const input = partial
      ? editor.state.doc.textBetween(from, to, '\n\n')
      : action === 'title' || action === 'summary'
        ? editor.getText()
        : editor.getHTML();
    if ((action === 'improve' || action === 'shorten' || action === 'write') && !partial) {
      let media = false;
      editor.state.doc.descendants((node) => {
        if (!TEXT_ONLY_NODES.has(node.type.name)) media = true;
        return !media;
      });
      if (media) {
        setRun({ action, input: '', from, to, partial });
        setResult(null);
        setMessage('This draft has pictures or videos. Select the text you want AI to work on, then try again.');
        return;
      }
    }
    if (!editor.getText().trim()) {
      setRun({ action, input: '', from, to, partial });
      setResult(null);
      setMessage(
        action === 'write'
          ? 'Type a few notes first, then AI can turn them into full text.'
          : 'Write something first, then AI can help.'
      );
      return;
    }
    ask({ action, input, from, to, partial, snapshot: editor.state.doc });
  };

  const close = () => {
    setRun(null);
    setResult(null);
    setMessage(null);
  };

  const apply = (html: string) => {
    if (!editor || !run) return;
    // Typing while AI worked would be lost (or land in the wrong place): ask for a fresh run instead.
    if (run.snapshot && !editor.state.doc.eq(run.snapshot as typeof editor.state.doc)) {
      setResult(null);
      // A saved selection no longer points at the same words, so a partial run must be re-picked.
      setMessage(
        run.partial
          ? 'Your draft changed while AI was working. Select the text again and pick an AI action.'
          : 'Your draft changed while AI was working. Try again to use your latest text.'
      );
      setRun({ ...run, snapshot: editor.state.doc, input: run.partial ? '' : editor.getHTML() });
      return;
    }
    if (run.partial) editor.chain().focus().insertContentAt({ from: run.from, to: run.to }, html).run();
    else editor.chain().focus().setContent(html, { emitUpdate: true }).run();
    close();
  };

  const remainingLabel =
    allowance && !outOfUses
      ? `${allowance.remaining} AI ${allowance.remaining === 1 ? 'use' : 'uses'} left today`
      : null;

  // Off, not yet known, or an older API: show nothing rather than a dead or flashing button.
  if (!allowance?.enabled) return null;

  return (
    <Box sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 1,
          columnGap: 1.5,
          px: 1,
          py: 0.75,
          bgcolor: (t) => alpha(t.palette.primary.main, t.palette.mode === 'dark' ? 0.16 : 0.06),
        }}
      >
        <ButtonGroup
          ref={anchorRef}
          variant="contained"
          disableElevation
          disabled={disabled || !editor || loading || outOfUses}
          sx={{
            borderRadius: 999,
            overflow: 'hidden',
            '& .MuiButton-root': { textTransform: 'none', fontWeight: 600 },
          }}
        >
          <Button
            startIcon={
              loading ? <CircularProgress size={16} color="inherit" /> : <IconSparkles size={18} stroke={1.75} />
            }
            onClick={() => setOpen(true)}
            aria-haspopup="menu"
            aria-expanded={open}
            sx={{ pl: 1.75, pr: 1.25, fontSize: 15, letterSpacing: '0.01em' }}
          >
            {loading ? 'AI is writing…' : 'AI'}
          </Button>
          <Button
            size="small"
            aria-label="More AI actions"
            onClick={() => setOpen(true)}
            sx={{ px: 0.75, minWidth: 0 }}
          >
            <IconChevronDown size={16} />
          </Button>
        </ButtonGroup>
        <Typography
          variant="body2"
          sx={{ color: outOfUses ? 'text.primary' : 'text.secondary', fontSize: 13.5, flex: '1 1 180px' }}
          role="status"
        >
          {outOfUses ? exhaustedCopy : remainingLabel}
        </Typography>
      </Box>

      <Menu
        anchorEl={anchorRef.current}
        open={open}
        onClose={() => setOpen(false)}
        slotProps={{ paper: { sx: { mt: 0.5, minWidth: 260, borderRadius: 2 } } }}
      >
        {ACTIONS.map(({ action, label, hint, Icon }) => (
          <MenuItem key={action} onClick={() => start(action)} sx={{ py: 1 }}>
            <ListItemIcon sx={{ color: 'primary.main' }}>
              <Icon size={20} stroke={1.75} />
            </ListItemIcon>
            <ListItemText primary={label} secondary={hint} slotProps={{ secondary: { sx: { fontSize: 12.5 } } }} />
          </MenuItem>
        ))}
      </Menu>

      {run && (
        <AiPreview
          action={run.action}
          loading={loading}
          result={result}
          message={message}
          onUse={apply}
          onPickTitle={onTitle}
          onUseSummary={onSummary}
          onRetry={() => ask(run, true)}
          onDiscard={close}
          canRetry={!!run.input && !outOfUses}
        />
      )}
    </Box>
  );
};

export default AiAssistBar;
