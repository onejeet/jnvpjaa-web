// ** React Imports
import React from 'react';
import Box from '@mui/material/Box';
import { useCurrentEditor } from '@tiptap/react';

import type { TipTapTextEditorWrapperProps } from './TipTapTextEditor.types';

const TipTapTextEditorWrapper = ({ children, value, disabled }: TipTapTextEditorWrapperProps) => {
  const { editor } = useCurrentEditor();

  // update content the react way
  React.useEffect(() => {
    if (!editor) return;
    const { from, to } = editor.state.selection;
    editor.commands.setContent(value, false, {
      preserveWhitespace: 'full',
    });
    editor.commands.setTextSelection({ from, to });
    if (disabled) {
      editor.setOptions({ editable: false });
    } else {
      editor.setOptions({ editable: true });
    }
  }, [editor, value, disabled]);

  return <Box>{children}</Box>;
};

export default TipTapTextEditorWrapper;
