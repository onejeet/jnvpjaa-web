'use client';

import React from 'react';
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  Fab,
  IconButton,
  Skeleton,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { IconCheck, IconInfoCircle, IconRefresh, IconSparkles, IconWand, IconX } from '@tabler/icons-react';
import PageRichText from '@/modules/ContentPages/PageRichText';
import { useAiAssistant, type AiAssistant, type AiFormField, type AiLength } from './AiAssistant';
import { escapeHtml, htmlText, wordCount } from './aiText';

const LENGTHS: { value: AiLength; label: string }[] = [
  { value: 'short', label: 'Short' },
  { value: 'standard', label: 'Standard' },
  { value: 'long', label: 'Long' },
];

const WORKING: Record<string, string> = {
  draft: 'Writing your draft…',
  polish: 'Polishing your text…',
  proofread: 'Proofreading…',
  upgrade: 'Upgrading your text…',
};

const clamp = (lines: number) => ({
  display: '-webkit-box',
  WebkitLineClamp: lines,
  WebkitBoxOrient: 'vertical' as const,
  overflow: 'hidden',
});

const sectionsHtml = (v: unknown) =>
  Array.isArray(v)
    ? v.map((s: any) => `${s.heading ? `<h2>${escapeHtml(s.heading)}</h2>` : ''}${s.body || ''}`).join('')
    : '';

/** One line describing a long text: "612 words · 4 sections". */
const describe = (html: string) => {
  const words = wordCount(htmlText(html));
  const sections = (html.match(/<h2\b/gi) || []).length;
  return `${words} words${sections > 1 ? ` · ${sections} sections` : ''}`;
};

function Header({ onClose }: { onClose?: () => void }) {
  return (
    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
      <Box sx={{ color: 'primary.main', display: 'flex' }} aria-hidden>
        <IconSparkles size={20} stroke={1.75} />
      </Box>
      <Typography component="h2" variant="subtitle2" sx={{ fontWeight: 600, flex: 1 }}>
        AI writing assistant
      </Typography>
      {onClose && (
        <IconButton size="small" onClick={onClose} aria-label="Close AI writing assistant">
          <IconX size={18} />
        </IconButton>
      )}
    </Stack>
  );
}

function Note({ children, tone = 'secondary' }: { children: React.ReactNode; tone?: 'secondary' | 'alert' }) {
  return (
    <Stack
      direction="row"
      spacing={0.75}
      role={tone === 'alert' ? 'alert' : undefined}
      sx={{ mt: 1.25, color: tone === 'alert' ? 'text.primary' : 'text.secondary' }}
    >
      {tone === 'alert' && (
        <Box sx={{ color: 'warning.dark', display: 'flex', pt: '2px', flexShrink: 0 }} aria-hidden>
          <IconInfoCircle size={16} />
        </Box>
      )}
      <Typography variant="body2" sx={{ color: 'inherit', fontSize: 13.5 }}>
        {children}
      </Typography>
    </Stack>
  );
}

