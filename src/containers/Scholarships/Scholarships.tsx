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
  Tooltip,
  Typography,
} from '@mui/material';
import {
  IconAlertTriangle,
  IconBell,
  IconBuilding,
  IconCalendarDue,
  IconCash,
  IconCircleCheck,
  IconCirclePlus,
  IconClipboardList,
  IconClock,
  IconExternalLink,
  IconEyeCheck,
  IconFileText,
  IconHourglass,
  IconInfoCircle,
  IconReceipt,
  IconReportMoney,
  IconUserCheck,
  IconUsers,
  IconWallet,
} from '@tabler/icons-react';
import toast from 'react-hot-toast';
import Button from '@/components/core/Button';
import CurrencyInput from '@/components/core/CurrencyInput';
import Dialog from '@/components/core/Dialog';
import ProfilePicture from '@/components/common/ProfilePicture';
import ReactSelect from '@/components/core/ReactSelect';
import LayoutModule from '@/layouts/Layout';
import { useAuth } from '@/context/AuthContext';
import { EXECUTIVE_POSITION_CODES, PERMISSION_CODES, ROLE_CODES } from '@/constants/access';
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
  SCHOLARSHIP_DASHBOARD_REFETCH_QUERIES,
} from '@/apollo/scholarshipOperations';
import { formatCurrency, getFullName, humanizeScholarshipStatus } from './helpers';
import { useScholarshipLoginGuard } from './useScholarshipLoginGuard';

type DashboardCardConfig = {
  title: string;
  key: string;
  description: string;
  type?: 'currency';
  icon: React.ReactNode;
};

