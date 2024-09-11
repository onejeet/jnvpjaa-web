import { getSocialMediaIcon } from '@/utils/helpers';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import MailIcon from '@mui/icons-material/Mail';
import { Card, CardContent, Typography, Box, Avatar, Stack, IconButton, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

import { ProfileCardProps } from './ProfileCard.types';

// Styled Card Component with Gradient Background and Shadow
const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 500,
  borderRadius: '20px',
  overflow: 'hidden',
  boxShadow: `0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1)`,
  transition: '0.3s',
  background: 'linear-gradient(145deg, #e0eafc, #cfdef3)', // Gradient Background
  '&:hover': {
    boxShadow: `0 6px 12px rgba(0, 0, 0, 0.2), 0 12px 30px rgba(0, 0, 0, 0.2)`,
    transform: 'scale(1.02)',
  },
}));

// Profile Image with Custom Styling
const ProfileImage = styled(Avatar)(({ theme }) => ({
  width: 150,
  height: 150,
  border: `4px solid ${theme.palette.primary.main}`,
  boxShadow: `0 4px 8px rgba(0, 0, 0, 0.2)`,
}));

// Styled Header Section
const HeaderSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.common.white,
  textAlign: 'center',
}));

const ProfileCard: React.FC<ProfileCardProps> = ({ profilePicture, name, designation, batch, email, socialMedia }) => {
  return (
    <StyledCard>
      <HeaderSection>
        <Typography variant="h3" component="div">
          {designation}
        </Typography>
      </HeaderSection>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <ProfileImage src={profilePicture} alt={`${name}'s profile picture`} />
      </Box>
      <CardContent sx={{ textAlign: 'left' }}>
        <Typography gutterBottom variant="h2" component="div" sx={{ mb: 1, fontWeight: 600 }}>
          {name}
        </Typography>
        <Typography display="flex" alignItems="center" variant="body1" color="grey.700" sx={{ mb: 1 }}>
          <Diversity3Icon sx={{ mr: '8px', color: 'grey.700', fontSize: '18px' }} /> Passout Year: {batch}
        </Typography>
        <Typography display="flex" alignItems="center" variant="body1" color="grey.700">
          <MailIcon sx={{ mr: '8px', color: 'grey.700', fontSize: '18px' }} /> {email}
        </Typography>
        {socialMedia && (
          <Stack direction="row" spacing="16px" alignItems="center" mt={2}>
            {socialMedia?.map(({ url, name }: Record<string, any>, index: number) => (
              <Link key={`social-media-item-${index}`} href={url} target="_blank" color="inherit" title={name}>
                <IconButton
                  sx={{
                    bgcolor: 'transparent',
                    color: 'grey.800',
                    p: '4px',
                  }}
                  aria-label={name}
                >
                  {getSocialMediaIcon(name)}
                </IconButton>
              </Link>
            ))}
          </Stack>
        )}
      </CardContent>
    </StyledCard>
  );
};

export default ProfileCard;
