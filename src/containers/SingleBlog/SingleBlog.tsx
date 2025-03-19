import { Blog, BlogStatus, useGetBlogQuery } from '@/apollo/hooks';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import EmptyView from '@/components/common/EmptyView';
import SingleBlogView from '@/components/common/SingleBlogView';
import Button from '@/components/core/Button';
import { ButtonProps } from '@/components/core/Button/Button.types';
import { useAuth } from '@/context/AuthContext';
import LayoutModule from '@/layouts/Layout';
import { Box } from '@mui/material';
import { CheckCircle, Pencil } from '@phosphor-icons/react';
import { useRouter } from 'next/router';
import React from 'react';

const SingleBlog = () => {
  const { isAdmin } = useAuth();
  const { query } = useRouter();
  const { id } = query;
  const { data, loading } = useGetBlogQuery({
    skip: !id,
    variables: {
      slug: id as string,
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

  const buttonProps: ButtonProps | null = React.useMemo(() => {
    switch (blog?.status) {
      case BlogStatus.PendingApproval:
        if (isAdmin)
          return {
            title: 'Approve',
            variant: 'contained',
            color: 'success',
            startIcon: <CheckCircle size={18} />,
          };
        return null;
      case BlogStatus.Draft:
        return {
          title: 'Edit',
          variant: 'contained',
          color: 'primary',
          startIcon: <Pencil size={18} />,
        };
      default:
        return null;
    }
  }, [blog?.status]);

  return (
    <LayoutModule disableCover title={`${blog?.title || 'Blog'} • Alumni Network of JNV Paota, Jaipur`}>
      <Box mb={1} display="flex" justifyContent="space-between" alignItems="center">
        <Breadcrumbs items={breadcrumbsList} loading={loading} />
        {buttonProps && <Button {...buttonProps} />}
      </Box>
      {loading || blog?.id ? <SingleBlogView blog={blog} loading={loading} /> : <EmptyView message="No blog found!" />}
    </LayoutModule>
  );
};

export default SingleBlog;
