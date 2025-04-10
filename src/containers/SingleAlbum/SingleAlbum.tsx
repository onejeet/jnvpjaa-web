import {
  Blog,
  BlogStatus,
  useApproveBlogMutation,
  useGetBlogQuery,
  useUpdateBlogMutation,
  useUpdateClapsMutation,
  GetBlogQuery,
  GetBlogDocument,
  useGetAlbumQuery,
  Album,
} from '@/apollo/hooks';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import EmptyView from '@/components/common/EmptyView';
import PhotoGrid from '@/components/common/PhotoGrid';
import SingleBlogView from '@/components/common/SingleBlogView';
import Button from '@/components/core/Button';
import { ButtonProps } from '@/components/core/Button/Button.types';
import { paths } from '@/config/paths';
import { useAlert } from '@/context/AlertContext';
import { useAuth } from '@/context/AuthContext';
import LayoutModule from '@/layouts/Layout';
import { updateCache } from '@/utils/apollo';
import { useApolloClient } from '@apollo/client';
import { Box, Typography } from '@mui/material';
import { CheckCircle, Eye, Pencil } from '@phosphor-icons/react';
import { useRouter } from 'next/router';
import React from 'react';

const SingleAlbum = () => {
  const router = useRouter();
  const client = useApolloClient();
  const { isAdmin, redirectToSignin, user } = useAuth();
  const { showAlert } = useAlert();
  const { query } = useRouter();
  const { id } = query;
  const { data, loading } = useGetAlbumQuery({
    skip: !id,
    variables: {
      id: id as string,
    },
  });
  const album: Album | undefined = React.useMemo(() => data?.getAlbum, [data]);
  const [publisBlog, { loading: publishBlogLoading }] = useUpdateBlogMutation();
  const [handleVerifyBlog] = useApproveBlogMutation();

  const [blogClapUpdate] = useUpdateClapsMutation();

  console.log('ZZ: album', album);

  const breadcrumbsList = React.useMemo(
    () => [
      {
        label: 'Gallery',
        path: '/gallery',
      },
      {
        label: album?.title || 'Album',
      },
    ],
    [album]
  );

  // const buttonProps: ButtonProps[] | null = React.useMemo(() => {
  //   switch (album?.status) {
  //     case BlogStatus.PendingApproval:
  //       if (isAdmin)
  //         return [
  //           {
  //             title: 'Edit',
  //             variant: 'outlined',
  //             color: 'primary',
  //             startIcon: <Pencil size={16} />,
  //             onClick: () => router.push(paths.album.getBlogPostEditUrl(album?.slug || '')),
  //           },

  //           {
  //             title: 'Approve',
  //             variant: 'contained',
  //             color: 'success',
  //             startIcon: <CheckCircle size={18} />,
  //             onClick: () => approveBlogPost(album.id),
  //           },
  //         ];
  //       return null;
  //     case BlogStatus.Draft:
  //       return [
  //         {
  //           title: 'Edit',
  //           variant: 'outlined',
  //           color: 'primary',
  //           startIcon: <Pencil size={16} />,
  //           onClick: () => router.push(paths.album.getBlogPostEditUrl(album?.slug || '')),
  //         },
  //         {
  //           title: 'Publish',
  //           variant: 'contained',
  //           color: 'success',
  //           startIcon: <CheckCircle size={18} />,
  //           onClick: () => publishBlogPost(album?.id),
  //         },
  //       ];
  //     default:
  //       return null;
  //   }
  // }, [album?.status, album?.slug, user]);

  // const publishBlogPost = React.useCallback(
  //   (id: string, isUnpublish?: boolean) => {
  //     if (!user?.id) {
  //       redirectToSignin(true);
  //       return;
  //     }

  //     showAlert(
  //       {
  //         visible: true,
  //         type: 'custom',
  //         action: 'approve',
  //         title: isUnpublish ? 'Unpublish the album' : 'Publish the Blog',
  //         message: isUnpublish
  //           ? 'Blog will be unpublished and removed from public view.'
  //           : isAdmin
  //             ? `The album will be publicly accessible upon publication. Please proceed with caution.`
  //             : `Upon publishing the album will be sent to the admins for review and approval.`,
  //         okayButtonProps: {
  //           title: isUnpublish ? 'Unpublish' : `Publish Now`,
  //           color: isUnpublish ? 'error' : 'success',
  //         },
  //         onOkay: () => {
  //           showAlert(
  //             {
  //               visible: true,
  //               //  title: 'Are you Going?',
  //               type: 'loading',
  //               message: 'Please Wait, The status is being updated.',
  //               action: 'loading',
  //             },
  //             true
  //           );
  //           publisBlog({
  //             variables: {
  //               id,
  //               status: isUnpublish ? BlogStatus.Draft : BlogStatus.Published,
  //             },
  //             onCompleted: () => {
  //               client.refetchQueries({
  //                 include: ['getBlog', 'getBlogList'],
  //               });
  //               showAlert(
  //                 {
  //                   visible: true,
  //                   type: 'success',
  //                   title: isUnpublish ? 'Unpublished' : isAdmin ? `Published` : `Published. Awaiting admin approval`,
  //                   message: isUnpublish
  //                     ? 'The album has been unpublished successfully.'
  //                     : isAdmin
  //                       ? `The album has been published successfully.`
  //                       : `The album has been published and sent for apporval to admin. Once apporved, will be visible to all the alumni.`,
  //                   action: 'success',
  //                 },
  //                 true
  //               );
  //             },
  //             onError: (err) => {
  //               showAlert(
  //                 {
  //                   visible: true,
  //                   type: 'error',
  //                   title: `Blog ${isUnpublish ? 'unpublish' : 'publish'} failed. Try again`,
  //                   message: err?.message || 'Something went wrong.',
  //                   action: 'error',
  //                 },
  //                 true
  //               );
  //             },
  //           });
  //         },
  //       },
  //       true
  //     );
  //   },
  //   [isAdmin, showAlert, user]
  // );

  // const approveBlogPost = React.useCallback(
  //   (id: string) => {
  //     if (!user?.id) {
  //       redirectToSignin(true);
  //       return;
  //     }
  //     if (!isAdmin) {
  //       showAlert({
  //         visible: true,
  //         type: 'error',
  //         message: 'Unauthorized operation.',
  //       });
  //       return;
  //     }
  //     showAlert(
  //       {
  //         visible: true,
  //         title: `Apporve the Blog`,
  //         type: 'loading',
  //         message: `The album is awaiting admin approval for publication. Please review and approve. Once published, it will be visible publically.`,
  //         action: 'approve',
  //         okayButtonProps: {
  //           title: `Approve`,
  //         },
  //         onOkay: () => {
  //           showAlert(
  //             {
  //               visible: true,
  //               //  title: 'Are you Going?',
  //               type: 'loading',
  //               message: 'Please Wait, The status is being updated.',
  //               action: 'loading',
  //             },
  //             true
  //           );
  //           handleVerifyBlog({
  //             variables: {
  //               id,
  //             },
  //             onCompleted: () => {
  //               client.refetchQueries({
  //                 include: ['getBlog', 'getBlogList'],
  //               });
  //               showAlert(
  //                 {
  //                   visible: true,
  //                   type: 'success',
  //                   title: `Blog has been published`,
  //                   message: `The album has been published and will be visible publically.`,
  //                   action: 'success',
  //                 },
  //                 true
  //               );
  //             },
  //             onError: (err) => {
  //               showAlert(
  //                 {
  //                   visible: true,
  //                   type: 'error',
  //                   title: `Blog publishing failed. Try again`,
  //                   message: err?.message || 'Something went wrong.',
  //                   action: 'error',
  //                 },
  //                 true
  //               );
  //             },
  //           });
  //         },
  //       },
  //       true
  //     );
  //   },
  //   [isAdmin]
  // );
  // const updateClap = React.useCallback(
  //   (claps: number) => {
  //     console.log('ZZ: updateClap', claps, id);
  //     if (claps > 0 && id) {
  //       blogClapUpdate({
  //         variables: {
  //           slug: id as string,
  //           claps,
  //         },
  //         onCompleted: () => {
  //           updateCache({
  //             client,
  //             query: GetBlogDocument,
  //             data: {
  //               ...album,
  //               claps: (album?.claps || 0) + claps,
  //             },
  //             variables: {
  //               slug: id as string,
  //             },
  //           });
  //         },
  //       });
  //     }
  //   },
  //   [id, client, album]
  // );

  return (
    <LayoutModule disableCover title={`${album?.title || 'Blog'} • Alumni Network of JNV Paota, Jaipur`}>
      <Box mb={1} display="flex" flexDirection="column" justifyContent="start" alignItems="start">
        <Breadcrumbs items={breadcrumbsList} loading={loading} sx={{ display: { xs: 'none', sm: 'flex' } }} />
        <Box>
          <Typography variant="h1">{album?.title || 'Album'}</Typography>
          <Typography color="grey.800" mb={3} mt={1}>
            {album?.description}
          </Typography>
        </Box>
        {/* {buttonProps && (
          <Box display="flex" alignItems="center" gap={1.5} ml="auto">
            {buttonProps.map((btProps: ButtonProps, index: number) => (
              <Button key={`single-album-btn-${index}`} {...btProps} />
            ))}
          </Box>
        )} */}
      </Box>
      {loading || album?.id ? <PhotoGrid photos={album?.photos} /> : <EmptyView message="No album found!" />}
    </LayoutModule>
  );
};

export default SingleAlbum;
