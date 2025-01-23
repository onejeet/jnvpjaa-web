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
  expanded?: boolean;
  setExpanded?: (arg: string) => void;
}

export interface IHeaderMenuItem {
  label: string;
  path: string;
  menu?: IHeaderMenuItem[];
}

const LayoutTopbar: React.FC = () => {
  const [expanded, setExpanded] = React.useState<string>('');
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
          <Box display={{ xs: 'flex', lg: 'none' }} ml="auto">
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

          <Box display={{ xs: 'none', lg: 'flex' }} ml="auto">
            {HEADER_MENU.map((item: IHeaderMenuItem) => (
              <HeaderMenuItem key={item.label} item={item} />
            ))}
            <NextLink href="/contact-us" passHref style={{ textDecoration: 'none' }}>
              <Button variant="outlined" sx={{ display: { xs: 'none', md: 'block' }, ml: '8px', whiteSpace: 'nowrap' }}>
                Contact Us
              </Button>
            </NextLink>
          </Box>
        </Toolbar>
      </Container>
      <Drawer
        anchor="right"
        open={openMenu}
        onClose={() => setOpenMenu(false)}
        PaperProps={{
          sx: { height: '100%', width: '250px', minWidth: '200px', py: '20px', px: '16px', overflowX: 'hidden' },
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Logo width={195} height={30} />
          <IconButton onClick={() => setOpenMenu(false)}>
            <CloseIcon />{' '}
          </IconButton>
        </Box>
        <Box width="100%" height="100%" display="flex" flexDirection="column" justifyContent="space-between">
          <Box>
            {HEADER_MENU.map((item: IHeaderMenuItem) => (
              <HeaderMenuItem
                key={item.label}
                item={item}
                isMobile
                expanded={expanded === item.path}
                setExpanded={setExpanded}
              />
            ))}
          </Box>
          <NextLink href="/contact-us" passHref style={{ textDecoration: 'none' }}>
            <Button
              fullWidth
              variant="outlined"
              sx={{ display: { xs: 'none', md: 'block' }, ml: '8px', whiteSpace: 'nowrap' }}
            >
              Contact Us
            </Button>
          </NextLink>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default LayoutTopbar;
