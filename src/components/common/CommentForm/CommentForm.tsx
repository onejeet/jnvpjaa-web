'use client';

import { Button, Stack } from '@mui/material';
import { useState } from 'react';
import TipTapTextEditor from '@/modules/TipTapTextEditor';

interface Props {
  onSubmit: (content: string) => void;
  autoFocus?: boolean;
}

export default function CommentForm({ onSubmit, autoFocus }: Props) {
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    const trimmed = content.replace(/<p><br\/><\/p>/g, '').trim();
    if (trimmed) {
      onSubmit(content);
      setContent('');
    }
  };

  return (
    <Stack spacing={2}>
      <TipTapTextEditor
        value={content}
        onChange={setContent}
        height={160}
        toolbarProps={{ toolsHidden: ['image', 'video'] }}
      />
      <Button variant="contained" onClick={handleSubmit}>
        Post
      </Button>
    </Stack>
  );
}