const DashboardCard = ({
  title,
  value,
  description,
  icon,
  caption,
}: {
  title: string;
  value: React.ReactNode;
  description: string;
  icon: React.ReactNode;
  caption?: string;
}) => (
  <Paper variant="outlined" sx={{ p: 2, borderRadius: 1, minHeight: 96 }}>
    <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={1}>
      <Stack direction="row" alignItems="center" spacing={0.75} minWidth={0}>
        <Box component="span" sx={{ display: 'inline-flex', color: 'primary.main' }}>
          {icon}
        </Box>
        <Typography fontSize={13} color="grey.700">
          {title}
        </Typography>
      </Stack>
      <Tooltip title={description} arrow placement="top">
        <Box component="span" sx={{ display: 'inline-flex', color: 'grey.500', cursor: 'help', mt: 0.25 }}>
          <IconInfoCircle size={14} />
        </Box>
      </Tooltip>
    </Stack>
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

const orgValueOnlyMetricKeys = new Set([
  'disputedIncomingAllocation',
  'wrongDisbursementAmount',
  'refundRequestedAmount',
  'refundConfirmedAmount',
]);

const getDashboardCards = (variant: DashboardVariant): DashboardCardConfig[] => {
  if (variant === 'mentor') {
    return [
      {
        title: 'Funds confirmed',
        key: 'confirmedAllocation',
        type: 'currency',
        description: 'Money released to you by finance and confirmed by you.',
        icon: <IconCircleCheck size={18} />,
      },
      {
        title: 'Awaiting your confirmation',
        key: 'pendingIncomingAllocation',
        type: 'currency',
        description: 'Money recorded by finance that you still need to confirm.',
        icon: <IconHourglass size={18} />,
      },
      {
        title: 'Funds in dispute',
        key: 'disputedIncomingAllocation',
        type: 'currency',
        description: 'Allocation amount you disputed or partially disputed.',
        icon: <IconAlertTriangle size={18} />,
      },
      {
        title: 'Mentor balance',
        key: 'mentorCustodyBalance',
        type: 'currency',
        description: 'Confirmed funds still available with you after beneficiary releases and refunds.',
        icon: <IconWallet size={18} />,
      },
      {
        title: 'Waiting for beneficiary',
        key: 'pendingBeneficiaryConfirmation',
        type: 'currency',
        description: 'Scholarship payments sent but not fully confirmed by beneficiaries yet.',
        icon: <IconClock size={18} />,
      },
      {
        title: 'Sent to beneficiaries',
        key: 'confirmedBeneficiaryDisbursement',
        type: 'currency',
        description: 'Amount beneficiaries have confirmed as received.',
        icon: <IconCash size={18} />,
      },
      {
        title: 'Available to approve',
        key: 'approvalCapacity',
        type: 'currency',
        description: 'Amount you can still approve for new scholarship payments.',
        icon: <IconReportMoney size={18} />,
      },
      {
        title: 'Overdue proofs',
        key: 'overdueProof',
        description: 'Applications where usage proof is past the due date.',
        icon: <IconCalendarDue size={18} />,
      },
      {
        title: 'Applications to review',
        key: 'applicationsAwaitingReview',
        description: 'Submitted applications waiting for your review.',
        icon: <IconClipboardList size={18} />,
      },
      {
        title: 'Proofs to verify',
        key: 'fullProofsAwaitingVerification',
        description: 'Full usage-proof submissions waiting for your decision.',
        icon: <IconEyeCheck size={18} />,
      },
    ];
  }

  if (variant === 'batch') {
    return [
      {
        title: 'Applications',
        key: 'totalApplications',
        description: 'All scholarship applications visible for the selected batch.',
        icon: <IconFileText size={18} />,
      },
      {
        title: 'New submissions',
        key: 'submittedApplications',
        description: 'Applications submitted and waiting to move into review.',
        icon: <IconClipboardList size={18} />,
      },
      {
        title: 'Under review',
        key: 'underReviewApplications',
        description: 'Applications currently being reviewed by the assigned mentor.',
        icon: <IconEyeCheck size={18} />,
      },
      {
        title: 'Needs info',
        key: 'needsInformation',
        description: 'Applications or proofs where more details have been requested.',
        icon: <IconInfoCircle size={18} />,
      },
      {
        title: 'Waiting for payment confirmation',
        key: 'paymentConfirmationPendingApplications',
        description: 'Approved payments waiting for beneficiary receipt confirmation.',
        icon: <IconClock size={18} />,
      },
      {
        title: 'Proof overdue',
        key: 'overdueProof',
        description: 'Applications where usage proof is overdue.',
        icon: <IconCalendarDue size={18} />,
      },
      {
        title: 'Wrong disbursements',
        key: 'wrongDisbursementApplications',
        description: 'Applications marked for a possible wrong disbursement issue.',
        icon: <IconAlertTriangle size={18} />,
      },
      {
        title: 'Completed',
        key: 'completedApplications',
        description: 'Applications completed after required proof review.',
        icon: <IconCircleCheck size={18} />,
      },
    ];
  }

  if (variant === 'org') {
    return [
      {
        title: 'Allocated to mentors',
        key: 'totalAllocationRecorded',
        type: 'currency',
        description: 'Total funds finance has recorded as released to mentors.',
        icon: <IconReportMoney size={18} />,
      },
      {
        title: 'Confirmed by mentors',
        key: 'confirmedAllocation',
        type: 'currency',
        description: 'Funds mentors have confirmed receiving.',
        icon: <IconCircleCheck size={18} />,
      },
      {
        title: 'Awaiting mentor confirmation',
        key: 'pendingIncomingAllocation',
        type: 'currency',
        description: 'Funds released to mentors but not confirmed by them yet.',
        icon: <IconHourglass size={18} />,
      },
      {
        title: 'Mentor allocation disputes',
        key: 'disputedIncomingAllocation',
        type: 'currency',
        description: 'Allocation amount disputed by mentors.',
        icon: <IconAlertTriangle size={18} />,
      },
      {
        title: 'Balance with mentors',
        key: 'mentorCustodyBalance',
        type: 'currency',
        description: 'Confirmed funds currently held by mentors for scholarship payments.',
        icon: <IconWallet size={18} />,
      },
      {
        title: 'Waiting for beneficiaries',
        key: 'pendingBeneficiaryConfirmation',
        type: 'currency',
        description: 'Payments sent to beneficiaries but not fully confirmed yet.',
        icon: <IconClock size={18} />,
      },
      {
        title: 'Sent to beneficiaries',
        key: 'confirmedBeneficiaryDisbursement',
        type: 'currency',
        description: 'Amount beneficiaries have confirmed as received.',
        icon: <IconCash size={18} />,
      },
      {
        title: 'Completed after proof',
        key: 'totalCompletedAfterProofVerification',
        type: 'currency',
        description: 'Disbursed amount linked to applications completed after proof verification.',
        icon: <IconReceipt size={18} />,
      },
      {
        title: 'Overdue proof amount',
        key: 'overdueProofAmount',
        type: 'currency',
        description: 'Disbursed amount where usage proof is overdue.',
        icon: <IconCalendarDue size={18} />,
      },
      {
        title: 'Wrong disbursement amount',
        key: 'wrongDisbursementAmount',
        type: 'currency',
        description: 'Amount currently marked under wrong-disbursement cases.',
        icon: <IconAlertTriangle size={18} />,
      },
      {
        title: 'Refunds requested',
        key: 'refundRequestedAmount',
        type: 'currency',
        description: 'Refund amount requested from beneficiaries.',
        icon: <IconBell size={18} />,
      },
      {
        title: 'Refunds received',
        key: 'refundConfirmedAmount',
        type: 'currency',
        description: 'Refund amount confirmed as received by finance or Secretary.',
        icon: <IconCircleCheck size={18} />,
      },
      {
        title: 'Active beneficiaries',
        key: 'activeBeneficiaryCount',
        description: 'Unique beneficiaries with active scholarship applications.',
        icon: <IconUsers size={18} />,
      },
      {
        title: 'Active mentors',
        key: 'activeMentorCount',
        description: 'Unique mentors assigned to active scholarship applications.',
        icon: <IconUserCheck size={18} />,
      },
      {
        title: 'Exceptions',
        key: 'exceptionCount',
        description:
          'Open issues needing attention, including routing, refunds, disputes, overdue proof, and failures.',
        icon: <IconAlertTriangle size={18} />,
      },
    ];
  }

  return [
    {
      title: 'Drafts',
      key: 'draftRequests',
      description: 'Scholarship applications you started but have not submitted.',
      icon: <IconFileText size={18} />,
    },
    {
      title: 'In review',
      key: 'submittedOrUnderReview',
      description: 'Submitted applications that are waiting for or currently under mentor review.',
      icon: <IconEyeCheck size={18} />,
    },
    {
      title: 'Needs info',
      key: 'needsInformation',
      description: 'Applications or proofs where more details were requested.',
      icon: <IconInfoCircle size={18} />,
    },
    {
      title: 'Waiting for payment confirmation',
      key: 'awaitingPaymentConfirmation',
      description: 'Approved payments waiting for beneficiary receipt confirmation.',
      icon: <IconClock size={18} />,
    },
    {
      title: 'Proof due',
      key: 'proofDue',
      description: 'Applications where usage proof needs to be submitted.',
      icon: <IconReceipt size={18} />,
    },
    {
      title: 'Partial proof',
      key: 'partialProof',
      description: 'Proof submitted so far covers only part of the required amount.',
      icon: <IconClipboardList size={18} />,
    },
    {
      title: 'Proof overdue',
      key: 'overdueProof',
      description: 'Applications where usage proof is past the due date.',
      icon: <IconCalendarDue size={18} />,
    },
    {
      title: 'Completed',
      key: 'completedApplications',
      description: 'Applications completed after required proof review.',
      icon: <IconCircleCheck size={18} />,
    },
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
  const dashboardCards = getDashboardCards(variant).filter((card) => {
    if (variant !== 'org' || !orgValueOnlyMetricKeys.has(card.key)) return true;
    return Number(dashboard?.[card.key] || 0) > 0;
  });

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
        {dashboardCards.map((card) => (
          <DashboardCard
            key={card.key}
            title={card.title}
            description={card.description}
            icon={card.icon}
            value={getMetricValue(dashboard, card.key, card.type)}
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
                  <Chip size="small" variant="outlined" icon={<IconHourglass size={14} />} label="Routing pending" />
                )}
              </TableCell>
              <TableCell>{formatCurrency(application.requestedAmount)}</TableCell>
              <TableCell>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  <Chip
                    size="small"
                    icon={<IconClipboardList size={14} />}
                    label={humanizeScholarshipStatus(application.status)}
                  />
                  <Chip
                    size="small"
                    variant="outlined"
                    icon={<IconReceipt size={14} />}
                    label={humanizeScholarshipStatus(application.proofStatus)}
                  />
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

const buildMentorReleaseOptions = (mentors: any[]) =>
  mentors.flatMap((row) => {
    const mentor = row.mentor;
    const name = getFullName(mentor) || mentor?.email || 'Batch Mentor';
    return (row.assignedBatches || []).map((batch: number) => ({
      value: `${row.mentorUserId}:${batch}`,
      label: `${name} - Mentor of Batch ${batch}`,
      title: name,
      summary: `Mentor of Batch ${batch}${mentor?.email ? ` • ${mentor.email}` : ''}`,
      avatarUrl: mentor?.profileImage || undefined,
      mentorUserId: row.mentorUserId,
      batch,
    }));
  });

const MentorFundReleaseDialog = ({
  open,
  onClose,
  mentors,
}: {
  open: boolean;
  onClose: () => void;
  mentors: any[];
}) => {
  const [form, setForm] = React.useState<{
    selectedMentor: any | null;
    amount: number | null;
    transferDate: string;
    method: string;
    reference: string;
    notes: string;
  }>({
    selectedMentor: null,
    amount: null,
    transferDate: todayDateInputValue(),
    method: 'BANK_TRANSFER',
    reference: '',
    notes: '',
  });
  const [recordAllocation, allocationState] = useMutation(RECORD_MENTOR_FUND_ALLOCATION, {
    refetchQueries: SCHOLARSHIP_DASHBOARD_REFETCH_QUERIES,
  });

  const mentorOptions = React.useMemo(() => buildMentorReleaseOptions(mentors), [mentors]);
  const amount = form.amount ?? 0;

  const setField =
    (field: 'transferDate' | 'method' | 'reference' | 'notes') => (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm((current) => ({ ...current, [field]: event.target.value }));
    };

  const resetForm = () => {
    setForm({
      selectedMentor: null,
      amount: null,
      transferDate: todayDateInputValue(),
      method: 'BANK_TRANSFER',
      reference: '',
      notes: '',
    });
  };

  const handleClose = () => {
    if (allocationState.loading) return;
    resetForm();
    onClose();
  };

  const submitAllocation = async () => {
    if (!form.selectedMentor) return;

    try {
      await recordAllocation({
        variables: {
          input: {
            mentorUserId: form.selectedMentor.mentorUserId,
            batch: form.selectedMentor.batch,
            amount: form.amount ?? 0,
            currency: 'INR',
            transferDate: form.transferDate,
            method: form.method,
            reference: form.reference || null,
            notes: form.notes || null,
          },
        },
      });
      toast.success('Funds allocated to mentor.');
      handleClose();
    } catch (error: any) {
      toast.error(error?.message || 'Could not allocate mentor funds.');
    }
  };

  return (
    <Dialog
      open={open}
      maxWidth="760px"
      title="Allocate Funds to Mentor"
      subTitle="Record association funds released to one active batch mentor."
      onClose={handleClose}
      disableBackdropClick={allocationState.loading}
      footerProps={{
        onCancel: handleClose,
        onOkay: submitAllocation,
        okayButtonProps: {
          title: 'Allocate Funds',
          loading: allocationState.loading,
          disabled: !form.selectedMentor || !form.amount || !form.transferDate,
        },
      }}
    >
      <Box p={2.5}>
        <Alert severity="info" sx={{ mb: 2 }}>
          This records funds released by JNVPJAA to a batch mentor. The mentor will confirm the received amount before
          it becomes available for beneficiary approvals.
        </Alert>
        <Stack spacing={2}>
          <Typography variant="caption" color="text.secondary">
            Mentor
          </Typography>
          <ReactSelect
            options={mentorOptions}
            value={form.selectedMentor}
            placeholder="Select mentor to allocate funds"
            size="small"
            isSearchable
            showAvatars
            noOptionsMessage="No active batch mentor found"
            onChange={(option) =>
              setForm((current) => ({
                ...current,
                selectedMentor: Array.isArray(option) ? null : option,
              }))
            }
          />
          <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 180px' }} gap={1.5}>
            <CurrencyInput
              label="Amount"
              size="small"
              value={form.amount}
              onValueChange={(value) => setForm((current) => ({ ...current, amount: value }))}
            />
            <TextField
              label="Transfer date"
              size="small"
              type="date"
              value={form.transferDate}
              onChange={setField('transferDate')}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
          <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '180px 1fr' }} gap={1.5}>
            <TextField select label="Transfer method" size="small" value={form.method} onChange={setField('method')}>
              <MenuItem value="BANK_TRANSFER">Bank transfer</MenuItem>
              <MenuItem value="UPI">UPI</MenuItem>
              <MenuItem value="CHEQUE">Cheque</MenuItem>
              <MenuItem value="CASH">Cash</MenuItem>
            </TextField>
            <TextField
              label="Reference ID"
              size="small"
              value={form.reference}
              onChange={setField('reference')}
              placeholder="UTR, cheque number, or internal reference"
            />
          </Box>
          <TextField
            label="Internal note"
            size="small"
            value={form.notes}
            onChange={setField('notes')}
            placeholder="Optional context for finance records"
            multiline
            minRows={2}
          />
          <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 1, bgcolor: 'grey.50' }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" gap={1}>
              <Typography fontSize={14} color="grey.700">
                {form.selectedMentor?.label || 'No mentor selected'}
              </Typography>
              <Typography fontSize={14} fontWeight={700}>
                Release amount: {formatCurrency(amount)}
              </Typography>
            </Stack>
          </Paper>
        </Stack>
      </Box>
    </Dialog>
  );
};

export default function Scholarships() {
  const { can, user, roles, access, hasRole, hasPosition } = useAuth();
  const canRender = useScholarshipLoginGuard(user?.id);
  const canCreate = can(PERMISSION_CODES.SCHOLARSHIP_APPLICATION_CREATE);
  const canReadOrg = can(PERMISSION_CODES.SCHOLARSHIP_DASHBOARD_READ_ORG);
  const canReadMentor = can(PERMISSION_CODES.SCHOLARSHIP_DASHBOARD_READ_MENTOR);
  const canReadBatch = can(PERMISSION_CODES.SCHOLARSHIP_DASHBOARD_READ_BATCH);
  const canReleaseMentorFunds =
    can(PERMISSION_CODES.SCHOLARSHIP_ALLOCATION_CREATE) &&
    (hasRole(ROLE_CODES.FINANCE_MANAGER) || hasPosition(EXECUTIVE_POSITION_CODES.SECRETARY));
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
  const [releaseDialogOpen, setReleaseDialogOpen] = React.useState(false);
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
        <Tab value="mine" icon={<IconFileText size={18} />} iconPosition="start" label="My Requests" />
        {(canReadMentor || canReadOrg) && (
          <Tab value="mentor" icon={<IconWallet size={18} />} iconPosition="start" label="Mentor Funds" />
        )}
        {canReadBatch && coordinatorBatchOptions.length > 0 && (
          <Tab value="batch" icon={<IconUsers size={18} />} iconPosition="start" label="Batch View" />
        )}
        {canReadOrg && <Tab value="org" icon={<IconBuilding size={18} />} iconPosition="start" label="Organisation" />}
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
        <>
          <Box display="flex" justifyContent="space-between" alignItems="flex-start" gap={2} mb={2}>
            <Box>
              <Typography fontSize={18} fontWeight={700}>
                Mentor Funds Overview
              </Typography>
              <Typography fontSize={14} color="grey.700">
                Review mentor fund balances, beneficiary releases, and pending confirmations.
              </Typography>
            </Box>
            {canReleaseMentorFunds && (
              <Button
                title="Allocate Funds"
                startIcon={<IconCash size={16} />}
                onClick={() => setReleaseDialogOpen(true)}
                sx={{ minWidth: 160 }}
              />
            )}
          </Box>
          <MentorSummaryTable
            mentors={mentorSummaries.data?.getScholarshipMentorSummaries || []}
            loading={mentorSummaries.loading}
          />
          <MentorFundReleaseDialog
            open={releaseDialogOpen}
            onClose={() => setReleaseDialogOpen(false)}
            mentors={mentorSummaries.data?.getScholarshipMentorSummaries || []}
          />
        </>
      ) : (
        <DashboardSummary data={dashboard.data} loading={dashboard.loading} variant={tab} />
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
