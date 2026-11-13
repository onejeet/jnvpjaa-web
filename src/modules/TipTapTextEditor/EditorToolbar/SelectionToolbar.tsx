'use client';

import React from 'react';
import Box from '@mui/material/Box';
import { BubbleMenu, useCurrentEditor } from '@tiptap/react';
import AnchorEditorButton from './components/AnchorEditorButton';
import ColorPicker from './components/ColorPicker';
import MarkButton from './components/MarkButton';

interface SelectionToolbarProps {
  disabled?: boolean;
  toolsHidden?: string[];
}

const SelectionToolbar: React.FC<SelectionToolbarProps> = ({ disabled, toolsHidden = [] }) => {
  const { editor } = useCurrentEditor();
  if (!editor || disabled) return null;

  return (
    <BubbleMenu
      editor={editor}
      pluginKey="selected-text-formatting"
      shouldShow={({ editor: currentEditor, state }) =>
        currentEditor.isEditable && !state.selection.empty && !currentEditor.isActive('codeBlock')
      }
      tippyOptions={{ duration: 100, placement: 'bottom-start', offset: [0, 6], appendTo: () => document.body }}
    >
      <Box
        role="toolbar"
        aria-label="Selected text formatting"
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.25,
          p: 0.5,
          maxWidth: 'calc(100vw - 24px)',
          overflowX: 'auto',
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1.5,
          boxShadow: 4,
          '& .MuiIconButton-root': { width: 34, height: 34, color: 'grey.700', flexShrink: 0 },
          '& .MuiIconButton-root[aria-pressed="true"]': { color: 'grey.900', bgcolor: 'grey.100' },
        }}
      >
        <MarkButton format="bold" />
        <MarkButton format="italic" />
        <MarkButton format="underline" />
        <MarkButton format="strike" />
        {!toolsHidden.includes('color') && <ColorPicker />}
        {!toolsHidden.includes('link') && <AnchorEditorButton />}
      </Box>
    </BubbleMenu>
  );
};

export default SelectionToolbar;
