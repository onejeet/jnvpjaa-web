'use client';

import Breadcrumbs from '@/components/common/Breadcrumbs';
import LayoutModule from '@/layouts/Layout';
import NewBlog from '@/modules/NewBlog/NewBlog';

const breadcrumbsList = [{ label: 'Blogs', path: '/blog' }, { label: 'Write a story' }];

export default function CreateBlogPost() {
  return (
    <LayoutModule disableCover title="New Blog Post • Alumni Network of JNV Paota, Jaipur" containerProps={{}}>
      <Breadcrumbs items={breadcrumbsList} />
      <NewBlog />
    </LayoutModule>
  );
}
