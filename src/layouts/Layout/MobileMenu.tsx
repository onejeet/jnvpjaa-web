'use client';

import React from 'react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { alpha, Box, Button, Drawer, IconButton, ListItemButton, Paper, Stack, Typography } from '@mui/material';
import type { Theme } from '@mui/material';
import {
  IconAddressBook,
  IconAward,
  IconBook,
  IconBuildingStore,
  IconCalendarEvent,
  IconChevronRight,
  IconCompass,
  IconHeartHandshake,
  IconHistory,
  IconInfoCircle,
  IconMail,
  IconMessage2,
  IconMessages,
  IconPhoto,
  IconReceipt,
  IconSchool,
  IconTarget,
  IconUsers,
  IconUsersGroup,
  IconWritingSign,
  IconX,
} from '@tabler/icons-react';
import type { Icon } from '@tabler/icons-react';
import Logo from '@/components/common/Logo';
import ProfilePicture from '@/components/common/ProfilePicture';
import { paths } from '@/config/paths';
import type { IHeaderMenuItem } from './LayoutTopbar';

const PATH_ICONS: Record<string, Icon> = {
  '/about': IconInfoCircle,
  '/vision': IconTarget,
  '/president-message': IconMessage2,
  '/secretary-message': IconMessages,
  '/principal-message': IconSchool,
  '/contact-us': IconMail,
  '/executive-committee': IconUsersGroup,
  '/batch-coordinators': IconUsers,
  '/bhamashah-pillars': IconAward,
  '/past-presidents': IconHistory,
  '/student-hub/career-counselling': IconCompass,
  '/student-hub/skillup-resources': IconBook,
  '/members': IconAddressBook,
  '/gallery': IconPhoto,
  '/businesses': IconBuildingStore,
  '/transactions': IconReceipt,
  '/donations': IconHeartHandshake,
  '/events': IconCalendarEvent,
  '/blog': IconWritingSign,
};

export type MobileMenuAccountItem = {
  label: string;
  value: string;
  icon: React.ReactNode;
  onClick: () => void;
};

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  menu: IHeaderMenuItem[];
  user?: {
    id?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    batch?: number | null;
    profileImage?: string | null;
  } | null;
  accountItems: MobileMenuAccountItem[];
}

const iconTileSx = (danger?: boolean) => ({
  width: 34,
  height: 34,
  borderRadius: '10px',
  flexShrink: 0,
  display: 'grid',
  placeItems: 'center',
  color: danger ? 'error.main' : 'primary.main',
  bgcolor: (theme: Theme) => alpha(danger ? theme.palette.error.main : theme.palette.primary.main, 0.08),
  '& svg': { width: 19, height: 19 },
});

const Row: React.FC<{
  label: string;
  icon: React.ReactNode;
  href?: string;
  active?: boolean;
  danger?: boolean;
  onClick?: () => void;
}> = ({ label, icon, href, active, danger, onClick }) => (
  <ListItemButton
    {...(href ? { component: NextLink, href } : {})}
    onClick={onClick}
    aria-current={active ? 'page' : undefined}
    sx={{
      minHeight: 52,
      px: 1.5,
      gap: 1.5,
      bgcolor: active ? (theme: Theme) => alpha(theme.palette.primary.main, 0.06) : undefined,
    }}
  >
    <Box sx={iconTileSx(danger)}>{icon}</Box>
    <Typography
      flex={1}
      minWidth={0}
      noWrap
      fontSize={15}
      fontWeight={active ? 600 : 500}
      color={danger ? 'error.main' : active ? 'primary.main' : 'text.primary'}
    >
      {label}
    </Typography>
    {!danger && <IconChevronRight size={16} style={{ opacity: 0.35, flexShrink: 0 }} />}
  </ListItemButton>
);

const Group: React.FC<{ title?: string; children: React.ReactNode }> = ({ title, children }) => (
  <Box>
    {title && (
      <Typography
        component="h3"
        sx={{
          px: 1,
          pb: 0.75,
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: 'text.secondary',
        }}
      >
        {title}
      </Typography>
    )}
    <Paper
      variant="outlined"
      sx={{
        borderRadius: 4,
        overflow: 'hidden',
        // Inset dividers that start after the icon, like native grouped lists.
        '& > * + *': { position: 'relative' },
        '& > * + *::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 60,
          right: 0,
          borderTop: '1px solid',
          borderColor: 'divider',
        },
      }}
    >
      {children}
    </Paper>
  </Box>
);

