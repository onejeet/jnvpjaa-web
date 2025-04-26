import React from 'react';
/* MUI */
import IconButton from '@mui/material/IconButton';
/* TIPTAP */
import { useCurrentEditor } from '@tiptap/react';

/* CONSTANTS */
import { EDITOR_ICONS } from '../../constants';
/* LOCAL */
import ToolIcon from './ToolIcon';
import { startCase } from '@/utils/helpers';
import { Tooltip } from '@mui/material';

const MarkButton: React.FC<any> = ({ format, icon }) => {
  const { editor } = useCurrentEditor();

  const handleMark = (action: 'bold' | 'underline' | 'italic' | 'orderedList' | 'bulletList') => {
    if (!editor) return;
    switch (action) {
      case 'bold':
        editor.chain().toggleBold().focus().run();
        break;
      case 'underline':
        editor.commands.toggleUnderline();
        break;
      case 'italic':
        editor.chain().toggleItalic().focus().run();
        break;
      case 'orderedList':
        editor?.chain().focus().toggleOrderedList().run();
        break;
      case 'bulletList':
        editor?.chain().focus().toggleBulletList().run();
        break;
    }
  };

  return (
    <Tooltip title={startCase(format)} arrow>
      <IconButton
        sx={{
          color: editor?.isActive(format) ? 'primary.main' : 'text.primary',
        }}
        size="small"
        onClick={(event) => {
          event.preventDefault();
          handleMark(format);
        }}
      >
        <ToolIcon icon={format} />
      </IconButton>
    </Tooltip>
  );
};

export default React.memo(MarkButton);
