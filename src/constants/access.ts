export const ROLE_CODES = {
  MEMBER: 'MEMBER',
  EXECUTIVE_MEMBER: 'EXECUTIVE_MEMBER',
  BATCH_COORDINATOR: 'BATCH_COORDINATOR',
  BATCH_MENTOR: 'BATCH_MENTOR',
  FINANCE_MANAGER: 'FINANCE_MANAGER',
  PLATFORM_ADMIN: 'PLATFORM_ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN',
} as const;

export const ROLE_LABELS: Record<(typeof ROLE_CODES)[keyof typeof ROLE_CODES], string> = {
  [ROLE_CODES.MEMBER]: 'Member',
  [ROLE_CODES.EXECUTIVE_MEMBER]: 'Executive Member',
  [ROLE_CODES.BATCH_COORDINATOR]: 'Batch Coordinator',
  [ROLE_CODES.BATCH_MENTOR]: 'Batch Mentor',
  [ROLE_CODES.FINANCE_MANAGER]: 'Finance Manager',
  [ROLE_CODES.PLATFORM_ADMIN]: 'Platform Admin',
  [ROLE_CODES.SUPER_ADMIN]: 'Super Admin',
};

export const PERMISSION_CODES = {
  MEMBERSHIP_REGISTRATION_APPROVE: 'membership.registration.approve',
  MEMBERSHIP_REGISTRATION_APPROVE_BATCH: 'membership.registration.approve_batch',
  IAM_CATALOG_READ: 'iam.catalog.read',
  IAM_USER_ACCESS_READ: 'iam.user_access.read',
  IAM_ROLE_ASSIGNMENT_MANAGE_BATCH_ROLES: 'iam.role_assignment.manage_batch_roles',
  IAM_ROLE_ASSIGNMENT_MANAGE_FINANCE_MANAGER: 'iam.role_assignment.manage_finance_manager',
  IAM_ROLE_ASSIGNMENT_MANAGE_PLATFORM_ADMIN: 'iam.role_assignment.manage_platform_admin',
  IAM_ROLE_ASSIGNMENT_MANAGE_SUPER_ADMIN: 'iam.role_assignment.manage_super_admin',
  IAM_EXECUTIVE_POSITION_MANAGE: 'iam.executive_position.manage',
  IAM_EXECUTIVE_TERM_MANAGE: 'iam.executive_term.manage',
  IAM_AUDIT_READ_LIMITED: 'iam.audit.read_limited',
  IAM_AUDIT_READ_ALL: 'iam.audit.read_all',
  SYSTEM_FULL_ACCESS: 'system.full_access',
} as const;
