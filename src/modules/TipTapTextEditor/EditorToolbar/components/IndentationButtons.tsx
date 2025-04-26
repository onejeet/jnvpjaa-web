import React from 'react';
import IconButton from '@mui/material/IconButton';
import { useCurrentEditor } from '@tiptap/react';
import { Box } from '@mui/material';
import ToolIcon from './ToolIcon';

const IndentationButtons: React.FC = () => {
  const { editor } = useCurrentEditor();

  return (
    <Box display="flex" gap={2}>
      <IconButton
        sx={{
          color: 'text.primary',
          borderRadius: '2px',
        }}
        size="small"
        onMouseDown={(event) => {
          event.preventDefault();
          if (!editor) return;
          // @ts-expect-error dfsfsf
          editor.chain().focus().increaseIndent().run();
          //   if (editor.isActive({ textAlign: format })) {
          //     editor.commands.unsetTextAlign();
          //   } else {
          //     handleAlign(format);
          //   }
        }}
      >
        <ToolIcon icon="indent_in" />
      </IconButton>
      <IconButton
        sx={{
          color: 'text.primary',
          borderRadius: '2px',
        }}
        size="small"
        onMouseDown={(event) => {
          event.preventDefault();
          if (!editor) return;
          // @ts-expect-error dfsfsf
          editor.chain().focus().decreaseIndent().run();
          //   if (editor.isActive({ textAlign: format })) {
          //     editor.commands.unsetTextAlign();
          //   } else {
          //     handleAlign(format);
          //   }
        }}
      >
        <ToolIcon icon="indent_out" />
      </IconButton>
    </Box>
  );
};

export default React.memo(IndentationButtons);
