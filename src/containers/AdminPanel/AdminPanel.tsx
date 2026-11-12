'use client';

import React from 'react';
import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import {
  ACCESS_CATALOG_QUERY,
  ASSIGN_EXECUTIVE_POSITION_MUTATION,
  ASSIGN_USER_ROLE_MUTATION,
  BATCH_COORDINATOR_ROLE_ASSIGNMENTS_QUERY,
  EXECUTIVE_POSITION_ASSIGNMENTS_QUERY,
  REVOKE_USER_ROLE_MUTATION,
  ROLE_ASSIGNMENTS_QUERY,
} from '@/apollo/accessOperations';
import AlertDialog, { AlertDialogProps } from '@/components/common/AlertDialog';
import { useGetUserListQuery, useSendMassEmailMutation } from '@/apollo/hooks';
import ProfilePicture from '@/components/common/ProfilePicture';
import Button from '@/components/core/Button';
import ReactSelect from '@/components/core/ReactSelect';
import FormDateTimeField from '@/components/form/FormDateTimeField';
import { PERMISSION_CODES, ROLE_CODES, ROLE_LABELS } from '@/constants/access';
import { useAlert } from '@/context/AlertContext';
import { useAuth } from '@/context/AuthContext';
import { getBatchOptions } from '@/utils/helpers';
import dayjs, { Dayjs } from 'dayjs';
import { useForm } from 'react-hook-form';
import {
  Alert,
  Box,
  Chip,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid2 as Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Skeleton,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { IconSend as PaperPlaneTilt, IconShieldCheck } from '@tabler/icons-react';

const batchRoles = [ROLE_CODES.BATCH_COORDINATOR, ROLE_CODES.BATCH_MENTOR];
const roleUserPageSize = 25;
const activeAssignmentOtherRoles = [ROLE_CODES.FINANCE_MANAGER, ROLE_CODES.PLATFORM_ADMIN, ROLE_CODES.SUPER_ADMIN];
const excludeFacultyBatchFilter = { excludeBatches: [0] };
const assignableRoleCodes = [
  ROLE_CODES.BATCH_MENTOR,
  ROLE_CODES.FINANCE_MANAGER,
  ROLE_CODES.PLATFORM_ADMIN,
  ROLE_CODES.SUPER_ADMIN,
];

type AccessDateForm = {
  validFrom: Dayjs | null;
  validUntil: Dayjs | null;
};

type RoleAssignmentFormState = {
  userId: string;
  roleCode: string;
  scopeBatch: string;
  reason: string;
};

type SelectOption = {
  value: string;
  label: string;
  title?: string;
  summary?: string;
  avatarUrl?: string;
};

const toStartOfDayValue = (value?: Dayjs | null) => (value ? value.startOf('day').toISOString() : null);
const toEndOfDayValue = (value?: Dayjs | null) => (value ? value.endOf('day').toISOString() : null);
const getDateRangeError = (from?: Dayjs | null, until?: Dayjs | null) => {
  if ((from && !from.isValid()) || (until && !until.isValid())) return 'Enter a valid date.';
  if (from && until && until.isBefore(from, 'day')) return 'The end date cannot be before the start date.';
  return null;
};

const roleDescriptions: Record<string, string> = {
  [ROLE_CODES.BATCH_MENTOR]: 'Guide members of a selected batch.',
  [ROLE_CODES.FINANCE_MANAGER]: 'Help manage association finances.',
  [ROLE_CODES.PLATFORM_ADMIN]: 'Help administer the website.',
  [ROLE_CODES.SUPER_ADMIN]: 'Full control of member access and administration.',
};

const FormStep = ({
  number,
  title,
  description,
  children,
}: {
  number: number;
  title: string;
  description?: string;
  children: React.ReactNode;
}) => (
  <Box>
    <Stack direction="row" spacing={1.25} alignItems="flex-start" mb={2}>
      <Chip label={number} size="small" color="primary" sx={{ minWidth: 28, fontWeight: 700 }} />
      <Box>
        <Typography variant="h4" fontWeight={700}>
          {title}
        </Typography>
        {description && (
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        )}
      </Box>
    </Stack>
    <Box sx={{ pl: { xs: 0, sm: 5 } }}>{children}</Box>
  </Box>
);
const defaultAccessDateForm = () => ({
  validFrom: dayjs(),
  validUntil: null,
});

const getDefaultRoleAssignmentForm = (): RoleAssignmentFormState => ({
  userId: '',
  roleCode: ROLE_CODES.BATCH_MENTOR,
  scopeBatch: '',
  reason: '',
});

const getDefaultPositionForm = () => ({
  userId: '',
  batch: '',
  positionCode: 'PRESIDENT',
  reason: '',
});

const getRoleManagementPermission = (roleCode: string) => {
  if (batchRoles.includes(roleCode as any)) return PERMISSION_CODES.IAM_ROLE_ASSIGNMENT_MANAGE_BATCH_ROLES;
  if (roleCode === ROLE_CODES.FINANCE_MANAGER) return PERMISSION_CODES.IAM_ROLE_ASSIGNMENT_MANAGE_FINANCE_MANAGER;
  if (roleCode === ROLE_CODES.PLATFORM_ADMIN) return PERMISSION_CODES.IAM_ROLE_ASSIGNMENT_MANAGE_PLATFORM_ADMIN;
  if (roleCode === ROLE_CODES.SUPER_ADMIN) return PERMISSION_CODES.IAM_ROLE_ASSIGNMENT_MANAGE_SUPER_ADMIN;
  return PERMISSION_CODES.IAM_USER_ACCESS_READ;
};

const getRoleLabel = (role: any) => ROLE_LABELS[role?.code as keyof typeof ROLE_LABELS] || role?.name || role?.code;

const toBatchSelectOptions = () =>
  getBatchOptions()
    .filter((batch) => batch.value > 0)
    .map((batch) => ({
      value: String(batch.value),
      label: batch.label,
    }));

const formatBatch = (batch?: number | null) => (batch === 0 ? 'Faculty' : batch ? `Batch ${batch}` : 'Batch not set');

const getUserAvatarSrc = (user: any) => user?.profileImage || undefined;

const toUserSelectOptions = (users: any[]) =>
  users.map((user: any) => {
    const name = `${user?.firstName || ''} ${user?.lastName || ''}`.trim();
    const batch = formatBatch(user?.batch);
    const summary = [batch, user?.email].filter(Boolean).join(' - ');

    return {
      value: user.id,
      label: [name, summary].filter(Boolean).join(' - '),
      title: name || user?.email || 'Member',
      summary,
      avatarUrl: getUserAvatarSrc(user),
    };
  });

const UserMenuLabel = ({ user, showEmail = false }: { user: any; showEmail?: boolean }) => (
  <ProfilePicture
    id={user?.id}
    src={getUserAvatarSrc(user)}
    title={`${user?.firstName || ''} ${user?.lastName || ''}`}
    summary={
      showEmail ? `${formatBatch(user?.batch)}${user?.email ? ` - ${user.email}` : ''}` : formatBatch(user?.batch)
    }
    size={30}
    containerProps={{ sx: { cursor: 'default' } }}
  />
);

const AssignmentUser = ({ user, showEmail = false }: { user: any; showEmail?: boolean }) => (
  <ProfilePicture
    id={user?.id}
    src={getUserAvatarSrc(user)}
    title={`${user?.firstName || ''} ${user?.lastName || ''}`}
    summary={
      showEmail ? `${formatBatch(user?.batch)}${user?.email ? ` - ${user.email}` : ''}` : formatBatch(user?.batch)
    }
    containerProps={{ sx: { cursor: 'default' } }}
  />
);

const evictRoleAssignmentCaches = (cache: any) => {
  cache.evict({ fieldName: 'roleAssignments' });
  cache.evict({ fieldName: 'getAllBatchCoordinators' });
  cache.gc();
};

const evictExecutiveAssignmentCaches = (cache: any) => {
  cache.evict({ fieldName: 'executivePositionAssignments' });
  cache.evict({ fieldName: 'publicExecutiveCommittee' });
  cache.gc();
};

const AdminPanel = () => {
  const client = useApolloClient();
  const { can, hasRole, user: currentUser } = useAuth();
  const { showAlert } = useAlert();
  const [sendEmail] = useSendMassEmailMutation();
  const canReadAccess = can(PERMISSION_CODES.IAM_USER_ACCESS_READ);
  const canReadCatalog = can(PERMISSION_CODES.IAM_CATALOG_READ);
  const canManageBatchRoles = can(PERMISSION_CODES.IAM_ROLE_ASSIGNMENT_MANAGE_BATCH_ROLES);
  const canManageExecutivePositions = can(PERMISSION_CODES.IAM_EXECUTIVE_POSITION_MANAGE);
  const canAssignAnyRole = assignableRoleCodes.some((roleCode) => can(getRoleManagementPermission(roleCode)));
  const isSuperAdmin = hasRole(ROLE_CODES.SUPER_ADMIN);
  const canSendWelcomeEmail = isSuperAdmin;
  const canUseAdminCenter = canReadAccess || canReadCatalog || canManageBatchRoles || canManageExecutivePositions;
  const [adminTab, setAdminTab] = React.useState('access');
  const [assignmentTab, setAssignmentTab] = React.useState('mentors');
  const [showRoleDetails, setShowRoleDetails] = React.useState(false);
  const [showPositionDetails, setShowPositionDetails] = React.useState(false);
  const adminTabs = [
    ...(canReadAccess && canAssignAnyRole ? [{ value: 'access', label: 'Member access' }] : []),
    ...(canManageExecutivePositions ? [{ value: 'executive', label: 'Executive committee' }] : []),
    ...(canManageBatchRoles ? [{ value: 'coordinators', label: 'Batch coordinators' }] : []),
    ...(canReadAccess ? [{ value: 'assignments', label: 'Current assignments' }] : []),
  ];
  const selectedTab = adminTabs.some((tab) => tab.value === adminTab) ? adminTab : adminTabs[0]?.value;
  const activeAssignmentsExpanded = selectedTab === 'assignments';
  const [selectedBatch, setSelectedBatch] = React.useState('');
  const [addCoordinatorDialogOpen, setAddCoordinatorDialogOpen] = React.useState(false);
  const [newCoordinatorUserId, setNewCoordinatorUserId] = React.useState('');
  const [newCoordinatorReason, setNewCoordinatorReason] = React.useState('');
  const [replacementTarget, setReplacementTarget] = React.useState<any>(null);
  const [replacementUserId, setReplacementUserId] = React.useState('');
  const [replacementReason, setReplacementReason] = React.useState('');
  const [roleUserSearch, setRoleUserSearch] = React.useState('');
  const [roleUsers, setRoleUsers] = React.useState<any[]>([]);
  const [roleUserOffset, setRoleUserOffset] = React.useState(0);
  const [roleUserTotal, setRoleUserTotal] = React.useState(0);
  const [addCoordinatorSaving, setAddCoordinatorSaving] = React.useState(false);
  const [replacementSaving, setReplacementSaving] = React.useState(false);
  const [executiveAssignDialog, setExecutiveAssignDialog] = React.useState<Partial<AlertDialogProps>>({});
  const [roleAssignDialog, setRoleAssignDialog] = React.useState<Partial<AlertDialogProps>>({});
  const [welcomeEmailDialog, setWelcomeEmailDialog] = React.useState<Partial<AlertDialogProps>>({});
  const [roleRemovalDialog, setRoleRemovalDialog] = React.useState<Partial<AlertDialogProps>>({});
  const replacementBatch = replacementTarget?.batch ? String(replacementTarget.batch) : selectedBatch;
  const roleDateForm = useForm<AccessDateForm>({
    defaultValues: defaultAccessDateForm(),
  });
  const positionDateForm = useForm<AccessDateForm>({
    defaultValues: defaultAccessDateForm(),
  });
  const roleDates = roleDateForm.watch();
  const positionDates = positionDateForm.watch();
  const roleDateError = getDateRangeError(roleDates.validFrom || dayjs(), roleDates.validUntil);
  const positionDateError = getDateRangeError(positionDates.validFrom || dayjs(), positionDates.validUntil);
  const roleDateInvalid = Boolean(roleDateError);
  const positionDateInvalid = Boolean(positionDateError);

  const [assignRole, { loading: assigningRole }] = useMutation(ASSIGN_USER_ROLE_MUTATION, {
    refetchQueries: ['roleAssignments', 'batchCoordinatorRoleAssignments', 'viewerAccessContext'],
    awaitRefetchQueries: true,
    update: evictRoleAssignmentCaches,
  });
  const [revokeRole] = useMutation(REVOKE_USER_ROLE_MUTATION, {
    update: evictRoleAssignmentCaches,
  });
  const [assignPosition] = useMutation(ASSIGN_EXECUTIVE_POSITION_MUTATION, {
    update: evictExecutiveAssignmentCaches,
  });

  const {
    data: catalogData,
    loading: catalogLoading,
    error: catalogError,
  } = useQuery(ACCESS_CATALOG_QUERY, {
    skip: !canReadCatalog,
  });
  const {
    data: assignmentData,
    loading: assignmentLoading,
    error: assignmentError,
  } = useQuery(ROLE_ASSIGNMENTS_QUERY, {
    variables: { filter: { active: true } },
    skip: !canReadAccess || !activeAssignmentsExpanded,
  });
  const {
    data: executiveAssignmentData,
    loading: executiveAssignmentLoading,
    error: executiveAssignmentError,
  } = useQuery(EXECUTIVE_POSITION_ASSIGNMENTS_QUERY, {
    skip: !canReadCatalog || (!activeAssignmentsExpanded && !canManageExecutivePositions),
  });
  const {
    data: batchCoordinatorData,
    loading: batchCoordinatorsLoading,
    error: batchCoordinatorError,
  } = useQuery(BATCH_COORDINATOR_ROLE_ASSIGNMENTS_QUERY, {
    variables: {
      options: {
        filter: selectedBatch ? { batch: parseInt(selectedBatch, 10) } : {},
      },
    },
    skip: !canManageBatchRoles,
  });
  const {
    data: selectedBatchUserData,
    loading: selectedBatchUsersLoading,
    error: selectedBatchUsersError,
  } = useGetUserListQuery({
    variables: {
      options: {
        filter: {
          verified: true,
          batch: replacementBatch ? parseInt(replacementBatch, 10) : undefined,
          ...excludeFacultyBatchFilter,
        },
        offset: 0,
        limit: 250,
      },
    },
    skip: !canManageBatchRoles || (!replacementBatch && !addCoordinatorDialogOpen),
  });

  const [roleForm, setRoleForm] = React.useState<RoleAssignmentFormState>(getDefaultRoleAssignmentForm);
  const [positionForm, setPositionForm] = React.useState(getDefaultPositionForm);
  const selectedRoleRequiresBatch = batchRoles.includes(roleForm.roleCode as any);
  const selectedRoleIsMentor = roleForm.roleCode === ROLE_CODES.BATCH_MENTOR;
  const roleReasonRequired = roleForm.roleCode === ROLE_CODES.SUPER_ADMIN;
  const roleUserFilter = React.useMemo(() => {
    const filter: any = { verified: true, ...excludeFacultyBatchFilter };
    const trimmedSearch = roleUserSearch.trim();
    const parsedScopeBatch = roleForm.scopeBatch ? parseInt(roleForm.scopeBatch, 10) : undefined;

    if (trimmedSearch) {
      filter.query = trimmedSearch;
    }

    if (selectedRoleIsMentor) {
      filter.excludeBatches = [0, parsedScopeBatch].filter((batch) => batch !== undefined);
    }

    return filter;
  }, [roleForm.scopeBatch, roleUserSearch, selectedRoleIsMentor]);

  const {
    data: roleUserData,
    loading: roleUsersLoading,
    fetchMore: fetchMoreRoleUsers,
  } = useGetUserListQuery({
    variables: {
      options: {
        filter: roleUserFilter,
        offset: 0,
        limit: roleUserPageSize,
      },
    },
    skip: !canReadAccess || (selectedRoleRequiresBatch && !roleForm.scopeBatch),
    notifyOnNetworkStatusChange: true,
  });

  const { data: executiveBatchUserData, loading: executiveBatchUsersLoading } = useGetUserListQuery({
    variables: {
      options: {
        filter: {
          verified: true,
          batch: positionForm.batch ? parseInt(positionForm.batch, 10) : undefined,
          ...excludeFacultyBatchFilter,
        },
        offset: 0,
        limit: 250,
      },
    },
    skip: !canManageExecutivePositions || !positionForm.batch,
  });
  const batchSelectOptions = React.useMemo(() => toBatchSelectOptions(), []);
  const selectedBatchUsers = React.useMemo(
    () =>
      (selectedBatchUserData?.getUserList?.data || []).filter(
        (user: any) => !user.disabled && user.id !== currentUser?.id
      ),
    [selectedBatchUserData?.getUserList?.data, currentUser?.id]
  );
  const executiveBatchUsers = React.useMemo(
    () =>
      (executiveBatchUserData?.getUserList?.data || []).filter(
        (user: any) => !user.disabled && user.id !== currentUser?.id
      ),
    [executiveBatchUserData?.getUserList?.data, currentUser?.id]
  );
  const roleUserOptions = React.useMemo(
    () => toUserSelectOptions(roleUsers.filter((user: any) => !user.disabled && user.id !== currentUser?.id)),
    [roleUsers, currentUser?.id]
  );
  const executiveUserOptions = React.useMemo(
    () =>
      toUserSelectOptions(
        executiveBatchUsers.filter(
          (user: any) =>
            !(executiveAssignmentData?.executivePositionAssignments || []).some(
              (assignment: any) => assignment.userId === user.id
            )
        )
      ),
    [executiveBatchUsers, executiveAssignmentData?.executivePositionAssignments]
  );
  const selectedRoleBatchOption = batchSelectOptions.find((option) => option.value === roleForm.scopeBatch) || null;
  const selectedRoleUserOption = roleUserOptions.find((option) => option.value === roleForm.userId) || null;
  const selectedExecutiveBatchOption = batchSelectOptions.find((option) => option.value === positionForm.batch) || null;
  const selectedExecutiveUserOption =
    executiveUserOptions.find((option) => option.value === positionForm.userId) || null;
  const roles = React.useMemo(() => {
    const rolesByCode = new Map<string, any>();

    for (const role of catalogData?.systemRoles || []) {
      if (!role?.isActive || !assignableRoleCodes.includes(role.code)) continue;
      if (role.code === ROLE_CODES.SUPER_ADMIN && !isSuperAdmin) continue;
      if (!can(getRoleManagementPermission(role.code))) continue;
      if (!rolesByCode.has(role.code)) rolesByCode.set(role.code, role);
    }

    return assignableRoleCodes.map((roleCode) => rolesByCode.get(roleCode)).filter(Boolean);
  }, [can, catalogData?.systemRoles, isSuperAdmin]);
  React.useEffect(() => {
    if (roles.length && !roles.some((role: any) => role.code === roleForm.roleCode)) {
      setRoleForm((current) => ({ ...current, roleCode: roles[0].code, userId: '' }));
      setRoleUserSearch('');
    }
  }, [roles, roleForm.roleCode]);
  const activeTerm = (catalogData?.executiveTerms || []).find((term: any) => term.status === 'ACTIVE');
  const positions = (catalogData?.executivePositions || []).filter((position: any) => position.isActive);
  React.useEffect(() => {
    if (positions.length && !positions.some((position: any) => position.code === positionForm.positionCode)) {
      setPositionForm((current) => ({ ...current, positionCode: positions[0].code, userId: '' }));
    }
  }, [positions, positionForm.positionCode]);
  const batchCoordinators = batchCoordinatorData?.getAllBatchCoordinators || [];
  const addCoordinatorCandidates = selectedBatchUsers.filter(
    (user: any) => !batchCoordinators.some((coordinator: any) => coordinator.userId === user.id)
  );
  const roleAssignments = assignmentData?.roleAssignments || [];
  const executiveAssignments = executiveAssignmentData?.executivePositionAssignments || [];
  const batchMentorAssignments = roleAssignments.filter(
    (assignment: any) => assignment.role?.code === ROLE_CODES.BATCH_MENTOR
  );
  const activeSuperAdminCount = roleAssignments.filter(
    (assignment: any) => assignment.role?.code === ROLE_CODES.SUPER_ADMIN
  ).length;
  const otherAssignments = roleAssignments.filter((assignment: any) =>
    activeAssignmentOtherRoles.includes(assignment.role?.code)
  );

  React.useEffect(() => {
    const users = (roleUserData?.getUserList?.data || []).filter(Boolean);
    setRoleUsers(users);
    setRoleUserOffset(users.length);
    setRoleUserTotal(roleUserData?.getUserList?.total || 0);
  }, [roleUserData?.getUserList?.data, roleUserData?.getUserList?.total]);

  if (!canUseAdminCenter) {
    return null;
  }

  const closeWelcomeEmailDialog = () => {
    setWelcomeEmailDialog({});
  };

  const executeSendWelcomeEmail = async () => {
    try {
      setWelcomeEmailDialog({
        open: true,
        action: 'loading',
        title: 'Sending Welcome Email',
        message: 'Sending welcome email to members. Please wait...',
      });
      await sendEmail({
        variables: {
          subject: '🙌 New JNVPJAA Portal Awaits – Let’s Go! 🎉 ',
          template: 'newPortalWelcome',
          context: {
            url: 'https://jnvpjaa.org',
          },
        },
      });
      setWelcomeEmailDialog({
        open: true,
        action: 'success',
        title: 'Welcome Email Sent',
        message: 'Welcome email has been sent successfully.',
        onCancel: closeWelcomeEmailDialog,
      });
    } catch (error: any) {
      setWelcomeEmailDialog({
        open: true,
        action: 'error',
        title: 'Sending Failed',
        message: error?.message || 'Welcome email could not be sent.',
        onCancel: closeWelcomeEmailDialog,
      });
    }
  };

  const onSendWelcomeEmail = () => {
    setWelcomeEmailDialog({
      open: true,
      action: 'update',
      title: 'Send Welcome Email?',
      message: 'This will send the welcome email to members. Do you want to continue?',
      onOkay: executeSendWelcomeEmail,
      onCancel: closeWelcomeEmailDialog,
      okayButtonProps: {
        title: 'Send',
      },
    });
  };

  const closeRoleAssignDialog = () => {
    setRoleAssignDialog({});
  };

  const executeAssignRole = async () => {
    const roleDates = roleDateForm.getValues();
    try {
      setRoleAssignDialog({
        open: true,
        action: 'loading',
        title: 'Giving member access',
        message: 'Saving this responsibility. Please wait...',
      });
      await assignRole({
        variables: {
          input: {
            userId: roleForm.userId,
            roleCode: roleForm.roleCode,
            scopeType: selectedRoleRequiresBatch ? 'BATCH' : 'GLOBAL',
            scopeBatch: selectedRoleRequiresBatch ? parseInt(roleForm.scopeBatch, 10) : null,
            validFrom: toStartOfDayValue(roleDates.validFrom) || toStartOfDayValue(dayjs()),
            validUntil: toEndOfDayValue(roleDates.validUntil),
            reason: roleForm.reason,
          },
        },
      });
      setRoleForm(getDefaultRoleAssignmentForm());
      setRoleUserSearch('');
      setRoleUsers([]);
      setRoleUserOffset(0);
      setRoleUserTotal(0);
      roleDateForm.reset(defaultAccessDateForm());
      setRoleAssignDialog({
        open: true,
        action: 'success',
        title: 'Member access updated',
        message: 'The member now has this responsibility.',
        onCancel: closeRoleAssignDialog,
      });
    } catch (error: any) {
      setRoleAssignDialog({
        open: true,
        action: 'error',
        title: 'Could not update member access',
        message: error?.message || 'Please try again.',
        onCancel: closeRoleAssignDialog,
      });
    }
  };

  const onAssignRole = () => {
    if (
      !roleForm.userId ||
      roleDateInvalid ||
      (selectedRoleRequiresBatch && !roleForm.scopeBatch) ||
      (roleReasonRequired && !roleForm.reason.trim())
    )
      return;
    const selectedRole = roles.find((role: any) => role.code === roleForm.roleCode);
    if (!selectedRole) return;
    const selectedUser = roleUsers.find((user: any) => user.id === roleForm.userId);
    const userName =
      `${selectedUser?.firstName || ''} ${selectedUser?.lastName || ''}`.trim() ||
      selectedUser?.email ||
      'the selected member';
    const roleName = getRoleLabel(selectedRole);
    const batchText = selectedRoleRequiresBatch && roleForm.scopeBatch ? ` for Batch ${roleForm.scopeBatch}` : '';

    const dates = roleDateForm.getValues();
    const schedule = `Starts ${dates.validFrom?.format('D MMM YYYY') || 'today'}${dates.validUntil ? ` and ends ${dates.validUntil.format('D MMM YYYY')}` : ' with no end date'}.`;
    setRoleAssignDialog({
      open: true,
      action: 'update',
      title: 'Give this member access?',
      message: `${userName} will become ${roleName}${batchText}. ${schedule}${roleForm.reason.trim() ? ` Reason: ${roleForm.reason.trim()}` : ''}`,
      onOkay: executeAssignRole,
      onCancel: closeRoleAssignDialog,
      okayButtonProps: {
        title: 'Give access',
      },
    });
  };

  const closeExecutiveAssignDialog = () => {
    setExecutiveAssignDialog({});
  };

  const selectedExecutivePosition = positions.find((position: any) => position.code === positionForm.positionCode);
  const selectedExecutiveUser = executiveBatchUsers.find((user: any) => user.id === positionForm.userId);
  const currentExecutivePositionAssignments = executiveAssignments.filter(
    (assignment: any) => assignment?.position?.code === positionForm.positionCode
  );
  const currentExecutivePositionAssignment = currentExecutivePositionAssignments[0];
  const alreadyOnExecutiveCommittee = executiveAssignments.some(
    (assignment: any) => assignment.userId === positionForm.userId
  );

  const refreshRoleAssignmentCaches = () => {
    void client
      .refetchQueries({
        include: ['roleAssignments', 'batchCoordinatorRoleAssignments', 'viewerAccessContext'],
      })
      .catch((error) => {
        console.error('Role assignment cache refresh failed:', error);
      });
  };

  const refreshExecutiveAssignmentCaches = () => {
    void client
      .refetchQueries({
        include: ['executivePositionAssignments', 'publicExecutiveCommittee', 'viewerAccessContext'],
      })
      .catch((error) => {
        console.error('Executive assignment cache refresh failed:', error);
      });
  };

  const executeAssignPosition = async () => {
    const positionDates = positionDateForm.getValues();
    if (!activeTerm?.id) {
      setExecutiveAssignDialog({
        open: true,
        action: 'error',
        title: 'No Active Term',
        message: 'Create and activate an executive term first.',
        onCancel: closeExecutiveAssignDialog,
      });
      return;
    }

    try {
      setExecutiveAssignDialog({
        open: true,
        action: 'loading',
        title: 'Updating committee position',
        message: 'Saving this committee change. Please wait...',
      });
      await assignPosition({
        variables: {
          input: {
            userId: positionForm.userId,
            executiveTermId: activeTerm.id,
            positionCode: positionForm.positionCode,
            validFrom: toStartOfDayValue(positionDates.validFrom) || toStartOfDayValue(dayjs()),
            validUntil: toEndOfDayValue(positionDates.validUntil),
            reason: positionForm.reason,
          },
        },
      });
      setPositionForm(getDefaultPositionForm());
      positionDateForm.reset(defaultAccessDateForm());
      refreshExecutiveAssignmentCaches();
      setExecutiveAssignDialog({
        open: true,
        action: 'success',
        title: 'Committee position updated',
        message: 'The new member now holds this position.',
        onCancel: closeExecutiveAssignDialog,
      });
    } catch (error: any) {
      setExecutiveAssignDialog({
        open: true,
        action: 'error',
        title: 'Could not update committee position',
        message: error?.message || 'Please try again.',
        onCancel: closeExecutiveAssignDialog,
      });
    }
  };

  const onAssignPosition = () => {
    if (
      !selectedExecutivePosition ||
      !positionForm.userId ||
      positionDateInvalid ||
      alreadyOnExecutiveCommittee ||
      executiveAssignmentLoading
    )
      return;
    if (!activeTerm?.id) {
      setExecutiveAssignDialog({
        open: true,
        action: 'error',
        title: 'No Active Term',
        message: 'Create and activate an executive term first.',
        onCancel: closeExecutiveAssignDialog,
      });
      return;
    }

    const dates = positionDateForm.getValues();
    const schedule = `Starts ${dates.validFrom?.format('D MMM YYYY') || 'today'}${dates.validUntil ? ` and ends ${dates.validUntil.format('D MMM YYYY')}` : ' with no end date'}.`;
    setExecutiveAssignDialog({
      open: true,
      action: 'update',
      title: 'Confirm committee change?',
      message: `${selectedExecutiveUser ? `${selectedExecutiveUser.firstName || ''} ${selectedExecutiveUser.lastName || ''}`.trim() : 'The selected member'} will hold the ${selectedExecutivePosition?.name || positionForm.positionCode} position.${selectedExecutivePosition?.isSingleSeat && currentExecutivePositionAssignment?.user ? ` This replaces ${getAssignmentUserName(currentExecutivePositionAssignment)}.` : ''} ${schedule}${positionForm.reason.trim() ? ` Reason: ${positionForm.reason.trim()}` : ''}`,
      onOkay: executeAssignPosition,
      onCancel: closeExecutiveAssignDialog,
      okayButtonProps: {
        title: 'Confirm change',
      },
    });
  };

  const closeReplacementDialog = (force = false) => {
    if (replacementSaving && !force) return;
    setReplacementTarget(null);
    setReplacementUserId('');
    setReplacementReason('');
  };

  const closeAddCoordinatorDialog = (force = false) => {
    if (addCoordinatorSaving && !force) return;
    setAddCoordinatorDialogOpen(false);
    setNewCoordinatorUserId('');
    setNewCoordinatorReason('');
  };

  const addBatchCoordinator = async () => {
    if (!selectedBatch || !addCoordinatorCandidates.some((user: any) => user.id === newCoordinatorUserId)) return;

    try {
      setAddCoordinatorSaving(true);
      await assignRole({
        variables: {
          input: {
            userId: newCoordinatorUserId,
            roleCode: ROLE_CODES.BATCH_COORDINATOR,
            scopeType: 'BATCH',
            scopeBatch: parseInt(selectedBatch, 10),
            reason: newCoordinatorReason || null,
          },
        },
      });
      closeAddCoordinatorDialog(true);
      showAlert({ visible: true, type: 'success', message: 'Batch coordinator added successfully.' });
    } catch (error: any) {
      showAlert({ visible: true, type: 'error', message: error?.message || 'Adding coordinator failed.' });
    } finally {
      setAddCoordinatorSaving(false);
    }
  };

  const replaceBatchCoordinator = async () => {
    if (!replacementTarget?.id || !replacementTarget?.batch || !replacementUserId) return;

    try {
      setReplacementSaving(true);
      await revokeRole({
        variables: {
          input: {
            assignmentId: replacementTarget.id,
            reason: replacementReason || null,
          },
        },
      });
      refreshRoleAssignmentCaches();
      await assignRole({
        variables: {
          input: {
            userId: replacementUserId,
            roleCode: ROLE_CODES.BATCH_COORDINATOR,
            scopeType: 'BATCH',
            scopeBatch: replacementTarget.batch,
            reason: replacementReason || null,
          },
        },
      });
      closeReplacementDialog(true);
      showAlert({ visible: true, type: 'success', message: 'Batch coordinator replaced successfully.' });
    } catch (error: any) {
      showAlert({ visible: true, type: 'error', message: error?.message || 'Replacement failed.' });
    } finally {
      setReplacementSaving(false);
    }
  };

  const closeRoleRemovalDialog = () => {
    setRoleRemovalDialog({});
  };

  const getAssignmentUserName = (assignment: any) =>
    `${assignment?.user?.firstName || ''} ${assignment?.user?.lastName || ''}`.trim() || 'this member';

  const executeRemoveRoleAssignment = async (assignment: any) => {
    try {
      setRoleRemovalDialog({
        open: true,
        action: 'loading',
        title: 'Removing member access',
        message: `Removing ${getRoleLabel(assignment.role)} from ${getAssignmentUserName(assignment)}. Please wait...`,
      });
      await revokeRole({
        variables: {
          input: {
            assignmentId: assignment.id,
            reason: null,
          },
        },
      });
      refreshRoleAssignmentCaches();
      setRoleRemovalDialog({
        open: true,
        action: 'success',
        title: 'Member access removed',
        message: `${getAssignmentUserName(assignment)} no longer has the ${getRoleLabel(assignment.role)} responsibility.`,
        onCancel: closeRoleRemovalDialog,
      });
    } catch (error: any) {
      setRoleRemovalDialog({
        open: true,
        action: 'error',
        title: 'Could not remove member access',
        message: error?.message || 'Please try again.',
        onCancel: closeRoleRemovalDialog,
      });
    }
  };

  const onRemoveRoleAssignment = (assignment: any) => {
    if (assignment?.role?.code === ROLE_CODES.SUPER_ADMIN && activeSuperAdminCount <= 1) {
      setRoleRemovalDialog({
        open: true,
        action: 'error',
        title: 'Cannot Remove Super Admin',
        message: 'At least one active Super Admin must remain.',
        onCancel: closeRoleRemovalDialog,
      });
      return;
    }

    setRoleRemovalDialog({
      open: true,
      action: 'delete',
      title: 'Remove this responsibility?',
      message: `${getAssignmentUserName(assignment)} will no longer have ${getRoleLabel(assignment.role)} access.`,
      onOkay: () => executeRemoveRoleAssignment(assignment),
      onCancel: closeRoleRemovalDialog,
      okayButtonProps: {
        title: 'Remove',
      },
    });
  };

  const renderRoleAssignment = (assignment: any, allowRemove = false) => {
    const isLastSuperAdmin = assignment?.role?.code === ROLE_CODES.SUPER_ADMIN && activeSuperAdminCount <= 1;
    const canRemoveAssignment = allowRemove && can(getRoleManagementPermission(assignment?.role?.code));

    return (
      <Stack
        key={assignment.id}
        direction={{ xs: 'column', sm: 'row' }}
        gap={1}
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        justifyContent="space-between"
      >
        <AssignmentUser user={assignment.user} />
        <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
          <Chip label={getRoleLabel(assignment.role)} size="small" />
          {assignment.scopeBatch !== null && assignment.scopeBatch !== undefined && (
            <Chip label={`Batch ${assignment.scopeBatch}`} size="small" variant="outlined" />
          )}
          {canRemoveAssignment && (
            <Tooltip title={isLastSuperAdmin ? 'At least one active Super Admin must remain' : 'Remove assignment'}>
              <span>
                <Button
                  title="Remove access"
                  size="small"
                  color="error"
                  variant="text"
                  disabled={isLastSuperAdmin}
                  onClick={() => onRemoveRoleAssignment(assignment)}
                />
              </span>
            </Tooltip>
          )}
        </Stack>
      </Stack>
    );
  };

  const renderAssignmentSkeleton = () => (
    <Stack spacing={1.5}>
      {[0, 1, 2].map((item) => (
        <Stack key={item} direction="row" spacing={1.5} alignItems="center" justifyContent="space-between">
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Skeleton variant="circular" width={40} height={40} />
            <Stack spacing={0.5}>
              <Skeleton variant="text" width={160} />
              <Skeleton variant="text" width={110} />
            </Stack>
          </Stack>
          <Skeleton variant="rounded" width={100} height={24} />
        </Stack>
      ))}
    </Stack>
  );

  const renderNoAssignments = (message: string) => <Typography color="grey.700">{message}</Typography>;

  const renderAssignmentTabContent = () => {
    if (assignmentTab === 'mentors') {
      if (assignmentLoading) return renderAssignmentSkeleton();
      if (assignmentError)
        return <Alert severity="error">Could not load batch mentors. Please try refreshing the page.</Alert>;
      if (!batchMentorAssignments.length) return renderNoAssignments('No batch mentors are currently listed.');
      return batchMentorAssignments.map((assignment: any) => renderRoleAssignment(assignment, true));
    }

    if (assignmentTab === 'executive') {
      if (executiveAssignmentLoading) return renderAssignmentSkeleton();
      if (executiveAssignmentError)
        return <Alert severity="error">Could not load the executive committee. Please try refreshing the page.</Alert>;
      if (!executiveAssignments.length)
        return renderNoAssignments('No executive committee members are currently listed.');
      return executiveAssignments.map((assignment: any) => (
        <Stack
          key={assignment.id}
          direction={{ xs: 'column', sm: 'row' }}
          gap={1}
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          justifyContent="space-between"
        >
          <AssignmentUser user={assignment.user} />
          <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
            <Chip label={assignment.position?.name || assignment.position?.code} size="small" />
            <Chip label={assignment.executiveTerm?.name || 'Active term'} size="small" variant="outlined" />
          </Stack>
        </Stack>
      ));
    }

    if (assignmentLoading) return renderAssignmentSkeleton();
    if (assignmentError)
      return <Alert severity="error">Could not load responsibilities. Please try refreshing the page.</Alert>;
    if (!otherAssignments.length) return renderNoAssignments('No other responsibilities are currently assigned.');
    return otherAssignments.map((assignment: any) => renderRoleAssignment(assignment, true));
  };

  const { open: executiveAssignDialogOpen, ...executiveAssignDialogProps } = executiveAssignDialog;
  const { open: roleAssignDialogOpen, ...roleAssignDialogProps } = roleAssignDialog;
  const { open: welcomeEmailDialogOpen, ...welcomeEmailDialogProps } = welcomeEmailDialog;
  const { open: roleRemovalDialogOpen, ...roleRemovalDialogProps } = roleRemovalDialog;

  return (
    <Box width="100%" p={{ xs: 2, md: 4 }}>
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={2} mb={3}>
        <Box>
          <Typography variant="h1">Admin Center</Typography>
          <Typography color="grey.700">Manage member access and committee responsibilities.</Typography>
        </Box>
      </Stack>

      {adminTabs.length > 0 ? (
        <Paper variant="outlined" sx={{ mb: 3, borderRadius: 2, overflow: 'hidden' }}>
          <Tabs
            value={selectedTab}
            onChange={(_, value) => setAdminTab(value)}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            aria-label="Admin Center sections"
            sx={{ px: { xs: 1, md: 2 }, borderBottom: 1, borderColor: 'divider' }}
          >
            {adminTabs.map((tab) => (
              <Tab key={tab.value} value={tab.value} label={tab.label} />
            ))}
          </Tabs>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems={{ sm: 'center' }}
            gap={1}
            sx={{ px: 2, py: 1.5 }}
          >
            <Typography color="text.secondary" variant="body2">
              {selectedTab === 'access' && 'Give members a responsibility or change their access.'}
              {selectedTab === 'executive' && 'Assign members to the executive committee.'}
              {selectedTab === 'coordinators' && 'View and update batch coordinators.'}
              {selectedTab === 'assignments' && 'Review who currently holds each responsibility.'}
            </Typography>
            {selectedTab === 'access' && canSendWelcomeEmail && (
              <Button
                title="Send Welcome Email"
                size="small"
                onClick={onSendWelcomeEmail}
                startIcon={<PaperPlaneTilt size={18} />}
              />
            )}
          </Stack>
        </Paper>
      ) : (
        <Alert severity="info" sx={{ mb: 2 }}>
          No administration tasks are available for your account.
        </Alert>
      )}

      <Grid container spacing={2}>
        {selectedTab === 'access' && catalogLoading && (
          <Grid size={12} role="tabpanel" aria-label="Member access">
            <Skeleton variant="rounded" height={180} sx={{ maxWidth: 760 }} />
          </Grid>
        )}
        {selectedTab === 'access' && catalogError && (
          <Grid size={12} role="tabpanel" aria-label="Member access">
            <Alert severity="error">
              Could not load the available responsibilities. Please try refreshing the page.
            </Alert>
          </Grid>
        )}
        {selectedTab === 'access' && !catalogLoading && !catalogError && !roles.length && (
          <Grid size={12} role="tabpanel" aria-label="Member access">
            <Alert severity="info">You do not currently have access to assign member responsibilities.</Alert>
          </Grid>
        )}
        {selectedTab === 'access' && !catalogLoading && !catalogError && roles.length > 0 && canReadAccess && (
          <Grid size={12} role="tabpanel" aria-label="Member access">
            <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 }, borderRadius: 2, maxWidth: 760 }}>
              <Typography variant="h3" mb={2}>
                Give a member a responsibility
              </Typography>
              <Stack spacing={3}>
                <FormStep
                  number={1}
                  title="Choose the responsibility"
                  description="Select what this member should be able to do."
                >
                  <FormControl size="small" fullWidth>
                    <InputLabel>Responsibility</InputLabel>
                    <Select
                      label="Responsibility"
                      value={roles.some((role: any) => role.code === roleForm.roleCode) ? roleForm.roleCode : ''}
                      renderValue={(value) =>
                        getRoleLabel(roles.find((role: any) => role.code === value)) || 'Choose a responsibility'
                      }
                      onChange={(event) => {
                        setRoleForm((prev) => ({ ...prev, roleCode: event.target.value, userId: '' }));
                        if (event.target.value === ROLE_CODES.SUPER_ADMIN) setShowRoleDetails(true);
                        setRoleUserSearch('');
                        setRoleUsers([]);
                        setRoleUserOffset(0);
                        setRoleUserTotal(0);
                      }}
                    >
                      {roles.map((role: any) => (
                        <MenuItem key={role.code} value={role.code}>
                          <Box py={0.5}>
                            <Typography variant="body2" fontWeight={600}>
                              {getRoleLabel(role)}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {roleDescriptions[role.code]}
                            </Typography>
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {roleForm.roleCode === ROLE_CODES.SUPER_ADMIN && (
                    <Alert severity="warning" sx={{ mt: 1.5 }}>
                      This gives full administration access. Choose a trusted member and include a reason below.
                    </Alert>
                  )}
                </FormStep>
                <Divider />
                <FormStep
                  number={2}
                  title="Choose the person"
                  description={
                    selectedRoleRequiresBatch
                      ? 'Choose the batch first, then select an approved member.'
                      : 'Search for an approved member by name.'
                  }
                >
                  <Grid container spacing={1}>
                    {selectedRoleRequiresBatch && (
                      <Grid size={{ xs: 12, sm: 5 }}>
                        <Typography variant="caption" color="text.secondary">
                          {selectedRoleIsMentor ? 'Batch to mentor' : 'Batch they will represent'}
                        </Typography>
                        <ReactSelect
                          label={selectedRoleIsMentor ? 'Batch to mentor' : 'Batch they will represent'}
                          options={batchSelectOptions}
                          value={selectedRoleBatchOption}
                          placeholder="Choose a batch"
                          size="small"
                          isSearchable
                          onChange={(option) => {
                            const selected = option as SelectOption | null;
                            setRoleForm((prev) => ({
                              ...prev,
                              scopeBatch: selected?.value || '',
                              userId: '',
                            }));
                            setRoleUserSearch('');
                            setRoleUsers([]);
                            setRoleUserOffset(0);
                            setRoleUserTotal(0);
                          }}
                        />
                      </Grid>
                    )}
                    <Grid size={{ xs: 12, sm: selectedRoleRequiresBatch ? 7 : 12 }}>
                      <Typography variant="caption" color="text.secondary">
                        Member
                      </Typography>
                      <ReactSelect
                        label="Member"
                        options={roleUserOptions}
                        value={selectedRoleUserOption}
                        placeholder={
                          selectedRoleRequiresBatch && !roleForm.scopeBatch
                            ? 'Select batch first'
                            : selectedRoleIsMentor
                              ? 'Search for a member from another batch'
                              : 'Search for a member'
                        }
                        size="small"
                        isSearchable
                        showAvatars
                        useServerSearch
                        isLoading={roleUsersLoading}
                        isDisabled={selectedRoleRequiresBatch && !roleForm.scopeBatch}
                        noOptionsMessage={
                          selectedRoleRequiresBatch && !roleForm.scopeBatch
                            ? 'Select a batch first'
                            : selectedRoleIsMentor
                              ? 'No eligible member found'
                              : 'No approved member found'
                        }
                        onInputChange={setRoleUserSearch}
                        onFetchMore={() => {
                          if (roleUsersLoading || roleUsers.length >= roleUserTotal) return;
                          void fetchMoreRoleUsers({
                            variables: {
                              options: {
                                filter: roleUserFilter,
                                offset: roleUserOffset,
                                limit: roleUserPageSize,
                              },
                            },
                          }).then((result) => {
                            const nextUsers = (result.data?.getUserList?.data || []).filter(Boolean);
                            setRoleUserTotal(result.data?.getUserList?.total || 0);
                            setRoleUserOffset((prev) => prev + nextUsers.length);
                            setRoleUsers((prev) => {
                              const usersById = new Map(prev.map((user: any) => [user.id, user]));
                              nextUsers.forEach((user: any) => usersById.set(user.id, user));
                              return Array.from(usersById.values());
                            });
                          });
                        }}
                        onChange={(option) => {
                          const selected = option as SelectOption | null;
                          setRoleForm((prev) => ({ ...prev, userId: selected?.value || '' }));
                        }}
                      />
                    </Grid>
                  </Grid>
                  {selectedRoleIsMentor && (
                    <Typography variant="caption" color="text.secondary">
                      The mentor must be from a different batch.
                    </Typography>
                  )}
                </FormStep>
                <Divider />
                <FormStep
                  number={3}
                  title="Timing and note"
                  description={
                    roleDateError
                      ? 'Check the dates below.'
                      : `Starts ${roleDates.validFrom?.format('D MMM YYYY') || 'today'}${roleDates.validUntil ? `; ends ${roleDates.validUntil.format('D MMM YYYY')}` : ' and has no end date'}.`
                  }
                >
                  <Button
                    title={showRoleDetails ? 'Hide timing and note' : 'Change timing or add a note'}
                    variant="text"
                    size="small"
                    aria-expanded={showRoleDetails}
                    aria-controls="role-timing-note"
                    onClick={() => setShowRoleDetails((value) => !value)}
                  />
                  <Collapse id="role-timing-note" in={showRoleDetails}>
                    <Stack spacing={2} sx={{ pt: 2 }}>
                      <Grid container spacing={1}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <FormDateTimeField
                            control={roleDateForm.control}
                            name="validFrom"
                            isDateOnly
                            inputProps={{
                              label: 'Starts on',
                              size: 'small',
                            }}
                          />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <FormDateTimeField
                            control={roleDateForm.control}
                            name="validUntil"
                            isDateOnly
                            inputProps={{
                              label: 'Ends on (optional)',
                              size: 'small',
                            }}
                          />
                        </Grid>
                      </Grid>
                      <Typography variant="caption" color="text.secondary">
                        If you choose an end date, access stays active through that day.
                      </Typography>
                      <TextField
                        size="small"
                        label={
                          roleReasonRequired
                            ? 'Why are you giving full access?'
                            : 'Why are you giving this responsibility? (optional)'
                        }
                        placeholder="A short note for the activity history"
                        multiline
                        minRows={2}
                        value={roleForm.reason}
                        onChange={(event) => setRoleForm((prev) => ({ ...prev, reason: event.target.value }))}
                      />
                    </Stack>
                  </Collapse>
                </FormStep>
                {roleDateError && <Alert severity="error">{roleDateError}</Alert>}
                <Box sx={{ borderRadius: 1.5, bgcolor: 'action.hover', p: 2 }}>
                  <Typography fontWeight={700} mb={0.5}>
                    Before you continue
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {roleForm.userId
                      ? `${roleUserOptions.find((option) => option.value === roleForm.userId)?.title || 'This member'} will become ${getRoleLabel(roles.find((role: any) => role.code === roleForm.roleCode))}${selectedRoleRequiresBatch ? ` for Batch ${roleForm.scopeBatch}` : ''}.`
                      : 'Choose a member to see the change you are making.'}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="flex-end">
                  <Button
                    title="Review and give access"
                    onClick={onAssignRole}
                    loading={assigningRole}
                    disabled={
                      !roleForm.userId ||
                      !roles.some((role: any) => role.code === roleForm.roleCode) ||
                      roleDateInvalid ||
                      (selectedRoleRequiresBatch && !roleForm.scopeBatch) ||
                      (roleReasonRequired && !roleForm.reason.trim())
                    }
                  />
                </Box>
              </Stack>
            </Paper>
          </Grid>
        )}

        {selectedTab === 'executive' && catalogLoading && (
          <Grid size={12} role="tabpanel" aria-label="Executive committee">
            <Skeleton variant="rounded" height={180} sx={{ maxWidth: 760 }} />
          </Grid>
        )}
        {selectedTab === 'executive' && catalogError && (
          <Grid size={12} role="tabpanel" aria-label="Executive committee">
            <Alert severity="error">Could not load committee positions. Please try refreshing the page.</Alert>
          </Grid>
        )}
        {selectedTab === 'executive' && !catalogLoading && !catalogError && canManageExecutivePositions && (
          <Grid size={12} role="tabpanel" aria-label="Executive committee">
            <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 }, borderRadius: 2, maxWidth: 760 }}>
              <Typography variant="h3" mb={2}>
                Update an executive position
              </Typography>
              <Stack spacing={3}>
                {!catalogLoading && !activeTerm && (
                  <Alert severity="warning">
                    There is no active committee term. A Super Admin needs to set one up before you can make an
                    assignment.
                  </Alert>
                )}
                {!positions.length && (
                  <Alert severity="info">No executive positions are available to assign yet.</Alert>
                )}
                <FormStep
                  number={1}
                  title="Choose the position"
                  description="See who currently holds it before making a change."
                >
                  <FormControl size="small" fullWidth>
                    <InputLabel>Executive position</InputLabel>
                    <Select
                      label="Executive position"
                      value={
                        positions.some((position: any) => position.code === positionForm.positionCode)
                          ? positionForm.positionCode
                          : ''
                      }
                      onChange={(event) => setPositionForm((prev) => ({ ...prev, positionCode: event.target.value }))}
                    >
                      {positions.map((position: any) => (
                        <MenuItem key={position.code} value={position.code}>
                          {position.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Box
                    sx={{
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 1,
                      px: 1.5,
                      py: 1,
                      minHeight: 58,
                    }}
                  >
                    <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                      {selectedExecutivePosition?.isSingleSeat ? 'Current member' : 'Current members'}
                    </Typography>
                    {executiveAssignmentLoading ? (
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Skeleton variant="circular" width={36} height={36} />
                        <Box flex={1}>
                          <Skeleton width="45%" height={18} />
                          <Skeleton width="30%" height={16} />
                        </Box>
                      </Stack>
                    ) : executiveAssignmentError ? (
                      <Alert severity="error">
                        Could not check who currently holds this position. Please try refreshing the page.
                      </Alert>
                    ) : currentExecutivePositionAssignments.length ? (
                      <Stack spacing={1}>
                        {currentExecutivePositionAssignments.map((assignment: any) => (
                          <AssignmentUser key={assignment.id} user={assignment.user} />
                        ))}
                      </Stack>
                    ) : (
                      <Typography color="text.secondary" fontSize={14}>
                        This position is vacant.
                      </Typography>
                    )}
                  </Box>
                  {selectedExecutivePosition?.isSingleSeat && currentExecutivePositionAssignment?.user && (
                    <Alert severity="info" sx={{ mt: 1.5 }}>
                      Saving a new member in this position will replace the current member.
                    </Alert>
                  )}
                </FormStep>
                <Divider />
                <FormStep
                  number={2}
                  title="Choose the new member"
                  description="Choose their batch, then search for the person."
                >
                  <Grid container spacing={1}>
                    <Grid size={{ xs: 12, sm: 5 }}>
                      <Typography variant="caption" color="text.secondary">
                        Member&apos;s batch
                      </Typography>
                      <ReactSelect
                        label="Member's batch"
                        options={batchSelectOptions}
                        value={selectedExecutiveBatchOption}
                        placeholder="Choose a batch"
                        size="small"
                        isSearchable
                        onChange={(option) => {
                          const selected = option as SelectOption | null;
                          setPositionForm((prev) => ({
                            ...prev,
                            batch: selected?.value || '',
                            userId: '',
                          }));
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 7 }}>
                      <Typography variant="caption" color="text.secondary">
                        Member
                      </Typography>
                      <ReactSelect
                        label="Member"
                        options={executiveUserOptions}
                        value={selectedExecutiveUserOption}
                        placeholder={positionForm.batch ? 'Search active member' : 'Select batch first'}
                        size="small"
                        isSearchable
                        showAvatars
                        isLoading={executiveBatchUsersLoading}
                        onChange={(option) => {
                          const selected = option as SelectOption | null;
                          setPositionForm((prev) => ({ ...prev, userId: selected?.value || '' }));
                        }}
                      />
                    </Grid>
                  </Grid>
                </FormStep>
                <Divider />
                <FormStep
                  number={3}
                  title="Timing and note"
                  description={
                    positionDateError
                      ? 'Check the dates below.'
                      : `Starts ${positionDates.validFrom?.format('D MMM YYYY') || 'today'}${positionDates.validUntil ? `; ends ${positionDates.validUntil.format('D MMM YYYY')}` : ' and has no end date'}.`
                  }
                >
                  <Button
                    title={showPositionDetails ? 'Hide timing and note' : 'Change timing or add a note'}
                    variant="text"
                    size="small"
                    aria-expanded={showPositionDetails}
                    aria-controls="position-timing-note"
                    onClick={() => setShowPositionDetails((value) => !value)}
                  />
                  <Collapse id="position-timing-note" in={showPositionDetails}>
                    <Stack spacing={2} sx={{ pt: 2 }}>
                      <Grid container spacing={1}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <FormDateTimeField
                            control={positionDateForm.control}
                            name="validFrom"
                            isDateOnly
                            inputProps={{
                              label: 'Starts on',
                              size: 'small',
                            }}
                          />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <FormDateTimeField
                            control={positionDateForm.control}
                            name="validUntil"
                            isDateOnly
                            inputProps={{
                              label: 'Ends on (optional)',
                              size: 'small',
                            }}
                          />
                        </Grid>
                      </Grid>
                      <Typography variant="caption" color="text.secondary">
                        If you choose an end date, the position lasts through that day.
                      </Typography>
                      <TextField
                        size="small"
                        label="Why are you making this change? (optional)"
                        placeholder="A short note for the activity history"
                        multiline
                        minRows={2}
                        value={positionForm.reason}
                        onChange={(event) => setPositionForm((prev) => ({ ...prev, reason: event.target.value }))}
                      />
                    </Stack>
                  </Collapse>
                </FormStep>
                {positionDateError && <Alert severity="error">{positionDateError}</Alert>}
                <Box sx={{ borderRadius: 1.5, bgcolor: 'action.hover', p: 2 }}>
                  <Typography fontWeight={700} mb={0.5}>
                    Before you continue
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {positionForm.userId
                      ? alreadyOnExecutiveCommittee
                        ? 'This member already has a committee position. Choose someone else to make a change.'
                        : `${selectedExecutiveUser?.firstName || ''} ${selectedExecutiveUser?.lastName || ''} will hold the ${selectedExecutivePosition?.name || 'selected'} position${selectedExecutivePosition?.isSingleSeat && currentExecutivePositionAssignment?.user ? `, replacing ${currentExecutivePositionAssignment.user.firstName || ''} ${currentExecutivePositionAssignment.user.lastName || ''}` : ''}.`
                      : 'Choose a member to see the change you are making.'}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="flex-end">
                  <Button
                    title="Review committee change"
                    onClick={onAssignPosition}
                    disabled={
                      !activeTerm ||
                      !selectedExecutivePosition ||
                      !positionForm.batch ||
                      !positionForm.userId ||
                      positionDateInvalid ||
                      alreadyOnExecutiveCommittee ||
                      executiveAssignmentLoading ||
                      Boolean(executiveAssignmentError)
                    }
                  />
                </Box>
              </Stack>
            </Paper>
          </Grid>
        )}
      </Grid>

      {selectedTab === 'coordinators' && canManageBatchRoles && (
        <Paper
          variant="outlined"
          sx={{ p: { xs: 2, md: 3 }, borderRadius: 2 }}
          role="tabpanel"
          aria-label="Batch coordinators"
        >
          <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between" mb={2}>
            <Stack direction="row" spacing={1} alignItems="center">
              <IconShieldCheck size={20} />
              <Typography variant="h3">Batch coordinators</Typography>
            </Stack>
            <Button
              title="Add coordinator"
              size="small"
              onClick={() => setAddCoordinatorDialogOpen(true)}
              disabled={!selectedBatch || batchCoordinatorsLoading || Boolean(batchCoordinatorError)}
            />
          </Stack>
          <FormControl size="small" sx={{ minWidth: 220, mb: 2 }}>
            <InputLabel>Show batch</InputLabel>
            <Select label="Show batch" value={selectedBatch} onChange={(event) => setSelectedBatch(event.target.value)}>
              <MenuItem value="">All batches</MenuItem>
              {getBatchOptions()
                .filter((batch) => batch.value > 0)
                .map((batch) => (
                  <MenuItem key={batch.value} value={String(batch.value)}>
                    {batch.label}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          {!selectedBatch && (
            <Typography variant="body2" color="text.secondary" mb={2}>
              Choose a batch above to add a coordinator.
            </Typography>
          )}
          <Stack spacing={1} divider={<Divider flexItem />}>
            {batchCoordinatorsLoading && renderAssignmentSkeleton()}
            {batchCoordinatorError && (
              <Alert severity="error">Could not load coordinators. Please try refreshing the page.</Alert>
            )}
            {!batchCoordinatorsLoading &&
              !batchCoordinatorError &&
              batchCoordinators.map((coordinator: any) => (
                <Stack
                  key={coordinator.id}
                  direction={{ xs: 'column', sm: 'row' }}
                  gap={1}
                  alignItems={{ xs: 'flex-start', sm: 'center' }}
                  justifyContent="space-between"
                >
                  <AssignmentUser user={coordinator.user} showEmail />
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Chip label={`Batch ${coordinator.batch}`} size="small" variant="outlined" />
                    <Button
                      title="Replace"
                      size="small"
                      variant="outlined"
                      onClick={() => setReplacementTarget(coordinator)}
                    />
                  </Stack>
                </Stack>
              ))}
            {!batchCoordinatorsLoading && !batchCoordinatorError && !batchCoordinators.length && (
              <Alert severity="info">
                {selectedBatch
                  ? 'No coordinators are listed for this batch. Choose “Add coordinator” to appoint one.'
                  : 'No coordinators are listed yet. Choose a batch to appoint one.'}
              </Alert>
            )}
          </Stack>
        </Paper>
      )}

      {selectedTab === 'assignments' && canReadAccess && (
        <Paper
          variant="outlined"
          sx={{ p: { xs: 2, md: 3 }, borderRadius: 2 }}
          role="tabpanel"
          aria-label="Current assignments"
        >
          <Typography variant="h3" mb={2}>
            Current assignments
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            See who currently holds each responsibility. You can remove access where your permissions allow it.
          </Typography>
          <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 280 }, mb: 3 }}>
            <InputLabel>Show responsibility</InputLabel>
            <Select
              label="Show responsibility"
              value={assignmentTab}
              onChange={(event) => setAssignmentTab(event.target.value)}
            >
              <MenuItem value="mentors">Batch mentors</MenuItem>
              <MenuItem value="executive">Executive committee</MenuItem>
              <MenuItem value="other">Other responsibilities</MenuItem>
            </Select>
          </FormControl>
          <Stack spacing={1} divider={<Divider flexItem />}>
            {renderAssignmentTabContent()}
          </Stack>
        </Paper>
      )}

      <Dialog open={addCoordinatorDialogOpen} onClose={() => closeAddCoordinatorDialog()} fullWidth maxWidth="sm">
        <DialogTitle>Add a batch coordinator</DialogTitle>
        <DialogContent>
          <Typography color="text.secondary" mb={2}>
            Choose an approved member from Batch {selectedBatch}. They will be able to coordinate this batch.
          </Typography>
          <FormControl fullWidth size="small">
            <InputLabel id="new-coordinator-label">Member</InputLabel>
            <Select
              labelId="new-coordinator-label"
              label="Member"
              value={newCoordinatorUserId}
              onChange={(event) => setNewCoordinatorUserId(event.target.value)}
            >
              {addCoordinatorCandidates.map((user: any) => (
                <MenuItem key={user.id} value={user.id}>
                  <UserMenuLabel user={user} showEmail />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {selectedBatchUsersLoading && <Skeleton variant="rounded" height={40} sx={{ mt: 1.5 }} />}
          {selectedBatchUsersError && (
            <Alert severity="error" sx={{ mt: 1.5 }}>
              Could not load members. Please try again.
            </Alert>
          )}
          {!selectedBatchUsersLoading && !selectedBatchUsersError && !addCoordinatorCandidates.length && (
            <Alert severity="info" sx={{ mt: 1.5 }}>
              No other approved members are available to add as coordinators in this batch.
            </Alert>
          )}
          <TextField
            fullWidth
            label="Why are you adding this coordinator? (optional)"
            placeholder="A short note for the activity history"
            value={newCoordinatorReason}
            onChange={(event) => setNewCoordinatorReason(event.target.value)}
            multiline
            minRows={2}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button
            title="Cancel"
            variant="outlined"
            color="secondary"
            disabled={addCoordinatorSaving}
            onClick={() => closeAddCoordinatorDialog()}
          />
          <Button
            title="Add coordinator"
            loading={addCoordinatorSaving}
            disabled={
              !newCoordinatorUserId ||
              !addCoordinatorCandidates.some((user: any) => user.id === newCoordinatorUserId) ||
              addCoordinatorSaving ||
              selectedBatchUsersLoading ||
              batchCoordinatorsLoading ||
              Boolean(batchCoordinatorError) ||
              Boolean(selectedBatchUsersError)
            }
            onClick={addBatchCoordinator}
          />
        </DialogActions>
      </Dialog>

      <Dialog open={Boolean(replacementTarget)} onClose={() => closeReplacementDialog()} fullWidth maxWidth="sm">
        <DialogTitle>Replace batch coordinator</DialogTitle>
        <DialogContent>
          <Typography color="text.secondary" mb={2}>
            Choose a new coordinator for Batch {replacementTarget?.batch}. {getAssignmentUserName(replacementTarget)}{' '}
            will lose coordinator access.
          </Typography>
          <FormControl fullWidth size="small">
            <InputLabel id="replacement-coordinator-label">New coordinator</InputLabel>
            <Select
              labelId="replacement-coordinator-label"
              label="New coordinator"
              value={replacementUserId}
              onChange={(event) => setReplacementUserId(event.target.value)}
            >
              {selectedBatchUsers.map((user: any) => (
                <MenuItem key={user.id} value={user.id} disabled={user.id === replacementTarget?.user?.id}>
                  <UserMenuLabel user={user} showEmail />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {selectedBatchUsersLoading && <Skeleton variant="rounded" height={40} sx={{ mt: 1.5 }} />}
          {selectedBatchUsersError && (
            <Alert severity="error" sx={{ mt: 1.5 }}>
              Could not load members. Please try again.
            </Alert>
          )}
          {!selectedBatchUsersLoading &&
            !selectedBatchUsersError &&
            !selectedBatchUsers.some((user: any) => user.id !== replacementTarget?.user?.id) && (
              <Alert severity="info" sx={{ mt: 1.5 }}>
                No other approved member is available in this batch.
              </Alert>
            )}
          <TextField
            fullWidth
            label="Why are you replacing this coordinator? (optional)"
            placeholder="A short note for the activity history"
            value={replacementReason}
            onChange={(event) => setReplacementReason(event.target.value)}
            multiline
            minRows={2}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button
            title="Cancel"
            variant="outlined"
            color="secondary"
            disabled={replacementSaving}
            onClick={() => closeReplacementDialog()}
          />
          <Button
            title="Replace coordinator"
            loading={replacementSaving}
            disabled={
              !replacementUserId ||
              replacementUserId === replacementTarget?.user?.id ||
              replacementSaving ||
              selectedBatchUsersLoading ||
              Boolean(selectedBatchUsersError)
            }
            onClick={replaceBatchCoordinator}
          />
        </DialogActions>
      </Dialog>

      {executiveAssignDialogOpen && (
        <AlertDialog
          {...executiveAssignDialogProps}
          open={Boolean(executiveAssignDialogOpen)}
          onClose={closeExecutiveAssignDialog}
        />
      )}

      {roleAssignDialogOpen && (
        <AlertDialog {...roleAssignDialogProps} open={Boolean(roleAssignDialogOpen)} onClose={closeRoleAssignDialog} />
      )}

      {welcomeEmailDialogOpen && (
        <AlertDialog
          {...welcomeEmailDialogProps}
          open={Boolean(welcomeEmailDialogOpen)}
          onClose={closeWelcomeEmailDialog}
        />
      )}

      {roleRemovalDialogOpen && (
        <AlertDialog
          {...roleRemovalDialogProps}
          open={Boolean(roleRemovalDialogOpen)}
          onClose={closeRoleRemovalDialog}
        />
      )}
    </Box>
  );
};

export default AdminPanel;
