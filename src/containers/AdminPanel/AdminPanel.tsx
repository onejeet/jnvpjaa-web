'use client';

import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import {
  ACCESS_CATALOG_QUERY,
  ASSIGN_EXECUTIVE_POSITION_MUTATION,
  ASSIGN_USER_ROLE_MUTATION,
  BATCH_COORDINATOR_ROLE_ASSIGNMENTS_QUERY,
  EXECUTIVE_POSITION_ASSIGNMENTS_QUERY,
  REVOKE_USER_ROLE_MUTATION,
  ROLE_ASSIGNMENTS_QUERY,
} from '@/apollo/accessOperations';
import { useGetUserListQuery, useSendMassEmailMutation } from '@/apollo/hooks';
import ProfilePicture from '@/components/common/ProfilePicture';
import Button from '@/components/core/Button';
import ReactSelect from '@/components/core/ReactSelect';
import FormDateTimeField from '@/components/form/FormDateTimeField';
import { PERMISSION_CODES, ROLE_CODES, ROLE_LABELS } from '@/constants/access';
import { useAlert } from '@/context/AlertContext';
import { useAuth } from '@/context/AuthContext';
import { getBatchOptions, getDefaultAvatar } from '@/utils/helpers';
import dayjs, { Dayjs } from 'dayjs';
import { useForm } from 'react-hook-form';
import {
  Alert,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid2 as Grid,
  IconButton,
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
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IconSend as PaperPlaneTilt, IconShieldCheck } from '@tabler/icons-react';

