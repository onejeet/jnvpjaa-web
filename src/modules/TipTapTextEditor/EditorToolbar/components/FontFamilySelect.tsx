import React from 'react';
/* MUI */
import IconButton from '@mui/material/IconButton';
import { useCurrentEditor } from '@tiptap/react';

/* CORE */
import Menu from '@/components/core/Menu';

/* CONSTANTS */
import { FONT_FAMILY_LIST } from '../../constants';
/* ICONS */
import ToolIcon from './ToolIcon';

const FontFamilySelect: React.FC<any> = ({ toggleBlock }) => {
  const { editor } = useCurrentEditor();

  return (
    <Menu
      onChange={(val) =>
        editor
          ?.chain()
          .focus()
          .setFontFamily(val as string)
          .run()
      }
      value={editor?.getAttributes('textStyle')?.fontFamily}
      items={FONT_FAMILY_LIST.map((hItem) => ({
        ...hItem,
      }))}
      render={
        <IconButton
          size="small"
          sx={{
            color: editor?.getAttributes('textStyle')?.fontFamily ? 'primary.main' : 'text.primary',
          }}
        >
          <ToolIcon icon="font_family" />
        </IconButton>
      }
    />
  );
};

export default React.memo(FontFamilySelect);
