'use client';

import {
  Alert,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import {
  IconCertificate,
  IconChevronDown,
  IconExternalLink,
  IconFileText,
  IconLayoutDashboard,
  IconListCheck,
  IconNews,
  IconSchool,
  IconSettings,
  IconUserShield,
  IconUsersGroup,
  IconX,
} from '@tabler/icons-react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import Breadcrumbs from '@/components/common/Breadcrumbs';
import { useAuth } from '@/context/AuthContext';
import { getActiveItem, getAdminGroup, getAdminNav, OVERVIEW, type AdminNavGroup, type AdminNavItem } from './adminNav';

const ICONS: Record<string, typeof IconSettings> = {
  overview: IconLayoutDashboard,
  access: IconUserShield,
  executive: IconUsersGroup,
  coordinators: IconSchool,
  assignments: IconListCheck,
  pages: IconFileText,
  newsroom: IconNews,
  settings: IconSettings,
  scholarship: IconCertificate,
};

const SIDEBAR_WIDTH = 240;

export const useAdminNav = () => {
  const { can, hasRole, access } = useAuth();
  const nav = React.useMemo(() => getAdminNav({ can, hasRole }), [can, hasRole]);
  return { nav, ready: Boolean(access) };
};

const NavList = ({
  nav,
  active,
  onNavigate,
}: {
  nav: AdminNavGroup[];
  active?: AdminNavItem;
  onNavigate?: () => void;
}) => (
  <Box component="nav" aria-label="Admin sections">
    {nav.map((group, index) => (
      <List
        key={group.label || 'top'}
        dense
        disablePadding
        sx={{ mt: index ? 2 : 0 }}
        subheader={
          group.label ? (
            <ListSubheader
              disableSticky
              disableGutters
              sx={{ px: 1.5, lineHeight: '32px', bgcolor: 'transparent', color: 'text.secondary', fontWeight: 600 }}
            >
              {group.label}
            </ListSubheader>
          ) : undefined
        }
      >
        {group.items.map((item) => {
          const Icon = ICONS[item.key];
          const selected = item === active;
          return (
            <ListItemButton
              key={item.key}
              component={NextLink}
              href={item.href}
              selected={selected}
              aria-current={selected ? 'page' : undefined}
              onClick={onNavigate}
              sx={{
                borderRadius: 1.5,
                mb: 0.25,
                py: 0.75,
                '&.Mui-selected': { bgcolor: 'action.selected', color: 'primary.main', fontWeight: 600 },
                '&.Mui-selected .MuiListItemIcon-root': { color: 'primary.main' },
              }}
            >
              {Icon && (
                <ListItemIcon sx={{ minWidth: 32, color: 'text.secondary' }}>
                  <Icon size={18} stroke={1.75} />
                </ListItemIcon>
              )}
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ fontSize: 14, fontWeight: selected ? 600 : 500 }}
              />
              {item.external && (
                <IconExternalLink size={14} aria-label="Opens outside the admin area" style={{ opacity: 0.6 }} />
              )}
            </ListItemButton>
          );
        })}
      </List>
    ))}
  </Box>
);

const SectionHeader = ({ nav, item }: { nav: AdminNavGroup[]; item: AdminNavItem }) => {
  const isOverview = item === OVERVIEW || item.key === OVERVIEW.key;
  const group = getAdminGroup(nav, item);
  return (
    <Box mb={3}>
      {!isOverview && (
        <Breadcrumbs
          items={[
            { label: 'Admin', path: '/admin' },
            ...(group?.label ? [{ label: group.label }] : []),
            { label: item.label },
          ]}
          sx={{ mb: 1 }}
        />
      )}
      <Typography variant="h1">{isOverview ? 'Admin Center' : item.label}</Typography>
      <Typography color="text.secondary" mt={0.5}>
        {item.description}
      </Typography>
    </Box>
  );
};

/** Sidebar navigation for /admin. Nested routes (e.g. a page editor) render their own header. */
const AdminShell = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname() || '/admin';
  const { nav, ready } = useAdminNav();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const active = getActiveItem(nav, pathname);
  const isSectionRoot = active && active.href === (pathname.replace(/\/+$/, '') || '/');

  if (!ready) {
    return (
      <Box width="100%" py={{ xs: 2, md: 4 }}>
        <Skeleton variant="rounded" height={48} sx={{ maxWidth: 320, mb: 2 }} />
        <Skeleton variant="rounded" height={240} />
      </Box>
    );
  }

  if (!nav.length) {
    return (
      <Box width="100%" py={{ xs: 2, md: 4 }}>
        <Typography variant="h1" mb={2}>
          Admin Center
        </Typography>
        <Alert severity="info">No administration tasks are available for your account.</Alert>
      </Box>
    );
  }

  return (
    <Box
      width="100%"
      py={{ xs: 2, md: 4 }}
      display="grid"
      gridTemplateColumns={{ xs: 'minmax(0, 1fr)', md: `${SIDEBAR_WIDTH}px minmax(0, 1fr)` }}
      gap={{ xs: 2, md: 4 }}
      alignItems="start"
    >
      <Box display={{ xs: 'none', md: 'block' }} position="sticky" top={16}>
        <NavList nav={nav} active={active} />
      </Box>

      <Box display={{ xs: 'block', md: 'none' }}>
        <Button
          fullWidth
          variant="outlined"
          color="inherit"
          onClick={() => setDrawerOpen(true)}
          endIcon={<IconChevronDown size={18} />}
          aria-haspopup="dialog"
          aria-expanded={drawerOpen}
          sx={{ justifyContent: 'space-between', borderColor: 'divider', textTransform: 'none', fontWeight: 600 }}
        >
          {active?.label || 'Admin sections'}
        </Button>
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          PaperProps={{ sx: { width: 'min(300px, 85vw)', p: 2 } }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1} pl={1.5}>
            <Typography fontWeight={600}>Admin Center</Typography>
            <IconButton onClick={() => setDrawerOpen(false)} aria-label="Close admin menu">
              <IconX size={20} />
            </IconButton>
          </Stack>
          <NavList nav={nav} active={active} onNavigate={() => setDrawerOpen(false)} />
        </Drawer>
      </Box>

      <Box minWidth={0}>
        {!active ? (
          <Alert
            severity="info"
            action={
              <Button component={NextLink} href="/admin" color="inherit" size="small">
                Go to overview
              </Button>
            }
          >
            You don&apos;t have access to this section.
          </Alert>
        ) : (
          <>
            {isSectionRoot && <SectionHeader nav={nav} item={active} />}
            {children}
          </>
        )}
      </Box>
    </Box>
  );
};

export default AdminShell;
