import { Box, Typography, Paper, Grid2 as Grid, Divider } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DOMPurify from 'dompurify';
import { User } from '@/apollo/hooks';

import React from 'react';
import { useProfile } from '@/context/ProfileContext';
import {
  IconCake as Cake,
  IconMailOpened as EnvelopeSimpleOpen,
  IconLock as Lock,
  IconLock as LockSimple,
  IconPhone as Phone,
  IconPhoneOff as PhoneDisconnect,
  IconBriefcase as SuitcaseSimple,
  IconBrandWhatsapp as WhatsappLogo,
} from '@tabler/icons-react';
import dayjs from 'dayjs';
import { formatPhoneNumber } from '@/utils/helpers';

interface IProps {}

export default function AboutSection() {
  const { user, loading, isProfileEditable } = useProfile();

  const aboutMeContent = React.useMemo(() => {
    return user?.aboutMe
      ? DOMPurify.sanitize(user?.aboutMe)
      : isProfileEditable
        ? 'Please update about me by editing profile.'
        : '--';
  }, [user?.aboutMe, isProfileEditable]);

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        About Me
      </Typography>
      <Typography
        variant={user?.aboutMe ? 'body1' : 'body2'}
        fontWeight={400}
        color={user?.aboutMe ? 'text.primary' : 'grey.500'}
        mb={2}
        className="tiptap"
        dangerouslySetInnerHTML={{ __html: aboutMeContent }}
      />
      <Divider sx={{ my: 3 }} />
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Typography
          variant="body2"
          sx={{
            display: 'flex',
            alignItems: 'center',
            svg: {
              mr: 1,
            },
          }}
        >
          <LockSimple size={16} />
          {user?.isConfidential
            ? 'Contact info is private and not visible to anyone.'
            : 'Contact info is protected and only visible to verified alumni.'}
        </Typography>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {user?.companyInfo?.[0]?.id && (
          <Grid size={{ xs: 12, sm: 12 }}>
            <Box display="flex" alignItems="center">
              <SuitcaseSimple size={24} />
              <Typography
                sx={{ ml: 1 }}
              >{`${user?.companyInfo?.[0]?.position} at ${user?.companyInfo?.[0]?.companyName}`}</Typography>
            </Box>
          </Grid>
        )}

        <Grid size={{ xs: 12, sm: 6 }}>
          <Box display="flex" alignItems="center">
            <Phone size={24} />
            <Typography sx={{ ml: 1 }}>{formatPhoneNumber(user?.mobile || '')?.international || '--'}</Typography>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Box display="flex" alignItems="center">
            <WhatsappLogo size={24} />
            <Typography sx={{ ml: 1 }}>
              {formatPhoneNumber(user?.whatsAppMobile || '')?.international || '--'}
            </Typography>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Box display="flex" alignItems="center">
            <Phone size={24} />
            <Typography sx={{ ml: 1 }}>
              {formatPhoneNumber(user?.emergencyMobile || '')?.international || '--'} (Emergency Contact)
            </Typography>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Box display="flex" alignItems="center">
            <EnvelopeSimpleOpen size={24} />
            <Typography sx={{ ml: 1 }}>{user?.email || '--'}</Typography>
          </Box>
        </Grid>
        {/* <Grid size={{ xs: 12, sm: 4 }}>
          <Box display="flex" alignItems="center">
            <PhoneDisconnect size={24} />
            <Typography sx={{ ml: 1 }}>{user?.email || '--'}</Typography>
          </Box>
        </Grid> */}

        <Grid size={{ xs: 12, sm: 6 }}>
          <Box display="flex" alignItems="center">
            <Cake size={24} />
            <Typography sx={{ ml: 1 }}>{user?.dob ? dayjs(user?.dob)?.format('MMM DD') : '--'}</Typography>
          </Box>
        </Grid>

        {/* <Grid size={{ xs: 12, sm: 4 }}>
          <Box display="flex" alignItems="center">
            <WorkIcon sx={{ mr: 1 }} />
            <Typography>Web Developer at TechCorp</Typography>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Box display="flex" alignItems="center">
            <SchoolIcon sx={{ mr: 1 }} />
            <Typography>BS in Computer Science</Typography>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Box display="flex" alignItems="center">
            <LocationOnIcon sx={{ mr: 1 }} />
            <Typography>San Francisco, CA</Typography>
          </Box>
        </Grid> */}
      </Grid>
    </Paper>
  );
}
