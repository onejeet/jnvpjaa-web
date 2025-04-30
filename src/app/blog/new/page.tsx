'use client';

import Breadcrumbs from '@/components/common/Breadcrumbs';
import LayoutModule from '@/layouts/Layout';
import NewBlog from '@/modules/NewBlog/NewBlog';
import { Box, Card } from '@mui/material';
import { Metadata } from 'next';

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
      <Box display="flex" justifyContent="center">
        <Card elevation={3}>
          <NewBlog />
        </Card>
      </Box>
    </LayoutModule>
  );
}
