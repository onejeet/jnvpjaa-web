'use client';

import React from 'react';
import { useQuery } from '@apollo/client';
import { Alert, Box, Button, CircularProgress, MenuItem, Paper, Stack, TextField, Typography } from '@mui/material';
import { ACTIVITY_FEED } from '@/apollo/activityOperations';
import { useAuth } from '@/context/AuthContext';
import { ROLE_CODES } from '@/constants/access';
import { getBatchOptions } from '@/utils/helpers';

const actionLabels: Record<string, string> = {
  GOOGLE_LOGIN_SETTING_CHANGED: 'Changed Google login setting',
  GOOGLE_REGISTRATION_SUBMITTED: 'Submitted registration with Google',
  GOOGLE_ACCOUNT_LINKED: 'Connected Google account',
  MEMBER_REGISTRATION_APPROVED: 'Approved member registration',
  MEMBER_REGISTRATION_REJECTED: 'Rejected member registration',
  MEMBER_DISABLED: 'Disabled member',
  MEMBER_ENABLED: 'Enabled member',
  MEMBER_REMOVED: 'Removed member',
  ROLE_ASSIGNED: 'Granted member access',
  ROLE_REVOKED: 'Removed member access',
  BLOG_APPROVED: 'Approved blog',
  BLOG_CREATED: 'Created blog',
  BLOG_SUBMITTED: 'Submitted blog for approval',
  BLOG_UPDATED: 'Updated blog',
  BLOG_STATUS_CHANGED: 'Changed blog status',
  BLOG_DELETED: 'Deleted blog',
  BLOG_CHANGES_REQUESTED: 'Requested blog changes',
  EVENT_APPROVED: 'Approved event',
  EVENT_CREATED: 'Created event',
  EVENT_SUBMITTED: 'Submitted event for approval',
  EVENT_UPDATED: 'Updated event',
  EVENT_DELETED: 'Deleted event',
  EVENT_STATUS_CHANGED: 'Changed event status',
  BUSINESS_CREATED: 'Created business',
  BUSINESS_UPDATED: 'Updated business',
  BUSINESS_APPROVED: 'Approved business',
  BUSINESS_REJECTED: 'Rejected business',
  TRANSACTION_CREATED: 'Created transaction',
  TRANSACTION_STATUS_CHANGED: 'Changed transaction status',
  TRANSACTION_DELETED: 'Deleted transaction',
  EXECUTIVE_TERM_CREATED: 'Created executive term',
  EXECUTIVE_TERM_ACTIVATED: 'Activated executive term',
  EXECUTIVE_TERM_CLOSED: 'Closed executive term',
  EXECUTIVE_POSITION_ASSIGNED: 'Assigned executive position',
  EXECUTIVE_POSITION_REVOKED: 'Revoked executive position',
  ACCESS_BACKFILLED: 'Set up member access',
  EXECUTIVE_TERM_BACKFILLED: 'Set up executive term',
};

const pageSize = 25;
const areaLabels: Record<string, string> = {
  User: 'Members',
  UserRoleAssignment: 'Member access',
  ExecutivePositionAssignment: 'Executive committee',
  ExecutiveTerm: 'Executive terms',
  Blog: 'Blogs',
  Event: 'Events',
  Business: 'Businesses',
  Transaction: 'Payments and donations',
};
const batchLabel = (batch: number) => (batch === 0 ? 'Faculty' : `Batch ${batch}`);