function Ask({ ai }: { ai: AiAssistant }) {
  const { config } = ai;
  // Edit forms that already have text start with Polish; a new draft is one tap away.
  const [expanded, setExpanded] = React.useState(!ai.hasContent);
  const disabled = ai.busy || ai.outOfUses;
  const id = React.useId();

  const polishButton = (primary: boolean) => (
    <Button
      fullWidth
      variant={primary ? 'contained' : 'outlined'}
      disableElevation
      startIcon={<IconWand size={18} stroke={1.75} />}
      onClick={ai.polish}
      disabled={disabled}
    >
      Polish what I wrote with AI
    </Button>
  );

  if (!expanded) {
    return (
      <Box>
        {polishButton(true)}
        <Note>{ai.usesNote}</Note>
        {ai.error && <Note tone="alert">{ai.error}</Note>}
        <Button
          size="small"
          onClick={() => setExpanded(true)}
          startIcon={<IconSparkles size={16} stroke={1.75} />}
          sx={{ mt: 1, px: 0.5 }}
        >
          Write a new draft with AI
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Typography
        component="label"
        htmlFor={`${id}-brief`}
        variant="body2"
        sx={{ display: 'block', fontWeight: 600, mb: 0.75 }}
      >
        {config.question}
      </Typography>
      <TextField
        id={`${id}-brief`}
        fullWidth
        multiline
        minRows={3}
        maxRows={10}
        size="small"
        value={ai.brief}
        onChange={(e) => ai.setBrief(e.target.value.slice(0, 2000))}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            if (!disabled) ai.write();
          }
        }}
        placeholder={config.placeholder}
        sx={{ '& .MuiInputBase-root': { bgcolor: 'background.paper', fontSize: 14.5 } }}
      />

      <Typography id={`${id}-length`} variant="body2" sx={{ fontWeight: 600, mt: 1.75, mb: 0.75 }}>
        Length
      </Typography>
      <ToggleButtonGroup
        exclusive
        size="small"
        fullWidth
        value={ai.length}
        onChange={(_, v) => v && ai.setLength(v)}
        aria-labelledby={`${id}-length`}
        sx={{ bgcolor: 'background.paper', '& .MuiToggleButton-root': { textTransform: 'none', py: 0.5 } }}
      >
        {LENGTHS.map((l) => (
          <ToggleButton key={l.value} value={l.value}>
            {l.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      {config.keyphrase && (
        <>
          <Typography
            component="label"
            htmlFor={`${id}-key`}
            variant="body2"
            sx={{ display: 'block', fontWeight: 600, mt: 1.75, mb: 0.25 }}
          >
            Main search phrase
            <Typography component="span" variant="body2" color="text.secondary" sx={{ ml: 0.75 }}>
              Optional
            </Typography>
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: 13, mb: 0.75 }}>
            What would people type into Google to find this?
          </Typography>
          <TextField
            id={`${id}-key`}
            fullWidth
            size="small"
            value={ai.keyphrase}
            onChange={(e) => ai.setKeyphrase(e.target.value.slice(0, 80))}
            // Enter here would submit the whole form.
            onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
            sx={{ '& .MuiInputBase-root': { bgcolor: 'background.paper', fontSize: 14.5 } }}
          />
        </>
      )}

      {config.factsNote && <Note>{config.factsNote}</Note>}
      {ai.error && <Note tone="alert">{ai.error}</Note>}

      <Button
        fullWidth
        variant="contained"
        disableElevation
        startIcon={<IconSparkles size={18} stroke={1.75} />}
        onClick={ai.write}
        disabled={disabled}
        sx={{ mt: 2 }}
      >
        Write my draft with AI
      </Button>
      <Note>{ai.usesNote}</Note>

      {ai.hasContent && (
        <>
          <Divider sx={{ my: 2 }} />
          {polishButton(false)}
        </>
      )}
    </Box>
  );
}

function Working({ ai }: { ai: AiAssistant }) {
  const labels = ai.job?.target
    ? ['Text']
    : ai.config.fields
        .filter((f) => ai.job?.mode === 'draft' || f.kind !== 'enum')
        .map((f) => f.label)
        .slice(0, 4);
  return (
    <Box aria-live="polite" aria-busy>
      <Typography variant="body2" sx={{ fontWeight: 600 }}>
        {WORKING[ai.job?.mode || 'draft']}
      </Typography>
      <Stack spacing={1.25} sx={{ mt: 1.5 }} aria-hidden>
        {labels.map((l) => (
          <Box key={l}>
            <Typography variant="caption" color="text.secondary">
              {l}
            </Typography>
            <Skeleton width="90%" />
            <Skeleton width="70%" />
          </Box>
        ))}
      </Stack>
      <Note>Usually takes 5–10 seconds.</Note>
      <Button size="small" color="inherit" onClick={ai.discard} sx={{ mt: 1, color: 'text.secondary' }}>
        Cancel
      </Button>
    </Box>
  );
}

function FieldValue({ field, value, onRead }: { field: AiFormField; value: unknown; onRead: () => void }) {
  if (field.kind === 'html' || field.kind === 'sections') {
    const html = field.kind === 'html' ? String(value || '') : sectionsHtml(value);
    return (
      <>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: 13 }}>
          {describe(html)}
        </Typography>
        <Typography variant="body2" sx={{ mt: 0.25, ...clamp(3) }}>
          {htmlText(html).replace(/\n/g, ' ')}
        </Typography>
        <Button size="small" onClick={onRead} sx={{ px: 0.5, mt: 0.25, minWidth: 0 }}>
          Read full draft
        </Button>
      </>
    );
  }
  const text =
    field.kind === 'enum'
      ? field.options?.find((o) => o.value === value)?.label || String(value)
      : field.kind === 'list' && Array.isArray(value)
        ? value.join(' · ')
        : String(value || '');
  return (
    <Typography variant="body2" sx={clamp(3)}>
      {text}
    </Typography>
  );
}

