'use client';

import React from 'react';
import Box from '@mui/material/Box';
import { useCurrentEditor } from '@tiptap/react';

import type { TipTapTextEditorWrapperProps } from './TipTapTextEditor.types';

const TipTapTextEditorWrapper = ({ children, value, disabled }: TipTapTextEditorWrapperProps) => {
  const { editor } = useCurrentEditor();

  React.useEffect(() => {
    if (!editor) return;
    if (editor.getHTML() !== value && !(editor.isEmpty && !value)) {
      editor.commands.setContent(value || '', false, { preserveWhitespace: 'full' });
    }
  }, [editor, value]);

  React.useEffect(() => {
    editor?.setEditable(!disabled);
  }, [editor, disabled]);

  return <Box>{children}</Box>;
};

export default TipTapTextEditorWrapper;
