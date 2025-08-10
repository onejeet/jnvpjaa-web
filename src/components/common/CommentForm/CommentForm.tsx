'use client';

import { Button, TextField, Stack } from '@mui/material';
import { useState } from 'react';

interface Props {
  onSubmit: (content: string) => void;
  autoFocus?: boolean;
}

export default function CommentForm({ onSubmit, autoFocus }: Props) {
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit(content.trim());
      setContent('');
    }
  };

  return (
    <Stack spacing={2}>
      <TextField
        multiline
        fullWidth
        autoFocus={autoFocus}
        minRows={3}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a comment..."
        variant="outlined"
      />
      <Button variant="contained" onClick={handleSubmit}>
        Post
      </Button>
    </Stack>
  );
}
