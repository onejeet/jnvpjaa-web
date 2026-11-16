'use client';

import { getHeaderMenu } from '@/constants/Header.constants';
import MenuIcon from '@mui/icons-material/Menu';
import type { Theme } from '@mui/material';
import {
  alpha,
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  ListItemIcon,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import NextLink from 'next/link';
import React, { Suspense } from 'react';
import Logo from '@/components/common/Logo';

import HeaderMenuItem from './HeaderMenuItem';
import MobileMenu from './MobileMenu';
import ProfilePicture from '@/components/common/ProfilePicture';
import { useAuth } from '@/context/AuthContext';
import { usePathname, useRouter } from 'next/navigation';
import HoverPopover from '@/components/common/HoverPopover';
import HeaderAddButton from './HeaderAddButton';
import {
  IconCake as Cake,
  IconCalendarEvent,
  IconCategory2,
  IconPhotoBolt,
  IconUserCircle,
  IconWritingSign,
  IconLock,
  IconLogout as SignOut,
  IconUser as User,
  IconShieldCheck,
  IconActivity,
} from '@tabler/icons-react';
import { paths } from '@/config/paths';
import Lottie from '@/components/common/DynamicLottie';
import giftsLottieIcon from '@/utils/lottie/gifts_art.json';
import { isBirthdayToday } from '@/utils/helpers';
import GlobalBgShade from '@/components/common/GlobalBgShade';
import { PERMISSION_CODES, ROLE_CODES } from '@/constants/access';

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
  /** Shown only to people with this permission code. */
  permission?: string;
}

interface LayoutTopbarProps {
  position?: 'top' | 'bottom';
}

type AccountMenuItem = {
  label: string;
  value: string;
  icon: React.ReactNode;
  onClick: () => void;
  sx?: Record<string, any>;
};

