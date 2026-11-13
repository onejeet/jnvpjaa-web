import React from 'react';
import Button from '@mui/material/Button';
import type { Level } from '@tiptap/extension-heading';
import { useCurrentEditor } from '@tiptap/react';
import Menu from '@/components/core/Menu';
import { HEADINGS_LIST } from '../../constants';

const HeadingDropdown: React.FC<{ disabled?: boolean }> = ({ disabled }) => {
  const { editor } = useCurrentEditor();
  const level = editor?.getAttributes('heading')?.level;

  return (
    <Menu
      disabled={disabled}
      onChange={(val) => {
        if (val === 0) editor?.chain().focus().setParagraph().run();
        else
          editor
            ?.chain()
            .focus()
            .setHeading({ level: val as Level })
            .run();
      }}
      value={level ?? 0}
      items={[
        { label: 'Paragraph', value: 0 },
        ...HEADINGS_LIST.map((hItem: any) => ({
          label: hItem?.label,
          value: hItem?.value,
          icon: React.createElement(hItem?.icon, { size: 18, weight: 'bold' }),
        })),
      ]}
      render={
        <Button
          size="small"
          aria-label="Paragraph style"
          aria-haspopup="menu"
          disabled={disabled}
          variant="text"
          sx={{
            minWidth: 92,
            px: 1,
            color: 'text.primary',
            fontWeight: 600,
          }}
        >
          {level ? `Heading ${level}` : 'Paragraph'}
        </Button>
      }
    />
  );
};

export default React.memo(HeadingDropdown);
