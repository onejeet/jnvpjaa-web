import { HEADER_MENU } from '@/constants/Header.constants';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import type { Theme } from '@mui/material';
import {
  alpha,
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  Link,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import NextLink from 'next/link';
import React from 'react';

import Logo from '@/components/common/Logo';

import HeaderMenuItem from './HeaderMenuItem';

export interface IMenuItemProps {
  item: IHeaderMenuItem;
  isMobile?: boolean;
}

export interface IHeaderMenuItem {
  label: string;
  path: string;
  menu?: IHeaderMenuItem[];
}

const LayoutTopbar: React.FC = () => {
  const [openMenu, setOpenMenu] = React.useState<boolean>(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        top: 0,
        backgroundColor: 'background.paper',
        borderBottom: '0.5px solid',
        borderColor: (theme: Theme) => alpha(theme.palette.primary.main, 0.4),
        p: 0,
        py: {
          sm: 1,
          xs: 0,
        },
      }}
    >
      <Container
        sx={{ maxWidth: { xs: '98%', sm: '95%', md: '90%', xl: '1500px' }, margin: 'auto', p: '0 !important' }}
      >
        <Toolbar
          sx={{
            width: '100%',
            py: '4px',
            display: 'flex',
            justifyContent: 'start',
            alignIttems: 'center',
            px: '0 !important',
          }}
        >
          <NextLink href="/">
            <Logo width={isMobile ? 260 : 390} height={isMobile ? 40 : 60} />
          </NextLink>
          <Box display={{ xs: 'flex', md: 'none' }} ml="auto">
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => setOpenMenu(true)}
              color="inherit"
            >
              <MenuIcon sx={{ color: 'primary.main' }} />
            </IconButton>
          </Box>

          <Box display={{ xs: 'none', md: 'flex' }} ml="auto">
            {HEADER_MENU.map((item: IHeaderMenuItem) => (
              <HeaderMenuItem key={item.label} item={item} />
            ))}
            <NextLink href="/contact-us" passHref style={{ textDecoration: 'none' }}>
              <Link sx={{ textDecoration: 'none' }}>
                <Button
                  variant="outlined"
                  sx={{ display: { xs: 'none', md: 'block' }, ml: '8px', whiteSpace: 'nowrap' }}
                >
                  Contact Us
                </Button>
              </Link>
            </NextLink>
          </Box>
        </Toolbar>
      </Container>
      <Drawer
        anchor="right"
        open={openMenu}
        onClose={() => setOpenMenu(false)}
        PaperProps={{ sx: { width: '250px', minWidth: '200px', py: '20px', px: '16px' } }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Logo width={195} height={30} />
          <IconButton onClick={() => setOpenMenu(false)}>
            {' '}
            <CloseIcon />{' '}
          </IconButton>
        </Box>
        <Box width="100%">
          {HEADER_MENU.map((item: IHeaderMenuItem) => (
            <HeaderMenuItem key={item.label} item={item} isMobile />
          ))}
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default dynamic(() => Promise.resolve(LayoutTopbar), {
  ssr: false,
});