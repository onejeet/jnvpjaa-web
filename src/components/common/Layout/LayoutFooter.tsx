import { JNVPJAA_SOCIAL_MEDIA } from '@/constants/General.contants';
import { getSocialMediaIcon } from '@/utils/helpers';
import { IconButton, Stack } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import NextLink from 'next/link';
import React from 'react';

import Logo from '@/components/common/Logo';

import MenuList from '../MenuList';

const LayoutFooter: React.FC = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: 'grey.300',
        pb: '20px',
      }}
    >
      <Container
        sx={{ maxWidth: { xs: '98%', sm: '95%', md: '90%', xl: '1500px' }, margin: 'auto', p: '0 !important' }}
      >
        <AppBar position="static" sx={{ bgcolor: 'grey.300' }} elevation={0}>
          <Grid container p={{ xs: 2, sm: 0 }}>
            <Grid item xs={12} sm={12} md={4.75} pt="25px">
              <Logo width={325} height={50} />
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
            <Grid item xs={6} sm={2.25} md={2.25} pt="25px">
              <MenuList
                title="About"
                items={[
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
            <Grid item xs={6} sm={2.25} md={2.25} pt="25px">
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
            {/* <Grid item xs={12} sm={2.25} md={2.25} pt="25px">
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
            </Grid> */}
            <Grid item xs={12} mt="10px" mb="20px">
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
            <Grid item xs={12} display="flex" width="100%" justifyContent="center">
              <Stack direction="row" spacing="16px" alignItems="center">
                {JNVPJAA_SOCIAL_MEDIA?.map(({ path, name }: Record<string, any>, index: number) => (
                  <NextLink key={`social-media-item-${index}`} href={path} target="_blank" color="inherit" title={name}>
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

            <Grid
              item
              xs={12}
              md={6}
              textAlign="left"
              mt={{
                xs: '10px',
                sm: 0,
              }}
            >
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
              xs={12}
              md={6}
              item
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
                Designed & Crafted By:{' '}
                <NextLink href="https://www.dotscreated.com/" style={{ textDecoration: 'none' }} target="_blank">
                  {/* <Link sx={{ textDecoration: 'none' }}> */}
                  <Box
                    component="span"
                    ml={1}
                    color="primary.main"
                    sx={{
                      borderBottom: '1px dotted',
                      borderColor: 'primary.main',
                      cursor: 'pointer',
                      opacity: 0.9,
                      '&:hover': {
                        opacity: 1,
                      },
                    }}
                  >
                    {' '}
                    Dots Created
                  </Box>
                  {/* </Link> */}
                </NextLink>
              </Typography>
            </Grid>
          </Grid>
        </AppBar>
      </Container>
    </Box>
  );
};
export default LayoutFooter;
