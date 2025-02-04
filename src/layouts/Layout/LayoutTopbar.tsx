'use client';

import { ADD_ENTITIES, getHeaderMenu } from '@/constants/Header.constants';
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
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import NextLink from 'next/link';
import React from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Logo from '@/components/common/Logo';

import HeaderMenuItem from './HeaderMenuItem';
import ProfilePicture from '@/components/common/ProfilePicture';
import ButtonDropdown from '@/components/common/DropdownMenu/DropdownMenu';
import { useAuth } from '@/context/AuthContext';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LogoutIcon from '@mui/icons-material/Logout';
import { Router, useRouter } from 'next/router';
import HoverPopover from '@/components/common/HoverPopover';
import HeaderAddButton from './HeaderAddButton';

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
  icon?: React.ReactNode;
}

const LayoutTopbar: React.FC = () => {
  const [expanded, setExpanded] = React.useState<string>('');
  const [openMenu, setOpenMenu] = React.useState<boolean>(false);
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { user, handleLogout } = useAuth();

  const HEADER_MENU = React.useMemo(() => {
    return getHeaderMenu(user?.id?.length > 0);
  }, [user]);

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
          <Box display={{ xs: 'flex', lg: 'none' }} ml="auto" alignItems="center" gap={1}>
            {user?.id && <HeaderAddButton />}
            <IconButton
              // size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => setOpenMenu(true)}
              color="inherit"
            >
              <MenuIcon sx={{ color: 'primary.main' }} />
            </IconButton>
          </Box>

          <Box display={{ xs: 'none', lg: 'flex' }} ml="auto" gap={0}>
            {HEADER_MENU.map((item: IHeaderMenuItem) => (
              <HeaderMenuItem key={item.label} item={item} />
            ))}
            {user?.id ? (
              <Box gap={1} display="flex">
                <HeaderAddButton />
                <ButtonDropdown
                  items={[
                    {
                      label: (
                        <Typography
                          color="text.primary"
                          textAlign="left"
                          variant="body1"
                          fontWeight={500}
                          sx={{
                            pr: 4,
                            background: 'linear-gradient(90deg,#217bfe 0,#078efb 20%,#C62835 100%)',
                            backgroundClip: 'text',
                            color: 'transparent',
                          }}
                        >
                          {`Hello ${user?.firstName}`},
                        </Typography>
                      ),
                      disabled: true,
                      sx: {
                        opacity: '1 !important',
                      },
                    },
                    {
                      label: 'My Profile',
                      value: '/profile',
                      icon: <AssignmentIndIcon sx={{ fontSize: '16px' }} />,
                    },
                    {
                      label: 'Log Out',
                      icon: <LogoutIcon sx={{ fontSize: '16px', color: 'error.main' }} />,
                      sx: {
                        color: 'error.main',
                      },
                      onClick: () => handleLogout(),
                    },
                  ]}
                  onChange={(path?: string | number) => {
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
              </Box>
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