const LayoutTopbar: React.FC<LayoutTopbarProps> = ({ position = 'top' }) => {
  const [expanded, setExpanded] = React.useState<string>('');
  const [openMenu, setOpenMenu] = React.useState<boolean>(false);
  const closeMenu = React.useCallback(() => setOpenMenu(false), []);
  const router = useRouter();
  const isBottomDock = position === 'bottom';
  const dockItemSx = {
    width: '100%',
    minWidth: 0,
    height: 56,
    p: 0,
    borderRadius: 2,
    display: { xs: 'flex', md: 'none' },
    flexDirection: 'column' as const,
    gap: '3px',
    color: 'text.secondary',
    '& svg': { color: 'primary.main', width: 22, height: 22 },
  };
  const dockLabelSx = { fontSize: 10, lineHeight: '12px', fontWeight: 600, color: 'text.secondary' };
  const pathname = usePathname() || '';
  // Native tab bars mark where you are.
  const dockTab = (path: string) => {
    const active = path === '/' ? pathname === '/' : pathname === path || pathname.startsWith(`${path}/`);
    return {
      'aria-current': active ? ('page' as const) : undefined,
      sx: active ? { ...dockItemSx, bgcolor: (theme: Theme) => alpha(theme.palette.primary.main, 0.08) } : dockItemSx,
      labelSx: active ? { ...dockLabelSx, color: 'primary.main' } : dockLabelSx,
    };
  };
  const eventsTab = dockTab(paths.events.root);
  const galleryTab = dockTab(paths.gallery.root);
  const blogTab = dockTab(paths.blog.root);
  const homeTab = dockTab('/');
  const { user, logoutUser, can, hasRole, access } = useAuth();

  const HEADER_MENU = React.useMemo(() => {
    return getHeaderMenu(Boolean(user?.id));
  }, [user]);

  const isBirthday = React.useMemo(() => {
    return isBirthdayToday(user?.dob);
  }, [user?.dob]);

  const canAccessAdminCenter = React.useMemo(
    () =>
      can(PERMISSION_CODES.IAM_USER_ACCESS_READ) ||
      can(PERMISSION_CODES.IAM_CATALOG_READ) ||
      can(PERMISSION_CODES.IAM_ROLE_ASSIGNMENT_MANAGE_BATCH_ROLES) ||
      can(PERMISSION_CODES.IAM_EXECUTIVE_POSITION_MANAGE),
    [can]
  );
  const canViewActivity =
    hasRole(ROLE_CODES.EXECUTIVE_MEMBER) ||
    hasRole(ROLE_CODES.PLATFORM_ADMIN) ||
    hasRole(ROLE_CODES.SUPER_ADMIN) ||
    Boolean(access?.positions?.length);

  const ACCOUNT_MENU_LIST = React.useMemo(
    () =>
      [
        {
          label: 'My Profile',
          value: '/profile',
          icon: <User size={16} />,
          onClick: () => router.push(paths.profile.root),
        },
        canAccessAdminCenter
          ? {
              label: 'Admin Center',
              value: '/admin',
              icon: <IconShieldCheck size={16} />,
              onClick: () => router.push('/admin'),
            }
          : null,
        canViewActivity
          ? {
              label: 'Activity Center',
              value: '/activity',
              icon: <IconActivity size={16} />,
              onClick: () => router.push('/activity'),
            }
          : null,
        {
          label: 'Security Center',
          value: paths.security,
          icon: <IconLock size={16} />,
          onClick: () => router.push(paths.security),
        },
        {
          label: 'Log Out',
          value: 'logout',
          icon: <SignOut size={16} />,
          sx: {
            color: 'error.main',
          },
          onClick: logoutUser,
        },
      ].filter(Boolean) as AccountMenuItem[],
    [canAccessAdminCenter, canViewActivity, logoutUser, router]
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
          vertical: position === 'bottom' ? 'top' : 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: position === 'bottom' ? 'bottom' : 'top',
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
        {ACCOUNT_MENU_LIST?.map((mItem) => (
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
  }, [ACCOUNT_MENU_LIST, user, isBirthday, position]);

  return (
    <AppBar
      className={isBottomDock ? 'app-bottom-dock' : undefined}
      position={position === 'bottom' ? 'fixed' : 'sticky'}
      elevation={position === 'bottom' ? 1 : 0}
      sx={{
        display: isBottomDock ? { xs: 'flex', md: 'none' } : { xs: 'none', md: 'flex' },
        top: position === 'bottom' ? 'auto' : 0,
        bottom: position === 'bottom' ? 0 : undefined,
        backgroundColor: 'background.paper',
        borderBottom: '0.5px solid',
        borderTop: position === 'bottom' ? '0.5px solid' : undefined,
        borderColor: (theme: Theme) => alpha(theme.palette.primary.main, 0.4),
        p: 0,
        py: isBottomDock ? '6px' : 1,
        pb: isBottomDock ? 'calc(6px + env(safe-area-inset-bottom, 0px))' : 0,
        // iOS Safari can leave a few px under bottom:0 while its toolbar resizes; paint the dock colour past the edge.
        ...(isBottomDock && {
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            height: '50vh',
            backgroundColor: 'background.paper',
            pointerEvents: 'none',
          },
        }),
      }}
    >
      <Container
        sx={{
          maxWidth: isBottomDock ? '100%' : { xs: '98%', sm: '95%', md: '90%', xl: '1500px' },
          margin: 'auto',
          p: isBottomDock
            ? '0 max(8px, env(safe-area-inset-right, 0px)) 0 max(8px, env(safe-area-inset-left, 0px)) !important'
            : '0 !important',
          '&::before':
            position === 'bottom'
              ? {
                  content: '" "',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  inset: 0,
                  zIndex: 0,
                  width: '100%',
                  height: '90px',
                  background: (theme: Theme) =>
                    `radial-gradient(farthest-corner at 50% 100%, ${alpha(theme.palette.primary.main, 0.2)} 0%, transparent 80%)`,
                }
              : {},
        }}
      >
        <Toolbar
          sx={{
            width: '100%',
            py: isBottomDock ? 0 : '4px',
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'center',
            px: '0 !important',
            minHeight: isBottomDock ? '56px !important' : '60px !important',
            height: isBottomDock ? 56 : 60,
          }}
        >
          <Box
            position="relative"
            display={isBottomDock ? 'grid' : 'flex'}
            flex={1}
            sx={isBottomDock ? { gridTemplateColumns: 'repeat(6, minmax(0, 1fr))', gap: '2px' } : undefined}
            justifyContent="start"
            alignItems="center"
            // gap={1}
          >
            <Box
              component={NextLink}
              href="/"
              aria-label="Home"
              aria-current={isBottomDock ? homeTab['aria-current'] : undefined}
              sx={
                isBottomDock
                  ? { ...homeTab.sx, textDecoration: 'none', justifyContent: 'center', alignItems: 'center' }
                  : undefined
              }
            >
              <Logo
                type={isBottomDock ? 'icon' : 'regular'}
                width={isBottomDock ? 26 : 300}
                height={isBottomDock ? 26 : 45}
                priority
              />
              {isBottomDock && <Typography sx={homeTab.labelSx}>Home</Typography>}
            </Box>

            <IconButton
              onClick={() => router.push(paths.events.root)}
              // display={{ xs: 'flex', lg: 'none' }}
              aria-label="Events"
              aria-current={eventsTab['aria-current']}
              sx={eventsTab.sx}
            >
              <IconCalendarEvent />
              <Typography sx={eventsTab.labelSx}>Events</Typography>
            </IconButton>
            {!user?.id && (
              <IconButton
                onClick={() => router.push(paths.gallery.root)}
                aria-label="Gallery"
                aria-current={galleryTab['aria-current']}
                sx={galleryTab.sx}
              >
                <IconPhotoBolt size={22} />
                <Typography sx={galleryTab.labelSx}>Gallery</Typography>
              </IconButton>
            )}

            <IconButton
              // size="large"
              aria-label="Open menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => setOpenMenu(true)}
              sx={dockItemSx}
            >
              <IconCategory2 />
              <Typography sx={dockLabelSx}>Menu</Typography>
            </IconButton>

            <IconButton
              onClick={() => router.push(paths.blog.root)}
              aria-label="Blog"
              aria-current={blogTab['aria-current']}
              sx={blogTab.sx}
            >
              <IconWritingSign />
              <Typography sx={blogTab.labelSx}>Blog</Typography>
            </IconButton>

            {user?.id && isBottomDock ? (
              <Box
                display="grid"
                gridTemplateColumns="repeat(2, minmax(0, 1fr))"
                alignItems="center"
                sx={{ gridColumn: 'span 2', minWidth: 0 }}
              >
                <HeaderAddButton isMobile />
                <Box
                  sx={{
                    minWidth: 0,
                    height: 56,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '3px',
                    '& > *': { cursor: 'pointer' },
                  }}
                >
                  {ACCOUNT_COMP}
                  <Typography sx={dockLabelSx}>Profile</Typography>
                </Box>
              </Box>
            ) : (
              <IconButton onClick={() => router.push(paths.auth.signin)} aria-label="Login" sx={dockItemSx}>
                <IconUserCircle size={22} />
                <Typography sx={dockLabelSx}>Login</Typography>
                {/* <IconPhotoBolt size={22} />
                <Typography fontSize="10px" variant="body2">
                  Gallery
                </Typography> */}
              </IconButton>
            )}
          </Box>

          <Box display={{ xs: 'none', md: 'flex' }} alignItems="center" ml="auto" gap={0}>
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
      {isBottomDock && (
        <MobileMenu
          open={openMenu}
          onClose={closeMenu}
          menu={HEADER_MENU}
          user={user}
          accountItems={ACCOUNT_MENU_LIST}
        />
      )}
    </AppBar>
  );
};

export default LayoutTopbar;