const MobileMenu: React.FC<MobileMenuProps> = ({ open, onClose, menu, user, accountItems }) => {
  const pathname = usePathname() || '';
  const isActive = (path: string) => path !== '/' && (pathname === path || pathname.startsWith(`${path}/`));

  // Close after navigating to another page.
  React.useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const groups = menu.filter((item) => item.menu?.length);
  const links = menu.filter((item) => !item.menu?.length);
  const linkRow = (item: IHeaderMenuItem) => {
    const ItemIcon = PATH_ICONS[item.path] || IconChevronRight;
    return (
      <Row
        key={item.path + item.label}
        label={item.label}
        href={item.path}
        active={isActive(item.path)}
        icon={<ItemIcon />}
      />
    );
  };
  const logout = accountItems.find((item) => item.value === 'logout');
  const account = accountItems.filter((item) => item.value !== 'logout' && item.value !== paths.profile.root);
  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(' ');

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 'min(88vw, 380px)',
          height: '100%',
          bgcolor: (theme: Theme) => (theme.palette.mode === 'light' ? theme.palette.grey[50] : 'background.default'),
          borderRadius: '20px 0 0 20px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          px: 2,
          pt: 'calc(12px + env(safe-area-inset-top, 0px))',
          pb: 1.5,
          pr: 'max(16px, env(safe-area-inset-right, 0px))',
          borderBottom: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
        }}
      >
        <Logo width={195} height={30} />
        <IconButton onClick={onClose} aria-label="Close menu" sx={{ width: 40, height: 40, bgcolor: 'action.hover' }}>
          <IconX size={20} />
        </IconButton>
      </Stack>

      <Stack
        spacing={2.5}
        sx={{
          flex: 1,
          minHeight: 0,
          overflowY: 'auto',
          overscrollBehavior: 'contain',
          px: 2,
          pt: 2,
          pb: 'calc(24px + env(safe-area-inset-bottom, 0px))',
          pr: 'max(16px, env(safe-area-inset-right, 0px))',
        }}
      >
        {user?.id ? (
          <Paper variant="outlined" sx={{ borderRadius: 4, overflow: 'hidden' }}>
            <ListItemButton component={NextLink} href={paths.profile.root} sx={{ p: 1.5, gap: 1.5 }}>
              <ProfilePicture
                src={user.profileImage || undefined}
                id={user.id}
                sx={{ width: 48, height: 48 }}
                slotProps={{ img: { referrerPolicy: 'no-referrer' } }}
              />
              <Box flex={1} minWidth={0}>
                <Typography fontWeight={600} fontSize={16} noWrap>
                  {fullName || 'Your profile'}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {user.batch === 0 ? 'Faculty' : user.batch ? `Batch ${user.batch}` : 'View profile'}
                </Typography>
              </Box>
              <IconChevronRight size={18} style={{ opacity: 0.35 }} />
            </ListItemButton>
          </Paper>
        ) : (
          <Paper
            variant="outlined"
            sx={{
              borderRadius: 4,
              p: 2,
              background: (theme: Theme) =>
                `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.primary.main, 0.02)})`,
            }}
          >
            <Typography fontWeight={700} fontSize={17}>
              Welcome back, alumni
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={0.5} mb={2}>
              Sign in to connect with your batchmates, events and the directory.
            </Typography>
            <Stack direction="row" spacing={1.25}>
              <Button
                component={NextLink}
                href={paths.auth.signin}
                variant="contained"
                disableElevation
                fullWidth
                sx={{ minHeight: 44 }}
              >
                Sign in
              </Button>
              <Button component={NextLink} href={paths.auth.signup} variant="outlined" fullWidth sx={{ minHeight: 44 }}>
                Join
              </Button>
            </Stack>
          </Paper>
        )}

        {links.length > 0 && <Group title="Explore">{links.map(linkRow)}</Group>}
        {groups.map((group) => (
          <Group key={group.label} title={group.label}>
            {group.menu!.map(linkRow)}
          </Group>
        ))}

        {user?.id && account.length > 0 && (
          <Group title="Account">
            {account.map((item) => (
              <Row
                key={item.value}
                label={item.label}
                icon={item.icon}
                active={isActive(item.value)}
                onClick={item.onClick}
              />
            ))}
          </Group>
        )}
        {user?.id && logout && (
          <Group>
            <Row label={logout.label} icon={logout.icon} onClick={logout.onClick} danger />
          </Group>
        )}
      </Stack>
    </Drawer>
  );
};

export default MobileMenu;
