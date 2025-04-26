'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { TipTapTextEditorProps } from './TipTapTextEditor.types';

// Create a simple fallback component that just displays the HTML content
const EditorFallback: React.FC<TipTapTextEditorProps> = ({ value, sx = {}, height }) => {
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
        <Typography color="text.secondary">Editor loading...</Typography>
      )}
    </Box>
  );
};

// Dynamically import the TipTap editor with SSR disabled
// This ensures it only loads on the client side
const TipTapEditorDynamic = dynamic(() => import('./TipTapTextEditor').then((mod) => mod.default), {
  ssr: false,
  loading: () => <EditorFallback value="" onChange={() => {}} />,
});

/**
 * A safe wrapper for the TipTap editor that ensures it only renders on the client side
 * This prevents "document is not defined" errors during server-side rendering
 */
const SafeTipTapEditor: React.FC<TipTapTextEditorProps> = (props) => {
  const [mounted, setMounted] = useState(false);

  // Only render the editor after the component has mounted on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  // On the server or during initial client render, show the fallback
  if (!mounted) {
    return <EditorFallback {...props} />;
  }

  // Once mounted on the client, render the actual editor
  return <TipTapEditorDynamic {...props} />;
};

export default SafeTipTapEditor;
