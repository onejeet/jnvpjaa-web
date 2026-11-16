'use client';

import React from 'react';
import NextLink from 'next/link';
import { alpha, Box, Card, CardActionArea, Stack, Typography } from '@mui/material';
import type { Theme } from '@mui/material';
import { IconPinFilled } from '@tabler/icons-react';
import type { NewsPost } from '@/apollo/newsroomOperations';
import { paths } from '@/config/paths';
import { NEWS_CATEGORY_LABELS, formatNewsDate } from '@/modules/Newsroom/newsroom.utils';

export type NewsCardPost = Pick<NewsPost, 'slug' | 'title' | 'summary' | 'category' | 'publishedAt' | 'cover'> & {
  isPinned?: boolean;
};

interface NewsCardProps {
  post: NewsCardPost;
  variant?: 'lead' | 'default';
}

export const Kicker: React.FC<{ category: NewsPost['category']; pinned?: boolean }> = ({ category, pinned }) => (
  <Stack direction="row" alignItems="center" gap={0.75}>
    {pinned && <IconPinFilled size={13} aria-label="Pinned" style={{ color: 'inherit' }} />}
    <Typography
      component="span"
      sx={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'primary.main' }}
    >
      {NEWS_CATEGORY_LABELS[category]}
    </Typography>
  </Stack>
);

const NewsCard: React.FC<NewsCardProps> = ({ post, variant = 'default' }) => {
  const lead = variant === 'lead';
  const cover = post.cover?.url;
  return (
    <Card
      variant="outlined"
      sx={{ height: '100%', borderRadius: 3, transition: 'box-shadow 0.2s', '&:hover': { boxShadow: 3 } }}
    >
      <CardActionArea
        component={NextLink}
        href={paths.newsroom.getPostUrl(post.slug)}
        sx={{
          height: '100%',
          color: 'text.primary',
          // The global stylesheet colours and underlines every <a>; a whole card is not inline link text.
          '&, &:hover': { textDecoration: 'none', color: 'text.primary' },
          display: 'flex',
          flexDirection: lead ? { xs: 'column', md: 'row' } : 'column',
          alignItems: 'stretch',
          justifyContent: 'flex-start',
        }}
      >
        <Box
          sx={{
            flexShrink: 0,
            width: lead ? { xs: '100%', md: '55%' } : '100%',
            aspectRatio: lead ? { xs: '16 / 9', md: 'auto' } : '16 / 9',
            minHeight: lead ? { md: 320 } : undefined,
            bgcolor: (theme: Theme) => alpha(theme.palette.primary.main, 0.08),
            backgroundImage: cover ? `url("${encodeURI(cover)}")` : 'url("/assets/images/cover-2.webp")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          role="img"
          aria-label={post.cover?.alt || post.title}
        />
        <Stack
          spacing={1.25}
          sx={{ p: lead ? { xs: 2.5, md: 4 } : 2.5, flex: 1, justifyContent: lead ? 'center' : 'flex-start' }}
        >
          <Kicker category={post.category} pinned={post.isPinned} />
          <Typography
            component="h3"
            sx={{
              fontWeight: 700,
              lineHeight: 1.25,
              fontSize: lead ? { xs: 22, md: 30 } : 19,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {post.title}
          </Typography>
          <Typography
            color="text.secondary"
            sx={{
              fontSize: lead ? 17 : 15,
              display: '-webkit-box',
              WebkitLineClamp: lead ? 3 : 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {post.summary}
          </Typography>
          {post.publishedAt && (
            <Typography component="time" dateTime={post.publishedAt} variant="body2" color="text.secondary">
              {formatNewsDate(post.publishedAt)}
            </Typography>
          )}
        </Stack>
      </CardActionArea>
    </Card>
  );
};

export default NewsCard;