const batchRoles = [ROLE_CODES.BATCH_COORDINATOR, ROLE_CODES.BATCH_MENTOR];
const assignableRoleCodes = [
  ROLE_CODES.BATCH_COORDINATOR,
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

const toDateInputValue = (value?: Dayjs | null) => (value ? value.format('YYYY-MM-DD') : null);

const getLatestBatchValue = () => {
  const batches = getBatchOptions()
    .map((batch) => Number(batch.value))
    .filter((batch) => batch > 0);
  return Math.max(...batches).toString();
};

const getRoleManagementPermission = (roleCode: string) => {
  if (batchRoles.includes(roleCode as any)) return PERMISSION_CODES.IAM_ROLE_ASSIGNMENT_MANAGE_BATCH_ROLES;
  if (roleCode === ROLE_CODES.FINANCE_MANAGER) return PERMISSION_CODES.IAM_ROLE_ASSIGNMENT_MANAGE_FINANCE_MANAGER;
  if (roleCode === ROLE_CODES.PLATFORM_ADMIN) return PERMISSION_CODES.IAM_ROLE_ASSIGNMENT_MANAGE_PLATFORM_ADMIN;
  if (roleCode === ROLE_CODES.SUPER_ADMIN) return PERMISSION_CODES.IAM_ROLE_ASSIGNMENT_MANAGE_SUPER_ADMIN;
  return PERMISSION_CODES.IAM_USER_ACCESS_READ;
};

const getRoleLabel = (role: any) => ROLE_LABELS[role?.code as keyof typeof ROLE_LABELS] || role?.name || role?.code;

const toBatchSelectOptions = () =>
  getBatchOptions().map((batch) => ({
    value: String(batch.value),
    label: batch.label,
  }));

const getUserAvatarSrc = (user: any) => user?.profileImage || getDefaultAvatar(user?.gender);

const toUserSelectOptions = (users: any[]) =>
  users.map((user: any) => {
    const name = `${user?.firstName || ''} ${user?.lastName || ''}`.trim();
    const batch = user?.batch !== null && user?.batch !== undefined ? `Batch ${user.batch}` : 'Batch NA';
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
      showEmail
        ? `${user?.batch !== null && user?.batch !== undefined ? `Batch ${user.batch}` : 'Batch NA'}${user?.email ? ` - ${user.email}` : ''}`
        : user?.batch !== null && user?.batch !== undefined
          ? `Batch ${user.batch}`
          : 'Batch NA'
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
      showEmail
        ? `${user?.batch !== null && user?.batch !== undefined ? `Batch ${user.batch}` : 'Batch NA'}${user?.email ? ` - ${user.email}` : ''}`
        : `Batch ${user?.batch ?? 'NA'}`
    }
    containerProps={{ sx: { cursor: 'default' } }}
  />
);

const AdminPanel = () => {
  const { can, hasRole } = useAuth();
  const { showAlert } = useAlert();
  const [sendEmail] = useSendMassEmailMutation();
  const canReadAccess = can(PERMISSION_CODES.IAM_USER_ACCESS_READ);
  const canReadCatalog = can(PERMISSION_CODES.IAM_CATALOG_READ);
  const canManageBatchRoles = can(PERMISSION_CODES.IAM_ROLE_ASSIGNMENT_MANAGE_BATCH_ROLES);
  const canManageExecutivePositions = can(PERMISSION_CODES.IAM_EXECUTIVE_POSITION_MANAGE);
  const isSuperAdmin = hasRole(ROLE_CODES.SUPER_ADMIN);
  const canSendWelcomeEmail = isSuperAdmin;
  const canUseAdminCenter = canReadAccess || canReadCatalog || canManageBatchRoles || canManageExecutivePositions;
  const [activeAssignmentsExpanded, setActiveAssignmentsExpanded] = React.useState(false);
  const [assignmentTab, setAssignmentTab] = React.useState('mentors');
  const [selectedBatch, setSelectedBatch] = React.useState(getLatestBatchValue);
  const [addCoordinatorDialogOpen, setAddCoordinatorDialogOpen] = React.useState(false);
  const [newCoordinatorUserId, setNewCoordinatorUserId] = React.useState('');
  const [newCoordinatorReason, setNewCoordinatorReason] = React.useState('');
  const [replacementTarget, setReplacementTarget] = React.useState<any>(null);
  const [replacementUserId, setReplacementUserId] = React.useState('');
  const [replacementReason, setReplacementReason] = React.useState('');
  const [addCoordinatorSaving, setAddCoordinatorSaving] = React.useState(false);
  const [replacementSaving, setReplacementSaving] = React.useState(false);
  const replacementBatch = replacementTarget?.batch ? String(replacementTarget.batch) : selectedBatch;
  const roleDateForm = useForm<AccessDateForm>({
    defaultValues: {
      validFrom: dayjs(),
      validUntil: null,
    },
  });
  const positionDateForm = useForm<AccessDateForm>({
    defaultValues: {
      validFrom: dayjs(),
      validUntil: null,
    },
  });

  const [assignRole, { loading: assigningRole }] = useMutation(ASSIGN_USER_ROLE_MUTATION, {
    refetchQueries: ['roleAssignments', 'batchCoordinatorRoleAssignments', 'viewerAccessContext'],
  });
  const [revokeRole] = useMutation(REVOKE_USER_ROLE_MUTATION, {
    refetchQueries: ['roleAssignments', 'batchCoordinatorRoleAssignments', 'viewerAccessContext'],
  });
  const [assignPosition, { loading: assigningPosition }] = useMutation(ASSIGN_EXECUTIVE_POSITION_MUTATION, {
    refetchQueries: ['executivePositionAssignments', 'viewerAccessContext'],
  });

  const { data: catalogData } = useQuery(ACCESS_CATALOG_QUERY, {
    skip: !canReadCatalog,
  });
  const { data: assignmentData, loading: assignmentLoading } = useQuery(ROLE_ASSIGNMENTS_QUERY, {
    variables: { filter: { active: true } },
    skip: !canReadAccess || !activeAssignmentsExpanded,
  });
  const { data: executiveAssignmentData, loading: executiveAssignmentLoading } = useQuery(
    EXECUTIVE_POSITION_ASSIGNMENTS_QUERY,
    {
      skip: !canReadCatalog || !activeAssignmentsExpanded,
    }
  );
  const { data: batchCoordinatorData } = useQuery(BATCH_COORDINATOR_ROLE_ASSIGNMENTS_QUERY, {
    variables: {
      options: {
        filter: selectedBatch ? { batch: parseInt(selectedBatch, 10) } : {},
      },
    },
    skip: !canManageBatchRoles,
  });
  const { data: selectedBatchUserData } = useGetUserListQuery({
    variables: {
      options: {
        filter: { verified: true, batch: replacementBatch ? parseInt(replacementBatch, 10) : undefined },
        offset: 0,
        limit: 250,
      },
    },
    skip: !canManageBatchRoles || (!replacementBatch && !addCoordinatorDialogOpen),
  });

  const [roleForm, setRoleForm] = React.useState<RoleAssignmentFormState>({
    userId: '',
    roleCode: ROLE_CODES.BATCH_COORDINATOR,
    scopeBatch: getLatestBatchValue(),
    reason: '',
  });
  const [positionForm, setPositionForm] = React.useState({
    userId: '',
    batch: getLatestBatchValue(),
    positionCode: 'PRESIDENT',
    reason: '',
  });

  const { data: roleBatchUserData, loading: roleBatchUsersLoading } = useGetUserListQuery({
    variables: {
      options: {
        filter: { verified: true, batch: roleForm.scopeBatch ? parseInt(roleForm.scopeBatch, 10) : undefined },
        offset: 0,
        limit: 250,
      },
    },
    skip: !canReadAccess || !roleForm.scopeBatch,
  });
  const { data: executiveBatchUserData, loading: executiveBatchUsersLoading } = useGetUserListQuery({
    variables: {
      options: {
        filter: { verified: true, batch: positionForm.batch ? parseInt(positionForm.batch, 10) : undefined },
        offset: 0,
        limit: 250,
      },
    },
    skip: !canManageExecutivePositions || !positionForm.batch,
  });
  const batchSelectOptions = React.useMemo(() => toBatchSelectOptions(), []);
  const selectedBatchUsers = React.useMemo(
    () => selectedBatchUserData?.getUserList?.data || [],
    [selectedBatchUserData?.getUserList?.data]
  );
  const roleBatchUsers = React.useMemo(
    () => roleBatchUserData?.getUserList?.data || [],
    [roleBatchUserData?.getUserList?.data]
  );
  const executiveBatchUsers = React.useMemo(
    () => executiveBatchUserData?.getUserList?.data || [],
    [executiveBatchUserData?.getUserList?.data]
  );
  const roleUserOptions = React.useMemo(() => toUserSelectOptions(roleBatchUsers), [roleBatchUsers]);
  const executiveUserOptions = React.useMemo(() => toUserSelectOptions(executiveBatchUsers), [executiveBatchUsers]);
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
  const activeTerm = (catalogData?.executiveTerms || []).find((term: any) => term.status === 'ACTIVE');
  const positions = (catalogData?.executivePositions || []).filter((position: any) => position.isActive);
  const selectedRoleRequiresBatch = batchRoles.includes(roleForm.roleCode as any);
  const batchCoordinators = batchCoordinatorData?.getAllBatchCoordinators || [];
  const roleAssignments = assignmentData?.roleAssignments || [];
  const executiveAssignments = executiveAssignmentData?.executivePositionAssignments || [];
  const batchMentorAssignments = roleAssignments.filter(
    (assignment: any) => assignment.role?.code === ROLE_CODES.BATCH_MENTOR
  );
  const otherAssignments = roleAssignments.filter(
    (assignment: any) =>
      assignment.role?.code !== ROLE_CODES.BATCH_COORDINATOR && assignment.role?.code !== ROLE_CODES.BATCH_MENTOR
  );

  React.useEffect(() => {
    if (roles.length && !roles.some((role: any) => role.code === roleForm.roleCode)) {
      setRoleForm((prev) => ({ ...prev, roleCode: roles[0].code }));
    }
  }, [roleForm.roleCode, roles]);

  if (!canUseAdminCenter) {
    return null;
  }

  const onSendWelcomeEmail = () => {
    sendEmail({
      variables: {
        subject: '🙌 New JNVPJAA Portal Awaits – Let’s Go! 🎉 ',
        template: 'newPortalWelcome',
        context: {
          url: 'https://jnvpjaa.org',
        },
      },
    });
  };

  const onAssignRole = async () => {
    const roleDates = roleDateForm.getValues();
    try {
      await assignRole({
        variables: {
          input: {
            userId: roleForm.userId,
            roleCode: roleForm.roleCode,
            scopeType: selectedRoleRequiresBatch ? 'BATCH' : 'GLOBAL',
            scopeBatch: selectedRoleRequiresBatch ? parseInt(roleForm.scopeBatch, 10) : null,
            validFrom: toDateInputValue(roleDates.validFrom) || toDateInputValue(dayjs()),
            validUntil: toDateInputValue(roleDates.validUntil),
            reason: roleForm.reason,
          },
        },
      });
      setRoleForm((prev) => ({ ...prev, reason: '' }));
      showAlert({ visible: true, type: 'success', message: 'Role assigned successfully.' });
    } catch (error: any) {
      showAlert({ visible: true, type: 'error', message: error?.message || 'Role assignment failed.' });
    }
  };

  const onAssignPosition = async () => {
    const positionDates = positionDateForm.getValues();
    if (!activeTerm?.id) {
      showAlert({ visible: true, type: 'error', message: 'Create and activate an executive term first.' });
      return;
    }

    try {
      await assignPosition({
        variables: {
          input: {
            userId: positionForm.userId,
            executiveTermId: activeTerm.id,
            positionCode: positionForm.positionCode,
            validFrom: toDateInputValue(positionDates.validFrom) || toDateInputValue(dayjs()),
            validUntil: toDateInputValue(positionDates.validUntil),
            reason: positionForm.reason,
          },
        },
      });
      setPositionForm((prev) => ({ ...prev, reason: '' }));
      showAlert({ visible: true, type: 'success', message: 'Executive position assigned successfully.' });
    } catch (error: any) {
      showAlert({ visible: true, type: 'error', message: error?.message || 'Position assignment failed.' });
    }
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
    if (!selectedBatch || !newCoordinatorUserId) return;

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

  const renderRoleAssignment = (assignment: any) => (
    <Stack key={assignment.id} direction="row" spacing={1.5} alignItems="center" justifyContent="space-between">
      <AssignmentUser user={assignment.user} />
      <Stack direction="row" spacing={1} alignItems="center">
        <Chip label={getRoleLabel(assignment.role)} size="small" />
        {assignment.scopeBatch !== null && assignment.scopeBatch !== undefined && (
          <Chip label={`Batch ${assignment.scopeBatch}`} size="small" variant="outlined" />
        )}
      </Stack>
    </Stack>
  );

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
      if (!batchMentorAssignments.length) return renderNoAssignments('No active batch mentor assignments found.');
      return batchMentorAssignments.map(renderRoleAssignment);
    }

    if (assignmentTab === 'executive') {
      if (executiveAssignmentLoading) return renderAssignmentSkeleton();
      if (!executiveAssignments.length) return renderNoAssignments('No active executive member assignments found.');
      return executiveAssignments.map((assignment: any) => (
        <Stack key={assignment.id} direction="row" spacing={1.5} alignItems="center" justifyContent="space-between">
          <AssignmentUser user={assignment.user} />
          <Stack direction="row" spacing={1} alignItems="center">
            <Chip label={assignment.position?.name || assignment.position?.code} size="small" />
            <Chip label={assignment.executiveTerm?.name || 'Active term'} size="small" variant="outlined" />
          </Stack>
        </Stack>
      ));
    }

    if (assignmentLoading) return renderAssignmentSkeleton();
    if (!otherAssignments.length) return renderNoAssignments('No other active role assignments found.');
    return otherAssignments.map(renderRoleAssignment);
  };

  return (
    <Box width="100%" p={{ xs: 2, md: 4 }}>
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={2} mb={3}>
        <Box>
          <Typography variant="h1">Admin Center</Typography>
          <Typography color="grey.700">Manage access according to your assigned permissions.</Typography>
        </Box>
        {canSendWelcomeEmail && (
          <Button title="Send Welcome Email" onClick={onSendWelcomeEmail} startIcon={<PaperPlaneTilt size={18} />} />
        )}
      </Stack>

      {!canReadAccess && (
        <Alert severity="info" sx={{ mb: 2 }}>
          You can only see actions available to your role. Full access history is restricted.
        </Alert>
      )}

      <Grid container spacing={2}>
        {roles.length > 0 && canReadAccess && (
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
              <Typography variant="h3" mb={2}>
                Assign Role
              </Typography>
              <Stack spacing={2}>
                <FormControl size="small" fullWidth>
                  <InputLabel>Role</InputLabel>
                  <Select
                    label="Role"
                    value={roleForm.roleCode}
                    onChange={(event) => setRoleForm((prev) => ({ ...prev, roleCode: event.target.value, userId: '' }))}
                  >
                    {roles.map((role: any) => (
                      <MenuItem key={role.code} value={role.code}>
                        {getRoleLabel(role)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Grid container spacing={1}>
                  <Grid size={{ xs: 12, sm: 5 }}>
                    <Typography variant="caption" color="text.secondary">
                      Batch
                    </Typography>
                    <ReactSelect
                      options={batchSelectOptions}
                      value={selectedRoleBatchOption}
                      placeholder="Select batch"
                      size="small"
                      isSearchable
                      onChange={(option) => {
                        const selected = option as SelectOption | null;
                        setRoleForm((prev) => ({
                          ...prev,
                          scopeBatch: selected?.value || '',
                          userId: '',
                        }));
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 7 }}>
                    <Typography variant="caption" color="text.secondary">
                      User
                    </Typography>
                    <ReactSelect
                      options={roleUserOptions}
                      value={selectedRoleUserOption}
                      placeholder={roleForm.scopeBatch ? 'Search active member' : 'Select batch first'}
                      size="small"
                      isSearchable
                      showAvatars
                      isLoading={roleBatchUsersLoading}
                      onChange={(option) => {
                        const selected = option as SelectOption | null;
                        setRoleForm((prev) => ({ ...prev, userId: selected?.value || '' }));
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={1}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormDateTimeField
                      control={roleDateForm.control}
                      name="validFrom"
                      isDateOnly
                      inputProps={{
                        label: 'Valid from',
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
                        label: 'Valid until',
                        size: 'small',
                      }}
                    />
                  </Grid>
                </Grid>
                <TextField
                  size="small"
                  label="Reason"
                  placeholder="Optional"
                  multiline
                  minRows={2}
                  value={roleForm.reason}
                  onChange={(event) => setRoleForm((prev) => ({ ...prev, reason: event.target.value }))}
                />
                <Button
                  title="Assign Role"
                  onClick={onAssignRole}
                  loading={assigningRole}
                  disabled={!roleForm.scopeBatch || !roleForm.userId}
                />
              </Stack>
            </Paper>
          </Grid>
        )}

        {canManageExecutivePositions && (
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
              <Typography variant="h3" mb={2}>
                Assign Executive Position
              </Typography>
              <Stack spacing={2}>
                <Alert severity={activeTerm ? 'success' : 'warning'}>
                  {activeTerm ? `Active term: ${activeTerm.name}` : 'No active executive term found.'}
                </Alert>

                <FormControl size="small" fullWidth>
                  <InputLabel>Position</InputLabel>
                  <Select
                    label="Position"
                    value={positionForm.positionCode}
                    onChange={(event) => setPositionForm((prev) => ({ ...prev, positionCode: event.target.value }))}
                  >
                    {positions.map((position: any) => (
                      <MenuItem key={position.code} value={position.code}>
                        {position.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Grid container spacing={1}>
                  <Grid size={{ xs: 12, sm: 5 }}>
                    <Typography variant="caption" color="text.secondary">
                      Batch
                    </Typography>
                    <ReactSelect
                      options={batchSelectOptions}
                      value={selectedExecutiveBatchOption}
                      placeholder="Select batch"
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
                      User
                    </Typography>
                    <ReactSelect
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
                <Grid container spacing={1}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormDateTimeField
                      control={positionDateForm.control}
                      name="validFrom"
                      isDateOnly
                      inputProps={{
                        label: 'Valid from',
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
                        label: 'Valid until',
                        size: 'small',
                      }}
                    />
                  </Grid>
                </Grid>
                <TextField
                  size="small"
                  label="Reason"
                  placeholder="Optional"
                  multiline
                  minRows={2}
                  value={positionForm.reason}
                  onChange={(event) => setPositionForm((prev) => ({ ...prev, reason: event.target.value }))}
                />
                <Button
                  title="Assign Position"
                  onClick={onAssignPosition}
                  loading={assigningPosition}
                  disabled={!activeTerm || !positionForm.batch || !positionForm.userId}
                />
              </Stack>
            </Paper>
          </Grid>
        )}
      </Grid>

      {canManageBatchRoles && (
        <Paper variant="outlined" sx={{ mt: 2, p: 2, borderRadius: 2 }}>
          <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between" mb={2}>
            <Stack direction="row" spacing={1} alignItems="center">
              <IconShieldCheck size={20} />
              <Typography variant="h3">Batch Coordinators</Typography>
            </Stack>
            <Button
              title="Add"
              size="small"
              onClick={() => setAddCoordinatorDialogOpen(true)}
              disabled={!selectedBatch}
            />
          </Stack>
          <FormControl size="small" sx={{ minWidth: 220, mb: 2 }}>
            <InputLabel>Batch</InputLabel>
            <Select label="Batch" value={selectedBatch} onChange={(event) => setSelectedBatch(event.target.value)}>
              <MenuItem value="">All Batches</MenuItem>
              {getBatchOptions().map((batch) => (
                <MenuItem key={batch.value} value={batch.value}>
                  {batch.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Stack spacing={1} divider={<Divider flexItem />}>
            {batchCoordinators.map((coordinator: any) => (
              <Stack
                key={coordinator.id}
                direction="row"
                spacing={1.5}
                alignItems="center"
                justifyContent="space-between"
              >
                <AssignmentUser user={coordinator.user} showEmail />
                <Stack direction="row" spacing={1} alignItems="center">
                  <Chip label={`Batch ${coordinator.batch}`} size="small" variant="outlined" />
                  <Tooltip title="Replace coordinator">
                    <IconButton size="small" onClick={() => setReplacementTarget(coordinator)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Stack>
            ))}
            {!batchCoordinators.length && (
              <Typography color="grey.700">No batch coordinators found for this selection.</Typography>
            )}
          </Stack>
        </Paper>
      )}

      {canReadAccess && (
        <Accordion
          expanded={activeAssignmentsExpanded}
          onChange={(_, expanded) => setActiveAssignmentsExpanded(expanded)}
          variant="outlined"
          sx={{ mt: 2, borderRadius: 2, '&:before': { display: 'none' } }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h3">Active Assignments</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ pt: 0 }}>
            <Tabs value={assignmentTab} onChange={(_, value) => setAssignmentTab(value)} sx={{ mb: 2 }}>
              <Tab value="mentors" label="Batch Mentors" />
              <Tab value="executive" label="Executive Members" />
              <Tab value="other" label="Others" />
            </Tabs>
            <Stack spacing={1} divider={<Divider flexItem />}>
              {renderAssignmentTabContent()}
            </Stack>
          </AccordionDetails>
        </Accordion>
      )}

      <Dialog open={addCoordinatorDialogOpen} onClose={() => closeAddCoordinatorDialog()} fullWidth maxWidth="sm">
        <DialogTitle>Add Batch Coordinator</DialogTitle>
        <DialogContent>
          <Typography color="grey.700" mb={2}>
            {`Batch ${selectedBatch || ''}`}
          </Typography>
          <Select
            fullWidth
            size="small"
            displayEmpty
            value={newCoordinatorUserId}
            onChange={(event) => setNewCoordinatorUserId(event.target.value)}
          >
            <MenuItem value="">Select active member from this batch</MenuItem>
            {selectedBatchUsers.map((user: any) => (
              <MenuItem key={user.id} value={user.id}>
                <UserMenuLabel user={user} showEmail />
              </MenuItem>
            ))}
          </Select>
          <TextField
            fullWidth
            label="Reason"
            placeholder="Optional"
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
            title="Add"
            loading={addCoordinatorSaving}
            disabled={!newCoordinatorUserId || addCoordinatorSaving}
            onClick={addBatchCoordinator}
          />
        </DialogActions>
      </Dialog>

      <Dialog open={Boolean(replacementTarget)} onClose={() => closeReplacementDialog()} fullWidth maxWidth="sm">
        <DialogTitle>Replace Batch Coordinator</DialogTitle>
        <DialogContent>
          <Typography color="grey.700" mb={2}>
            {`Batch ${replacementTarget?.batch || ''}`}
          </Typography>
          <Select
            fullWidth
            size="small"
            displayEmpty
            value={replacementUserId}
            onChange={(event) => setReplacementUserId(event.target.value)}
          >
            <MenuItem value="">Select active member from this batch</MenuItem>
            {selectedBatchUsers.map((user: any) => (
              <MenuItem key={user.id} value={user.id}>
                <UserMenuLabel user={user} showEmail />
              </MenuItem>
            ))}
          </Select>
          <TextField
            fullWidth
            label="Reason"
            placeholder="Optional"
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
            title="Update"
            loading={replacementSaving}
            disabled={!replacementUserId || replacementSaving}
            onClick={replaceBatchCoordinator}
          />
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminPanel;
