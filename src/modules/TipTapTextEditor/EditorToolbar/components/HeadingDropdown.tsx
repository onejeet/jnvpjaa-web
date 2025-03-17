import React from 'react';
import IconButton from '@mui/material/IconButton';
import type { Level } from '@tiptap/extension-heading';
import { useCurrentEditor } from '@tiptap/react';
import Menu from '@/components/core/Menu';
import { HEADINGS_LIST } from '../../constants';
import ToolIcon from './ToolIcon';

const HeadingDropdown: React.FC = () => {
  const { editor } = useCurrentEditor();

  return (
    <Menu
      onChange={(val) => editor?.commands.toggleHeading({ level: val as Level })}
      value={editor?.getAttributes('heading')?.level}
      items={HEADINGS_LIST.map((hItem: any) => ({
        label: hItem?.label,
        value: hItem?.value,
        icon: React.createElement(hItem?.icon, { size: 18, weight: 'bold' }),
      }))}
      render={
        <IconButton
          size="small"
          sx={{
            color: editor?.getAttributes('heading')?.level ? 'primary.main' : 'text.primary',
          }}
        >
          <ToolIcon
            icon={
              editor?.getAttributes('heading')?.level ? `heading_${editor?.getAttributes('heading')?.level}` : 'heading'
            }
          />
        </IconButton>
      }
    />
  );
};

export default React.memo(HeadingDropdown);
