import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { IconButton, Link, Stack } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import React from 'react';

import Logo from '@/components/common/Logo';

import MenuList from '../MenuList';

const items: Record<string, any>[] = [
  {
    name: 'facebook',
    href: 'https://www.facebook.com/#/',
  },
  {
    name: 'instagram',
    href: 'https://www.instagram.com/#/',
  },
  {
    name: 'twitter',
    href: 'https://twitter.com/#',
  },
  {
    name: 'linkedin',
    href: 'https://www.linkedin.com/#',
  },
];

const LayoutFooter: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'facebook': {
        return <FacebookIcon />;
      }
      case 'instagram': {
        return <InstagramIcon />;
      }
      case 'twitter': {
        return <XIcon sx={{ fontSize: 22 }} />;
      }
      case 'linkedin': {
        return <LinkedInIcon />;
      }
      default: {
        return <YouTubeIcon />;
      }
    }
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: 'grey.300',
        maxHeight: '392px',
      }}
    >
      <Container sx={{ maxWidth: { xs: '98%', sm: '95%', md: '90%' }, margin: 'auto', p: '0 !important' }}>
        <AppBar position="static" sx={{ bgcolor: 'grey.300' }} elevation={0}>
          <Grid container>
            <Grid item sm={12} md={4.75} pt="25px">
              <Logo />
              {/* <Box
                display="flex"
                width={{
                  md: '341px',
                  sm: '341px',
                  xs: '100%',
                }}
                mt="45px"
                mb="40px"
              >
                <NewsLetter />
              </Box> */}
              {/* <Typography variant="h4" color="common.white" fontWeight={700}>
                Download our App
              </Typography>
              <Box display="flex" mt="20px">
                <Link href="/#">
                  <Box
                    component="img"
                    src="https://cdn2.taygo.tech/account_1656865408946_k2ahsm7c/media/image/media_1682083821406_g1teq34s/original/google-play.svg"
                    height={50}
                  />
                </Link>
              </Box> */}
            </Grid>
            <Grid item xs={12} sm={2.25} md={2.25} pt="25px">
              <MenuList
                title="Quick links"
                items={[
                  {
                    label: 'Home',
                    href: '/',
                  },
                  {
                    label: 'Features',
                    href: '/features',
                  },
                  {
                    label: 'Contact Us',
                    href: '/contact-us',
                  },
                  {
                    label: 'Pricing',
                    href: '/pricing',
                  },
                ]}
              />
            </Grid>
            <Grid item xs={12} sm={2.25} md={2.25} pt="25px">
              <MenuList
                title="Resources"
                items={[
                  {
                    label: 'Blogs',
                    href: '#',
                  },
                  {
                    label: 'About',
                    href: '#',
                  },
                  {
                    label: 'Help Center',
                    href: '#',
                  },
                ]}
              />
            </Grid>
            <Grid item xs={12} sm={2.25} md={2.25} pt="25px">
              <MenuList
                title="Legal"
                items={[
                  {
                    label: 'Privacy policy',
                    href: '/privacy_policy',
                  },
                  {
                    label: 'Terms & conditions',
                    href: '/terms_of_services',
                  },
                  {
                    label: 'Press Relations',
                    href: '#',
                  },
                ]}
              />
            </Grid>
            <Grid item xs={12} mt="20px" mb="20px">
              <Divider orientation="horizontal" sx={{ borderColor: '#D9D9D9', opacity: 1 }} />
            </Grid>
          </Grid>
          <Grid container pb="20px" justifyContent="center" flexDirection="column" alignItems="center">
            <Grid item xs={12}>
              <Typography
                sx={{
                  color: 'grey.800',
                  opacity: 0.6,
                }}
                variant="body2"
              >
                &nbsp; &#169;
                {new Date().getFullYear()}
                &nbsp; JNVPJAA &trade; . All Rights Reserved.
              </Typography>
            </Grid>
            {/* <Grid item xs={12} md={6} mt={{ xs: '20px' }}> */}
            <Grid item xs={12} display="flex" width="100%" justifyContent="center" mt={2}>
              <Stack direction="row" spacing="16px">
                {items?.map(({ href, name }: Record<string, any>, index: number) => (
                  <Link key={`social-media-item-${index}`} href={href} target="_blank" color="inherit" title={name}>
                    <IconButton
                      sx={{
                        bgcolor: 'transparent',
                        color: 'grey.800',
                        p: '4px',
                      }}
                      aria-label={name}
                    >
                      {getIcon(name)}
                    </IconButton>
                  </Link>
                ))}
              </Stack>
            </Grid>
            <Grid
              xs={12}
              display="flex"
              justifyContent="center"
              color="grey.800"
              mt={2}
              sx={{
                opacity: 0.7,
              }}
            >
              Powered by{' '}
              <Box
                ml={1}
                color="primary.main"
                sx={{
                  borderBottom: '1px dotted',
                  borderColor: 'primary.main',
                  cursor: 'pointer',
                  opacity: 0.7,
                  '&:hover': {
                    opacity: 1,
                  },
                }}
              >
                {' '}
                Dots Created
              </Box>
            </Grid>
          </Grid>
        </AppBar>
      </Container>
    </Box>
  );
};

export default LayoutFooter;
