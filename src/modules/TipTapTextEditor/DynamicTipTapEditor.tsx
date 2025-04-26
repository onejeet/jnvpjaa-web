'use client';

import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import type { TipTapTextEditorProps } from './TipTapTextEditor.types';
import TipTapEditorFallback from './TipTapEditorFallback';

// Dynamically import the TipTapTextEditor with SSR disabled
const DynamicTipTapEditor = dynamic(() => import('./TipTapTextEditor'), {
  ssr: false, // This is crucial - it prevents the component from being rendered on the server
  loading: () => <TipTapEditorFallback value="" onChange={() => {}} />,
});

/**
 * Client-side only wrapper for TipTapTextEditor
 * This ensures the editor is only loaded in the browser and never during SSR
 */
const TipTapEditorClientSide = (props: TipTapTextEditorProps) => {
  // Use state to track if we're in the browser
  const [isMounted, setIsMounted] = useState(false);

  // Only render the editor after component has mounted on the client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Show fallback during SSR and initial client render
  if (!isMounted) {
    return <TipTapEditorFallback {...props} />;
  }

  // Once mounted on client, use the dynamic editor
  return <DynamicTipTapEditor {...props} />;
};

export default TipTapEditorClientSide;
