import Title from '@/components/common/Title';
import { Box, Typography, Avatar, Skeleton } from '@mui/material';
import { ProfileHeaderProps } from '../Profile.types';
import ProfilePicture from '@/components/common/ProfilePicture';
import VerifiedBadge from '@/components/common/VerifiedBadge';
import Button from '@/components/core/Button';
import { Notches, PencilSimple } from '@phosphor-icons/react';
import { useProfile } from '@/context/ProfileContext';

const ProfileHeader: React.FC<ProfileHeaderProps> = () => {
  const { user, loading, isProfileEditable, editingProfile, setEditingProfile } = useProfile();
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
          width: 168,
          height: 168,
          border: '4px solid #fff',
          position: 'absolute',
          bottom: -24,
          left: 32,
        }}
      />
      <Box display="flex" justifyContent="space-between" sx={{ mt: 1, ml: '200px' }}>
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
            </Box>
          }
          titleProps={{ fontWeight: 600, fontSize: '30px' }}
          summary={user?.batch ? `Batch of ${user?.batch}` : ''}
          summaryProps={{ color: 'grey.600', fontSize: '14px', mt: 1 }}
        />
        {isProfileEditable && !editingProfile && (
          <Button
            disabled={loading}
            title="Edit Profile"
            size="small"
            onClick={() => setEditingProfile(true)}
            startIcon={<PencilSimple size={16} />}
            sx={{
              whiteSpace: 'nowrap',
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default ProfileHeader;
