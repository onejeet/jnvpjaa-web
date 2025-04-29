'use client';

import { getHeaderMenu } from '@/constants/Header.constants';
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
  ListItemIcon,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import NextLink from 'next/link';
import React, { Suspense } from 'react';
import Logo from '@/components/common/Logo';

import HeaderMenuItem from './HeaderMenuItem';
import ProfilePicture from '@/components/common/ProfilePicture';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import HoverPopover from '@/components/common/HoverPopover';
import HeaderAddButton from './HeaderAddButton';
import {
  IconCake as Cake,
  IconCalendarEvent,
  IconCategory2,
  IconPhotoBolt,
  IconUserCircle,
  IconWritingSign,
  IconPassword as Password,
  IconLogout as SignOut,
  IconUser as User,
} from '@tabler/icons-react';
import { paths } from '@/config/paths';
import Lottie from '@/components/common/DynamicLottie';
import giftsLottieIcon from '@/utils/lottie/gifts_art.json';
import { isBirthdayToday } from '@/utils/helpers';
import GlobalBgShade from '@/components/common/GlobalBgShade';

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
  disabled?: boolean;
}

interface LayoutTopbarProps {
  position?: 'top' | 'bottom';
}

const LayoutTopbar: React.FC<LayoutTopbarProps> = ({ position = 'top' }) => {
  const [expanded, setExpanded] = React.useState<string>('');
  const [openMenu, setOpenMenu] = React.useState<boolean>(false);
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { user, logoutUser, isAdmin, redirectToSignin } = useAuth();

  const HEADER_MENU = React.useMemo(() => {
    return getHeaderMenu(Boolean(user?.id));
  }, [user]);

  const isBirthday = React.useMemo(() => {
    return isBirthdayToday(user?.dob);
  }, [user?.dob]);

  const ACCOUNT_MENU_LIST = React.useMemo(
    () => [
      {
        label: 'My Profile',
        value: '/profile',
        icon: <User size={16} />,
        onClick: () => router.push(paths.profile.root),
      },
      {
        label: 'Change Password',
        value: '/change-password',
        icon: <Password size={16} />,
        onClick: () => redirectToSignin(true, paths.auth.change_password),
      },
      {
        label: 'Log Out',
        icon: <SignOut size={16} />,
        sx: {
          color: 'error.main',
        },
        onClick: logoutUser,
      },
    ],
    [logoutUser, router]
  );

  const ACCOUNT_COMP = React.useMemo(() => {
    return (
      <HoverPopover
        id={`account-menu-${user?.id}`}
        render={
          <ProfilePicture
            src={user?.profileImage}
            //   title={isMobile ? undefined : user?.firstName}
            id={user?.id}
            // summary="Member"
            maxWidth={150}
            sx={{
              width: { xs: 40, md: 36 },
              height: { xs: 40, md: 36 },
              '&: hover': {
                bgcolor: 'grey.400',
              },
            }}
            slotProps={{
              img: {
                referrerPolicy: 'no-referrer',
              },
            }}
          />
        }
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem
          //  onClick={handleClose}
          sx={{
            px: '16px',
            py: '12px',
            fontSize: '14px',
            fontWeight: 400,
            // textAlign: 'center',
            color: 'grey.900',
            transition: 'all 0.2s linear',
            cursor: 'default',
            display: 'flex',
            alignItems: 'start',
            flexDirection: 'column',
            pointerEvents: 'none',
            svg: {
              mr: '10px',
              color: 'grey.700',
              fontSize: '20px',
            },
            // '&:hover': {
            //   color: 'primary.main',
            //   svg: {
            //     ml: '2px',
            //     mr: 0,
            //     color: 'primary.main',
            //   },
            // },
          }}
        >
          <Typography
            color="text.primary"
            textAlign="left"
            variant="body1"
            fontWeight={500}
            sx={{
              pr: 4,
              background: 'linear-gradient(90deg,#C62835 0,#217bfe 70%, #078efb 100%)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            {`Hello ${user?.firstName} 👋`}
          </Typography>

          {isBirthday && (
            <Box display="flex" overflow="hidden" alignItems="center">
              {/* <Cake size={32} /> */}
              <Typography
                sx={{
                  background: 'linear-gradient(90deg,#C62835 0,#217bfe 70%, #078efb 100%)',
                  backgroundClip: 'text',
                  color: 'transparent',
                  fontWeight: 500,
                }}
                fontSize="14px"
                variant="body1"
              >
                {`Wish you a very happy birtday.`}
              </Typography>
              <Box maxWidth={50} maxHeight={30} display="flex" overflow="hidden" alignItems="center">
                <Suspense fallback={null}>
                  <Lottie animationData={giftsLottieIcon} loop={true} style={{ width: '100px', height: '50px' }} />
                </Suspense>
              </Box>
            </Box>
          )}
        </MenuItem>
        {ACCOUNT_MENU_LIST?.map((mItem: Record<string, any>) => (
          <MenuItem
            key={`menu-${mItem?.value}`}
            onClick={mItem?.onClick}
            sx={{
              display: 'flex',
              alignItems: 'center',
              px: '16px',
              py: '8px',
              fontSize: '14px',
              fontWeight: 400,
              textAlign: 'center',
              color: 'grey.900',
              transition: 'all 0.2s linear',
              svg: {
                mr: '8px',
              },
              ...(mItem?.sx || {}),
            }}
          >
            {mItem?.icon ? mItem.icon : null}
            {mItem.label}
          </MenuItem>
        ))}
      </HoverPopover>
    );
  }, [ACCOUNT_MENU_LIST, user, isMobile, isBirthday]);

  if ((isMobile && position === 'top') || (!isMobile && position === 'bottom')) {
    return null;
  }
  return (
    <AppBar
      position={position === 'bottom' ? 'fixed' : 'sticky'}
      elevation={position === 'bottom' ? 1 : 0}
      sx={{
        top: position === 'bottom' ? 'auto' : 0,
        bottom: position === 'bottom' ? 0 : undefined,
        backgroundColor: 'background.paper',
        borderBottom: '0.5px solid',
        borderTop: position === 'bottom' ? '0.5px solid' : undefined,
        borderColor: (theme: Theme) => alpha(theme.palette.primary.main, 0.4),
        p: 0,
        py: 1,
        pb: position === 'bottom' ? 2 : 0,
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
            maxHeight: 60,
            minHeight: '60px !important',
            height: 60,
          }}
        >
          <Box
            position="relative"
            display="flex"
            flex={1}
            justifyContent={{ xs: 'space-evenly', md: 'start' }}
            alignItems="center"
            // gap={1}
            sx={{
              '&::before': {
                content: '" "',
                position: 'absolute',
                bottom: 0,
                left: 0,
                inset: 0,
                zIndex: 0,
                // width: '100%',
                height: '90px',
                background: (theme: Theme) =>
                  `radial-gradient(farthest-corner at 180px 100px,${alpha(theme.palette.primary.main, 0.2)} 0%, transparent 60%)`,
              },
            }}
          >
            <NextLink href="/">
              <Logo
                type={isMobile ? 'icon' : 'regular'}
                width={isMobile ? 40 : 300}
                height={isMobile ? 40 : 45}
                priority
              />
            </NextLink>

            <IconButton
              onClick={() => router.push(paths.events.root)}
              // display={{ xs: 'flex', lg: 'none' }}
              sx={{
                width: 59,
                height: 59,
                display: { xs: 'flex', lg: 'none' },
                ml: isMobile ? undefined : 'auto',
                flexDirection: 'column',
                svg: { color: 'primary.main' },
              }}
            >
              <IconCalendarEvent />
              <Typography fontSize="10px" variant="body2">
                Events
              </Typography>
            </IconButton>
            {!user?.id && (
              <IconButton
                onClick={() => router.push(paths.gallery.root)}
                sx={{
                  width: 59,
                  height: 59,
                  display: { xs: 'flex', lg: 'none' },
                  flexDirection: 'column',
                  svg: { color: 'primary.main' },
                }}
              >
                <IconPhotoBolt size={22} />
                <Typography fontSize="10px" variant="body2">
                  Gallery
                </Typography>
              </IconButton>
            )}

            <IconButton
              // size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => setOpenMenu(true)}
              sx={{
                width: 59,
                height: 59,
                display: { xs: 'flex', lg: 'none' },
                flexDirection: 'column',
                // ml: 'auto',
                svg: {
                  color: 'primary.main',
                },
              }}
            >
              <IconCategory2 />
              <Typography fontSize="10px" variant="body2">
                Menu
              </Typography>
            </IconButton>

            <IconButton
              onClick={() => router.push(paths.blog.root)}
              sx={{
                width: 59,
                height: 59,
                display: { xs: 'flex', lg: 'none' },
                flexDirection: 'column',
                svg: { color: 'primary.main' },
              }}
            >
              <IconWritingSign />
              <Typography fontSize="10px" variant="body2">
                Blog
              </Typography>
            </IconButton>

            {user?.id && isMobile ? (
              <Box display="flex" gap={2} alignItems="center">
                <HeaderAddButton isMobile />
                {ACCOUNT_COMP}
              </Box>
            ) : (
              <IconButton
                onClick={() => router.push(paths.gallery.root)}
                sx={{
                  width: 59,
                  height: 59,
                  display: { xs: 'flex', lg: 'none' },
                  flexDirection: 'column',
                  svg: { color: 'primary.main' },
                }}
              >
                <IconUserCircle size={22} />
                <Typography fontSize="10px" variant="body2">
                  Login
                </Typography>
                {/* <IconPhotoBolt size={22} />
                <Typography fontSize="10px" variant="body2">
                  Gallery
                </Typography> */}
              </IconButton>
            )}
          </Box>

          <Box display={{ xs: 'none', lg: 'flex' }} alignItems="center" ml="auto" gap={0}>
            {HEADER_MENU.map((item: IHeaderMenuItem) => (
              <HeaderMenuItem key={item.label} item={item} />
            ))}
            {user?.id ? (
              <Box gap={2} display="flex">
                <HeaderAddButton />
                {ACCOUNT_COMP}
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
          {!user?.id && (
            <NextLink href="/signin" passHref style={{ textDecoration: 'none' }}>
              <Button fullWidth variant="outlined" sx={{ ml: '8px', whiteSpace: 'nowrap' }}>
                Alumni Login
              </Button>
            </NextLink>
          )}
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default LayoutTopbar;
