'use client';

import React from 'react';
import Link from 'next/link';
import { useMutation, useQuery } from '@apollo/client';
import {
  Alert,
  Box,
  Chip,
  CircularProgress,
  Divider,
  MenuItem,
  Paper,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import { IconCirclePlus, IconExternalLink } from '@tabler/icons-react';
import toast from 'react-hot-toast';
import { ROLE_ASSIGNMENTS_QUERY } from '@/apollo/accessOperations';
import Button from '@/components/core/Button';
import ProfilePicture from '@/components/common/ProfilePicture';
import ReactSelect from '@/components/core/ReactSelect';
import LayoutModule from '@/layouts/Layout';
import { useAuth } from '@/context/AuthContext';
import { PERMISSION_CODES, ROLE_CODES } from '@/constants/access';
import { getBatchOptions } from '@/utils/helpers';
import {
  GET_MENTOR_SCHOLARSHIP_DASHBOARD,
  GET_MY_SCHOLARSHIP_APPLICATIONS,
  GET_MY_SCHOLARSHIP_DASHBOARD,
  GET_BATCH_COORDINATOR_SCHOLARSHIP_DASHBOARD,
  GET_SCHOLARSHIP_APPLICATIONS,
  GET_SCHOLARSHIP_MENTOR_SUMMARIES,
  GET_SCHOLARSHIP_ORG_DASHBOARD,
  RECORD_MENTOR_FUND_ALLOCATION,
} from '@/apollo/scholarshipOperations';
import { formatCurrency, getFullName, humanizeScholarshipStatus } from './helpers';
import { useScholarshipLoginGuard } from './useScholarshipLoginGuard';

const DashboardCard = ({ title, value, caption }: { title: string; value: React.ReactNode; caption?: string }) => (
  <Paper variant="outlined" sx={{ p: 2, borderRadius: 1, minHeight: 96 }}>
    <Typography fontSize={13} color="grey.700">
      {title}
    </Typography>
    <Typography fontSize={24} fontWeight={700} mt={0.5}>
      {value}
    </Typography>
    {caption && (
      <Typography fontSize={12} color="grey.600">
        {caption}
      </Typography>
    )}
  </Paper>
);

type DashboardVariant = 'mine' | 'mentor' | 'batch' | 'org';

const getDashboardFromData = (data: any) =>
  data?.getScholarshipOrganizationDashboard ||
  data?.getMentorScholarshipDashboard ||
  data?.getBatchCoordinatorScholarshipDashboard ||
  data?.getMyScholarshipDashboard;

const getMetricValue = (dashboard: any, key: string, type?: 'currency') =>
  type === 'currency' ? formatCurrency(dashboard?.[key] || 0) : dashboard?.[key] || 0;

const getDashboardCards = (variant: DashboardVariant) => {
  if (variant === 'mentor') {
    return [
      ['Total confirmed allocation received', 'confirmedAllocation', 'currency'],
      ['Pending incoming allocation confirmation', 'pendingIncomingAllocation', 'currency'],
      ['Disputed incoming allocation', 'disputedIncomingAllocation', 'currency'],
      ['Mentor custody balance', 'mentorCustodyBalance', 'currency'],
      ['Pending beneficiary confirmation', 'pendingBeneficiaryConfirmation', 'currency'],
      ['Confirmed beneficiary disbursement', 'confirmedBeneficiaryDisbursement', 'currency'],
      ['Approval capacity', 'approvalCapacity', 'currency'],
      ['Overdue usage proofs', 'overdueProof'],
      ['Applications awaiting review', 'applicationsAwaitingReview'],
      ['Full proofs awaiting verification', 'fullProofsAwaitingVerification'],
    ];
  }

  if (variant === 'batch') {
    return [
      ['Total applications', 'totalApplications'],
      ['Submitted', 'submittedApplications'],
      ['Under review', 'underReviewApplications'],
      ['Needs information', 'needsInformation'],
      ['Payment confirmation pending', 'paymentConfirmationPendingApplications'],
      ['Proof overdue', 'overdueProof'],
      ['Wrong disbursement', 'wrongDisbursementApplications'],
      ['Completed applications', 'completedApplications'],
    ];
  }

  if (variant === 'org') {
    return [
      ['Total allocation recorded to mentors', 'totalAllocationRecorded', 'currency'],
      ['Total confirmed by mentors', 'confirmedAllocation', 'currency'],
      ['Pending mentor confirmation', 'pendingIncomingAllocation', 'currency'],
      ['Disputed mentor allocations', 'disputedIncomingAllocation', 'currency'],
      ['Total standing with mentors', 'mentorCustodyBalance', 'currency'],
      ['Pending beneficiary confirmation', 'pendingBeneficiaryConfirmation', 'currency'],
      ['Total confirmed disbursed to beneficiaries', 'confirmedBeneficiaryDisbursement', 'currency'],
      ['Total completed after proof verification', 'totalCompletedAfterProofVerification', 'currency'],
      ['Total overdue proof amount', 'overdueProofAmount', 'currency'],
      ['Total wrong-disbursement amount', 'wrongDisbursementAmount', 'currency'],
      ['Total refund requested', 'refundRequestedAmount', 'currency'],
      ['Total refund confirmed', 'refundConfirmedAmount', 'currency'],
      ['Active beneficiary count', 'activeBeneficiaryCount'],
      ['Active mentor count', 'activeMentorCount'],
      ['Exceptions', 'exceptionCount'],
    ];
  }

  return [
    ['Draft requests', 'draftRequests'],
    ['Submitted or under review', 'submittedOrUnderReview'],
    ['Needs information', 'needsInformation'],
    ['Awaiting payment confirmation', 'awaitingPaymentConfirmation'],
    ['Proof due', 'proofDue'],
    ['Partial proof', 'partialProof'],
    ['Overdue proof', 'overdueProof'],
    ['Completed', 'completedApplications'],
  ];
};

const StatusDataset = ({ title, rows }: { title: string; rows?: any[] }) => {
  if (!rows?.length) return null;

  return (
    <Paper variant="outlined" sx={{ p: 2, borderRadius: 1 }}>
      <Typography fontSize={14} fontWeight={700} mb={1}>
        {title}
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        {rows.map((row) => (
          <Chip
            key={row.key}
            size="small"
            variant="outlined"
            label={`${humanizeScholarshipStatus(row.key)}: ${row.count}`}
          />
        ))}
      </Stack>
    </Paper>
  );
};

const DashboardDatasets = ({ dashboard, variant }: { dashboard: any; variant: DashboardVariant }) => (
  <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' }} gap={2} mt={2}>
    <StatusDataset title="Application status" rows={dashboard?.byStatus} />
    <StatusDataset title="Usage-proof status" rows={dashboard?.byProofStatus} />
    <StatusDataset title="Refund status" rows={dashboard?.byRefundStatus} />
    {variant !== 'mine' && <StatusDataset title="Transaction status" rows={dashboard?.byTransactionStatus} />}
    {(variant === 'mentor' || variant === 'org') && (
      <StatusDataset title="Mentor allocation status" rows={dashboard?.byAllocationStatus} />
    )}
  </Box>
);

const DashboardSummary = ({ data, loading, variant }: { data: any; loading: boolean; variant: DashboardVariant }) => {
  const dashboard = getDashboardFromData(data);

  if (loading) {
    return (
      <Box py={4} display="flex" justifyContent="center">
        <CircularProgress size={24} />
      </Box>
    );
  }

  return (
    <>
      <Box
        display="grid"
        gridTemplateColumns={{ xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(5, minmax(0, 1fr))' }}
        gap={2}
      >
        {getDashboardCards(variant).map(([title, key, type]) => (
          <DashboardCard
            key={key}
            title={title}
            value={getMetricValue(dashboard, key, type as 'currency' | undefined)}
          />
        ))}
      </Box>
      <DashboardDatasets dashboard={dashboard} variant={variant} />
    </>
  );
};

const ApplicationsTable = ({ applications, loading }: { applications: any[]; loading: boolean }) => {
  if (loading) {
    return (
      <Box py={5} display="flex" justifyContent="center">
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (!applications.length) {
    return (
      <Alert severity="info" sx={{ mt: 2 }}>
        No scholarship applications found.
      </Alert>
    );
  }

  return (
    <Paper variant="outlined" sx={{ borderRadius: 1, overflow: 'hidden' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Beneficiary</TableCell>
            <TableCell>Purpose</TableCell>
            <TableCell>Mentor</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Open</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {applications.map((application) => (
            <TableRow key={application.id} hover>
              <TableCell>
                <ProfilePicture
                  id={application.beneficiary?.id}
                  src={application.beneficiary?.profileImage}
                  title={getFullName(application.beneficiary) || 'Member'}
                  summary={`Batch ${application.batchSnapshot}`}
                  size={38}
                />
              </TableCell>
              <TableCell>
                <Typography fontWeight={600}>{application.purpose}</Typography>
                <Typography fontSize={13} color="grey.600">
                  {application.referenceNumber}
                </Typography>
              </TableCell>
              <TableCell>
                {application.assignedMentor ? (
                  <ProfilePicture
                    id={application.assignedMentor?.id}
                    src={application.assignedMentor?.profileImage}
                    title={getFullName(application.assignedMentor)}
                    summary={`Batch ${application.assignedMentor?.batch ?? 'NA'}`}
                    size={34}
                  />
                ) : (
                  <Chip size="small" variant="outlined" label="Routing pending" />
                )}
              </TableCell>
              <TableCell>{formatCurrency(application.requestedAmount)}</TableCell>
              <TableCell>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  <Chip size="small" label={humanizeScholarshipStatus(application.status)} />
                  <Chip size="small" variant="outlined" label={humanizeScholarshipStatus(application.proofStatus)} />
                </Stack>
              </TableCell>
              <TableCell align="right">
                <Button
                  component={Link as any}
                  href={`/scholarships/${application.id}`}
                  variant="text"
                  title="View"
                  endIcon={<IconExternalLink size={16} />}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

const MentorSummaryTable = ({ mentors, loading }: { mentors: any[]; loading: boolean }) => {
  if (loading) {
    return (
      <Box py={5} display="flex" justifyContent="center">
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (!mentors.length) {
    return (
      <Alert severity="info" sx={{ mt: 2 }}>
        No active scholarship mentors found.
      </Alert>
    );
  }

  return (
    <Paper variant="outlined" sx={{ borderRadius: 1, overflowX: 'auto' }}>
      <Table sx={{ minWidth: 1320 }}>
        <TableHead>
          <TableRow>
            <TableCell>Mentor</TableCell>
            <TableCell>Assigned batches</TableCell>
            <TableCell align="right">Applications</TableCell>
            <TableCell align="right">Total disbursed to mentor</TableCell>
            <TableCell align="right">Confirmed allocation</TableCell>
            <TableCell align="right">Pending confirmation</TableCell>
            <TableCell align="right">Disputed</TableCell>
            <TableCell align="right">Released to beneficiaries</TableCell>
            <TableCell align="right">Pending beneficiary confirmation</TableCell>
            <TableCell align="right">Custody balance</TableCell>
            <TableCell align="right">Available capacity</TableCell>
            <TableCell align="right">Active beneficiaries</TableCell>
            <TableCell align="right">Overdue proof amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mentors.map((row) => {
            const summary = row.summary || {};
            return (
              <TableRow key={row.mentorUserId} hover>
                <TableCell>
                  <ProfilePicture
                    id={row.mentor?.id}
                    src={row.mentor?.profileImage}
                    title={getFullName(row.mentor) || row.mentor?.email || 'Batch Mentor'}
                    summary={row.mentor?.email}
                    size={38}
                  />
                </TableCell>
                <TableCell>
                  <Stack direction="row" gap={0.75} flexWrap="wrap">
                    {(row.assignedBatches || []).map((batch: number) => (
                      <Chip key={batch} size="small" variant="outlined" label={`Batch ${batch}`} />
                    ))}
                  </Stack>
                </TableCell>
                <TableCell align="right">{summary.totalApplications || 0}</TableCell>
                <TableCell align="right">{formatCurrency(summary.totalAllocationRecorded)}</TableCell>
                <TableCell align="right">{formatCurrency(summary.confirmedAllocation)}</TableCell>
                <TableCell align="right">{formatCurrency(summary.pendingIncomingAllocation)}</TableCell>
                <TableCell align="right">{formatCurrency(summary.disputedIncomingAllocation)}</TableCell>
                <TableCell align="right">{formatCurrency(summary.confirmedBeneficiaryDisbursement)}</TableCell>
                <TableCell align="right">{formatCurrency(summary.pendingBeneficiaryConfirmation)}</TableCell>
                <TableCell align="right">{formatCurrency(summary.mentorCustodyBalance)}</TableCell>
                <TableCell align="right">{formatCurrency(summary.approvalCapacity)}</TableCell>
                <TableCell align="right">{summary.activeBeneficiaryCount || 0}</TableCell>
                <TableCell align="right">{formatCurrency(summary.overdueProofAmount)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
};

const todayDateInputValue = () => new Date().toISOString().slice(0, 10);

const getLatestBatchValue = () => {
  const batches = getBatchOptions()
    .map((batch) => Number(batch.value))
    .filter((batch) => batch > 0);
  return Math.max(...batches).toString();
};

const AllocationPanel = () => {
  const batchOptions = React.useMemo(
    () => getBatchOptions().map((batch) => ({ value: String(batch.value), label: batch.label })),
    []
  );
  const [form, setForm] = React.useState({
    batch: getLatestBatchValue(),
    mentorUserId: '',
    amount: '',
    transferDate: todayDateInputValue(),
    method: 'BANK_TRANSFER',
    reference: '',
    notes: '',
  });
  const [recordAllocation, allocationState] = useMutation(RECORD_MENTOR_FUND_ALLOCATION, {
    refetchQueries: [
      'getMentorFundAllocations',
      'getMentorScholarshipDashboard',
      'getScholarshipOrganizationDashboard',
    ],
  });

  const mentorAssignments = useQuery(ROLE_ASSIGNMENTS_QUERY, {
    variables: {
      filter: {
        roleCode: ROLE_CODES.BATCH_MENTOR,
        scopeBatch: form.batch ? parseInt(form.batch, 10) : undefined,
        active: true,
      },
    },
    skip: !form.batch,
    fetchPolicy: 'cache-and-network',
  });

  const mentorOptions = React.useMemo(
    () =>
      (mentorAssignments.data?.roleAssignments || [])
        .filter((assignment: any) => assignment?.user)
        .map((assignment: any) => {
          const user = assignment.user;
          const name = getFullName(user) || user.email || 'Batch Mentor';
          return {
            value: user.id,
            label: `${name} - Batch ${user.batch ?? 'NA'}`,
            title: name,
            summary: `Batch ${user.batch ?? 'NA'}`,
            avatarUrl: user.profileImage || undefined,
          };
        }),
    [mentorAssignments.data?.roleAssignments]
  );

  const selectedBatchOption = batchOptions.find((option) => option.value === form.batch) || null;
  const selectedMentorOption = mentorOptions.find((option: any) => option.value === form.mentorUserId) || null;

  const setField = (field: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const submitAllocation = async () => {
    try {
      await recordAllocation({
        variables: {
          input: {
            mentorUserId: form.mentorUserId,
            batch: parseInt(form.batch, 10),
            amount: Number(form.amount),
            currency: 'INR',
            transferDate: form.transferDate,
            method: form.method,
            reference: form.reference || null,
            notes: form.notes || null,
          },
        },
      });
      setForm((current) => ({
        ...current,
        mentorUserId: '',
        amount: '',
        reference: '',
        notes: '',
      }));
      toast.success('Mentor fund disbursal recorded.');
    } catch (error: any) {
      toast.error(error?.message || 'Could not record mentor fund disbursal.');
    }
  };

  return (
    <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 1, mb: 3 }}>
      <Typography fontSize={18} fontWeight={700} mb={2}>
        Record Mentor Fund Disbursal
      </Typography>
      <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '160px minmax(220px, 1fr) 160px 160px' }} gap={1.5}>
        <Box>
          <Typography variant="caption" color="text.secondary">
            Mentor batch
          </Typography>
          <ReactSelect
            options={batchOptions}
            value={selectedBatchOption}
            placeholder="Select batch"
            size="small"
            isSearchable
            onChange={(option) => {
              const selected = option as any;
              setForm((current) => ({
                ...current,
                batch: selected?.value || '',
                mentorUserId: '',
              }));
            }}
          />
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary">
            Batch Mentor
          </Typography>
          <ReactSelect
            options={mentorOptions}
            value={selectedMentorOption}
            placeholder="Select active batch mentor"
            size="small"
            isSearchable
            showAvatars
            isLoading={mentorAssignments.loading}
            noOptionsMessage="No active batch mentor found"
            onChange={(option) => {
              const selected = option as any;
              setForm((current) => ({ ...current, mentorUserId: selected?.value || '' }));
            }}
          />
        </Box>
        <TextField label="Amount" size="small" type="number" value={form.amount} onChange={setField('amount')} />
        <TextField
          label="Transfer date"
          size="small"
          type="date"
          value={form.transferDate}
          onChange={setField('transferDate')}
          InputLabelProps={{ shrink: true }}
        />
        <TextField select label="Method" size="small" value={form.method} onChange={setField('method')}>
          <MenuItem value="BANK_TRANSFER">Bank transfer</MenuItem>
          <MenuItem value="UPI">UPI</MenuItem>
          <MenuItem value="CHEQUE">Cheque</MenuItem>
          <MenuItem value="CASH">Cash</MenuItem>
        </TextField>
        <TextField label="Reference" size="small" value={form.reference} onChange={setField('reference')} />
        <TextField
          label="Notes"
          size="small"
          value={form.notes}
          onChange={setField('notes')}
          sx={{ gridColumn: { xs: 'auto', md: 'span 2' } }}
        />
      </Box>
      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Button
          title="Record Disbursal"
          loading={allocationState.loading}
          disabled={!form.batch || !form.mentorUserId || !form.amount || !form.transferDate}
          onClick={submitAllocation}
        />
      </Box>
    </Paper>
  );
};

export default function Scholarships() {
  const { can, user, roles, access } = useAuth();
  const canRender = useScholarshipLoginGuard(user?.id);
  const canCreate = can(PERMISSION_CODES.SCHOLARSHIP_APPLICATION_CREATE);
  const canReadOrg = can(PERMISSION_CODES.SCHOLARSHIP_DASHBOARD_READ_ORG);
  const canReadMentor = can(PERMISSION_CODES.SCHOLARSHIP_DASHBOARD_READ_MENTOR);
  const canReadBatch = can(PERMISSION_CODES.SCHOLARSHIP_DASHBOARD_READ_BATCH);
  const canRecordAllocation = can(PERMISSION_CODES.SCHOLARSHIP_ALLOCATION_CREATE);
  const coordinatorBatchOptions = React.useMemo(() => {
    const scopedBatches =
      roles
        ?.filter((role: any) => role.code === ROLE_CODES.BATCH_COORDINATOR && role.scopeBatch)
        .map((role: any) => Number(role.scopeBatch)) || [];
    const batches = access?.hasFullAccess ? getBatchOptions().map((batch) => Number(batch.value)) : scopedBatches;
    return Array.from(new Set(batches))
      .filter((batch) => batch > 0)
      .sort((a, b) => b - a)
      .map((batch) => ({ value: String(batch), label: `Batch ${batch}` }));
  }, [access?.hasFullAccess, roles]);
  const [selectedCoordinatorBatch, setSelectedCoordinatorBatch] = React.useState('');
  const [tab, setTab] = React.useState<DashboardVariant>('mine');
  const showMentorSummaries = tab === 'mentor' && canReadOrg;

  React.useEffect(() => {
    if (!canRender) return;
    if (canReadOrg) {
      setTab('org');
    } else if (canReadMentor) {
      setTab('mentor');
    } else if (canReadBatch && coordinatorBatchOptions.length) {
      setTab('batch');
    }
  }, [canReadBatch, canReadMentor, canReadOrg, canRender, coordinatorBatchOptions.length]);

  React.useEffect(() => {
    if (!selectedCoordinatorBatch && coordinatorBatchOptions.length) {
      setSelectedCoordinatorBatch(coordinatorBatchOptions[0].value);
    }
  }, [coordinatorBatchOptions, selectedCoordinatorBatch]);

  const dashboardQuery =
    tab === 'org'
      ? GET_SCHOLARSHIP_ORG_DASHBOARD
      : tab === 'mentor'
        ? GET_MENTOR_SCHOLARSHIP_DASHBOARD
        : tab === 'batch'
          ? GET_BATCH_COORDINATOR_SCHOLARSHIP_DASHBOARD
          : GET_MY_SCHOLARSHIP_DASHBOARD;

  const applicationsQuery = tab === 'mine' ? GET_MY_SCHOLARSHIP_APPLICATIONS : GET_SCHOLARSHIP_APPLICATIONS;
  const dashboard = useQuery(dashboardQuery, {
    variables: tab === 'batch' ? { batch: Number(selectedCoordinatorBatch) } : undefined,
    skip: !canRender || showMentorSummaries || (tab === 'batch' && !selectedCoordinatorBatch),
    fetchPolicy: 'cache-and-network',
  });
  const applications = useQuery(applicationsQuery, {
    variables: {
      options: { limit: 50, offset: 0 },
      filter: tab === 'batch' ? { batch: Number(selectedCoordinatorBatch) } : undefined,
    },
    skip: !canRender || showMentorSummaries || (tab === 'batch' && !selectedCoordinatorBatch),
    fetchPolicy: 'cache-and-network',
  });
  const mentorSummaries = useQuery(GET_SCHOLARSHIP_MENTOR_SUMMARIES, {
    skip: !canRender || !showMentorSummaries,
    fetchPolicy: 'cache-and-network',
  });

  if (!canRender) {
    return (
      <LayoutModule disableCover title="Scholarships • Alumni Network of JNV Paota, Jaipur">
        <Box py={8} display="flex" justifyContent="center">
          <CircularProgress size={28} />
        </Box>
      </LayoutModule>
    );
  }

  return (
    <LayoutModule disableCover title="Scholarships • Alumni Network of JNV Paota, Jaipur">
      <Box display="flex" alignItems="flex-start" justifyContent="space-between" gap={2} mb={2}>
        <Box>
          <Typography variant="h1">Scholarships</Typography>
          <Typography color="grey.800">Applications, disbursements, proof review, and scholarship register.</Typography>
        </Box>
        {canCreate && (
          <Button
            component={Link as any}
            href="/scholarships/new"
            title="New Application"
            startIcon={<IconCirclePlus size={16} />}
            sx={{ minWidth: 180 }}
          />
        )}
      </Box>

      <Tabs value={tab} onChange={(_, value) => setTab(value)} sx={{ mb: 2 }}>
        <Tab value="mine" label="My Applications" />
        {(canReadMentor || canReadOrg) && <Tab value="mentor" label="Mentor Queue" />}
        {canReadBatch && coordinatorBatchOptions.length > 0 && <Tab value="batch" label="Batch" />}
        {canReadOrg && <Tab value="org" label="Organization" />}
      </Tabs>

      {tab === 'batch' && (
        <Box maxWidth={240} mb={2}>
          <ReactSelect
            options={coordinatorBatchOptions}
            value={coordinatorBatchOptions.find((option) => option.value === selectedCoordinatorBatch) || null}
            placeholder="Select batch"
            size="small"
            isSearchable
            onChange={(option) => {
              const selected = option as any;
              setSelectedCoordinatorBatch(selected?.value || '');
            }}
          />
        </Box>
      )}

      {showMentorSummaries ? (
        <MentorSummaryTable
          mentors={mentorSummaries.data?.getScholarshipMentorSummaries || []}
          loading={mentorSummaries.loading}
        />
      ) : (
        <DashboardSummary data={dashboard.data} loading={dashboard.loading} variant={tab} />
      )}
      {canRecordAllocation && (
        <>
          <Divider sx={{ my: 3 }} />
          <AllocationPanel />
        </>
      )}
      {!showMentorSummaries && (
        <>
          <Divider sx={{ my: 3 }} />
          <ApplicationsTable
            applications={
              applications.data?.getMyScholarshipApplications || applications.data?.getScholarshipApplications || []
            }
            loading={applications.loading}
          />
        </>
      )}
    </LayoutModule>
  );
}
