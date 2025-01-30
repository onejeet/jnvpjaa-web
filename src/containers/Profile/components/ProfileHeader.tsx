import Title from '@/components/common/Title';
import { useAuth } from '@/context/AuthContext';
import { botttsNeutral } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { Box, Typography, Avatar } from '@mui/material';

const getDefaultAvatarUrl = (title?: string) =>
  createAvatar(botttsNeutral, {
    seed: title,
    flip: true,
    size: 168,
  })?.toDataUri();

export default function ProfileHeader() {
  const { user } = useAuth();
  return (
    <Box sx={{ position: 'relative', mb: 4 }}>
      <Box
        component="img"
        src={`https://picsum.photos/seed/${user?.id}/1200/250`}
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
      <Avatar
        alt={`${user?.firstName} ${user?.lasName}`}
        src={getDefaultAvatarUrl(user?.id)}
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
          title={`${user?.firstName} ${user?.lastName || ''}`}
          titleProps={{ fontWeight: 600, fontSize: '30px' }}
          summary=" Web Developer | Coffee Enthusiast"
          summaryProps={{ color: 'grey.600' }}
        />
      </Box>
    </Box>
  );
}
