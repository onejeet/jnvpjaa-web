'use client';

import { Blog, Event, useGetBlogQuery } from '@/apollo/hooks';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import EmptyView from '@/components/common/EmptyView';
import SingleBlogView from '@/components/common/SingleBlogView';
import LayoutModule from '@/layouts/Layout';
import { useRouter } from 'next/router';
import React from 'react';

const blogsData = [
  {
    id: 'e23213213',
    title: 'This is a dummy blog post',
    slug: 'blog-post',
    author: {
      firstName: 'JS',
      lastName: 'Sharma',
      id: 'js',
      batch: 2009,
      profileImage: '',
    },
    content: `<p>Cupidatat officia eu mollit eiusmod nostrud aliquip enim in. Esse sit ipsum veniam eu ullamco anim minim id. Nostrud cupidatat officia ad commodo eiusmod velit dolore est nostrud. Ipsum esse non laboris enim. Ea mollit aliquip nulla irure eiusmod sint deserunt.</p><p>Tempor sunt <a href="https://google.comm">nisi minim</a> ipsum culpa labore laboris sunt eiusmod. Et Lorem laboris elit ex. Sunt duis deserunt occaecat ex proident id veniam exercitation. Occaecat irure aliquip consectetur Lorem esse. Qui aute laboris exercitation ipsum ea pariatur excepteur exercitation ullamco.</p><blockquote>Tempor sunt nisi minim ipsum culpa labore laboris sunt eiusmod.</blockquote>`,
  },
];

const SingleBlog = () => {
  const { query } = useRouter();
  const { id } = query;
  const { data, loading } = useGetBlogQuery({
    skip: !id || true,
    variables: {
      id: id as string,
    },
  });
  const blog: Blog | undefined = React.useMemo(() => data?.getBlog || blogsData?.[0], [data]);

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
    <LayoutModule disableCover title={`${blog?.title || 'Event'} • Alumni Network of JNV Paota, Jaipur`}>
      <Breadcrumbs items={breadcrumbsList} loading={loading} />
      {loading || blog?.id ? <SingleBlogView blog={blog} loading={loading} /> : <EmptyView message="No blog found!" />}
    </LayoutModule>
  );
};

export default SingleBlog;
