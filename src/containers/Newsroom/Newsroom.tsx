'use client';

import React from 'react';
import NextLink from 'next/link';
import { Box, Chip, Grid2 as Grid, Stack, Typography } from '@mui/material';
import { IconNews } from '@tabler/icons-react';
import type { NewsCategory, NewsPost } from '@/apollo/newsroomOperations';
import { paths } from '@/config/paths';
import LayoutModule from '@/layouts/Layout';
import { NEWS_CATEGORY_LABELS } from '@/modules/Newsroom/newsroom.utils';
import NewsCard from './NewsCard';
import PressContact from './PressContact';

interface NewsroomProps {
  posts: NewsPost[];
  category?: NewsCategory;
}

const Newsroom: React.FC<NewsroomProps> = ({ posts, category }) => {
  const [lead, ...rest] = posts;
  const filters: { label: string; href: string; active: boolean }[] = [
    { label: 'All news', href: paths.newsroom.root, active: !category },
    ...(Object.keys(NEWS_CATEGORY_LABELS) as NewsCategory[]).map((value) => ({
      label: NEWS_CATEGORY_LABELS[value],
      href: `${paths.newsroom.root}?type=${value}`,
      active: category === value,
    })),
  ];

  return (
    <LayoutModule disableCover title="Newsroom • Alumni Network of JNV Paota, Jaipur">
      <Stack spacing={{ xs: 3, md: 4 }} pb={{ xs: 4, md: 6 }}>
        <Box>
          <Typography variant="h1" mb={1}>
            Newsroom
          </Typography>
          <Typography color="grey.800" maxWidth={720}>
            Official news, announcements and press releases from the JNV Paota Jaipur Alumni Association.
          </Typography>
        </Box>

        <Stack
          direction="row"
          gap={1}
          sx={{ overflowX: 'auto', pb: 0.5, mx: { xs: -2, sm: 0 }, px: { xs: 2, sm: 0 }, scrollbarWidth: 'none' }}
          component="nav"
          aria-label="News categories"
        >
          {filters.map((filter) => (
            <Chip
              key={filter.href}
              component={NextLink}
              href={filter.href}
              clickable
              label={filter.label}
              color={filter.active ? 'primary' : 'default'}
              variant={filter.active ? 'filled' : 'outlined'}
              aria-current={filter.active ? 'page' : undefined}
              sx={{ flexShrink: 0, height: 36, fontWeight: 600 }}
            />
          ))}
        </Stack>

        {lead ? (
          <>
            <NewsCard post={lead} variant="lead" />
            {rest.length > 0 && (
              <Grid container spacing={2.5}>
                {rest.map((post) => (
                  <Grid key={post.id} size={{ xs: 12, sm: 6, md: 4 }}>
                    <NewsCard post={post} />
                  </Grid>
                ))}
              </Grid>
            )}
          </>
        ) : (
          <Stack alignItems="center" spacing={1.5} sx={{ py: { xs: 6, md: 10 }, textAlign: 'center' }}>
            <IconNews size={40} stroke={1.5} style={{ opacity: 0.5 }} />
            <Typography fontWeight={700} fontSize={18}>
              No news yet
            </Typography>
            <Typography color="text.secondary" maxWidth={420}>
              {category
                ? `There are no ${NEWS_CATEGORY_LABELS[category].toLowerCase()} articles yet.`
                : 'Official updates from the association will appear here.'}
            </Typography>
          </Stack>
        )}

        <PressContact />
      </Stack>
    </LayoutModule>
  );
};

export default Newsroom;
