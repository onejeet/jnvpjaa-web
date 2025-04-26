'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { TipTapTextEditorProps } from './TipTapTextEditor.types';

/**
 * A fallback component for the TipTap editor that displays static content
 * when the editor cannot be loaded (e.g., during server-side rendering).
 */
const TipTapEditorFallback = ({ value, sx = {}, height }: TipTapTextEditorProps) => {
  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: 'grey.400',
        borderRadius: 2,
        minHeight: height || 200,
        p: 3,
        ...sx,
      }}
    >
      {value ? (
        <div dangerouslySetInnerHTML={{ __html: value }} />
      ) : (
        <Typography color="text.secondary">Loading editor...</Typography>
      )}
    </Box>
  );
};

export default TipTapEditorFallback;