function Review({ ai, onRead }: { ai: AiAssistant; onRead: () => void }) {
  const { job, result } = ai;
  if (!job || !result) return null;

  if (job.target) {
    const fixes = result.fixes;
    const heading =
      job.mode === 'proofread'
        ? fixes === 0
          ? 'No fixes needed'
          : fixes
            ? `Proofread: ${fixes} ${fixes === 1 ? 'fix' : 'fixes'}`
            : 'Proofread'
        : 'Your upgraded text';
    return (
      <Box aria-live="polite">
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {heading}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: 13, mt: 0.5 }}>
          {job.target.partial ? 'For the words you selected.' : describe(ai.editorHtml)}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, ...clamp(5) }}>
          {htmlText(ai.editorHtml).replace(/\n/g, ' ')}
        </Typography>
        <Button size="small" onClick={onRead} sx={{ px: 0.5, mt: 0.25, minWidth: 0 }}>
          Read it all
        </Button>
        <Stack direction="row" flexWrap="wrap" useFlexGap spacing={1} sx={{ mt: 1.5 }}>
          {fixes !== 0 && (
            <Button variant="contained" disableElevation startIcon={<IconCheck size={18} />} onClick={ai.applyEditor}>
              Use this
            </Button>
          )}
          <Button color="inherit" onClick={ai.discard} sx={{ color: 'text.secondary' }}>
            {fixes === 0 ? 'Close' : 'Discard'}
          </Button>
        </Stack>
        <Note>Suggestions are made with Google&apos;s AI.</Note>
      </Box>
    );
  }

  const polish = job.mode === 'polish';
  return (
    <Box aria-live="polite">
      <Typography variant="body2" sx={{ fontWeight: 600 }}>
        {polish
          ? ai.rows.length
            ? 'Here is the polished version'
            : 'Your text already reads well'
          : 'Your draft is ready'}
      </Typography>
      <Stack divider={<Divider flexItem />} spacing={1.25} sx={{ mt: 1.25 }}>
        {ai.rows.map(({ field, value }) => {
          const done = ai.used.has(field.key);
          return (
            <Box key={field.key}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary', flex: 1 }}>
                  {field.label}
                  {polish && (
                    <Chip label="Changed" size="small" sx={{ ml: 0.75, height: 18, fontSize: 11, fontWeight: 600 }} />
                  )}
                </Typography>
                <Button
                  size="small"
                  onClick={() => ai.takeField(field.key)}
                  disabled={done}
                  startIcon={done ? <IconCheck size={14} /> : undefined}
                  aria-label={done ? `${field.label} added` : `Use this ${field.label.toLowerCase()}`}
                  sx={{ minWidth: 0, py: 0, px: 0.75 }}
                >
                  {done ? 'Added' : 'Use'}
                </Button>
              </Stack>
              <FieldValue field={field} value={value} onRead={onRead} />
            </Box>
          );
        })}
      </Stack>
      {!!ai.kept.length && <Note>Kept as is: {ai.kept.map((f) => f.label).join(', ')}.</Note>}
      {!!result.gaps?.length && <Note>Worth adding: {result.gaps.join(' · ')}</Note>}
      <Stack direction="row" flexWrap="wrap" useFlexGap spacing={1} sx={{ mt: 2 }}>
        {!!ai.rows.length && (
          <Button variant="contained" disableElevation startIcon={<IconCheck size={18} />} onClick={ai.fill}>
            Fill the form
          </Button>
        )}
        <Button
          variant="outlined"
          startIcon={<IconRefresh size={18} />}
          onClick={ai.retry}
          disabled={ai.outOfUses || ai.busy}
        >
          Try again
        </Button>
        <Button color="inherit" onClick={ai.discard} sx={{ color: 'text.secondary' }}>
          Discard
        </Button>
      </Stack>
      <Note>Suggestions are made with Google&apos;s AI.</Note>
    </Box>
  );
}

