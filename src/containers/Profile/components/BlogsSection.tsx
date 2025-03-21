import { useGetBlogListQuery, User, UserBasic } from '@/apollo/hooks';
import BlogListModule from '@/modules/BlogListModule';
import { Box, Typography, Grid2 as Grid, Card, CardContent, CardMedia } from '@mui/material';
import React from 'react';

const blogPosts = [
  {
    title: 'The Future of Web Development',
    excerpt: 'Exploring upcoming trends and technologies in web development...',
    image: '/placeholder.svg?height=200&width=300',
  },
  {
    title: 'Mastering React Hooks',
    excerpt: 'A deep dive into React Hooks and how to use them effectively...',
    image: '/placeholder.svg?height=200&width=300',
  },
  {
    title: 'Building Scalable Backend Systems',
    excerpt: 'Best practices for creating robust and scalable backend architectures...',
    image: '/placeholder.svg?height=200&width=300',
  },
];

interface IBlogsSectinProps {
  user: User | UserBasic;
}

export default function BlogsSection({ user }: IBlogsSectinProps) {
  const filter = React.useMemo(() => {
    return {
      userId: user?.id,
    };
  }, [user]);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Recent Blog Posts
      </Typography>
      <BlogListModule filter={filter} skip={!user?.id} />
    </Box>
  );
}
