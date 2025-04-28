'use client';

import Title from '@/components/common/Title';
import { Box, Typography, Avatar, Skeleton, IconButton, Tooltip } from '@mui/material';
import { ProfileHeaderProps } from '../Profile.types';
import ProfilePicture from '@/components/common/ProfilePicture';
import VerifiedBadge from '@/components/common/VerifiedBadge';
import { IconPencil, IconLock, IconDotsCircleHorizontal } from '@tabler/icons-react';
import { useProfile } from '@/context/ProfileContext';
import FacultyBadge from '@/components/common/FacultyBadge';
import Menu from '@/components/core/Menu';
import React from 'react';
import { useAlert } from '@/context/AlertContext';
import { useApolloClient } from '@apollo/client';
import { paths } from '@/config/paths';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { GetUserDetailsDocument } from '@/apollo/hooks';
import Dialog from '@/components/core/Dialog';
import Image from 'next/image';

const ProfileHeader: React.FC<ProfileHeaderProps> = () => {
  const [openPictureView, setOpenPictureView] = React.useState<boolean>(false);
  const { user, loading, isProfileEditable, editingProfile, saveProfile, setEditingProfile } = useProfile();
  const { showAlert, hideAlert } = useAlert();
  const { user: authUser, isAdmin } = useAuth();
  const router = useRouter();
  const client = useApolloClient();

  const handleDataPrivacyUpdate = React.useCallback(() => {
    showAlert(
      {
        visible: true,
        action: 'approve',
        type: 'custom',
        title: user?.isConfidential ? 'Make Contact Info Protected' : 'Keep Contact Info Private',
        message: user?.isConfidential
          ? `${user?.firstName || ''}'s email and phone number will be visible to all the verified alumni of JNVPJAA. Rest assured, the data still be not visible to public.`
          : `${user?.firstName || ''}'s email and phone number will remain completely hidden—no one will be able to access them.`,
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
          saveProfile({
            id: user?.id,
            isConfidential: !user?.isConfidential,
          })
            ?.then((res) => {
              if (user?.id === authUser?.id) {
                client.cache.evict({ fieldName: 'getUserDetails' });
                client.cache.gc();
              } else {
                client.writeQuery({
                  query: GetUserDetailsDocument,
                  variables: {
                    id: user?.id,
                  },
                  data: {
                    getUserDetails: res?.data?.updateUser,
                  },
                });
              }

              showAlert(
                {
                  visible: true,
                  type: 'success',
                  title: user?.isConfidential ? 'Contact Info is Protected' : 'Contact Info is Private',
                  message: user?.isConfidential
                    ? `${user?.firstName || ''}'s email and phone number will be visible to all the verified alumni of JNVPJAA. Rest assured, they data still be not visible to public.`
                    : `${user?.firstName || ''}'s email and phone number will remain completely hidden—no one will be able to access them.`,
                  action: 'success',
                },
                true
              );
            })
            ?.catch((eerr) => {
              showAlert(
                {
                  visible: true,
                  type: 'error',
                  title: `Contact info update failed. Try again`,
                  message: eerr?.message || 'Something went wrong.',
                  action: 'error',
                },
                true
              );
            });
        },
      },
      true
    );
  }, [user, saveProfile, authUser]);

  const menuItems = React.useMemo(() => {
    const isConfidential = user?.isConfidential;
    return isProfileEditable
      ? [
          {
            label: 'Edit',
            value: 'edit',
            // onClick: () => setEditingProfile(true),
            onClick: () => {
              if (user?.id === authUser?.id) {
                router.push(paths.profile.setup);
              } else {
                setEditingProfile(true);
              }
            },
            icon: <IconPencil size={16} />,
          },
          {
            label: isConfidential ? 'Make Contact Info Visible' : 'Keep Contact Info Private',
            value: 'delete',
            onClick: () => handleDataPrivacyUpdate(),
            icon: <IconLock size={18} />,
            sx: {
              color: 'error.main',
              svg: {
                color: 'error.main',
              },
            },
          },
        ]
      : [];
  }, [isProfileEditable, user, handleDataPrivacyUpdate, router, authUser, setEditingProfile]);

  return (
    <Box sx={{ position: 'relative', mb: 4 }}>
      {loading ? (
        <Box>
          <Skeleton
            width="100%"
            height={250}
            sx={{
              width: '100%',
              minWidth: '100%',
              height: 250,
              minHeight: 250,
            }}
          />
        </Box>
      ) : (
        <Box
          component="img"
          src={user?.id ? `https://picsum.photos/seed/${user?.id}/1200/250` : undefined}
          alt="Cover"
          sx={{
            width: '100%',
            minWidth: '100%',
            height: {
              xs: 180,
              md: 250,
            },
            minHeight: {
              xs: 180,
              md: 250,
            },
            objectFit: 'cover',
            borderRadius: 2,
            border: '1px dashed',
            borderColor: 'grey.400',
          }}
        />
      )}

      <ProfilePicture
        alt={`${user?.firstName} ${user?.lastName}`}
        id={user?.id}
        src={user?.profileImage}
        loading={loading}
        onClick={() => (user?.profileImage ? setOpenPictureView(true) : null)}
        sx={{
          width: {
            xs: 100,
            md: 180,
          },
          height: {
            xs: 100,
            md: 180,
          },
          border: '4px solid #fff',
          position: 'absolute',
          bottom: {
            xs: 0,
            md: -24,
          },
          left: {
            xs: 2,
            md: 32,
          },
        }}
      />
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{ mt: { xs: 0.5, md: 1 }, ml: { xs: '100px', md: '220px' } }}
      >
        <Title
          loading={loading}
          title={
            <Box display="flex" alignItems="center">
              <Typography
                variant="body1"
                fontSize={{
                  xs: 16,
                  md: 28,
                }}
                fontWeight={500}
                mr={0.5}
              >{`${user?.firstName} ${user?.lastName || ''}`}</Typography>
              {user?.isVerified && (
                <VerifiedBadge
                  size={26}
                  isPrivate={user?.isConfidential}
                  handlePrivateInfo={handleDataPrivacyUpdate}
                  isPrivateInfoChangeAllowed={user?.id === authUser?.id || isAdmin}
                />
              )}
              {user?.batch === 0 && <FacultyBadge size={26} />}
            </Box>
          }
          titleProps={{ fontWeight: 600, fontSize: '30px' }}
          summary={user?.batch === 0 ? 'Faculty' : user?.batch ? `Batch of ${user?.batch}` : ''}
          summaryProps={{ color: 'grey.600', fontSize: '14px', mt: { xs: 0, md: 1 } }}
        />
        {isProfileEditable && !editingProfile && (
          <Menu
            //  onChange={(val) => editor?.commands.toggleHeading({ level: val as Level })}
            // value={editor?.getAttributes('heading')?.level}
            items={menuItems}
            slotProps={{
              paper: {
                elevation: 0,

                sx: {
                  minWidth: 150,
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&::before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              },
            }}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            render={
              <Tooltip arrow placement="top" title="Profile Menu">
                <IconButton>
                  <IconDotsCircleHorizontal size={28} />
                </IconButton>
              </Tooltip>
            }
          />
          // <Button
          //   disabled={loading}
          //   title="Edit Profile"
          //   size="small"
          //   onClick={() => setEditingProfile(true)}
          //   startIcon={<IconPencilSimple size={16} />}
          //   sx={{
          //     whiteSpace: 'nowrap',
          //   }}
          // />
        )}
      </Box>
      {openPictureView && (
        <Dialog
          maxWidth="md"
          title="Preview"
          open={openPictureView}
          onClose={() => setOpenPictureView(false)}
          hideFooter
        >
          <Box width="100%" minHeight="70vh">
            <Image src={user?.profileImage as string} alt="profile image" layout="responsive" objectFit="cover" />
          </Box>
        </Dialog>
      )}
    </Box>
  );
};

export default ProfileHeader;
