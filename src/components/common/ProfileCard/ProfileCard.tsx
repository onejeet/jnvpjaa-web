'use client';

import { getSocialMediaIcon } from '@/utils/helpers';
import { Card, CardContent, Typography, Box, Avatar, Stack, IconButton, Link, BoxProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

import { ProfileCardProps } from './ProfileCard.types';
import { IconMail as EnvelopeSimple, IconUsersGroup as UsersThree } from '@tabler/icons-react';

interface CustomBoxProps extends BoxProps {
  bgColor?: string;
}

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
  width: 200,
  height: 200,
  border: `4px solid ${theme.palette.primary.main}`,
  boxShadow: `0 4px 8px rgba(0, 0, 0, 0.2)`,
}));

// Styled Header Section
const HeaderSection = styled(Box)<CustomBoxProps>(({ bgColor, theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: bgColor || theme.palette.secondary.main,
  color: theme.palette.common.white,
  textAlign: 'center',
}));

const ProfileCard: React.FC<ProfileCardProps> = ({
  profilePicture,
  name,
  designation,
  batch,
  email,
  socialMedia,
  color,
}) => {
  return (
    <StyledCard>
      <HeaderSection bgColor={color}>
        <Typography variant="h3" component="div" sx={{ textTransform: 'capitalize' }}>
          {designation}
        </Typography>
      </HeaderSection>
      {profilePicture && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <ProfileImage src={profilePicture} alt={`${name}'s profile picture`} />
        </Box>
      )}

      <CardContent sx={{ textAlign: 'left' }}>
        <Typography gutterBottom variant="h2" component="div" sx={{ mb: 1, fontWeight: 600 }}>
          {name}
        </Typography>
        <Typography
          display="flex"
          alignItems="center"
          variant="body1"
          color="grey.700"
          sx={{ mb: 1, svg: { mr: 1, color: 'grey.700' } }}
        >
          <UsersThree size={18} /> Batch of {batch}
        </Typography>
        {email && (
          <Typography
            display="flex"
            alignItems="center"
            variant="body1"
            color="grey.700"
            sx={{ svg: { mr: 1, color: 'grey.700' } }}
          >
            <EnvelopeSimple size={18} /> {email}
          </Typography>
        )}

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
