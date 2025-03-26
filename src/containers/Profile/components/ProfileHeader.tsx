import Title from '@/components/common/Title';
import { Box, Typography, Avatar, Skeleton, IconButton, Tooltip } from '@mui/material';
import { ProfileHeaderProps } from '../Profile.types';
import ProfilePicture from '@/components/common/ProfilePicture';
import VerifiedBadge from '@/components/common/VerifiedBadge';
import Button from '@/components/core/Button';
import {
  DotsThree,
  DotsThreeCircleVertical,
  DotsThreeVertical,
  FileLock,
  Notches,
  Pencil,
  PencilSimple,
} from '@phosphor-icons/react';
import { useProfile } from '@/context/ProfileContext';
import FacultyBadge from '@/components/common/FacultyBadge';
import Menu from '@/components/core/Menu';
import React from 'react';
import { useAlert } from '@/context/AlertContext';
import { useApolloClient } from '@apollo/client';
import { paths } from '@/config/paths';
import { useRouter } from 'next/router';

const ProfileHeader: React.FC<ProfileHeaderProps> = () => {
  const { user, loading, isProfileEditable, editingProfile, saveProfile, setEditingProfile } = useProfile();
  const { showAlert, hideAlert } = useAlert();
  const router = useRouter();
  const client = useApolloClient();

  const menuItems = React.useMemo(() => {
    const isConfidential = user?.isConfidential;
    return isProfileEditable
      ? [
          {
            label: 'Edit',
            value: 'edit',
            // onClick: () => setEditingProfile(true),
            onClick: () => router.push(paths.profile.setup),
            icon: <Pencil size={16} />,
          },
          {
            label: isConfidential ? 'Make Contact Info Visible' : 'Keep Contact Info Private',
            value: 'delete',
            onClick: () => {
              showAlert(
                {
                  visible: true,
                  action: 'approve',
                  type: 'custom',
                  title: isConfidential ? 'Make Contact Info Protected' : 'Keep Contact Info Private',
                  message: isConfidential
                    ? 'Your email and phone number will be visible to all the verified alumni of JNVPJAA. Rest assured, the data still be not visible to public.'
                    : 'Your email and phone number will remain completely hidden—no one will be able to access them.',
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
                      isConfidential: !isConfidential,
                    })
                      ?.then((data) => {
                        client.refetchQueries({
                          include: ['getUserDetails'],
                        });
                        showAlert(
                          {
                            visible: true,
                            type: 'success',
                            title: isConfidential ? 'Contact Info is Protected' : 'Contact Info is Private',
                            message: isConfidential
                              ? 'Your email and phone number will be visible to all the verified alumni of JNVPJAA. Rest assured, they data still be not visible to public.'
                              : 'Your email and phone number will remain completely hidden—no one will be able to access them.',
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
            },
            icon: <FileLock size={18} />,
            sx: {
              color: 'error.main',
              svg: {
                color: 'error.main',
              },
            },
          },
        ]
      : [];
  }, [isProfileEditable, user]);
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
            height: 250,
            minHeight: 250,
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
        sx={{
          width: 180,
          height: 180,
          border: '4px solid #fff',
          position: 'absolute',
          bottom: -24,
          left: 32,
        }}
      />
      <Box display="flex" justifyContent="space-between" sx={{ mt: 1, ml: '220px' }}>
        <Title
          loading={loading}
          title={
            <Box display="flex" alignItems="center">
              <Typography
                variant="body1"
                fontSize={28}
                fontWeight={500}
                mr={0.5}
              >{`${user?.firstName} ${user?.lastName || ''}`}</Typography>
              {user?.isVerified && <VerifiedBadge size={24} />}
              {user?.batch === 0 && <FacultyBadge size={24} />}
            </Box>
          }
          titleProps={{ fontWeight: 600, fontSize: '30px' }}
          summary={user?.batch === 0 ? 'Faculty' : user?.batch ? `Batch of ${user?.batch}` : ''}
          summaryProps={{ color: 'grey.600', fontSize: '14px', mt: 1 }}
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
                  <DotsThreeCircleVertical size={32} weight="bold" />
                </IconButton>
              </Tooltip>
            }
          />
          // <Button
          //   disabled={loading}
          //   title="Edit Profile"
          //   size="small"
          //   onClick={() => setEditingProfile(true)}
          //   startIcon={<PencilSimple size={16} />}
          //   sx={{
          //     whiteSpace: 'nowrap',
          //   }}
          // />
        )}
      </Box>
    </Box>
  );
};

export default ProfileHeader;
