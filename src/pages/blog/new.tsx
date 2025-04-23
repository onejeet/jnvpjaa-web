import Breadcrumbs from '@/components/common/Breadcrumbs';
import LayoutModule from '@/layouts/Layout';
import NewBlog from '@/modules/NewBlog/NewBlog';
import { Box, Card } from '@mui/material';
import { NextPage } from 'next';

const breadcrumbsList = [
  {
    label: 'Blogs',
    path: '/blog',
  },
  {
    label: ' New Post',
  },
];

const CreateBlogPost: NextPage = () => (
  <LayoutModule disableCover title="New Blog Post • Alumni Network of JNV Paota, Jaipur" containerProps={{}}>
    <Breadcrumbs items={breadcrumbsList} />
    <Box display="flex" justifyContent="center">
      <Card
        elevation={3}
        // sx={{
        //   maxWidth: '1000px',
        //   bgcolor: 'grey.100',
        //   display: 'flex',
        //   flexDirection: 'column',
        //   alignItems: 'center',
        //   px: 3,
        //   pt: 2,
        //   pb: 4,
        //   position: 'relative',
        // }}
      >
        <NewBlog />
      </Card>
    </Box>
  </LayoutModule>
);

CreateBlogPost.getInitialProps = () => {
  return {
    checkAuth: true,
  };
};

export default CreateBlogPost;
