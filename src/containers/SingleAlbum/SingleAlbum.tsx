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
  UserBasic,
  Maybe,
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
import { getAvatarDataUrl } from '@/utils/helpers';
import { useApolloClient } from '@apollo/client';
import { Avatar, AvatarGroup, Box, Skeleton, Stack, Tooltip, Typography } from '@mui/material';
import { CalendarDots, CheckCircle, Eye, Pencil, Star } from '@phosphor-icons/react';
import dayjs from 'dayjs';
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

  const dataLoading = loading || !id;

  const listPhotos = React.useMemo(() => {
    if (dataLoading || !id) {
      return new Array(6).fill({ id: '', title: '', url: '' });
    }
    return album?.photos || [];
  }, [id, dataLoading, album]);

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
      <Box mb={2} display="flex" flexDirection="column" justifyContent="start" alignItems="start">
        <Breadcrumbs items={breadcrumbsList} loading={dataLoading} sx={{ display: { xs: 'none', sm: 'flex' } }} />
        <Box width="100%">
          {dataLoading ? (
            <>
              <Skeleton width="40%" height={40} />
              <Skeleton width="50%" height={28} />
            </>
          ) : (
            album?.id && (
              <>
                <Typography variant="h1">{album?.title || 'Album'}</Typography>
                <Typography color="grey.800" mt={1}>
                  {album?.description}
                </Typography>
              </>
            )
          )}

          {dataLoading ? (
            <Skeleton width="40%" height={20} />
          ) : (
            album?.id && (
              <Box display="flex" alignItems="center" gap={1.5} flexWrap="wrap">
                <Box
                  display="flex"
                  alignItems="center"
                  mt={1}
                  sx={{
                    svg: {
                      color: 'text.secondary',
                    },
                  }}
                >
                  <Star size={16} weight="fill" />
                  <Typography variant="body2" ml={0.5} color="text.secondary">
                    {album?.total_photos} Photos
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  mt={1}
                  sx={{
                    svg: {
                      color: 'text.secondary',
                    },
                  }}
                >
                  <CalendarDots size={16} />
                  <Typography variant="body2" ml={0.5} color="text.secondary">
                    {dayjs(album?.createdAt)?.format('MMM DD, YYYY')}
                  </Typography>
                </Box>
                {album?.contributors && album?.contributors?.length > 0 && (
                  <Stack direction="row" spacing={1} alignItems="center" mt={1}>
                    <Typography color="grey.600" variant="body2">
                      Contributors:
                    </Typography>
                    <AvatarGroup
                      total={album?.contributors?.length}
                      slotProps={{
                        surplus: {
                          sx: {
                            // cursor: 'pointer',
                          },
                          // onClick: () => alert('Hello'),
                        },
                      }}
                    >
                      {album?.contributors?.slice(0, 4)?.map((person: Maybe<UserBasic>, index: number) => (
                        <Tooltip
                          key={`event-avatar-${index}`}
                          placement="top"
                          title={`${person?.firstName || 'NA'} ${person?.lastName || ''} ${person?.batch ? `(${person.batch})` : ''}`}
                          arrow
                        >
                          <Avatar
                            alt={person?.firstName || 'NA'}
                            src={person?.profileImage || getAvatarDataUrl(person?.id)}
                            slotProps={{
                              img: {
                                referrerPolicy: 'no-referrer',
                              },
                            }}
                            sx={{ width: 28, height: 28 }}
                          />
                        </Tooltip>
                      ))}
                    </AvatarGroup>
                  </Stack>
                )}
              </Box>
            )
          )}
        </Box>
        {/* {buttonProps && (
          <Box display="flex" alignItems="center" gap={1.5} ml="auto">
            {buttonProps.map((btProps: ButtonProps, index: number) => (
              <Button key={`single-album-btn-${index}`} {...btProps} />
            ))}
          </Box>
        )} */}
      </Box>
      {dataLoading || album?.id ? (
        <PhotoGrid loading={dataLoading} photos={listPhotos} authView={Boolean(user?.id)} />
      ) : (
        <EmptyView message="No album found!" />
      )}
    </LayoutModule>
  );
};

export default SingleAlbum;
