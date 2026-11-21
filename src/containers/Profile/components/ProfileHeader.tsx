'use client';

import Title from '@/components/common/Title';
import { Box, Typography, Skeleton, IconButton, Tooltip, Chip, Button } from '@mui/material';
import { ProfileHeaderProps } from '../Profile.types';
import ProfilePicture from '@/components/common/ProfilePicture';
import VerifiedBadge from '@/components/common/VerifiedBadge';
import SocialLinks from '@/components/common/SocialLinks';
import { IconPencil, IconLock, IconDotsCircleHorizontal, IconPhotoEdit, IconWorld } from '@tabler/icons-react';
import { useProfile } from '@/context/ProfileContext';
import FacultyBadge from '@/components/common/FacultyBadge';
import Menu from '@/components/core/Menu';
import React from 'react';
import { useAlert } from '@/context/AlertContext';
import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { paths } from '@/config/paths';
import { useAuth } from '@/context/AuthContext';
import { GetUserDetailsDocument } from '@/apollo/hooks';
import Dialog from '@/components/core/Dialog';
import Image from 'next/image';
import { ROLE_CODES, ROLE_LABELS } from '@/constants/access';
import ProfilePictureUpload from '@/modules/ProfileSetup/ProfilePictureUpload';
import { GET_OR_CREATE_PROFILE_COVER, SET_MY_PROFILE_COVER } from '@/apollo/profileCoverOperations';
import { UnsplashImageSelector } from '@/modules/UnsplashImageSelector/UnsplashImamgeSelector';
import { UNSPLASH_HOME, withUnsplashReferral } from '@/utils/unsplash';
import { MEMBER_MANAGEMENT_ELIGIBILITY, SET_MEMBER_DISABLED } from '@/apollo/memberOperations';
import { brand } from '@/config/tenant';
import {
  MEMBER_USERNAME,
  MY_PUBLIC_PROFILE,
  PUBLIC_PROFILE,
  type MyPublicProfile,
  type PublicProfile,
} from '@/apollo/publicProfileOperations';
import ShareProfileButton from '@/containers/PublicProfile/ShareProfileButton';
import { publicProfilePath } from '@/utils/publicProfilePath';
import Link from 'next/link';

const profilePositionRoleCodes = new Set([ROLE_CODES.BATCH_COORDINATOR, ROLE_CODES.FINANCE_MANAGER]);

