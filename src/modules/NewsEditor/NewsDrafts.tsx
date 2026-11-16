'use client';

import React from 'react';
import { useQuery } from '@apollo/client';
import { Box, Chip, Stack, Typography } from '@mui/material';
import { IconPinFilled } from '@tabler/icons-react';
import { MANAGED_NEWS_POSTS, type NewsPost } from '@/apollo/newsroomOperations';
import { PERMISSION_CODES } from '@/constants/access';
import { useAuth } from '@/context/AuthContext';
import { NEWS_CATEGORY_LABELS, formatNewsDate, newsStatusLabel } from '@/modules/Newsroom/newsroom.utils';
import NewsPostActions from './NewsPostActions';

type ManagedPost = Pick<
  NewsPost,
  'id' | 'title' | 'slug' | 'category' | 'status' | 'publishedAt' | 'isPinned' | 'updatedAt'
>;

/** Editors' queue on /newsroom: drafts and scheduled news, which have no public page yet. */
const NewsDrafts = () => {
  const { can } = useAuth();
  const canManage = can(PERMISSION_CODES.NEWSROOM_POST_MANAGE);
  const { data } = useQuery<{ managedNewsPosts: ManagedPost[] }>(MANAGED_NEWS_POSTS, {
    skip: !canManage,
    fetchPolicy: 'cache-and-network',
  });
  const queue = (data?.managedNewsPosts ?? [])
    .map((post) => ({ post, status: newsStatusLabel(post.status, post.publishedAt) }))
    .filter(({ status }) => status !== 'Published');

  if (!canManage || !queue.length) return null;

  return (
    <Box component="section" aria-label="Drafts and scheduled news">
      <Typography fontWeight={700} mb={0.5}>
        Drafts & scheduled
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={1.5}>
        Only newsroom editors can see these.
      </Typography>
      <Stack sx={{ border: '1px dashed', borderColor: 'divider', borderRadius: 2, bgcolor: 'background.paper' }}>
        {queue.map(({ post, status }, index) => (
          <Box
            key={post.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              pl: 2,
              pr: 1,
              py: 1.25,
              borderTop: index ? '1px solid' : 'none',
              borderColor: 'divider',
            }}
          >
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Stack direction="row" alignItems="center" gap={0.75}>
                {post.isPinned && <IconPinFilled size={14} aria-label="Pinned" style={{ flexShrink: 0 }} />}
                <Typography fontWeight={600} sx={{ minWidth: 0, overflowWrap: 'anywhere' }}>
                  {post.title}
                </Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary">
                {NEWS_CATEGORY_LABELS[post.category]}
                {post.publishedAt ? ` · ${formatNewsDate(post.publishedAt)}` : ''}
              </Typography>
            </Box>
            <Chip size="small" label={status} color={status === 'Scheduled' ? 'warning' : 'default'} />
            <Stack direction="row">
              <NewsPostActions post={post} />
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default NewsDrafts;
