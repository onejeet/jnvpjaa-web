import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import Image from 'next/image';
import { User } from '@/apollo/hooks';
import { CheckCircle } from '@phosphor-icons/react';
import Button from '@/components/core/Button';
import { useAuth } from '@/context/AuthContext';
import { notoSerif } from '@/utils/theme/fonts';

interface WelcomeProps {
  onNext?: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onNext }) => {
  const { user } = useAuth();
  return (
    <Box p={4}>
      {/* <Box sx={{ mb: 3, borderBottom: '1px solid #cccccc', pb: 2 }}>
        <a href="https://www.jnvpjaa.org" target="_blank" rel="noopener noreferrer">
          <Image
            src="https://www.jnvpjaa.org/assets/branding/logo-full.webp"
            alt="JVPJAA"
            width={300}
            
            style={{ width: '300px', height: 'auto' }}
          />
        </a>
      </Box> */}
      <Typography
        color="text.primary"
        textAlign="center"
        variant="body1"
        fontWeight={500}
        sx={{
          fontSize: '30px',
          background: 'linear-gradient(90deg, #C62835 40%,#078efb 60%, #217bfe 100%)',
          backgroundClip: 'text',
          lineHeight: 'normal',
          color: 'transparent',
          mb: 2,
        }}
      >
        {`Hello, ${user?.firstName}!`}
      </Typography>
      <Typography
        variant="body1"
        align="center"
        fontWeight={600}
        sx={{
          fontSize: '28px',
          lineHeight: 'normal',
          mb: 2,
          background: 'linear-gradient(90deg,#217bfe 10%, #078efb 30%, #C62835 100%)',
          backgroundClip: 'text',
          color: 'transparent',
        }}
      >
        Welcome to New JNVPJAA Portal! 🎉
      </Typography>
      <Box display="flex" flexDirection="row" justifyContent="center">
        <Image
          src="/assets/gif/celebration.gif"
          alt="celebration"
          width={300}
          height={100}
          referrerPolicy="no-referrer"
          style={{ width: '300px', height: 'auto' }}
        />
      </Box>
      <Box display="flex" flexDirection="column" justifyContent="start" gap={1}>
        <Typography>
          {`We're thrilled to have you here! This is your space to reconnect, relive memories, and build new ones.
        Whether it’s your first time logging in or you're already a part of this amazing community, we want you to feel
        at home.`}{' '}
          🏡✨
        </Typography>
        <Typography variant="h2" mt={1.5}>
          🎭 Host & Celebrate Together!
        </Typography>
        <Typography>
          Planning a batch reunion, mentorship session, or a knowledge-sharing event? 🎤
          <br />
          {`Don’t keep it to yourself, create an event and bring everyone together! Let's keep the spirit of Navodaya alive. `}
          🔥
        </Typography>
        <Typography variant="h2" mt={1.5}>
          📝 Share Your Story!
        </Typography>
        <Typography>
          {`Navodaya is more than a school; it’s an emotion. 💙 
          Tell us about your hostel life mischiefs, your lifelong friendships, or how Navodaya shaped you. 
          Even if you just have a random thought, a poem, some shayari, or anything creative, this is your stage! ✍️`}
        </Typography>
        <Typography variant="h2" mt={1.5}>
          🌎 Stay Connected!
        </Typography>
        <Typography>
          {`Let's make this community lively, nostalgic, and full of wisdom. 
          Keep sharing, keep inspiring, and keep the Navodaya vibes going strong! `}
        </Typography>
        <Typography fontWeight={500} mt={2}>
          Welcome aboard! Let’s make this an unforgettable journey together! 🥳
        </Typography>
      </Box>
      {onNext && (
        <Box display="flex" width="100%" mt={2} gap={2} justifyContent="end">
          <Button variant="contained" title="Next" onClick={() => onNext()} startIcon={<CheckCircle size={16} />} />
        </Box>
      )}
    </Box>
  );
};

export default Welcome;