const ActivityCenter = () => {
  const { user, access, hasRole } = useAuth();
  const allowed =
    hasRole(ROLE_CODES.EXECUTIVE_MEMBER) ||
    hasRole(ROLE_CODES.PLATFORM_ADMIN) ||
    hasRole(ROLE_CODES.SUPER_ADMIN) ||
    Boolean(access?.positions?.length);
  const [page, setPage] = React.useState(0);
  const [action, setAction] = React.useState('');
  const [entityType, setEntityType] = React.useState('');
  const [person, setPerson] = React.useState('');
  const [batch, setBatch] = React.useState('');
  const { data, loading, error, refetch } = useQuery(ACTIVITY_FEED, {
    skip: !user?.id || !allowed,
    variables: {
      limit: pageSize,
      offset: page * pageSize,
      action: action || null,
      entityType: entityType || null,
      person: person || null,
      batch: batch === '' ? null : Number(batch),
    },
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
  });
  const items = data?.activityFeed?.items || [];
  const total = data?.activityFeed?.total || 0;

  if (!user?.id) return <CircularProgress />;
  if (!allowed)
    return <Alert severity="warning">This activity is available to executive members and administrators.</Alert>;

  return (
    <Box width="100%" maxWidth={1100} py={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Box>
          <Typography variant="h2">Activity Center</Typography>
          <Typography color="text.secondary">
            See who approved, changed, or removed what across the association.
          </Typography>
        </Box>
        <Button onClick={() => refetch()} disabled={loading}>
          Refresh
        </Button>
      </Stack>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={2} flexWrap="wrap" useFlexGap>
        <TextField
          size="small"
          label="Person"
          placeholder="Search names"
          value={person}
          onChange={(event) => {
            setPerson(event.target.value);
            setPage(0);
          }}
          sx={{ minWidth: 210 }}
        />
        <TextField
          select
          size="small"
          label="Batch"
          value={batch}
          onChange={(event) => {
            setBatch(event.target.value);
            setPage(0);
          }}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">All batches</MenuItem>
          {getBatchOptions().map((option) => (
            <MenuItem key={option.value} value={String(option.value)}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          size="small"
          label="Area"
          value={entityType}
          onChange={(event) => {
            setEntityType(event.target.value);
            setPage(0);
          }}
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="">All areas</MenuItem>
          {Object.entries(areaLabels).map(([value, label]) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          size="small"
          label="What happened"
          value={action}
          onChange={(event) => {
            setAction(event.target.value);
            setPage(0);
          }}
          sx={{ minWidth: 220 }}
        >
          <MenuItem value="">All changes</MenuItem>
          {Object.entries(actionLabels).map(([value, label]) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </TextField>
      </Stack>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error.message}
        </Alert>
      )}
      {loading && <CircularProgress size={24} sx={{ mb: 2 }} />}
      <Stack spacing={1}>
        {items.map((item: any) => (
          <Paper key={item.id} variant="outlined" sx={{ p: 2 }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" gap={1}>
              <Box>
                <Typography fontWeight={600}>
                  {item.actorName || 'System'}
                  {item.actorBatch !== null && item.actorBatch !== undefined
                    ? ` (${batchLabel(item.actorBatch)})`
                    : ''}{' '}
                  · {actionLabels[item.action] || item.action.replaceAll('_', ' ').toLowerCase()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.targetName ? `Member: ${item.targetName} · ` : ''}
                  {item.batch !== null && item.batch !== undefined ? `${batchLabel(item.batch)} · ` : ''}
                  {areaLabels[item.entityType] || item.entityType.replaceAll('_', ' ')}
                </Typography>
                {item.reason && (
                  <Typography variant="body2" sx={{ mt: 0.5 }}>
                    Reason: {item.reason}
                  </Typography>
                )}
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'nowrap' }}>
                {new Date(item.createdAt).toLocaleString()}
              </Typography>
            </Stack>
          </Paper>
        ))}
        {!loading && !items.length && !error && <Alert severity="info">No activity matches these filters.</Alert>}
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mt={2}>
        <Typography variant="body2" color="text.secondary">
          {total} activities
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button disabled={page === 0 || loading} onClick={() => setPage(page - 1)}>
            Previous
          </Button>
          <Typography sx={{ alignSelf: 'center' }}>Page {page + 1}</Typography>
          <Button disabled={(page + 1) * pageSize >= total || loading} onClick={() => setPage(page + 1)}>
            Next
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ActivityCenter;
