import Button from '@/components/core/Button';
import { paths } from '@/config/paths';
import { useAuth } from '@/context/AuthContext';
import LayoutModule from '@/layouts/Layout';
import BlogListModule from '@/modules/BlogListModule';
import { Box, Checkbox, Divider, FormControlLabel, Grid2 as Grid, Typography } from '@mui/material';
import { Plus } from '@phosphor-icons/react';
import { useRouter } from 'next/router';
import React from 'react';

const Blog = () => {
  const [isPendingApporvalOnly, setIsPendingApporvalOnly] = React.useState<boolean>(false);
  const router = useRouter();
  const { user, isAdmin } = useAuth();

  const filter = React.useMemo(() => {
    return {
      verified: isPendingApporvalOnly ? false : undefined,
    };
  }, [isPendingApporvalOnly]);

  return (
    <LayoutModule
      disableCover
      title={`Blog • Alumni Network of JNV Paota, Jaipur`}
      //   containerProps={{ sx: { py: 2 } }}
    >
      <Box display="flex" alignItems="start" justifyContent="space-between" mb={1}>
        <Box width="100%">
          <Typography variant="h1" mb={1}>
            Blog
          </Typography>
          <Typography
            color="grey.800"
            maxWidth={{
              xs: '100%',
              md: '90%',
            }}
            variant="body1"
          >
            {`This space is dedicated to sharing inspiring stories, memorable experiences, and valuable insights from our
            alumni community. Whether it's career journeys, lessons learned, or nostalgic campus moments, every story
            helps strengthen our bond.`}
          </Typography>
        </Box>
        {user?.id && (
          <Button
            title="New Post"
            startIcon={<Plus size={16} />}
            onClick={() => router.push(paths.blog.new)}
            sx={{
              width: '200px',
              display: {
                xs: 'none',
                md: 'flex',
              },
            }}
          />
        )}
      </Box>

      {isAdmin && (
        <Box display="flex" alignItems="center" mb={1}>
          <FormControlLabel
            label="Pending approval events only"
            control={
              <Checkbox
                checked={isPendingApporvalOnly}
                // indeterminate={checked[0] !== checked[1]}
                onChange={(e, checked) => setIsPendingApporvalOnly(checked)}
              />
            }
            sx={{
              color: 'grey.800',
            }}
          />
        </Box>
      )}

      <BlogListModule filter={filter} />
    </LayoutModule>
  );
};

export default Blog;
