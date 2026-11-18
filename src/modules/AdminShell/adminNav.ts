import { PERMISSION_CODES, ROLE_CODES } from '@/constants/access';

export interface AdminAccess {
  can: (code: string) => boolean;
  hasRole: (code: string) => boolean;
}

export interface AdminNavItem {
  key: string;
  label: string;
  href: string;
  description: string;
  /** Lives outside the admin area; opens the existing page. */
  external?: boolean;
}

export interface AdminNavGroup {
  label?: string;
  items: AdminNavItem[];
}

type Entry = AdminNavItem & { allowed: (access: AdminAccess) => boolean };

// Any of these lets a viewer grant at least one role from Member access.
const ROLE_ASSIGNMENT_PERMISSIONS = [
  PERMISSION_CODES.IAM_ROLE_ASSIGNMENT_MANAGE_BATCH_ROLES,
  PERMISSION_CODES.IAM_ROLE_ASSIGNMENT_MANAGE_FINANCE_MANAGER,
  PERMISSION_CODES.IAM_ROLE_ASSIGNMENT_MANAGE_PLATFORM_ADMIN,
  PERMISSION_CODES.IAM_ROLE_ASSIGNMENT_MANAGE_SUPER_ADMIN,
];

export const canAssignAnyRole = ({ can }: AdminAccess) => ROLE_ASSIGNMENT_PERMISSIONS.some((code) => can(code));

const isSuperAdmin = ({ hasRole }: AdminAccess) => hasRole(ROLE_CODES.SUPER_ADMIN);

const GROUPS: { label: string; items: Entry[] }[] = [
  {
    label: 'People & Access',
    items: [
      {
        key: 'access',
        label: 'Member access',
        href: '/admin/access',
        description: 'Give members a responsibility or change their access.',
        allowed: (a) => a.can(PERMISSION_CODES.IAM_CATALOG_READ) && canAssignAnyRole(a),
      },
      {
        key: 'executive',
        label: 'Executive committee',
        href: '/admin/executive',
        description: 'Assign members to the executive committee.',
        allowed: (a) => a.can(PERMISSION_CODES.IAM_EXECUTIVE_POSITION_MANAGE),
      },
      {
        key: 'coordinators',
        label: 'Batch coordinators',
        href: '/admin/coordinators',
        description: 'View and update batch coordinators.',
        allowed: (a) => a.can(PERMISSION_CODES.IAM_ROLE_ASSIGNMENT_MANAGE_BATCH_ROLES),
      },
      {
        key: 'assignments',
        label: 'Current assignments',
        href: '/admin/assignments',
        description: 'Review who currently holds each responsibility.',
        allowed: (a) => a.can(PERMISSION_CODES.IAM_USER_ACCESS_READ),
      },
    ],
  },
  {
    label: 'Content',
    items: [
      {
        key: 'pages',
        label: 'Pages',
        href: '/admin/pages',
        description: "Edit the association's pages and choose which ones are shown.",
        allowed: (a) => a.can(PERMISSION_CODES.CONTENT_PAGE_MANAGE),
      },
      {
        key: 'newsroom',
        label: 'Newsroom',
        href: '/newsroom',
        description: 'Publish official news and announcements.',
        external: true,
        allowed: (a) => a.can(PERMISSION_CODES.NEWSROOM_POST_MANAGE),
      },
    ],
  },
  {
    label: 'Platform',
    items: [
      {
        key: 'settings',
        label: 'Settings',
        href: '/admin/settings',
        description: 'Manage settings that affect the whole platform.',
        allowed: isSuperAdmin,
      },
      {
        key: 'scholarship',
        label: 'Scholarship',
        href: '/admin/scholarship',
        description: 'Turn the scholarship module on or off and manage test mode.',
        allowed: isSuperAdmin,
      },
    ],
  },
];

export const OVERVIEW: AdminNavItem = {
  key: 'overview',
  label: 'Overview',
  href: '/admin',
  description: 'Everything you can manage, in one place.',
};

/** The admin sections this viewer may open, grouped for the sidebar. Empty when they have none. */
export function getAdminNav(access: AdminAccess): AdminNavGroup[] {
  const groups = GROUPS.map(({ label, items }) => ({
    label,
    items: items.filter((item) => item.allowed(access)).map(({ allowed: _allowed, ...item }) => item),
  })).filter((group) => group.items.length);
  return groups.length ? [{ items: [OVERVIEW] }, ...groups] : [];
}

/** The item a path belongs to: exact match, else the longest admin prefix (so /admin/pages/vision → Pages). */
export function getActiveItem(nav: AdminNavGroup[], pathname: string): AdminNavItem | undefined {
  const path = pathname.replace(/\/+$/, '') || '/';
  const items = nav.flatMap((group) => group.items).filter((item) => !item.external);
  return (
    items.find((item) => item.href === path) ||
    items
      .filter((item) => item.href !== OVERVIEW.href && path.startsWith(`${item.href}/`))
      .sort((a, b) => b.href.length - a.href.length)[0]
  );
}

export const getAdminGroup = (nav: AdminNavGroup[], item?: AdminNavItem) =>
  item ? nav.find((group) => group.items.includes(item)) : undefined;
