'use client';

import { Box, Stack, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import React from 'react';

type Art = 'missing-card' | 'broken-link' | 'not-found';

interface StatePageProps {
  art: Art;
  /** Small label above the title, e.g. "Error 404". */
  eyebrow: string;
  title: string;
  description: React.ReactNode;
  actions?: React.ReactNode;
  footnote?: React.ReactNode;
}

/** An ID card with an empty photo and blank lines: "no credential here". */
const MissingCard: React.FC<{ color: string; soft: string; line: string }> = ({ color, soft, line }) => (
  <svg viewBox="0 0 220 150" width="100%" height="100%" aria-hidden focusable="false">
    <rect x="34" y="22" width="160" height="108" rx="14" fill={soft} transform="rotate(-6 114 76)" />
    <rect x="26" y="18" width="168" height="112" rx="14" fill="#fff" stroke={line} strokeWidth="2" />
    <rect x="26" y="18" width="168" height="28" rx="14" fill={color} opacity="0.12" />
    <circle cx="66" cy="84" r="22" fill="none" stroke={color} strokeWidth="2.5" strokeDasharray="5 5" />
    <text x="66" y="92" textAnchor="middle" fontSize="22" fontWeight="700" fill={color} fontFamily="inherit">
      ?
    </text>
    <rect x="102" y="66" width="70" height="8" rx="4" fill={line} />
    <rect x="102" y="82" width="52" height="8" rx="4" fill={line} opacity="0.7" />
    <rect x="102" y="98" width="38" height="8" rx="4" fill={line} opacity="0.5" />
  </svg>
);

/** Two chain links pulled apart. */
const BrokenLink: React.FC<{ color: string; soft: string; line: string }> = ({ color, soft, line }) => (
  <svg viewBox="0 0 220 150" width="100%" height="100%" aria-hidden focusable="false">
    <circle cx="110" cy="75" r="60" fill={soft} />
    <g fill="none" strokeWidth="9" strokeLinecap="round">
      <path d="M58 92 l22 -22 a16 16 0 0 1 22 0 l2 2" stroke={line} />
      <path d="M162 58 l-22 22 a16 16 0 0 1 -22 0 l-2 -2" stroke={color} />
    </g>
    <g stroke={color} strokeWidth="3" strokeLinecap="round">
      <path d="M104 52 l-4 -12" />
      <path d="M114 50 l2 -13" />
      <path d="M106 100 l-3 12" />
      <path d="M116 98 l5 11" />
    </g>
  </svg>
);

/** A large outlined 404 over a faint grid. */
const NotFoundArt: React.FC<{ color: string; soft: string; line: string }> = ({ color, soft, line }) => (
  <svg viewBox="0 0 220 150" width="100%" height="100%" aria-hidden focusable="false">
    <defs>
      <pattern id="state-grid" width="14" height="14" patternUnits="userSpaceOnUse">
        <path d="M14 0H0V14" fill="none" stroke={line} strokeWidth="0.8" />
      </pattern>
    </defs>
    <rect x="10" y="10" width="200" height="130" rx="18" fill="url(#state-grid)" opacity="0.6" />
    <circle cx="110" cy="75" r="44" fill={soft} />
    <text
      x="110"
      y="96"
      textAnchor="middle"
      fontSize="64"
      fontWeight="800"
      fill="none"
      stroke={color}
      strokeWidth="2.5"
      letterSpacing="2"
      fontFamily="inherit"
    >
      404
    </text>
  </svg>
);

const ART: Record<Art, React.FC<{ color: string; soft: string; line: string }>> = {
  'missing-card': MissingCard,
  'broken-link': BrokenLink,
  'not-found': NotFoundArt,
};

/** Full-height empty, not-found and error screens with one consistent, quiet look. */
const StatePage: React.FC<StatePageProps> = ({ art, eyebrow, title, description, actions, footnote }) => {
  const theme = useTheme();
  const Art = ART[art];
  const color = theme.palette.primary.main;
  return (
    <Box
      component="section"
      aria-labelledby="state-page-title"
      sx={{
        minHeight: { xs: 'calc(100dvh - 260px)', md: 'calc(100dvh - 343px)' },
        display: 'grid',
        placeItems: 'center',
        px: 2,
        py: { xs: 4, md: 8 },
      }}
    >
      <Stack alignItems="center" textAlign="center" spacing={2.5} maxWidth={520}>
        <Box sx={{ width: { xs: 200, sm: 240 }, aspectRatio: '220 / 150' }}>
          <Art color={color} soft={alpha(color, 0.08)} line={theme.palette.grey[300]} />
        </Box>
        <Typography
          variant="overline"
          sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: '0.12em', lineHeight: 1 }}
        >
          {eyebrow}
        </Typography>
        <Typography id="state-page-title" component="h1" variant="h2" sx={{ fontWeight: 700, mt: '8px !important' }}>
          {title}
        </Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 440 }}>
          {description}
        </Typography>
        {actions && (
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} pt={1} width={{ xs: '100%', sm: 'auto' }}>
            {actions}
          </Stack>
        )}
        {footnote && (
          <Typography variant="caption" color="text.secondary" pt={1}>
            {footnote}
          </Typography>
        )}
      </Stack>
    </Box>
  );
};

export default StatePage;
