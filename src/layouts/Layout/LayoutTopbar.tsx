'use client';

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
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import NextLink from 'next/link';
import React from 'react';

import Logo from '@/components/common/Logo';

import HeaderMenuItem from './HeaderMenuItem';
import ProfilePicture from '@/components/common/ProfilePicture';
import ButtonDropdown from '@/components/common/DropdownMenu/DropdownMenu';
import { useAuth } from '@/context/AuthContext';
import { Router, useRouter } from 'next/router';

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
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { user, handleLogout } = useAuth();

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
            maxHeight: 50,
            minHeight: '50px !important',
            height: 50,
          }}
        >
          <NextLink href="/">
            <Logo width={isMobile ? 260 : 300} height={isMobile ? 40 : 45} priority />
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
            {user?.id ? (
              <ButtonDropdown
                items={[
                  {
                    label: 'My Profile',
                    value: '/profile',
                    // icon: <BiUserCircle />,
                  },
                  {
                    label: 'Log Out',
                    // icon: <BiLogOutCircle />,
                    sx: {
                      color: 'error.main',
                    },
                    onClick: () => handleLogout(),
                  },
                ]}
                onChange={(path: string | number) => {
                  if (path) {
                    router.push(path?.toString());
                  }
                }}
                menuProps={{
                  anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                  },
                  transformOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                  },
                }}
              >
                <ProfilePicture
                  title={user?.firstName}
                  id={user.id}
                  summary="Member"
                  maxWidth={150}
                  sx={{ width: 36, height: 36, ml: 1 }}
                />
              </ButtonDropdown>
            ) : (
              <NextLink href="/signin" passHref style={{ textDecoration: 'none' }}>
                <Button
                  // startIcon={<Login sx={{ fontSize: '14px' }} />}
                  variant="outlined"
                  sx={{ display: { xs: 'none', md: 'block' }, ml: '8px', whiteSpace: 'nowrap' }}
                >
                  Alumni Login
                </Button>
              </NextLink>
            )}
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
        <Box width="100%" height="100%" display="flex" flexDirection="column" justifyContent="start">
          <Box mb={4}>
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
          <NextLink href="/signin" passHref style={{ textDecoration: 'none' }}>
            <Button fullWidth variant="outlined" sx={{ ml: '8px', whiteSpace: 'nowrap' }}>
              Alumni Login
            </Button>
          </NextLink>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default LayoutTopbar;
