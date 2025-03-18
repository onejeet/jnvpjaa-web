import BlogCard from '@/components/common/BlogCard';
import EmptyView from '@/components/common/EmptyView';
import Button from '@/components/core/Button';
import { paths } from '@/config/paths';
import { useAuth } from '@/context/AuthContext';
import LayoutModule from '@/layouts/Layout';
import { Box, Divider, Grid2 as Grid, Typography } from '@mui/material';
import { Plus } from '@phosphor-icons/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

const Blog = () => {
  const router = useRouter();
  const { user, isAdmin } = useAuth();

  const listData = React.useMemo(() => {
    return new Array(6).fill({ id: '', title: '', description: '', startDate: '', medium: 'Online', online: false });
    // if (loading) {
    //   return new Array(6).fill({ id: '', title: '', description: '', startDate: '', medium: 'Online', online: false });
    // }
    // return eventData?.getEventList?.data || [];
  }, []);

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
          >
            {`This space is dedicated to sharing inspiring stories, memorable experiences, and valuable insights from our
            alumni community. Whether it's career journeys, lessons learned, or nostalgic campus moments, every story
            helps strengthen our bond.`}
          </Typography>
        </Box>
        {user?.id && isAdmin && (
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

      <Grid container spacing={2} width="100%" display="flex" alignItems="start" mt={2}>
        <Grid container size={{ xs: 12, md: 12 }} spacing={1}>
          {listData?.length > 0 ? (
            listData?.map((ev: any, index) => (
              <Grid size={{ xs: 12 }} key={`events-${ev.title}-${index}`}>
                <BlogCard />
              </Grid>
            ))
          ) : (
            <Grid size={{ xs: 12 }}>
              <EmptyView
                message="No events available"
                buttonProps={
                  user?.id
                    ? {
                        title: 'Create New Event',
                        startIcon: <Plus size={16} />,
                        onClick: () => router.push(paths.events.new),
                      }
                    : undefined
                }
              />
            </Grid>
          )}
        </Grid>
        {/* <Grid container height="100%" size={{ xs: 12, md: 4 }}>
          Sidebar
        </Grid> */}
      </Grid>
    </LayoutModule>
  );
};

export default Blog;
