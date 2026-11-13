'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { TipTapTextEditorProps } from './TipTapTextEditor.types';

/**
 * A fallback component for the TipTap editor that displays static content
 * when the editor cannot be loaded (e.g., during server-side rendering).
 */
const TipTapEditorFallback = ({ sx = {}, height }: TipTapTextEditorProps) => (
  <Box
    sx={{
      border: '1px solid',
      borderColor: 'grey.400',
      borderRadius: 2,
      minHeight: height ?? 160,
      p: 1.5,
      ...sx,
    }}
  >
    <Typography color="text.secondary">Loading editor...</Typography>
  </Box>
);

export default TipTapEditorFallback;