/** The whole body at reading width: the side card is too narrow for a long draft. */
function ReadDialog({ ai, open, onClose }: { ai: AiAssistant; open: boolean; onClose: () => void }) {
  const draft = (ai.result?.draft || {}) as Record<string, any>;
  const editorJob = !!ai.job?.target;
  const html = editorJob ? ai.editorHtml : typeof draft.body === 'string' ? draft.body : sectionsHtml(draft.sections);
  const title = editorJob ? 'Your text' : draft.title || draft.heading || 'Your draft';
  return (
    <Dialog open={open && !!ai.result} onClose={onClose} fullWidth maxWidth="md" scroll="paper">
      <DialogTitle sx={{ pr: 6 }}>
        {title}
        <IconButton onClick={onClose} aria-label="Close" sx={{ position: 'absolute', right: 12, top: 12 }}>
          <IconX size={20} />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {!editorJob && draft.summary && (
          <Typography sx={{ fontSize: 17, color: 'text.secondary', mb: 2 }}>{draft.summary}</Typography>
        )}
        <PageRichText html={html} sx={{ fontSize: 16.5, maxWidth: '68ch', '& > *:first-of-type': { mt: 0 } }} />
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 1.5 }}>
        <Button color="inherit" onClick={onClose}>
          Close
        </Button>
        {(editorJob ? ai.result?.fixes !== 0 : !!ai.rows.length) && (
          <Button
            variant="contained"
            disableElevation
            startIcon={<IconCheck size={18} />}
            onClick={() => {
              onClose();
              if (editorJob) ai.applyEditor();
              else ai.fill();
            }}
          >
            {editorJob ? 'Use this' : 'Fill the form'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

function Body({ ai, onClose }: { ai: AiAssistant; onClose?: () => void }) {
  const [reading, setReading] = React.useState(false);
  return (
    <>
      <Header onClose={onClose} />
      {ai.status === 'working' ? (
        <Working ai={ai} />
      ) : ai.status === 'review' ? (
        <Review ai={ai} onRead={() => setReading(true)} />
      ) : (
        <Ask ai={ai} />
      )}
      <ReadDialog ai={ai} open={reading} onClose={() => setReading(false)} />
    </>
  );
}

const tinted = {
  border: '1px solid',
  borderColor: (t: any) => alpha(t.palette.primary.main, 0.28),
  bgcolor: (t: any) => alpha(t.palette.primary.main, t.palette.mode === 'dark' ? 0.12 : 0.045),
  borderRadius: 3,
};

const sheetPaper = {
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  maxHeight: '88dvh',
  p: 2.5,
  pb: 'calc(20px + env(safe-area-inset-bottom))',
};

/**
 * The assistant in an EditorShell side column. Below `below` there is no side column on screen,
 * so a floating "Write with AI" button opens the same assistant as a bottom sheet.
 */
export function AiAssistantCard({ below = 'md' }: { below?: 'md' | 'lg' }) {
  const ai = useAiAssistant();
  const theme = useTheme();
  const phone = useMediaQuery(theme.breakpoints.down(below));
  if (!ai?.enabled) return null;
  return (
    <>
      <Box sx={{ ...tinted, p: 2.5, display: { xs: 'none', [below]: 'block' } }}>
        <Body ai={ai} />
      </Box>
      <Fab
        variant="extended"
        color="primary"
        onClick={() => ai.setOpen(true)}
        sx={{
          display: { xs: ai.open ? 'none' : 'inline-flex', [below]: 'none' },
          position: 'fixed',
          // Centred above the phone tab bar (~76px), clear of the scroll-to-top button on the right.
          left: '50%',
          transform: 'translateX(-50%)',
          bottom: {
            xs: 'calc(88px + env(safe-area-inset-bottom, 0px))',
            md: 'calc(24px + env(safe-area-inset-bottom, 0px))',
          },
          zIndex: (t) => t.zIndex.speedDial,
          textTransform: 'none',
          fontWeight: 600,
          gap: 0.75,
        }}
      >
        <IconSparkles size={20} stroke={1.75} />
        {ai.status === 'review' ? 'AI draft ready' : ai.status === 'working' ? 'AI is writing…' : 'Write with AI'}
      </Fab>
      <Drawer anchor="bottom" open={phone && ai.open} onClose={() => ai.setOpen(false)} PaperProps={{ sx: sheetPaper }}>
        <Body ai={ai} onClose={() => ai.setOpen(false)} />
      </Drawer>
    </>
  );
}

/** The assistant for forms without a side column (About Me): a panel from the right, a sheet on phones. */
export function AiAssistantPanel() {
  const ai = useAiAssistant();
  const theme = useTheme();
  const phone = useMediaQuery(theme.breakpoints.down('sm'));
  if (!ai?.enabled) return null;
  return (
    <Drawer
      anchor={phone ? 'bottom' : 'right'}
      open={ai.open}
      onClose={() => ai.setOpen(false)}
      PaperProps={{ sx: phone ? sheetPaper : { width: 400, maxWidth: '100vw', p: 3 } }}
    >
      <Body ai={ai} onClose={() => ai.setOpen(false)} />
    </Drawer>
  );
}

/** "Write with AI" beside a field label; opens the panel. */
export function AiWriteLink() {
  const ai = useAiAssistant();
  if (!ai?.enabled) return null;
  return (
    <Button
      size="small"
      startIcon={<IconSparkles size={16} stroke={1.75} />}
      onClick={() => ai.setOpen(true)}
      disabled={ai.busy}
      sx={{ textTransform: 'none', fontWeight: 600, py: 0.25 }}
    >
      Write with AI
    </Button>
  );
}
