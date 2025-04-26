import React from 'react';
import { rgbToHex } from '@mui/system';
import { useCurrentEditor } from '@tiptap/react';
import ColorPickerInput from '@/components/common/ColorPickerInput';

const ColorPicker: React.FC<any> = ({ defaultColors }) => {
  const { editor } = useCurrentEditor();
  return (
    <ColorPickerInput
      onChange={(value: string) => editor?.chain().focus().setColor(value).run()}
      defaultColors={defaultColors || []}
      // value={match.find((matchItem) => matchItem.color)?.color}
      value={
        editor?.getAttributes('textStyle')?.color?.startsWith('rgb')
          ? rgbToHex(editor?.getAttributes('textStyle').color)
          : editor?.getAttributes('textStyle').color
      }
      // pickerIconButtonProps={{
      //   sx: {
      //     height: 20,
      //     width: 20,
      //     p: 0,
      //     borderRadius: '4px',
      //     bgcolor: match.find((matchItem) => isHexColor(matchItem?.color)) ? 'grey.200' : 'none',
      //     color: match.find((matchItem) => isHexColor(matchItem?.color)) ? 'grey.900' : 'grey.600',
      //   },
      // }}
    />
  );
};

export default React.memo(ColorPicker);
