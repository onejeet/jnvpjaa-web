import React from 'react';
/* MUI */
import IconButton from '@mui/material/IconButton';
// hooks
import { useCurrentEditor } from '@tiptap/react';

/* CONSTANTS */
import { EDITOR_ICONS } from '../../constants';

export type TAlign = 'left' | 'right' | 'center' | 'justify';

interface AlignButtonProps {
  format: TAlign;
}

const AlignButton: React.FC<AlignButtonProps> = ({ format }) => {
  const { editor } = useCurrentEditor();

  const handleAlign = (action: TAlign) => {
    if (!editor) return;
    editor.commands.setTextAlign(action);
  };

  const AlignIcon = EDITOR_ICONS[`text_align_${format}`];

  return (
    <IconButton
      sx={{
        color: editor?.isActive({ textAlign: format }) ? 'primary.main' : 'text.primary',
        borderRadius: '2px',
      }}
      size="small"
      onMouseDown={(event) => {
        event.preventDefault();
        if (!editor) return;
        if (editor.isActive({ textAlign: format })) {
          editor.commands.unsetTextAlign();
        } else {
          handleAlign(format);
        }
      }}
    >
      <AlignIcon size={20} weight="bold" />
    </IconButton>
  );
};

export default React.memo(AlignButton);
