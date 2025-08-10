'use client';

import { Box, Stack, TextField } from '@mui/material';
import Button from '@/components/core/Button';
import { useRouter } from 'next/navigation';
import { createThread, DiscussionThread } from '@/utils/discussions';
import { paths } from '@/config/paths';
import { useState } from 'react';
import TipTapTextEditor from '@/modules/TipTapTextEditor';

interface NewDiscussionProps {
  onCreated?: (thread: DiscussionThread) => void;
  autoNavigate?: boolean;
}

export default function NewDiscussion({ onCreated, autoNavigate = true }: NewDiscussionProps) {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onCreate = () => {
    if (!title.trim() || !content.trim()) return;
    setSubmitting(true);
    const t = createThread({
      title: title.trim(),
      content: content.trim(),
      authorId: 'me',
      authorName: 'You',
      authorImage: undefined,
    });

    if (onCreated && !autoNavigate) {
      onCreated(t);
      setTitle('');
      setContent('');
      setSubmitting(false);
      return;
    }

    router.push(paths.discussions.getThreadUrl(t.id));
  };

  return (
    <Box p={2} width={{ xs: '100%', md: 700 }}>
      <Stack spacing={2}>
        <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth />
        <TipTapTextEditor
          value={content}
          onChange={setContent}
          height={220}
          toolbarProps={{ toolsHidden: ['image', 'video', 'link'] }}
          sx={{ borderRadius: 2 }}
        />
        <Box display="flex" gap={1}>
          <Button title="Create Thread" onClick={onCreate} disabled={submitting} />
        </Box>
      </Stack>
    </Box>
  );
}
