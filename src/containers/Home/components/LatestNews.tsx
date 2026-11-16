import NextLink from 'next/link';
import { Box, Button, Grid2 as Grid } from '@mui/material';
import { IconArrowRight } from '@tabler/icons-react';
import type { NewsPost } from '@/apollo/newsroomOperations';
import SpecialTitle from '@/components/common/SpecialTitle';
import { paths } from '@/config/paths';
import { NewsCard } from '@/containers/Newsroom';

const LatestNews: React.FC<{ posts?: NewsPost[] }> = ({ posts }) => {
  if (!posts?.length) return null;
  return (
    <Box component="section" sx={{ px: { xs: 2, md: 4 }, py: { xs: 6, md: 8 }, maxWidth: 1200, mx: 'auto' }}>
      <SpecialTitle title="From the newsroom" containerProps={{ mb: { xs: 4, md: 6 } }} />
      <Grid container spacing={3}>
        {posts.slice(0, 3).map((post) => (
          <Grid key={post.slug} size={{ xs: 12, md: 4 }}>
            <NewsCard post={post} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button
          component={NextLink}
          href={paths.newsroom.root}
          variant="outlined"
          endIcon={<IconArrowRight size={18} />}
        >
          View all news
        </Button>
      </Box>
    </Box>
  );
};

export default LatestNews;
