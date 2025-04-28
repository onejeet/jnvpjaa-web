'use client';

import {
  Blog,
  BlogStatus,
  useApproveBlogMutation,
  useGetBlogQuery,
  useUpdateBlogMutation,
  useUpdateClapsMutation,
  GetBlogQuery,
  GetBlogDocument,
  useGetClapsCountQuery,
  GetClapsCountDocument,
} from '@/apollo/hooks';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import EmptyView from '@/components/common/EmptyView';
import SingleBlogView from '@/components/common/SingleBlogView';
import Button from '@/components/core/Button';
import { ButtonProps } from '@/components/core/Button/Button.types';
import { paths } from '@/config/paths';
import { useAlert } from '@/context/AlertContext';
import { useAuth } from '@/context/AuthContext';
import LayoutModule from '@/layouts/Layout';
import { updateCache } from '@/utils/apollo';
import { useApolloClient } from '@apollo/client';
import { Box } from '@mui/material';
import { IconCircleCheck, IconEye, IconPencil } from '@tabler/icons-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

interface SingleBlogProps {
  blog?: Blog;
}

const SingleBlog: React.FC<SingleBlogProps> = ({ blog: prerenderedBlog }) => {
  const router = useRouter();
  const client = useApolloClient();
  const { isAdmin, redirectToSignin, user } = useAuth();
  const { showAlert } = useAlert();
  const searchParams = useSearchParams();
  const queryId = searchParams.get('id');

  const { data, loading } = useGetBlogQuery({
    skip: !queryId,
    variables: {
      slug: queryId as string,
    },
  });

  const { data: clapQuery } = useGetClapsCountQuery({
    variables: {
      id: prerenderedBlog?.id,
    },
  });

  const id = prerenderedBlog?.slug;
  const dataLoading = !id;
  const claps = clapQuery?.getClapsCount;

  const blog: Blog | undefined = React.useMemo(() => data?.getBlog || prerenderedBlog, [data, prerenderedBlog]);
  const [publisBlog, { loading: publishBlogLoading }] = useUpdateBlogMutation();
  const [handleVerifyBlog] = useApproveBlogMutation();

  const [blogClapUpdate] = useUpdateClapsMutation();

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

  const buttonProps: ButtonProps[] | null = React.useMemo(() => {
    switch (blog?.status) {
      case BlogStatus.PendingApproval:
        if (isAdmin)
          return [
            {
              title: 'Edit',
              variant: 'outlined',
              color: 'primary',
              startIcon: <IconPencil size={16} />,
              onClick: () => router.push(paths.blog.getBlogPostEditUrl(blog?.slug || '')),
            },

            {
              title: 'Approve',
              variant: 'contained',
              color: 'success',
              startIcon: <IconCircleCheck size={18} />,
              onClick: () => approveBlogPost(blog.id),
            },
          ];
        return null;
      case BlogStatus.Draft:
        return [
          {
            title: 'Edit',
            variant: 'outlined',
            color: 'primary',
            startIcon: <IconPencil size={16} />,
            onClick: () => router.push(paths.blog.getBlogPostEditUrl(blog?.slug || '')),
          },
          {
            title: 'Publish',
            variant: 'contained',
            color: 'success',
            startIcon: <IconCircleCheck size={18} />,
            onClick: () => publishBlogPost(blog?.id),
          },
        ];
      default:
        return null;
    }
  }, [blog?.status, blog?.slug, user]);

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
                client.cache.evict({ fieldName: 'getBlog' });
                client.cache.evict({ fieldName: 'getBlogList' });
                client.cache.gc();
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
                client.cache.evict({ fieldName: 'getBlog' });
                client.cache.evict({ fieldName: 'getBlogList' });
                client.cache.gc();
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
  const updateClap = React.useCallback(
    (claps: number) => {
      console.log('ZZ: updateClap', claps, id);
      if (claps > 0 && id) {
        blogClapUpdate({
          variables: {
            slug: id as string,
            claps,
          },
          onCompleted: () => {
            updateCache({
              client,
              query: GetClapsCountDocument,
              data: (claps || 0) + claps,
              variables: {
                slug: id as string,
              },
            });
          },
        });
      }
    },
    [id, client, blog, blogClapUpdate]
  );

  return (
    <LayoutModule disableCover title={`${blog?.title || 'Blog'} • Alumni Network of JNV Paota, Jaipur`}>
      <Box mb={1} display="flex" justifyContent="start" alignItems="center">
        <Breadcrumbs items={breadcrumbsList} loading={dataLoading} />
        {buttonProps && (
          <Box display="flex" alignItems="center" gap={1.5} ml="auto">
            {buttonProps.map((btProps: ButtonProps, index: number) => (
              <Button key={`single-blog-btn-${index}`} {...btProps} />
            ))}
          </Box>
        )}
      </Box>
      {dataLoading || blog?.id ? (
        <SingleBlogView blog={blog} claps={claps} loading={dataLoading} updateClap={updateClap} />
      ) : (
        <EmptyView message="No blog found!" />
      )}
    </LayoutModule>
  );
};

export default SingleBlog;
