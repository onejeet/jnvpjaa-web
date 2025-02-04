import React from 'react';
import IconButton from '@mui/material/IconButton';
import { useCurrentEditor } from '@tiptap/react';
import Menu from '@/components/core/Menu';
import { FONT_SIZE_LIST } from '../../constants';
import ToolIcon from './ToolIcon';

const FontSizeSelect: React.FC<any> = ({ toggleBlock }) => {
  const { editor } = useCurrentEditor();

  return (
    <Menu
      onChange={(val) =>
        editor
          ?.chain()
          .focus()
          .setFontSize(val as string)
          .run()
      }
      value={editor?.getAttributes('textStyle')?.fontSize}
      items={FONT_SIZE_LIST.map((hItem) => ({
        label: hItem.replace('px', ''),
        value: hItem,
      }))}
      render={
        <IconButton size="small">
          <ToolIcon icon="font_size" />
        </IconButton>
      }
      MenuListProps={{
        sx: {
          pr: '8px !important',
          '& .MuiMenuItem-root': {
            minWidth: 50,
            alignItems: 'center',
            textAlign: 'center',
          },
        },
      }}
    />
  );
};

export default React.memo(FontSizeSelect);
