import { JNVPJAA_SOCIAL_MEDIA } from '@/constants/General.contants';
import { getSocialMediaIcon } from '@/utils/helpers';
import { IconButton, Stack } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import NextLink from 'next/link';
import React from 'react';

import Logo from '@/components/common/Logo';

import MenuList from '../MenuList';

const LayoutFooter: React.FC = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: 'grey.100',
        pb: '20px',
      }}
    >
      <Container
        sx={{ maxWidth: { xs: '98%', sm: '95%', md: '90%', xl: '1500px' }, margin: 'auto', p: '0 !important' }}
      >
        <AppBar component="footer" position="static" sx={{ bgcolor: 'grey.100' }} elevation={0}>
          <Grid container p={{ xs: 2, sm: 0 }}>
            <Grid size={{ sm: 12, md: 4.75 }} pt="25px">
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
            <Grid size={{ xs: 12, sm: 2.25, md: 2.25 }} pt="25px">
              <MenuList
                title="About"
                items={[
                  {
                    label: 'Home',
                    path: '/',
                  },
                  {
                    label: 'About JVPJAA',
                    path: '/about',
                  },
                  {
                    label: 'Vision & Mission',
                    path: '/vision',
                  },
                  {
                    label: 'Privacy policy',
                    path: '/privacy_policy',
                  },
                ]}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 2.25, md: 2.25 }} pt="25px">
              <MenuList
                title="Student Hub"
                items={[
                  {
                    label: 'Blog',
                    path: '/blog',
                  },
                  {
                    label: 'SkillUp  Resources',
                    path: '/student-hub/skillup-resources',
                  },
                  {
                    label: 'Career Counselling',
                    path: '/student-hub/career-counselling',
                  },
                ]}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 2.25, md: 2.25 }} pt="25px">
              <MenuList
                title="Other"
                items={[
                  {
                    label: 'Privacy policy',
                    path: '/privacy_policy',
                  },
                  {
                    label: 'Terms & conditions',
                    path: '/terms_condition',
                  },
                  // {
                  //   label: 'Press Relations',
                  //   path: '#',
                  // },
                ]}
              />
            </Grid>
            <Grid size={{ xs: 12 }} mt="20px" mb="20px">
              <Divider orientation="horizontal" sx={{ borderColor: '#D9D9D9', opacity: 1 }} />
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="center"
            flexDirection={{ xs: 'column', md: 'row' }}
            pb={{
              xs: 2,
              md: 0,
            }}
            width="100%"
            alignItems="center"
          >
            {/* <Grid item xs={12} md={6} mt={{ xs: '20px' }}> */}
            <Grid size={{ xs: 12 }} display="flex" width="100%" justifyContent="center">
              <Stack direction="row" spacing="16px" alignItems="center">
                {JNVPJAA_SOCIAL_MEDIA?.map(({ path, name }: Record<string, any>, index: number) => (
                  <NextLink
                    href={path || '/'}
                    as={path}
                    passHref
                    key={`social-media-item-${index}`}
                    target="_blank"
                    color="inherit"
                    title={name}
                  >
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
                  </NextLink>
                ))}
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }} textAlign="left">
              <Typography
                sx={{
                  color: 'grey.800',
                  opacity: 1,
                  whiteSpace: 'nowrap',
                }}
                variant="body2"
              >
                &nbsp; &#169;
                {new Date().getFullYear()}
                &nbsp; JNVPJAA. All Rights Reserved.
              </Typography>
            </Grid>
            <Grid
              size={{
                xs: 12,
                md: 6,
              }}
              display="flex"
              justifyContent="end"
              color="grey.800"
              sx={{
                opacity: 1,
              }}
              mt={{
                xs: '10px',
                sm: 0,
              }}
            >
              <Typography
                sx={{
                  color: 'grey.800',
                  opacity: 1,
                }}
                variant="body2"
                display="flex"
              >
                Powered by{' '}
                <Box
                  component="span"
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
              </Typography>
            </Grid>
          </Grid>
        </AppBar>
      </Container>
    </Box>
  );
};
export default LayoutFooter;
