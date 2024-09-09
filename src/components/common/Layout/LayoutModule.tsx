import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Head from 'next/head';
import React from 'react';

import { Props } from './Layout.types';
import LayoutFooter from './LayoutFooter';
import LayoutTopbar from './LayoutTopbar';

const LayoutModule: React.FC<Props> = (props) => {
  const {
    children,
    title,
    disableTopbar,
    disableFooter,
    disableNav,
    disableSearch,
    appBarProps = {},
    // breadcrumbs = [],
    containerProps = {},
    disableCover,
    disableTopbarShadow,
    logoSuffix,
  } = props;

  return (
    <>
      <CssBaseline />
      <Head>
        <title>{title || 'Untitled'}</title>
      </Head>
      {!disableTopbar && <LayoutTopbar />}
      <Container
        sx={{
          pt: {
            xs: disableCover ? 6 : 0,
            md: disableCover ? 8 : 0,
          },
          bgcolor: 'background.paper',
        }}
        maxWidth={false}
        disableGutters
        {...containerProps}
      >
        {children}
      </Container>
      {!disableFooter && <LayoutFooter />}
    </>
  );
};

export default LayoutModule;
