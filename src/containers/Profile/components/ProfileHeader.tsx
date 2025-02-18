import Title from '@/components/common/Title';
import { Box, Typography, Avatar } from '@mui/material';
import { ProfileHeaderProps } from '../Profile.types';
import ProfilePicture from '@/components/common/ProfilePicture';
import VerifiedBadge from '@/components/common/VerifiedBadge';

export default function ProfileHeader({ user, loading }: ProfileHeaderProps) {
  return (
    <Box sx={{ position: 'relative', mb: 4 }}>
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
      <Box sx={{ mt: 1, ml: '200px' }}>
        <Title
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
          summary=" Web Developer | Coffee Enthusiast"
          summaryProps={{ color: 'grey.600' }}
        />
      </Box>
    </Box>
  );
}
