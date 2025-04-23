import React from 'react';
import IconButton from '@mui/material/IconButton';
import { useCurrentEditor } from '@tiptap/react';
import ToolIcon from './ToolIcon';
import { Tooltip } from '@mui/material';

const BlockquoteButton: React.FC = () => {
  const { editor } = useCurrentEditor();

  return (
    <Tooltip title="Blockquote" arrow>
      <IconButton
        sx={{
          color: editor?.isActive('blockquote') ? 'primary.main' : 'text.primary',
          borderRadius: '2px',
        }}
        size="small"
        onMouseDown={(event) => {
          event.preventDefault();
          if (!editor) return;
          editor.chain().toggleBlockquote().focus().run();
          //   if (editor.isActive({ textAlign: format })) {
          //     editor.commands.unsetTextAlign();
          //   } else {
          //     handleAlign(format);
          //   }
        }}
      >
        <ToolIcon icon="blockquote" />
      </IconButton>
    </Tooltip>
  );
};

export default React.memo(BlockquoteButton);
