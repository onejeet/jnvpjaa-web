'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import Box from '@mui/material/Box';
import type { TipTapTextEditorProps } from './TipTapTextEditor.types';

// Create a loading placeholder component
const EditorLoadingPlaceholder = () => (
  <Box
    sx={{
      border: '1px solid',
      borderColor: 'grey.400',
      borderRadius: 2,
      minHeight: '200px',
      p: 3,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    Loading editor...
  </Box>
);

// Dynamically import the TipTapTextEditor with SSR disabled
const DynamicTipTapEditor = dynamic(() => import('./TipTapTextEditor'), {
  ssr: false, // This is crucial - it prevents the component from being rendered on the server
  loading: () => <EditorLoadingPlaceholder />,
});

// Create a wrapper component with the same props interface
const TipTapEditorClientSide = (props: TipTapTextEditorProps) => {
  return <DynamicTipTapEditor {...props} />;
};

export default TipTapEditorClientSide;
