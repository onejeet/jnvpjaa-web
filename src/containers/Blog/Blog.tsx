import { BlogBasic, useGetBlogListQuery } from '@/apollo/hooks';
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

const blogsData = [
  {
    title: 'This is a dummy blog post',
    slug: 'blog-post',
    content: `<p>Cupidatat officia eu mollit eiusmod nostrud aliquip enim in. Esse sit ipsum veniam eu ullamco anim minim id. Nostrud cupidatat officia ad commodo eiusmod velit dolore est nostrud. Ipsum esse non laboris enim. Ea mollit aliquip nulla irure eiusmod sint deserunt.</p>

<p>Tempor sunt nisi minim ipsum culpa labore laboris sunt eiusmod. Et Lorem laboris elit ex. Sunt duis deserunt occaecat ex proident id veniam exercitation. Occaecat irure aliquip consectetur Lorem esse. Qui aute laboris exercitation ipsum ea pariatur excepteur exercitation ullamco.</p>

<blockquote>Tempor sunt nisi minim ipsum culpa labore laboris sunt eiusmod.</blockquote>

<p>Aliqua pariatur veniam cillum quis. Enim adipisicing est aute Lorem ipsum dolor reprehenderit. Reprehenderit quis pariatur fugiat commodo. Quis laboris amet sit sit ullamco reprehenderit non qui tempor.</p>

<p>Id qui aute est id. Anim eiusmod deserunt et tempor occaecat sit est veniam. In enim consectetur nisi laboris officia ut sint ea. Dolor et quis duis sint mollit cillum proident amet. Aliqua sunt reprehenderit magna ex cupidatat laboris.</p>

<p>Consectetur minim eu officia commodo minim reprehenderit id. Tempor pariatur consectetur dolore irure excepteur pariatur minim exercitation. Eu officia pariatur sit occaecat sint ex deserunt dolor amet.</p>`,
  },
];

const Blog = () => {
  const [isPendingApporvalOnly, setIsPendingApporvalOnly] = React.useState<boolean>(false);
  const router = useRouter();
  const { user, isAdmin } = useAuth();

  const { data: blogs, loading } = useGetBlogListQuery({
    variables: {
      options: {
        filter: {
          verified: isPendingApporvalOnly ? false : undefined,
        },
      },
    },
    notifyOnNetworkStatusChange: true,
  });

  const listData = React.useMemo(() => {
    if (loading) {
      return new Array(6).fill({ id: '', loading: true, title: '', summary: '', content: '', author: {} });
    }
    return blogs?.getBlogList?.data || [];
  }, [loading, blogs]);

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
            listData?.map((blog: BlogBasic, index) => (
              <Grid size={{ xs: 12 }} key={`events-${blog.id}-${index}`}>
                <BlogCard blog={blog} loading={loading} />
              </Grid>
            ))
          ) : (
            <Grid size={{ xs: 12 }}>
              <EmptyView
                message="No blogs. Write one."
                buttonProps={
                  user?.id
                    ? {
                        title: 'Create New Post',
                        startIcon: <Plus size={16} />,
                        onClick: () => router.push(paths.blog.new),
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
