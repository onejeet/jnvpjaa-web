'use client';

import React from 'react';
import Box from '@mui/material/Box';
import { useCurrentEditor } from '@tiptap/react';
import { BubbleMenu, type BubbleMenuProps } from '@tiptap/react/menus';
import AnchorEditorButton from './components/AnchorEditorButton';
import ColorPicker from './components/ColorPicker';
import MarkButton from './components/MarkButton';

interface SelectionToolbarProps {
  disabled?: boolean;
  toolsHidden?: string[];
}

// Stable identities: BubbleMenu dispatches an options-update transaction whenever these props change identity.
const shouldShow: BubbleMenuProps['shouldShow'] = ({ editor, state }) =>
  editor.isEditable && !state.selection.empty && !editor.isActive('codeBlock');
const menuOptions: BubbleMenuProps['options'] = { placement: 'bottom-start', offset: 6 };
const appendTo = () => document.body;

const SelectionToolbar: React.FC<SelectionToolbarProps> = ({ disabled, toolsHidden = [] }) => {
  const { editor } = useCurrentEditor();
  if (!editor || disabled) return null;

  return (
    <BubbleMenu
      editor={editor}
      pluginKey="selected-text-formatting"
      shouldShow={shouldShow}
      options={menuOptions}
      appendTo={appendTo}
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
