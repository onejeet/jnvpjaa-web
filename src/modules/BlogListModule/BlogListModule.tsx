import {
  BlogBasic,
  BlogStatus,
  ListInput,
  useApproveBlogMutation,
  useDeleteBlogMutation,
  useGetBlogListQuery,
  useUpdateBlogMutation,
} from '@/apollo/hooks';
import BlogCard from '@/components/common/BlogCard';
import EmptyView from '@/components/common/EmptyView';
import Button from '@/components/core/Button';
import { paths } from '@/config/paths';
import { useAlert } from '@/context/AlertContext';
import { useAuth } from '@/context/AuthContext';
import LayoutModule from '@/layouts/Layout';
import { useApolloClient } from '@apollo/client';
import { Box, Checkbox, Divider, FormControlLabel, Grid2 as Grid, Typography } from '@mui/material';
import { IconPlus } from '@tabler/icons-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

interface BlogFilterModuleProps {
  filter: ListInput['filter'];
  skip?: boolean;
  limit?: number;
  loading?: boolean;
  isCreateAllowed?: boolean;
  isReadOnly?: boolean;
}

const BlogListModule: React.FC<BlogFilterModuleProps> = ({
  filter,
  limit = 50,
  skip,
  loading: propLoading,
  isCreateAllowed = true,
  isReadOnly,
}) => {
  const router = useRouter();
  const { user, isAdmin, redirectToSignin } = useAuth();
  const client = useApolloClient();

  const { showAlert } = useAlert();

  const { data: blogs, loading } = useGetBlogListQuery({
    skip,
    variables: {
      options: {
        filter,
        limit,
      },
    },
    notifyOnNetworkStatusChange: true,
  });

  const [publisBlog, { loading: publishBlogLoading }] = useUpdateBlogMutation();
  const [deleteBlog] = useDeleteBlogMutation();
  const [handleVerifyBlog] = useApproveBlogMutation();

  const listData = React.useMemo(() => {
    if (loading || propLoading) {
      return new Array(6).fill({ id: '', loading: true, title: '', summary: '', content: '', author: {} });
    }
    if (blogs) return blogs?.getBlogList?.data || [];
  }, [loading, blogs, propLoading]);

  const approveBlogPost = React.useCallback(
    (id: string) => {
      if (!user?.id) {
        redirectToSignin(true);
        return;
      }
      if (!isAdmin) {
        showAlert({
          visible: true,
          type: 'error',
          message: 'Unauthorized operation.',
        });
        return;
      }
      showAlert(
        {
          visible: true,
          title: `Apporve the Blog`,
          type: 'loading',
          message: `The blog is awaiting admin approval for publication. Please review and approve. Once published, it will be visible publically.`,
          action: 'approve',
          okayButtonProps: {
            title: `Approve`,
          },
          onOkay: () => {
            showAlert(
              {
                visible: true,
                //  title: 'Are you Going?',
                type: 'loading',
                message: 'Please Wait, The status is being updated.',
                action: 'loading',
              },
              true
            );
            handleVerifyBlog({
              variables: {
                id,
              },
              onCompleted: () => {
                client.refetchQueries({
                  include: ['getBlog', 'getBlogList'],
                });
                showAlert(
                  {
                    visible: true,
                    type: 'success',
                    title: `Blog has been published`,
                    message: `The blog has been published and will be visible publically.`,
                    action: 'success',
                  },
                  true
                );
              },
              onError: (err) => {
                showAlert(
                  {
                    visible: true,
                    type: 'error',
                    title: `Blog publishing failed. Try again`,
                    message: err?.message || 'Something went wrong.',
                    action: 'error',
                  },
                  true
                );
              },
            });
          },
        },
        true
      );
    },
    [isAdmin]
  );

  const deleteBlogPost = React.useCallback(
    (id: string) => {
      if (!user?.id) {
        redirectToSignin(true);
        return;
      }
      if (!isAdmin) {
        showAlert({
          visible: true,
          type: 'error',
          message: 'Unauthorized operation.',
        });
        return;
      }
      showAlert(
        {
          visible: true,
          type: 'custom',
          action: 'delete',
          title: 'Delete the Blog',
          message: `Upon deleting, the blog will be removed completely and can't be recoovered.`,
          okayButtonProps: {
            title: `Delete Now`,
            color: 'error',
          },
          onOkay: () => {
            showAlert(
              {
                visible: true,
                //  title: 'Are you Going?',
                type: 'loading',
                message: 'Please Wait, The status is being updated.',
                action: 'loading',
              },
              true
            );
            deleteBlog({
              variables: {
                id,
              },
              onCompleted: () => {
                client.refetchQueries({
                  include: ['getBlog', 'getBlogList'],
                });
                showAlert(
                  {
                    visible: true,
                    type: 'success',
                    title: `Deleted`,
                    message: `The blog has been deleted successfully.`,
                    action: 'success',
                  },
                  true
                );
              },
              onError: (err) => {
                showAlert(
                  {
                    visible: true,
                    type: 'error',
                    title: `Blog delete failed. Try again`,
                    message: err?.message || 'Something went wrong.',
                    action: 'error',
                  },
                  true
                );
              },
            });
          },
        },
        true
      );
    },
    [isAdmin, showAlert, user]
  );

  const publishBlogPost = React.useCallback(
    (id: string, isUnpublish?: boolean) => {
      if (!user?.id) {
        redirectToSignin(true);
        return;
      }

      showAlert(
        {
          visible: true,
          type: 'custom',
          action: 'approve',
          title: isUnpublish ? 'Unpublish the blog' : 'Publish the Blog',
          message: isUnpublish
            ? 'Blog will be unpublished and removed from public view.'
            : isAdmin
              ? `The blog will be publicly accessible upon publication. Please proceed with caution.`
              : `Upon publishing the blog will be sent to the admins for review and approval.`,
          okayButtonProps: {
            title: isUnpublish ? 'Unpublish' : `Publish Now`,
            color: isUnpublish ? 'error' : 'success',
          },
          onOkay: () => {
            showAlert(
              {
                visible: true,
                //  title: 'Are you Going?',
                type: 'loading',
                message: 'Please Wait, The status is being updated.',
                action: 'loading',
              },
              true
            );
            publisBlog({
              variables: {
                id,
                status: isUnpublish ? BlogStatus.Draft : BlogStatus.Published,
              },
              onCompleted: () => {
                client.refetchQueries({
                  include: ['getBlog', 'getBlogList'],
                });
                showAlert(
                  {
                    visible: true,
                    type: 'success',
                    title: isUnpublish ? 'Unpublished' : isAdmin ? `Published` : `Published. Awaiting admin approval`,
                    message: isUnpublish
                      ? 'The blog has been unpublished successfully.'
                      : isAdmin
                        ? `The blog has been published successfully.`
                        : `The blog has been published and sent for apporval to admin. Once apporved, will be visible to all the alumni.`,
                    action: 'success',
                  },
                  true
                );
              },
              onError: (err) => {
                showAlert(
                  {
                    visible: true,
                    type: 'error',
                    title: `Blog ${isUnpublish ? 'unpublish' : 'publish'} failed. Try again`,
                    message: err?.message || 'Something went wrong.',
                    action: 'error',
                  },
                  true
                );
              },
            });
          },
        },
        true
      );
    },
    [isAdmin, showAlert, user]
  );

  const onEditBlog = React.useCallback(
    (slug: string) => {
      router.push({
        pathname: paths.blog.new,
        query: {
          id: slug,
        },
      });
    },
    [router]
  );

  return (
    <Grid container spacing={2} width="100%" display="flex" alignItems="start" mt={1}>
      {listData && listData?.length > 0 ? (
        <Grid container size={{ xs: 12, md: 12 }} spacing={1}>
          {listData?.map((blog: BlogBasic, index) => (
            <Grid size={{ xs: 12 }} key={`events-${blog.id}-${index}`}>
              <BlogCard
                blog={blog}
                loading={loading}
                onEdit={onEditBlog}
                onPublish={publishBlogPost}
                onVerify={approveBlogPost}
                user={user}
                isAdminUser={isAdmin}
                onDelete={deleteBlogPost}
                isReadOnly={isReadOnly}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid size={{ xs: 12 }}>
          <EmptyView
            message={isCreateAllowed ? 'No blogs. Write one.' : 'No blogs available.'}
            buttonProps={
              user?.id && isCreateAllowed
                ? {
                    title: 'Create New Post',
                    startIcon: <IconPlus size={16} />,
                    onClick: () => router.push(paths.blog.new),
                  }
                : undefined
            }
          />
        </Grid>
      )}

      {/* <Grid container height="100%" size={{ xs: 12, md: 4 }}>
          Sidebar
        </Grid> */}
    </Grid>
  );
};

export default BlogListModule;