const ProfileHeader: React.FC<ProfileHeaderProps> = () => {
  const [cover, setCover] = React.useState<{
    url: string;
    alt: string;
    caption: string;
    photographerName: string;
    photographerUrl: string;
  } | null>(null);
  const [openPictureView, setOpenPictureView] = React.useState<boolean>(false);
  const [openPictureEdit, setOpenPictureEdit] = React.useState<boolean>(false);
  const { user, loading, isProfileEditable, editingProfile, saveProfile } = useProfile();
  const { showAlert } = useAlert();
  const { user: authUser, isAdmin, positions: authPositions, roles: authRoles, hasRole, setUser } = useAuth();
  const client = useApolloClient();
  const [setMemberDisabled, { loading: changingMemberStatus }] = useMutation(SET_MEMBER_DISABLED);
  const [getOrCreateProfileCover] = useMutation(GET_OR_CREATE_PROFILE_COVER);
  const [setMyProfileCover, { loading: savingCover }] = useMutation(SET_MY_PROFILE_COVER);
  const [coverPickerOpen, setCoverPickerOpen] = React.useState(false);
  const isOwnProfile = Boolean(user?.id && user.id === authUser?.id);
  const { data: publicProfileData } = useQuery<{ myPublicProfile: MyPublicProfile }>(MY_PUBLIC_PROFILE, {
    skip: !isOwnProfile,
  });
  const shareable = isOwnProfile ? publicProfileData?.myPublicProfile : undefined;
  // Someone else's page: offer it only if the public lookup (feature on, not hidden, verified) finds it.
  const { data: memberData } = useQuery<{ getUserDetails: { id: string; username?: string | null } | null }>(
    MEMBER_USERNAME,
    { variables: { id: user?.id }, skip: !user?.id || isOwnProfile }
  );
  const memberUsername = memberData?.getUserDetails?.username;
  const { data: memberPublicData } = useQuery<{ publicProfile: { profile: PublicProfile | null } }>(PUBLIC_PROFILE, {
    variables: { username: memberUsername },
    skip: !memberUsername || isOwnProfile,
  });
  const shareUsername = isOwnProfile
    ? shareable?.featureEnabled && !shareable.hidden
      ? shareable.username
      : null
    : memberPublicData?.publicProfile?.profile?.username || null;
  const changeCover = async (photoId: string) => {
    try {
      const { data } = await setMyProfileCover({ variables: { photoId } });
      if (data?.setMyProfileCover) setCover(data.setMyProfileCover);
      showAlert({ visible: true, type: 'success', message: 'Cover photo updated.' });
    } catch (err: any) {
      showAlert({ visible: true, type: 'error', message: err?.message || 'Could not update the cover photo.' });
    }
  };
  const superAdminViewingMember = hasRole(ROLE_CODES.SUPER_ADMIN) && Boolean(user?.id && user.id !== authUser?.id);
  const { data: memberAccess } = useQuery(MEMBER_MANAGEMENT_ELIGIBILITY, {
    variables: { id: user?.id || '' },
    skip: !superAdminViewingMember || !user?.isVerified,
  });

  React.useEffect(() => {
    if (!user?.id) return;
    let active = true;
    setCover(null);
    getOrCreateProfileCover({ variables: { userId: user.id } })
      .then(({ data }) => {
        if (active) setCover(data?.getOrCreateProfileCover || null);
      })
      .catch(() => {
        if (active) setCover(null);
      });
    return () => {
      active = false;
    };
  }, [getOrCreateProfileCover, user?.id]);
  const canManageMember = Boolean(
    superAdminViewingMember &&
    user?.id &&
    user.isVerified &&
    (user.role?.code === ROLE_CODES.MEMBER || user.role?.name?.toLowerCase() === 'member') &&
    memberAccess?.getUserDetails?.id === user.id &&
    memberAccess.getUserDetails.roles?.every((role: any) => role?.code === ROLE_CODES.MEMBER) &&
    !memberAccess.getUserDetails.positions?.length
  );

  const changeMemberStatus = React.useCallback(() => {
    if (!user?.id || !canManageMember) return;
    const disabled = !user.disabled;
    showAlert(
      {
        visible: true,
        type: 'custom',
        action: 'update',
        title: `${disabled ? 'Disable' : 'Enable'} ${user.firstName || 'member'}?`,
        message: disabled
          ? 'This immediately revokes their access. You can enable the account later.'
          : 'This member will be able to sign in again.',
        okayButtonProps: { title: disabled ? 'Disable' : 'Enable' },
        onOkay: async () => {
          showAlert({ visible: true, type: 'loading', action: 'loading', message: 'Updating member...' }, true);
          try {
            await setMemberDisabled({ variables: { id: user.id, disabled } });
            await client.refetchQueries({ include: [GetUserDetailsDocument] });
            showAlert(
              {
                visible: true,
                type: 'success',
                action: 'success',
                message: `${user.firstName || 'Member'} was ${disabled ? 'disabled' : 'enabled'}.`,
              },
              true
            );
          } catch (error: any) {
            showAlert(
              {
                visible: true,
                type: 'error',
                action: 'error',
                message: error?.message || 'Could not update this member.',
              },
              true
            );
          }
        },
      },
      true
    );
  }, [canManageMember, client, setMemberDisabled, showAlert, user]);

  const profileSummary = React.useMemo(() => {
    const summaryParts = [];
    const isCurrentUser = user?.id && user.id === authUser?.id;
    const profilePositions = user?.positions?.length ? user.positions : isCurrentUser ? authPositions : [];
    const profileRoles = user?.roles?.length ? user.roles : isCurrentUser ? authRoles : [];
    const executivePositions =
      profilePositions
        ?.filter((position: any) => position?.name)
        .map((position: any) => position.name)
        .filter(Boolean) || [];
    const positionRoles =
      profileRoles
        ?.filter((role: any) => profilePositionRoleCodes.has(role?.code))
        .map((role: any) => ROLE_LABELS[role.code as keyof typeof ROLE_LABELS] || role.name)
        .filter(Boolean) || [];
    const uniquePositions = Array.from(new Set([...executivePositions, ...positionRoles]));

    if (user?.batch === 0) {
      summaryParts.push('Faculty');
    } else if (user?.batch) {
      summaryParts.push(`Batch of ${user.batch}`);
    }

    summaryParts.push(...uniquePositions);
    if (user?.companyInfo?.[0]?.position && user?.companyInfo?.[0]?.companyName)
      summaryParts.push(`${user.companyInfo[0].position} at ${user.companyInfo[0].companyName}`);

    return summaryParts.join(' • ');
  }, [authPositions, authRoles, authUser?.id, user?.batch, user?.id, user?.positions, user?.roles, user?.companyInfo]);

  const handleDataPrivacyUpdate = React.useCallback(() => {
    showAlert(
      {
        visible: true,
        action: 'approve',
        type: 'custom',
        title: user?.isConfidential ? 'Make Contact Info Protected' : 'Keep Contact Info Private',
        message: user?.isConfidential
          ? `${user?.firstName || ''}'s email and phone number will be visible to all the verified alumni of ${brand.shortName}. Rest assured, the data still be not visible to public.`
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
                    ? `${user?.firstName || ''}'s email and phone number will be visible to all the verified alumni of ${brand.shortName}. Rest assured, they data still be not visible to public.`
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
  }, [user, saveProfile, authUser, client, showAlert]);

  const menuItems = React.useMemo(() => {
    const isConfidential = user?.isConfidential;
    return [
      ...(isProfileEditable
        ? [
            {
              label: isConfidential ? 'Make Contact Info Visible' : 'Keep Contact Info Private',
              value: 'privacy',
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
        : []),
      ...(canManageMember
        ? [
            {
              label: user?.disabled ? 'Enable member' : 'Disable member',
              value: 'member-status',
              onClick: changeMemberStatus,
              disabled: changingMemberStatus,
              sx: { color: user?.disabled ? 'success.main' : 'warning.dark' },
            },
          ]
        : []),
    ];
  }, [isProfileEditable, canManageMember, changingMemberStatus, user, handleDataPrivacyUpdate, changeMemberStatus]);

  return (
    <Box sx={{ mb: 4 }}>
      {/* Desktop pins the avatar to this box's bottom; phones pin it to the cover (see ProfilePicture sx). */}
      <Box sx={{ position: 'relative' }}>
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
            sx={{
              position: 'relative',
              overflow: 'hidden',
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
              borderRadius: 2,
              border: '1px dashed',
              borderColor: 'grey.400',
              background: 'linear-gradient(120deg, #274d43, #60926d)',
            }}
          >
            {cover?.url && (
              <Box
                component="img"
                src={cover.url}
                alt={cover.alt}
                onError={() => setCover(null)}
                sx={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
              />
            )}
            {cover?.url && (
              <Typography
                component="span"
                variant="caption"
                sx={{
                  position: 'absolute',
                  right: 8,
                  bottom: 8,
                  maxWidth: { xs: 'calc(100% - 16px)', md: '60%' },
                  textAlign: 'right',
                  px: 1,
                  py: 0.25,
                  borderRadius: 1,
                  bgcolor: 'rgba(0,0,0,0.68)',
                  color: 'white',
                  fontSize: 11,
                  lineHeight: 1.5,
                }}
              >
                Photo by{' '}
                <a
                  href={withUnsplashReferral(cover.photographerUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'inherit', textDecoration: 'underline' }}
                >
                  {cover.photographerName}
                </a>{' '}
                on{' '}
                <a
                  href={UNSPLASH_HOME}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'inherit', textDecoration: 'underline' }}
                >
                  Unsplash
                </a>
              </Typography>
            )}
            {isOwnProfile && (
              <Button
                size="small"
                variant="contained"
                color="inherit"
                disabled={savingCover}
                onClick={() => setCoverPickerOpen(true)}
                startIcon={<IconPhotoEdit size={18} />}
                sx={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  minHeight: 36,
                  bgcolor: 'rgba(255,255,255,0.92)',
                  color: 'text.primary',
                  boxShadow: 1,
                  '&:hover': { bgcolor: 'common.white' },
                }}
              >
                {savingCover ? 'Saving…' : 'Change cover'}
              </Button>
            )}
          </Box>
        )}

        <ProfilePicture
          alt={`${user?.firstName} ${user?.lastName}`}
          id={user?.id}
          src={user?.profileImage}
          loading={loading}
          onClick={() => {
            if (isProfileEditable) {
              setOpenPictureEdit(true);
              return;
            }
            if (user?.profileImage) setOpenPictureView(true);
          }}
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
            // Phones: pinned to the cover (180px tall), half over it, so rows added below can't push it down.
            top: { xs: 130, md: 'auto' },
            bottom: { xs: 'auto', md: -24 },
            left: {
              xs: 2,
              md: 32,
            },
          }}
          containerProps={{
            sx: {
              cursor: isProfileEditable || user?.profileImage ? 'pointer' : 'default',
            },
          }}
        />
        {isProfileEditable && !loading && (
          <Tooltip arrow placement="top" title="Update profile picture">
            <IconButton
              size="small"
              onClick={() => setOpenPictureEdit(true)}
              sx={{
                position: 'absolute',
                left: {
                  xs: 72,
                  md: 174,
                },
                top: { xs: 200, md: 'auto' },
                bottom: { xs: 'auto', md: -18 },
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
                boxShadow: 1,
                '&:hover': {
                  bgcolor: 'grey.100',
                },
              }}
            >
              <IconPencil size={16} />
            </IconButton>
          </Tooltip>
        )}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems={{ md: 'flex-start' }}
          flexWrap={{ xs: 'wrap', md: 'nowrap' }}
          sx={{ mt: { xs: 0.5, md: 1 } }}
        >
          {/* minHeight on phones: keeps the action row clear of the avatar's lower half. */}
          <Box flex={1} minWidth={0} ml={{ xs: '108px', md: '220px' }} minHeight={{ xs: 52, md: 0 }}>
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
                  {user?.isVerified && user?.disabled && (
                    <Chip label="Disabled" color="warning" size="small" sx={{ ml: 1, fontWeight: 600 }} />
                  )}
                </Box>
              }
              titleProps={{ fontWeight: 600, fontSize: '30px' }}
              summary={profileSummary}
              summaryProps={{ color: 'grey.600', fontSize: '14px', mt: { xs: 0, md: 1 } }}
            />
          </Box>
          {/* Phones: one full-width row of actions under the name (Edit and Contact never show together). */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 0.75, md: 1 },
              flexWrap: 'nowrap',
              width: { xs: '100%', md: 'auto' },
              mt: { xs: 2, md: 0 },
              ml: { md: 2 },
              flexShrink: 0,
              '& > .MuiButton-root': {
                flex: { xs: '1 1 auto', md: 'none' },
                minWidth: { xs: 0, md: 64 },
                minHeight: { xs: 36, md: 0 },
                px: { xs: 1, md: 1.25 },
                '& .MuiButton-startIcon': { mr: { xs: 0.5, md: 1 } },
                // Narrow phones: text only, so the three actions and the menu share one row.
                '@media (max-width: 399px)': { '& .MuiButton-startIcon': { display: 'none' } },
              },
            }}
          >
            {shareUsername && !editingProfile && (
              <Button
                component={Link}
                href={publicProfilePath(shareUsername)}
                variant="outlined"
                size="small"
                startIcon={<IconWorld size={18} />}
                sx={{ whiteSpace: 'nowrap', flexShrink: 0 }}
              >
                Public view
              </Button>
            )}
            {shareUsername && !editingProfile && (
              <ShareProfileButton
                username={shareUsername}
                name={`${user?.firstName || ''} ${user?.lastName || ''}`.trim()}
                photo={user?.profileImage}
                label="Share"
                variant="outlined"
                size="small"
              />
            )}
            {isProfileEditable && !editingProfile && (
              <Button
                component={Link}
                href={paths.profile.setup}
                variant="outlined"
                size="small"
                startIcon={<IconPencil size={18} />}
                sx={{ whiteSpace: 'nowrap', flexShrink: 0 }}
              >
                Edit
              </Button>
            )}
            {!isProfileEditable && !user?.isConfidential && user?.email && !loading && (
              <Button component="a" href={`mailto:${user.email}`} variant="outlined" size="small">
                Contact
              </Button>
            )}
            {menuItems.length > 0 && !editingProfile && (
              <Menu
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
                    <IconButton aria-label="Profile actions">
                      <IconDotsCircleHorizontal size={28} />
                    </IconButton>
                  </Tooltip>
                }
              />
            )}
          </Box>
        </Box>
      </Box>
      {!loading && <SocialLinks socialMedia={user?.socialMedia} sx={{ mt: 2, ml: { xs: 0, md: '220px' } }} />}
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
      {openPictureEdit && (
        <Dialog
          maxWidth="sm"
          title="Update Profile Picture"
          open={openPictureEdit}
          onClose={() => setOpenPictureEdit(false)}
          hideFooter
        >
          <ProfilePictureUpload
            user={user}
            onCancel={() => setOpenPictureEdit(false)}
            onSuccess={(updatedUser) => {
              if (updatedUser && updatedUser.id === authUser?.id) {
                setUser(updatedUser);
              }
              setOpenPictureEdit(false);
            }}
          />
        </Dialog>
      )}
      {coverPickerOpen && (
        <UnsplashImageSelector
          open
          defaultKeyword="landscape"
          trackDownload={false}
          onClose={() => setCoverPickerOpen(false)}
          onSelect={(photo) => photo?.id && changeCover(photo.id)}
        />
      )}
    </Box>
  );
};

export default ProfileHeader;
