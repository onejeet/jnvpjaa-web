'use client';

import { Box, Grid2 as Grid, Typography } from '@mui/material';
import { listThreads, react, seedDiscussionsIfEmpty } from '@/utils/discussions';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { paths } from '@/config/paths';
import DiscussionCard from '@/components/common/DiscussionCard';

export default function DiscussionListModule() {
  const [threads, setThreads] = useState(listThreads());
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      seedDiscussionsIfEmpty();
      setThreads(listThreads());
    }
  }, []);

  const onReact = (id: string) => {
    react(id, 'like');
    setThreads(listThreads());
  };

  if (!threads.length) {
    return (
      <Box>
        <Typography variant="body1">No threads yet. Be the first to start a discussion.</Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={2} width="100%" display="flex" alignItems="start" mt={1}>
      {threads.map((t) => (
        <Grid size={{ xs: 12 }} key={t.id}>
          <DiscussionCard
            id={t.id}
            title={t.title}
            content={t.content}
            authorId={t.authorId}
            authorName={t.authorName}
            authorImage={t.authorImage}
            createdAt={t.createdAt}
            likes={t.likes}
            dislikes={t.dislikes}
            repliesCount={t.replies.length}
            onOpen={(id) => router.push(paths.discussions.getThreadUrl(id))}
            onReact={() => onReact(t.id)}
          />
        </Grid>
      ))}
    </Grid>
  );
}
