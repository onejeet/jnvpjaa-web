import { NextPage } from 'next';
import { Box } from '@mui/material';
import EmptyView from '@/components/common/EmptyView';

const Page404: NextPage = () => (
  <Box width="100vw" height="100vh">
    <EmptyView message="404 | Page not found" />
  </Box>
);

export default Page404;
