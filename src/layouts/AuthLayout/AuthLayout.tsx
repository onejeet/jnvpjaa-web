import { Box } from '@mui/material';
import Container from '@mui/material/Container';
import Head from 'next/head';
import React from 'react';

import { Props } from './AuthLayout.types';
import Logo from '@/components/common/Logo';

const AuthLayout: React.FC<Props> = (props) => {
  const { children, title, containerProps = {}, disableCover = true } = props;

  return (
    <>
      <Head>
        <title>{title || 'Untitled'}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>

      <Box width="100%">
        <Container
          sx={{
            py: {
              xs: disableCover ? 3 : 0,
              md: disableCover ? 4 : 0,
            },
            px: {
              xs: disableCover ? '10px' : 0,
              md: disableCover ? '16px' : 0,
            },
            overflow: 'hidden',
            flexGrow: 1,
            bgcolor: 'background.paper',
            maxWidth: disableCover ? { xs: '98%', sm: '95%', md: '90%', xl: '1500px' } : '100%',
            margin: disableCover ? 'auto' : undefined,
            minHeight: disableCover ? `calc(100vh - 379px)` : 0,
          }}
          maxWidth={false}
          disableGutters
          {...containerProps}
        >
          <Logo />
          {children}
        </Container>
      </Box>
    </>
  );
};

export default AuthLayout;
