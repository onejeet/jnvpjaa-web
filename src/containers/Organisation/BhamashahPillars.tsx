'use client';

import { BHAASHAH_PILLARS } from '@/constants/General.contants';
import { Breadcrumbs, Divider, Grid, Paper, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import MuiLink from '@mui/material/Link';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import NextLink from 'next/link';

import ProfileCard from '@/components/common/ProfileCard';
import { ProfileCardProps } from '@/components/common/ProfileCard/ProfileCard.types';

export interface IBhamashahPillar extends ProfileCardProps {
  type: 'platinum' | 'gold' | 'silver';
}

const BhamashahPillars = () => {
  return (
    <Box>
      <Breadcrumbs
        sx={{
          //   fontSize: '7px',
          alignItems: 'center',
          color: 'grey.500',
        }}
        // separator=">"
        aria-label="breadcrumb"
      >
        <NextLink
          href={{
            pathname: '/',
          }}
          as={{
            pathname: '/',
          }}
          passHref
        >
          <MuiLink variant="body2" underline="none" color="primary">
            Home
          </MuiLink>
        </NextLink>
        <MuiLink variant="body2" underline="none" sx={{ color: 'grey.800', pointerEvents: 'none' }}>
          Bhamashah Pillars
        </MuiLink>
      </Breadcrumbs>
      <Box component={Paper} p={2} my={2} display="flex" alignItems="center">
        <Box>
          <Typography variant="h1" mb={3}>
            Bhamashah Pillars
          </Typography>
          <Box
            display={{ xs: 'block', sm: 'block' }}
            sx={{ borderRadius: '10px', maxWidth: '100%', maxHeight: '400px', overflow: 'hidden' }}
          >
            <img
              src="/assets/images/star-contributors.webp"
              width="100%"
              alt="mission"
              style={{ objectFit: 'contain', position: 'relative', top: '0px' }}
            />
          </Box>
          <Typography color="grey.800" mt={2}>
            {` Welcome to the JNV Paota, Jaipur Alumni Association's esteemed "Bhamashah Pillars" initiative, where we honor the generous contributions of our alumni who continue to support and uplift our community. This distinguished scheme recognizes and celebrates the dedication of those who contribute significantly to our mission. Under the Bhamashah Pillars banner, we proudly acknowledge our Platinum Pillars, whose contributions exceed INR 100,000; our Gold Pillars, who give over INR 50,000; and our Silver Pillars, who support us with amounts surpassing INR 21,000. Your remarkable generosity fuels the growth and success of our association, and we are deeply grateful for your commitment to sustaining the legacy of JNV Paota, Jaipur.`}
          </Typography>

          <Typography color="grey.800" variant="h2" mt={4} mb={2}>
            Platinum Pillars (Amount more than INR 100,000):
          </Typography>
          <Box width="100%" component={Grid} container display="flex" gap={2}>
            {BHAASHAH_PILLARS.filter((pillar: IBhamashahPillar) => pillar.type === 'platinum').map(
              (pillar: IBhamashahPillar, index: number) => (
                <Grid key={`bamashah-card-platinum-${index}`} item xs={12} sm={4} md={3}>
                  <ProfileCard {...pillar} designation={pillar.type} color="#CF7878" />
                </Grid>
              )
            )}
          </Box>
          <Divider sx={{ my: 4 }} />
          <Typography color="grey.800" variant="h2" mb={2}>
            Gold Pillars (Amount more than INR 50,000):
          </Typography>
          <Box display="flex" gap={2}>
            {/* {BHAASHAH_PILLARS.filter((pillar: IBhamashahPillar) => pillar.type === 'gold').map(
              (pillar: IBhamashahPillar, index: number) => (
                <ProfileCard key={`bamashah-card-platinum-${index}`} {...pillar} designation={pillar.type} color="#DAA511" />
              )
            )} */}
            <Typography color="grey.500">
              {`The spot for Gold "Bhamashah Pillars" is currently available and waiting to be filled.`}
            </Typography>
          </Box>
          <Divider sx={{ my: 4 }} />
          <Typography color="grey.800" variant="h2" mb={2}>
            Silver Pillars (Amount more than INR 21,000):
          </Typography>
          <Box component={Grid} container display="flex" gap={2}>
            {BHAASHAH_PILLARS.filter((pillar: IBhamashahPillar) => pillar.type === 'silver').map(
              (pillar: IBhamashahPillar, index: number) => (
                <Grid key={`bamashah-card-silver-${index}`} item xs={12} sm={4} md={3}>
                  <ProfileCard {...pillar} designation={pillar.type} color="#BCB198" />
                </Grid>
              )
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default dynamic(() => Promise.resolve(BhamashahPillars), {
  ssr: false,
});
