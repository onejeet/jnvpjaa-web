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

const MarkButton: React.FC<{
  format: 'bold' | 'underline' | 'italic' | 'strike' | 'code' | 'orderedList' | 'bulletList';
  disabled?: boolean;
}> = ({ format, disabled }) => {
  const { editor } = useCurrentEditor();

  const handleMark = (action: 'bold' | 'underline' | 'italic' | 'strike' | 'code' | 'orderedList' | 'bulletList') => {
    if (!editor) return;
    switch (action) {
      case 'bold':
        editor.chain().focus().toggleBold().run();
        break;
      case 'underline':
        editor.chain().focus().toggleUnderline().run();
        break;
      case 'italic':
        editor.chain().toggleItalic().focus().run();
        break;
      case 'strike':
        editor.chain().focus().toggleStrike().run();
        break;
      case 'code':
        editor.chain().focus().toggleCode().run();
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
        aria-label={startCase(format)}
        aria-pressed={Boolean(editor?.isActive(format))}
        disabled={disabled}
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
