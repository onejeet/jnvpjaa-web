import React from 'react';
import { Box, Card, Divider, Grid2 as Grid, Skeleton, Stack } from '@mui/material';

// Placeholders shaped like the real job pages, so content doesn't jump when it arrives.

export const JobCardSkeleton: React.FC = () => (
  <Card variant="outlined" sx={{ height: '100%', borderRadius: 3, p: 2.5 }}>
    <Stack gap={1.25}>
      <Stack direction="row" gap={0.75}>
        <Skeleton variant="rounded" width={72} height={24} sx={{ borderRadius: 4 }} />
        <Skeleton variant="rounded" width={64} height={24} sx={{ borderRadius: 4 }} />
      </Stack>
      <Skeleton width="85%" height={30} />
      <Stack gap={0.5}>
        <Skeleton width="55%" />
        <Skeleton width="40%" />
        <Skeleton width="65%" />
      </Stack>
      <Stack direction="row" justifyContent="space-between" pt={1}>
        <Skeleton width="50%" />
        <Skeleton width="20%" />
      </Stack>
    </Stack>
  </Card>
);

export const JobGridSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => (
  <Grid container spacing={2.5} aria-busy="true" aria-label="Loading jobs">
    {Array.from({ length: count }, (_, i) => (
      <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
        <JobCardSkeleton />
      </Grid>
    ))}
  </Grid>
);

export const JobsBoardSkeleton: React.FC = () => (
  <Stack spacing={{ xs: 3, md: 4 }} pb={{ xs: 4, md: 6 }}>
    <Box>
      <Skeleton width={320} height={52} />
      <Skeleton width="60%" />
    </Box>
    <Stack spacing={1.5}>
      <Skeleton variant="rounded" height={40} sx={{ width: { xs: '100%', sm: 420 } }} />
      {[4, 3, 4].map((chips, row) => (
        <Stack key={row} direction="row" gap={1}>
          {Array.from({ length: chips }, (_, i) => (
            <Skeleton key={i} variant="rounded" width={84} height={32} sx={{ borderRadius: 4 }} />
          ))}
        </Stack>
      ))}
    </Stack>
    <JobGridSkeleton />
  </Stack>
);

export const JobDetailSkeleton: React.FC = () => (
  <Box sx={{ maxWidth: 820, mx: 'auto', pt: { xs: 1, md: 2 }, pb: { xs: 4, md: 6 } }} aria-busy="true">
    <Stack spacing={2}>
      <Stack direction="row" gap={0.75}>
        {[80, 70, 96].map((w) => (
          <Skeleton key={w} variant="rounded" width={w} height={24} sx={{ borderRadius: 4 }} />
        ))}
      </Stack>
      <Skeleton width="80%" height={52} />
      <Stack direction="row" gap={2.5} flexWrap="wrap">
        {[120, 100, 160, 130].map((w) => (
          <Skeleton key={w} width={w} />
        ))}
      </Stack>
      <Skeleton variant="rounded" width={160} height={44} />
    </Stack>
    <Divider sx={{ my: { xs: 3, md: 4 } }} />
    <Skeleton width={180} height={32} />
    {Array.from({ length: 6 }, (_, i) => (
      <Skeleton key={i} width={i === 5 ? '60%' : '100%'} />
    ))}
  </Box>
);

export const ApplicantsSkeleton: React.FC = () => (
  <Stack spacing={3} sx={{ maxWidth: 900, mx: 'auto', width: '100%' }} aria-busy="true">
    <Box>
      <Skeleton width={120} />
      <Skeleton width={220} height={44} />
      <Skeleton width={260} />
    </Box>
    {Array.from({ length: 3 }, (_, i) => (
      <Card key={i} variant="outlined" sx={{ borderRadius: 3, p: 2.5 }}>
        <Stack direction="row" gap={1.5} alignItems="center">
          <Skeleton variant="circular" width={48} height={48} />
          <Box flex={1}>
            <Skeleton width="40%" />
            <Skeleton width="60%" />
          </Box>
        </Stack>
        <Skeleton width="70%" sx={{ mt: 1.5 }} />
      </Card>
    ))}
  </Stack>
);

export const JobFormSkeleton: React.FC = () => (
  <Box sx={{ width: '100%', maxWidth: 860, mx: 'auto', p: { xs: 2, sm: 3, md: 4 } }} aria-busy="true">
    <Skeleton width={200} height={44} sx={{ mb: 3 }} />
    <Grid container spacing={{ xs: 2.5, md: 3 }}>
      {Array.from({ length: 8 }, (_, i) => (
        <Grid key={i} size={{ xs: 12, md: i < 2 ? 12 : 6 }}>
          <Skeleton width={120} />
          <Skeleton variant="rounded" height={40} />
        </Grid>
      ))}
      <Grid size={12}>
        <Skeleton variant="rounded" height={260} />
      </Grid>
    </Grid>
  </Box>
);
