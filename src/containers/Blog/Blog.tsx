import EmptyView from '@/components/common/EmptyView';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

const Blog = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      my={{
        xs: 2,
        sm: 3,
        md: 5,
      }}
    >
      <EmptyView message="Blog is coming soon." />
    </Box>
  );
};

export default Blog;
