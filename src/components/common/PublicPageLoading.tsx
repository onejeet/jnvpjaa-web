import LayoutModule from '@/layouts/Layout';
import { Box, Grid2 as Grid, Skeleton } from '@mui/material';
import { headers } from 'next/headers';

type PublicPageLoadingProps = {
  kind: 'blog-list' | 'event-list' | 'detail';
};

/** Next router requests carry RSC; full document requests should wait for their server-rendered content. */
export default function PublicPageLoading({ kind }: PublicPageLoadingProps) {
  if (headers().get('rsc') !== '1') return null;

  return (
    <LayoutModule disableCover>
      {kind === 'detail' ? (
        <Box maxWidth={980} mx="auto">
          <Skeleton variant="text" width={150} height={30} sx={{ mb: 2 }} />
          <Skeleton variant="rounded" height={520} sx={{ maxHeight: '60vh' }} />
          <Skeleton variant="text" width="75%" height={58} sx={{ mt: 3 }} />
          <Skeleton variant="text" width="45%" height={30} />
          <Skeleton variant="text" width="100%" height={28} sx={{ mt: 3 }} />
          <Skeleton variant="text" width="90%" height={28} />
          <Skeleton variant="text" width="96%" height={28} />
        </Box>
      ) : (
        <>
          <Skeleton variant="text" width={210} height={62} />
          <Skeleton variant="text" width="min(100%, 650px)" height={30} sx={{ mb: 3 }} />
          {kind === 'blog-list' ? (
            <Box display="grid" gap={1.5}>
              {Array.from({ length: 4 }, (_, index) => (
                <Skeleton key={index} variant="rounded" height={160} />
              ))}
            </Box>
          ) : (
            <Grid container spacing={2}>
              {Array.from({ length: 6 }, (_, index) => (
                <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Skeleton variant="rounded" height={240} />
                  <Skeleton variant="text" width="82%" height={34} sx={{ mt: 1 }} />
                  <Skeleton variant="text" width="60%" height={24} />
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}
    </LayoutModule>
  );
}
