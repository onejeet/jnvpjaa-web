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
      <Image src="/assets/svg/under_construction.svg" width={417} height={200} layout="fixed" alt="blog coming soon" />
      <Typography variant="body1" fontSize={20} color="grey.600" mt={3}>
        Blog is coming soon.
      </Typography>
    </Box>
  );
};

export default Blog;
