'use client';

import React from 'react';
import { Box, Button, ButtonBase, Skeleton, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { IconCheck, IconCopy, IconRefresh, IconSparkles, IconX } from '@tabler/icons-react';
import type { AiResult } from '@/apollo/aiOperations';
import PageRichText from '@/modules/ContentPages/PageRichText';

type Props = {
  action: string;
  loading: boolean;
  result: AiResult | null;
  message: string | null;
  canRetry: boolean;
  onUse: (html: string) => void;
  onPickTitle?: (title: string) => void;
  onUseSummary?: (summary: string) => void;
  onRetry: () => void;
  onDiscard: () => void;
};

const HEADINGS: Record<string, string> = {
  write: 'AI draft',
  improve: 'AI suggestion',
  shorten: 'Shorter version',
  title: 'AI title ideas',
  summary: 'AI summary',
};

const copy = (text: string) => navigator.clipboard?.writeText(text).catch(() => undefined);

const AiPreview: React.FC<Props> = ({
  action,
  loading,
  result,
  message,
  canRetry,
  onUse,
  onPickTitle,
  onUseSummary,
  onRetry,
  onDiscard,
}) => {
  const [copied, setCopied] = React.useState<string | null>(null);
  const doCopy = (text: string) => {
    copy(text);
    setCopied(text);
  };

  return (
    <Box
      aria-live="polite"
      sx={{
        m: 1,
        p: { xs: 1.5, sm: 2 },
        borderRadius: 2,
        border: '1px solid',
        borderColor: (t) => alpha(t.palette.primary.main, 0.35),
        bgcolor: 'background.paper',
        boxShadow: (t) => `0 6px 20px -8px ${alpha(t.palette.primary.main, 0.35)}`,
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.25, color: 'primary.main' }}>
        <IconSparkles size={18} stroke={1.75} />
        <Typography sx={{ fontWeight: 600, fontSize: 14.5, color: 'text.primary', flex: 1 }}>
          {HEADINGS[action]}
        </Typography>
        <Button
          size="small"
          color="inherit"
          onClick={onDiscard}
          aria-label="Close AI suggestion"
          sx={{ minWidth: 0, p: 0.5, color: 'text.secondary' }}
        >
          <IconX size={18} />
        </Button>
      </Stack>

      {loading && (
        <Box>
          <Skeleton width="92%" />
          <Skeleton width="84%" />
          <Skeleton width="60%" />
        </Box>
      )}

      {!loading && message && <Typography sx={{ color: 'text.primary', fontSize: 15 }}>{message}</Typography>}

      {!loading && result?.titles && (
        <Stack spacing={0.75}>
          {result.titles.map((title) => (
            <ButtonBase
              key={title}
              onClick={() => (onPickTitle ? (onPickTitle(title), onDiscard()) : doCopy(title))}
              sx={{
                justifyContent: 'space-between',
                textAlign: 'left',
                gap: 1,
                px: 1.5,
                py: 1,
                borderRadius: 1.5,
                border: '1px solid',
                borderColor: 'divider',
                fontSize: 15,
                '&:hover, &:focus-visible': {
                  borderColor: 'primary.main',
                  bgcolor: (t) => alpha(t.palette.primary.main, 0.05),
                },
              }}
            >
              <span>{title}</span>
              <Typography
                component="span"
                sx={{ fontSize: 12.5, color: 'primary.main', flexShrink: 0, fontWeight: 600 }}
              >
                {onPickTitle ? 'Use' : copied === title ? 'Copied' : 'Copy'}
              </Typography>
            </ButtonBase>
          ))}
        </Stack>
      )}

      {!loading && result?.result && (
        <Box sx={{ maxHeight: 360, overflowY: 'auto', pr: 0.5 }}>
          {action === 'summary' ? (
            <Typography sx={{ fontSize: 15.5, lineHeight: 1.6 }}>{result.result}</Typography>
          ) : (
            <PageRichText html={result.result} sx={{ fontSize: 15.5, '& > *:first-of-type': { mt: 0 } }} />
          )}
        </Box>
      )}

      {!loading && (
        <Stack direction="row" flexWrap="wrap" useFlexGap spacing={1} sx={{ mt: 1.75 }}>
          {result?.result && action === 'summary' && (
            <Button
              variant="contained"
              disableElevation
              startIcon={onUseSummary ? <IconCheck size={18} /> : <IconCopy size={18} />}
              onClick={() => (onUseSummary ? (onUseSummary(result.result!), onDiscard()) : doCopy(result.result!))}
            >
              {onUseSummary ? 'Use as summary' : copied ? 'Copied' : 'Copy'}
            </Button>
          )}
          {result?.result && action !== 'summary' && (
            <Button
              variant="contained"
              disableElevation
              startIcon={<IconCheck size={18} />}
              onClick={() => onUse(result.result!)}
            >
              Use this
            </Button>
          )}
          {canRetry && (
            <Button variant="outlined" startIcon={<IconRefresh size={18} />} onClick={onRetry}>
              Try again
            </Button>
          )}
          <Button color="inherit" onClick={onDiscard} sx={{ color: 'text.secondary' }}>
            Discard
          </Button>
        </Stack>
      )}

      {!loading && result && (
        <Typography sx={{ mt: 1.25, fontSize: 12.5, color: 'text.secondary' }}>
          Suggestions are made with Google&apos;s AI.
        </Typography>
      )}
    </Box>
  );
};

export default AiPreview;
