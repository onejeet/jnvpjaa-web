import React from 'react';
import { Box, Card, Grid2 as Grid, Skeleton, Stack } from '@mui/material';

type Props = {
  /** article: a heading over text (optionally with a photo); grid: cards; table: rows. */
  variant?: 'article' | 'grid' | 'table';
  media?: boolean;
};

// Shown while an in-app navigation streams the page's data in (see DeferOnNavigation).
const PageSkeleton: React.FC<Props> = ({ variant = 'article', media = false }) => (
  <Stack spacing={{ xs: 3, md: 4 }} pb={{ xs: 4, md: 6 }} aria-busy="true" aria-label="Loading page">
    <Box>
      <Skeleton width={140} />
      <Skeleton width="min(420px, 80%)" height={52} />
      <Skeleton width="60%" />
    </Box>
    {variant === 'grid' && (
      <Grid container spacing={2.5}>
        {Array.from({ length: 6 }, (_, i) => (
          <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card variant="outlined" sx={{ borderRadius: 3, overflow: 'hidden' }}>
              <Skeleton variant="rectangular" height={160} />
              <Stack p={2} gap={0.5}>
                <Skeleton width="80%" height={28} />
                <Skeleton width="55%" />
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>
    )}
    {variant === 'table' && (
      <Stack spacing={1}>
        {Array.from({ length: 8 }, (_, i) => (
          <Skeleton key={i} variant="rounded" height={44} />
        ))}
      </Stack>
    )}
    {variant === 'article' && (
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} alignItems="flex-start">
        {media && <Skeleton variant="rounded" sx={{ width: { xs: '100%', md: 280 }, height: 320, flexShrink: 0 }} />}
        <Stack flex={1} width="100%">
          {Array.from({ length: 8 }, (_, i) => (
            <Skeleton key={i} width={i % 4 === 3 ? '70%' : '100%'} />
          ))}
        </Stack>
      </Stack>
    )}
  </Stack>
);

export default PageSkeleton;
