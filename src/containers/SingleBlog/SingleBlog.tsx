import { Blog, useGetBlogQuery } from '@/apollo/hooks';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import EmptyView from '@/components/common/EmptyView';
import SingleBlogView from '@/components/common/SingleBlogView';
import LayoutModule from '@/layouts/Layout';
import { useRouter } from 'next/router';
import React from 'react';

const SingleBlog = () => {
  const { query } = useRouter();
  const { id } = query;
  const { data, loading } = useGetBlogQuery({
    skip: !id || true,
    variables: {
      id: id as string,
    },
  });
  const blog: Blog | undefined = React.useMemo(() => data?.getBlog, [data]);

  const breadcrumbsList = React.useMemo(
    () => [
      {
        label: 'Blogs',
        path: '/blog',
      },
      {
        label: blog?.title || 'Post',
      },
    ],
    [blog]
  );

  return (
    <LayoutModule disableCover title={`${blog?.title || 'Blog'} • Alumni Network of JNV Paota, Jaipur`}>
      <Breadcrumbs items={breadcrumbsList} loading={loading} />
      {loading || blog?.id ? <SingleBlogView blog={blog} loading={loading} /> : <EmptyView message="No blog found!" />}
    </LayoutModule>
  );
};

export default SingleBlog;
