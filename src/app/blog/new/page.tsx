'use client';

import Breadcrumbs from '@/components/common/Breadcrumbs';
import LayoutModule from '@/layouts/Layout';
import NewBlog from '@/modules/NewBlog/NewBlog';
import { Box, Card } from '@mui/material';

const breadcrumbsList = [
  {
    label: 'Blogs',
    path: '/blog',
  },
  {
    label: 'New Blog Post',
  },
];

export default function CreateBlogPost() {
  return (
    <LayoutModule disableCover title="New Blog Post • Alumni Network of JNV Paota, Jaipur" containerProps={{}}>
      <Breadcrumbs items={breadcrumbsList} />
      <Box display="flex" justifyContent="center" sx={{ py: { xs: 1, md: 2 } }}>
        <Card
          elevation={0}
          sx={{ width: '100%', maxWidth: 1040, border: '1px solid', borderColor: 'divider', borderRadius: 2.5 }}
        >
          <NewBlog />
        </Card>
      </Box>
    </LayoutModule>
  );
}
