'use client';

import React from 'react';
import Link from 'next/link';
import { useApolloClient, useMutation, useQuery } from '@apollo/client';
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
import TextField from '@/components/core/TextField';
import AlertDialog, { AlertDialogProps } from '@/components/common/AlertDialog';
import ProfilePicture from '@/components/common/ProfilePicture';
import ReactSelect from '@/components/core/ReactSelect';
import LayoutModule from '@/layouts/Layout';
import { useAuth } from '@/context/AuthContext';
import { EXECUTIVE_POSITION_CODES, PERMISSION_CODES, ROLE_CODES } from '@/constants/access';
import { getBatchOptions } from '@/utils/helpers';
import {
  CONFIRM_MENTOR_FUND_ALLOCATION,
  DISPUTE_MENTOR_FUND_ALLOCATION,
  GET_MENTOR_FUND_ALLOCATIONS,
  GET_MENTOR_SCHOLARSHIP_APPLICATIONS,
  GET_MENTOR_SCHOLARSHIP_DASHBOARD,
  GET_MY_SCHOLARSHIP_APPLICATIONS,
  GET_MY_SCHOLARSHIP_DASHBOARD,
  GET_BATCH_COORDINATOR_SCHOLARSHIP_DASHBOARD,
  GET_SCHOLARSHIP_APPLICATIONS,
  GET_SCHOLARSHIP_MENTOR_SUMMARIES,
  GET_SCHOLARSHIP_ORG_DASHBOARD,
  RECORD_MENTOR_FUND_ALLOCATION,
  SCHOLARSHIP_DASHBOARD_CACHE_FIELDS,
  START_SCHOLARSHIP_REVIEW,
} from '@/apollo/scholarshipOperations';
import { GET_ASSOCIATION_WALLET_SUMMARY } from '@/apollo/billingOperations';
import { invalidateActiveQueryFields, invalidateBillingLedgerQueries } from '@/apollo/cacheInvalidation';
import { formatCurrency, getFullName, humanizeScholarshipStatus } from './helpers';
import { useScholarshipLoginGuard } from './useScholarshipLoginGuard';

type DashboardCardConfig = {
  title: string;
  key: string;
  description: string;
  type?: 'currency';
  icon: React.ReactNode;
};

const DashboardCardComponent = ({
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
const DashboardCard = React.memo(DashboardCardComponent);
DashboardCard.displayName = 'DashboardCard';

type DashboardVariant = 'mine' | 'mentor' | 'batch' | 'org';
type MyRequestsWorkspaceTab = 'actions' | 'all';
type MentorWorkspaceTab = 'funds' | 'requests';

const displayDateFormatter = new Intl.DateTimeFormat('en-IN', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

const formatDisplayDate = (date?: string | null) => {
  if (!date) return 'Not recorded';
  return displayDateFormatter.format(new Date(date));
};

const getAllocationStatusMeta = (status?: string | null) => {
  switch (status) {
    case 'CONFIRMED':
      return { label: 'Confirmed by mentor', color: 'success' as const };
    case 'DISPUTED':
      return { label: 'Disputed by mentor', color: 'error' as const };
    case 'PARTIALLY_DISPUTED':
      return { label: 'Partially disputed', color: 'warning' as const };
    case 'CANCELLED':
    case 'REVERSED':
    case 'CLOSED':
      return { label: humanizeScholarshipStatus(status), color: 'default' as const };
    default:
      return { label: 'Needs your confirmation', color: 'warning' as const };
  }
};

const getMentorRequestGuidance = (application: any) => {
  switch (application.status) {
    case 'SUBMITTED':
    case 'RESUBMITTED':
      return {
        title: 'New request',
        description: 'Open the request, verify details, and start the review.',
        actionTitle: 'Start Review',
      };
    case 'UNDER_REVIEW':
      return {
        title: 'Review in progress',
        description: 'Decide whether to approve, ask for more information, or reject.',
        actionTitle: 'Review Request',
      };
    case 'PAYMENT_CONFIRMATION_PENDING':
      return {
        title: 'Waiting for beneficiary',
        description: 'Payment was created. The beneficiary needs to confirm credit with proof.',
        actionTitle: 'View Payment',
      };
    case 'PAYMENT_CONFIRMED_PROOF_DUE':
    case 'PROOF_PARTIAL':
      return {
        title: 'Usage proof pending',
        description: 'Beneficiary needs to submit usage receipts for the confirmed amount.',
        actionTitle: 'View Proof',
      };
    case 'PROOF_FULL_SUBMITTED':
      return {
        title: 'Proof ready to verify',
        description: 'Full usage proof is submitted and needs mentor verification.',
        actionTitle: 'Review Proof',
      };
    case 'MORE_INFO_REQUIRED':
    case 'PROOF_MORE_INFO_REQUIRED':
      return {
        title: 'Waiting for details',
        description: 'More information was requested from the beneficiary.',
        actionTitle: 'View',
      };
    case 'WRONG_DISBURSEMENT':
    case 'REFUND_IN_PROGRESS':
      return {
        title: 'Exception case',
        description: 'This request needs careful follow-up before it can be closed.',
        actionTitle: 'Open Case',
      };
    case 'PROOF_VERIFIED':
    case 'CLOSED':
      return {
        title: 'Completed',
        description: 'No mentor action is pending right now.',
        actionTitle: 'View',
      };
    default:
      return {
        title: humanizeScholarshipStatus(application.status),
        description: 'Open the request to see the next available action.',
        actionTitle: 'View',
      };
  }
};

const getMyRequestGuidance = (application: any) => {
  switch (application.status) {
    case 'DRAFT':
      return {
        severity: 'warning' as const,
        label: 'Draft',
        title: 'Finish and submit',
        description: 'Your request is saved as a draft. Submit it when the details are ready.',
        actionTitle: 'Continue',
      };
    case 'MORE_INFO_REQUIRED':
    case 'PROOF_MORE_INFO_REQUIRED':
      return {
        severity: 'warning' as const,
        label: 'Needs your input',
        title: 'More details needed',
        description: 'The mentor has asked for more information before this can move forward.',
        actionTitle: 'Respond',
      };
    case 'ROUTING_PENDING':
      return {
        severity: 'info' as const,
        label: 'Mentor pending',
        title: 'Waiting for mentor assignment',
        description: 'Your request is submitted and waiting for an eligible mentor to be assigned.',
        actionTitle: 'View',
      };
    case 'SUBMITTED':
    case 'RESUBMITTED':
    case 'UNDER_REVIEW':
      return {
        severity: 'info' as const,
        label: 'In review',
        title: 'Mentor review in progress',
        description: 'Your assigned mentor is reviewing the request.',
        actionTitle: 'View',
      };
    case 'PAYMENT_CONFIRMATION_PENDING':
      return {
        severity: 'warning' as const,
        label: 'Confirm credit',
        title: 'Confirm money received',
        description: 'Upload credit proof and confirm the amount received.',
        actionTitle: 'Confirm Receipt',
      };
    case 'PAYMENT_CONFIRMED_PROOF_DUE':
    case 'PROOF_PARTIAL':
    case 'PROOF_REJECTED':
      return {
        severity: 'warning' as const,
        label: 'Proof due',
        title: 'Submit usage proof',
        description: 'Upload usage receipts for the scholarship amount you received.',
        actionTitle: 'Upload Proof',
      };
    case 'PROOF_FULL_SUBMITTED':
      return {
        severity: 'info' as const,
        label: 'Proof submitted',
        title: 'Waiting for proof review',
        description: 'Your mentor will verify the submitted usage proof.',
        actionTitle: 'View Proof',
      };
    case 'WRONG_DISBURSEMENT':
    case 'REFUND_IN_PROGRESS':
      return {
        severity: 'error' as const,
        label: 'Needs follow-up',
        title: 'Exception open',
        description: 'This request needs attention because a disbursement or refund case is open.',
        actionTitle: 'Open Case',
      };
    case 'REJECTED':
    case 'CANCELLED':
      return {
        severity: 'error' as const,
        label: humanizeScholarshipStatus(application.status),
        title: 'Request closed',
        description: 'This request is no longer active.',
        actionTitle: 'View',
      };
    case 'PROOF_VERIFIED':
    case 'CLOSED':
      return {
        severity: 'success' as const,
        label: 'Completed',
        title: 'Completed',
        description: 'This scholarship request is complete.',
        actionTitle: 'View',
      };
    default:
      return {
        severity: 'default' as const,
        label: humanizeScholarshipStatus(application.status),
        title: humanizeScholarshipStatus(application.status),
        description: 'Open the request to see the latest details.',
        actionTitle: 'View',
      };
  }
};

const getDashboardFromData = (data: any) =>
  data?.getScholarshipOrganizationDashboard ||
  data?.getMentorScholarshipDashboard ||
  data?.getBatchCoordinatorScholarshipDashboard ||
  data?.getMyScholarshipDashboard;

const getMetricValue = (dashboard: any, key: string, type?: 'currency') =>
  type === 'currency' ? formatCurrency(dashboard?.[key] || 0) : dashboard?.[key] || 0;

const orgValueOnlyMetricKeys = new Set([
  'pendingIncomingAllocation',
  'disputedIncomingAllocation',
  'overdueProofAmount',
  'wrongDisbursementAmount',
  'refundRequestedAmount',
  'refundConfirmedAmount',
  'exceptionCount',
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
        description: 'Funds currently treated as confirmed with mentors after disputes are excluded.',
        icon: <IconReportMoney size={18} />,
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

const DashboardSummaryComponent = ({
  data,
  loading,
  variant,
}: {
  data: any;
  loading: boolean;
  variant: DashboardVariant;
}) => {
  const dashboard = getDashboardFromData(data);
  const dashboardCards = React.useMemo(
    () =>
      getDashboardCards(variant).filter((card) => {
        if (variant !== 'org' || !orgValueOnlyMetricKeys.has(card.key)) return true;
        return Number(dashboard?.[card.key] || 0) > 0;
      }),
    [dashboard, variant]
  );

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
    </>
  );
};
const DashboardSummary = React.memo(DashboardSummaryComponent);
DashboardSummary.displayName = 'DashboardSummary';

const WorkspaceStatusBadges = ({ children }: { children: React.ReactNode }) => (
  <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 1, mb: 2, bgcolor: 'grey.50' }}>
    <Stack direction="row" gap={1} flexWrap="wrap" alignItems="center">
      <Typography fontSize={14} fontWeight={700} mr={0.5}>
        Needs attention
      </Typography>
      {children}
    </Stack>
  </Paper>
);

const ApplicationsTableComponent = ({
  applications,
  loading,
  actionRenderer,
}: {
  applications: any[];
  loading: boolean;
  actionRenderer?: (application: any) => React.ReactNode;
}) => {
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
            <TableCell align="right">Action</TableCell>
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
                {actionRenderer ? (
                  actionRenderer(application)
                ) : (
                  <Button
                    component={Link as any}
                    href={`/scholarships/${application.id}`}
                    variant="text"
                    title="View"
                    endIcon={<IconExternalLink size={16} />}
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};
const ApplicationsTable = React.memo(ApplicationsTableComponent);
ApplicationsTable.displayName = 'ApplicationsTable';

const MyRequestsTable = ({ applications, loading }: { applications: any[]; loading: boolean }) => (
  <ApplicationsTable
    applications={applications}
    loading={loading}
    actionRenderer={(application) => {
      const guidance = getMyRequestGuidance(application);

      return (
        <Stack direction="row" spacing={1} justifyContent="flex-end" alignItems="center">
          <Box textAlign="right" display={{ xs: 'none', lg: 'block' }}>
            <Chip size="small" color={guidance.severity} variant="outlined" label={guidance.label} sx={{ mb: 0.5 }} />
            <Typography fontSize={12} color="grey.600" maxWidth={250}>
              {guidance.description}
            </Typography>
          </Box>
          <Button
            component={Link as any}
            href={`/scholarships/${application.id}`}
            size="small"
            variant={guidance.severity === 'warning' || guidance.severity === 'error' ? 'contained' : 'outlined'}
            title="View Details"
            endIcon={<IconExternalLink size={15} />}
            sx={{ minWidth: 122, whiteSpace: 'nowrap' }}
          />
        </Stack>
      );
    }}
  />
);

const MyRequestsWorkspace = ({
  dashboardData,
  dashboardLoading,
  applications,
  applicationsLoading,
}: {
  dashboardData: any;
  dashboardLoading: boolean;
  applications: any[];
  applicationsLoading: boolean;
}) => {
  const [requestTab, setRequestTab] = React.useState<MyRequestsWorkspaceTab>('actions');
  const { actionApplications, awaitingMentorCount, completedCount } = React.useMemo(() => {
    const actionStatuses = new Set([
      'DRAFT',
      'MORE_INFO_REQUIRED',
      'PAYMENT_CONFIRMATION_PENDING',
      'PAYMENT_CONFIRMED_PROOF_DUE',
      'PROOF_PARTIAL',
      'PROOF_REJECTED',
      'PROOF_MORE_INFO_REQUIRED',
      'WRONG_DISBURSEMENT',
      'REFUND_IN_PROGRESS',
    ]);
    const awaitingStatuses = new Set([
      'ROUTING_PENDING',
      'SUBMITTED',
      'RESUBMITTED',
      'UNDER_REVIEW',
      'PROOF_FULL_SUBMITTED',
    ]);
    const actionItems: any[] = [];
    let awaitingCount = 0;
    let doneCount = 0;

    applications.forEach((application) => {
      if (actionStatuses.has(application.status)) actionItems.push(application);
      if (awaitingStatuses.has(application.status)) awaitingCount += 1;
      if (application.status === 'PROOF_VERIFIED' || application.status === 'CLOSED') doneCount += 1;
    });

    return {
      actionApplications: actionItems,
      awaitingMentorCount: awaitingCount,
      completedCount: doneCount,
    };
  }, [applications]);

  return (
    <>
      <Paper variant="outlined" sx={{ p: 2, borderRadius: 1, mb: 2 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" gap={2}>
          <Box>
            <Typography fontSize={18} fontWeight={700}>
              My Scholarship Requests
            </Typography>
            <Typography fontSize={14} color="grey.700">
              Track each request, confirm payments, and complete proof steps from one place.
            </Typography>
          </Box>
        </Stack>
      </Paper>

      <WorkspaceStatusBadges>
        {actionApplications.length > 0 ? (
          <Chip color="warning" icon={<IconBell size={14} />} label={`${actionApplications.length} action needed`} />
        ) : (
          <Chip color="success" icon={<IconCircleCheck size={14} />} label="No member action pending" />
        )}
        {awaitingMentorCount > 0 && (
          <Chip color="info" icon={<IconClock size={14} />} label={`${awaitingMentorCount} with mentor`} />
        )}
        {completedCount > 0 && (
          <Chip color="success" icon={<IconCircleCheck size={14} />} label={`${completedCount} completed`} />
        )}
      </WorkspaceStatusBadges>

      <Box mb={2}>
        <DashboardSummary data={dashboardData} loading={dashboardLoading} variant="mine" />
      </Box>

      <Tabs value={requestTab} onChange={(_, value) => setRequestTab(value)} sx={{ mb: 2 }}>
        <Tab value="actions" icon={<IconBell size={18} />} iconPosition="start" label="Action Needed" />
        <Tab value="all" icon={<IconFileText size={18} />} iconPosition="start" label="All Requests" />
      </Tabs>

      {requestTab === 'actions' && (
        <>
          {!applicationsLoading && !actionApplications.length && (
            <Alert severity="success" sx={{ mb: 2 }}>
              No action is pending from your side right now.
            </Alert>
          )}
          {(applicationsLoading || actionApplications.length > 0) && (
            <MyRequestsTable applications={actionApplications} loading={applicationsLoading} />
          )}
        </>
      )}
      {requestTab === 'all' && <MyRequestsTable applications={applications} loading={applicationsLoading} />}
    </>
  );
};

const MentorFundsTableComponent = ({
  allocations,
  loading,
  canConfirm,
  canDispute,
  onConfirm,
  onDispute,
}: {
  allocations: any[];
  loading: boolean;
  canConfirm: boolean;
  canDispute: boolean;
  onConfirm: (allocation: any) => void;
  onDispute: (allocation: any) => void;
}) => {
  if (loading) {
    return (
      <Box py={5} display="flex" justifyContent="center">
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (!allocations.length) {
    return (
      <Alert severity="info" sx={{ mt: 2 }}>
        No mentor fund release has been recorded for you yet.
      </Alert>
    );
  }

  return (
    <Paper variant="outlined" sx={{ borderRadius: 1, overflowX: 'auto' }}>
      <Table sx={{ minWidth: 980 }}>
        <TableHead>
          <TableRow>
            <TableCell>Fund Release</TableCell>
            <TableCell align="right">Released</TableCell>
            <TableCell align="right">Confirmed</TableCell>
            <TableCell align="right">In Dispute</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Transfer</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allocations.map((allocation) => {
            const status = getAllocationStatusMeta(allocation.status);
            const needsMentorAction = allocation.status === 'PENDING_MENTOR_CONFIRMATION';

            return (
              <TableRow key={allocation.id} hover>
                <TableCell>
                  <Typography fontWeight={700}>Batch {allocation.batch} scholarship funds</Typography>
                  <Typography fontSize={13} color="grey.600">
                    {allocation.reference ? `Reference ${allocation.reference}` : 'No reference provided'}
                  </Typography>
                </TableCell>
                <TableCell align="right">{formatCurrency(allocation.amount)}</TableCell>
                <TableCell align="right">{formatCurrency(allocation.confirmedAmount)}</TableCell>
                <TableCell align="right">{formatCurrency(allocation.disputedAmount)}</TableCell>
                <TableCell>
                  <Chip size="small" color={status.color} variant="outlined" label={status.label} />
                </TableCell>
                <TableCell>
                  <Typography fontSize={14}>{formatDisplayDate(allocation.transferDate)}</Typography>
                  <Typography fontSize={12} color="grey.600">
                    {humanizeScholarshipStatus(allocation.method)}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  {needsMentorAction ? (
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      <Button
                        size="small"
                        title="Confirm"
                        startIcon={<IconCircleCheck size={15} />}
                        disabled={!canConfirm}
                        onClick={() => onConfirm(allocation)}
                      />
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        title="Report Issue"
                        startIcon={<IconAlertTriangle size={15} />}
                        disabled={!canDispute}
                        onClick={() => onDispute(allocation)}
                      />
                    </Stack>
                  ) : (
                    <Typography fontSize={13} color="grey.600">
                      No action needed
                    </Typography>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
};
const MentorFundsTable = React.memo(MentorFundsTableComponent);
MentorFundsTable.displayName = 'MentorFundsTable';

const MentorRequestsTableComponent = ({
  applications,
  loading,
  canStartReview,
  onStartReview,
  startingApplicationId,
}: {
  applications: any[];
  loading: boolean;
  canStartReview: boolean;
  onStartReview: (application: any) => void;
  startingApplicationId?: string | null;
}) => (
  <ApplicationsTable
    applications={applications}
    loading={loading}
    actionRenderer={(application) => {
      const guidance = getMentorRequestGuidance(application);
      const canStart = canStartReview && ['SUBMITTED', 'RESUBMITTED'].includes(application.status);

      return (
        <Stack direction="row" spacing={1} justifyContent="flex-end" alignItems="center">
          <Box textAlign="right" display={{ xs: 'none', lg: 'block' }}>
            <Typography fontSize={13} fontWeight={700}>
              {guidance.title}
            </Typography>
            <Typography fontSize={12} color="grey.600" maxWidth={260}>
              {guidance.description}
            </Typography>
          </Box>
          {canStart ? (
            <Button
              size="small"
              title="Start Review"
              startIcon={<IconEyeCheck size={15} />}
              loading={startingApplicationId === application.id}
              onClick={() => onStartReview(application)}
            />
          ) : (
            <Button
              component={Link as any}
              href={`/scholarships/${application.id}`}
              size="small"
              variant="outlined"
              title={guidance.actionTitle}
              endIcon={<IconExternalLink size={15} />}
            />
          )}
        </Stack>
      );
    }}
  />
);
const MentorRequestsTable = React.memo(MentorRequestsTableComponent);
MentorRequestsTable.displayName = 'MentorRequestsTable';

const MentorWorkspace = ({
  dashboardData,
  dashboardLoading,
  applications,
  applicationsLoading,
  allocations,
  allocationsLoading,
  canConfirmAllocation,
  canDisputeAllocation,
  canStartReview,
  mentorTab,
  onMentorTabChange,
}: {
  dashboardData: any;
  dashboardLoading: boolean;
  applications: any[];
  applicationsLoading: boolean;
  allocations: any[];
  allocationsLoading: boolean;
  canConfirmAllocation: boolean;
  canDisputeAllocation: boolean;
  canStartReview: boolean;
  mentorTab: MentorWorkspaceTab;
  onMentorTabChange: (tab: MentorWorkspaceTab) => void;
}) => {
  const client = useApolloClient();
  const [alertDialog, setAlertDialog] = React.useState<Partial<AlertDialogProps>>({});
  const [disputeDialog, setDisputeDialog] = React.useState<{
    allocation: any | null;
    amount: number | null;
    reason: string;
    state: 'form' | 'loading' | 'success' | 'error';
    message?: string;
  }>({ allocation: null, amount: null, reason: '', state: 'form' });
  const [startingApplicationId, setStartingApplicationId] = React.useState<string | null>(null);

  const [confirmAllocation] = useMutation(CONFIRM_MENTOR_FUND_ALLOCATION);
  const [disputeAllocation] = useMutation(DISPUTE_MENTOR_FUND_ALLOCATION);
  const [startReview] = useMutation(START_SCHOLARSHIP_REVIEW);

  const { pendingFundCount, openRequestCount } = React.useMemo(() => {
    const mentorDashboard = getDashboardFromData(dashboardData);
    const loadedPendingFundCount = allocations.filter(
      (allocation) => allocation.status === 'PENDING_MENTOR_CONFIRMATION'
    ).length;
    const loadedOpenRequestCount = applications.filter((application) =>
      ['SUBMITTED', 'RESUBMITTED', 'UNDER_REVIEW', 'PROOF_FULL_SUBMITTED'].includes(application.status)
    ).length;

    return {
      pendingFundCount:
        loadedPendingFundCount ||
        Number(
          mentorDashboard?.byAllocationStatus?.find((status: any) => status.key === 'PENDING_MENTOR_CONFIRMATION')
            ?.count || 0
        ),
      openRequestCount:
        loadedOpenRequestCount ||
        Number(mentorDashboard?.applicationsAwaitingReview || 0) +
          Number(mentorDashboard?.fullProofsAwaitingVerification || 0),
    };
  }, [allocations, applications, dashboardData]);

  const closeAlertDialog = React.useCallback(() => setAlertDialog({}), []);
  const closeDisputeDialog = () => {
    if (disputeDialog.state === 'loading') return;
    setDisputeDialog({ allocation: null, amount: null, reason: '', state: 'form' });
  };

  const openConfirmDialog = React.useCallback(
    (allocation: any) => {
      setAlertDialog({
        open: true,
        action: 'update',
        title: 'Confirm Funds Received',
        message: (
          <Typography>
            Confirm that you received {formatCurrency(allocation.amount)} for Batch {allocation.batch}. Once confirmed,
            this amount becomes available for scholarship approvals from your mentor balance.
          </Typography>
        ),
        okayButtonProps: { title: 'Confirm Received' },
        onCancel: closeAlertDialog,
        onClose: closeAlertDialog,
        onOkay: async () => {
          setAlertDialog({
            open: true,
            action: 'loading',
            title: 'Confirming Funds',
            message: 'Please wait while we update your mentor fund balance.',
            onCancel: closeAlertDialog,
            onClose: closeAlertDialog,
          });
          try {
            await confirmAllocation({ variables: { allocationId: allocation.id } });
            await invalidateActiveQueryFields(client, SCHOLARSHIP_DASHBOARD_CACHE_FIELDS);
            await invalidateBillingLedgerQueries(client, { invalidateWallet: false });
            setAlertDialog({
              open: true,
              action: 'success',
              title: 'Funds Confirmed',
              message: 'Your mentor fund balance has been updated.',
              okayButtonProps: { title: 'Done' },
              onCancel: closeAlertDialog,
              onClose: closeAlertDialog,
            });
          } catch (error: any) {
            setAlertDialog({
              open: true,
              action: 'error',
              title: 'Could Not Confirm Funds',
              message: error?.message || 'Please try again.',
              okayButtonProps: { title: 'Close' },
              onCancel: closeAlertDialog,
              onClose: closeAlertDialog,
            });
          }
        },
      });
    },
    [client, closeAlertDialog, confirmAllocation]
  );

  const openDisputeDialog = React.useCallback((allocation: any) => {
    setDisputeDialog({
      allocation,
      amount: Number(allocation.disputedAmount || allocation.amount || 0) || null,
      reason: '',
      state: 'form',
    });
  }, []);

  const submitDispute = async () => {
    if (!disputeDialog.allocation || !disputeDialog.amount || !disputeDialog.reason.trim()) return;
    setDisputeDialog((current) => ({ ...current, state: 'loading', message: undefined }));
    try {
      await disputeAllocation({
        variables: {
          allocationId: disputeDialog.allocation.id,
          disputedAmount: disputeDialog.amount,
          reason: disputeDialog.reason.trim(),
        },
      });
      await invalidateActiveQueryFields(client, ['getMentorFundAllocations', ...SCHOLARSHIP_DASHBOARD_CACHE_FIELDS]);
      await invalidateBillingLedgerQueries(client, { invalidateWallet: false });
      setDisputeDialog((current) => ({
        ...current,
        state: 'success',
        message: 'The issue has been sent to finance for resolution.',
      }));
    } catch (error: any) {
      setDisputeDialog((current) => ({
        ...current,
        state: 'error',
        message: error?.message || 'Could not report the issue. Please try again.',
      }));
    }
  };

  const openStartReviewDialog = React.useCallback(
    (application: any) => {
      setAlertDialog({
        open: true,
        action: 'update',
        title: 'Start Beneficiary Review?',
        message: (
          <Typography>
            Start review for {application.referenceNumber}. This moves the request into your active review queue.
          </Typography>
        ),
        okayButtonProps: { title: 'Start Review' },
        onCancel: closeAlertDialog,
        onClose: closeAlertDialog,
        onOkay: async () => {
          setStartingApplicationId(application.id);
          setAlertDialog({
            open: true,
            action: 'loading',
            title: 'Starting Review',
            message: 'Please wait while we update the request status.',
            onCancel: closeAlertDialog,
            onClose: closeAlertDialog,
          });
          try {
            await startReview({ variables: { applicationId: application.id } });
            await invalidateActiveQueryFields(client, SCHOLARSHIP_DASHBOARD_CACHE_FIELDS);
            setAlertDialog({
              open: true,
              action: 'success',
              title: 'Review Started',
              message: 'The request is now ready for your review decision.',
              okayButtonProps: { title: 'Done' },
              onCancel: closeAlertDialog,
              onClose: closeAlertDialog,
            });
          } catch (error: any) {
            setAlertDialog({
              open: true,
              action: 'error',
              title: 'Could Not Start Review',
              message: error?.message || 'Please try again.',
              okayButtonProps: { title: 'Close' },
              onCancel: closeAlertDialog,
              onClose: closeAlertDialog,
            });
          } finally {
            setStartingApplicationId(null);
          }
        },
      });
    },
    [client, closeAlertDialog, startReview]
  );

  return (
    <>
      <Paper variant="outlined" sx={{ p: 2, borderRadius: 1, mb: 2 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" gap={2}>
          <Box>
            <Typography fontSize={18} fontWeight={700}>
              Mentor Workspace
            </Typography>
            <Typography fontSize={14} color="grey.700">
              Confirm funds first, then review beneficiary requests and proofs from the request queue.
            </Typography>
          </Box>
        </Stack>
      </Paper>

      <WorkspaceStatusBadges>
        {pendingFundCount > 0 ? (
          <Chip color="warning" icon={<IconHourglass size={14} />} label={`${pendingFundCount} fund action`} />
        ) : (
          <Chip color="success" icon={<IconCircleCheck size={14} />} label="No fund confirmation pending" />
        )}
        {openRequestCount > 0 && (
          <Chip color="info" icon={<IconClipboardList size={14} />} label={`${openRequestCount} request action`} />
        )}
      </WorkspaceStatusBadges>

      <Box mb={2}>
        <DashboardSummary data={dashboardData} loading={dashboardLoading} variant="mentor" />
      </Box>

      <Tabs value={mentorTab} onChange={(_, value) => onMentorTabChange(value)} sx={{ mb: 2 }}>
        <Tab value="funds" icon={<IconWallet size={18} />} iconPosition="start" label="Funds" />
        <Tab
          value="requests"
          icon={<IconClipboardList size={18} />}
          iconPosition="start"
          label="Beneficiary Requests"
        />
      </Tabs>

      {mentorTab === 'funds' && (
        <MentorFundsTable
          allocations={allocations}
          loading={allocationsLoading}
          canConfirm={canConfirmAllocation}
          canDispute={canDisputeAllocation}
          onConfirm={openConfirmDialog}
          onDispute={openDisputeDialog}
        />
      )}

      {mentorTab === 'requests' && (
        <MentorRequestsTable
          applications={applications}
          loading={applicationsLoading}
          canStartReview={canStartReview}
          onStartReview={openStartReviewDialog}
          startingApplicationId={startingApplicationId}
        />
      )}

      <AlertDialog {...(alertDialog as AlertDialogProps)} open={Boolean(alertDialog.open)} />

      <Dialog
        open={Boolean(disputeDialog.allocation)}
        maxWidth="620px"
        title={
          disputeDialog.state === 'success'
            ? 'Issue Reported'
            : disputeDialog.state === 'error'
              ? 'Could Not Report Issue'
              : 'Report Fund Issue'
        }
        subTitle={
          disputeDialog.allocation
            ? `Batch ${disputeDialog.allocation.batch} fund release - ${formatCurrency(
                disputeDialog.allocation.amount
              )}`
            : undefined
        }
        onClose={closeDisputeDialog}
        disableBackdropClick={disputeDialog.state === 'loading'}
        footerProps={{
          onCancel: closeDisputeDialog,
          onOkay: disputeDialog.state === 'form' ? submitDispute : closeDisputeDialog,
          okayButtonProps: {
            title:
              disputeDialog.state === 'form'
                ? 'Submit Issue'
                : disputeDialog.state === 'loading'
                  ? 'Submitting...'
                  : 'Done',
            loading: disputeDialog.state === 'loading',
            disabled:
              disputeDialog.state === 'form' &&
              (!disputeDialog.amount || !disputeDialog.reason.trim() || disputeDialog.amount <= 0),
            color: disputeDialog.state === 'error' ? 'error' : 'primary',
          },
          cancelButtonProps: {
            disabled: disputeDialog.state === 'loading',
          },
        }}
      >
        <Box p={2.5}>
          {disputeDialog.state === 'success' || disputeDialog.state === 'error' ? (
            <Alert severity={disputeDialog.state === 'success' ? 'success' : 'error'}>{disputeDialog.message}</Alert>
          ) : (
            <Stack spacing={{ xs: 4, md: 3 }}>
              <Alert severity="warning">
                Use this only when the received amount, reference, or transfer details do not match what finance
                recorded. Finance will review the issue before the fund can be fully settled.
              </Alert>
              <CurrencyInput
                fullWidth
                size="small"
                label="Amount with issue"
                value={disputeDialog.amount}
                onValueChange={(value) => setDisputeDialog((current) => ({ ...current, amount: value }))}
              />
              <TextField
                fullWidth
                label="What is wrong?"
                size="small"
                value={disputeDialog.reason}
                onChange={(event) => setDisputeDialog((current) => ({ ...current, reason: event.target.value }))}
                placeholder="Example: received only 20,000, reference does not match, or amount not received"
                multiline
                minRows={3}
              />
            </Stack>
          )}
        </Box>
      </Dialog>
    </>
  );
};

const MentorSummaryTable = React.memo(({ mentors, loading }: { mentors: any[]; loading: boolean }) => {
  const [selectedMentor, setSelectedMentor] = React.useState<any | null>(null);

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

  const selectedSummary = selectedMentor?.summary || {};

  return (
    <>
      <Paper variant="outlined" sx={{ borderRadius: 1, overflowX: 'auto' }}>
        <Table sx={{ minWidth: 780 }}>
          <TableHead>
            <TableRow>
              <TableCell>Mentor</TableCell>
              <TableCell>Assigned batches</TableCell>
              <TableCell align="right">Funds with mentor</TableCell>
              <TableCell align="right">Available to approve</TableCell>
              <TableCell align="right">Pending confirmation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mentors.map((row) => {
              const summary = row.summary || {};
              const openDetails = () => setSelectedMentor(row);
              return (
                <TableRow
                  key={row.mentorUserId}
                  hover
                  tabIndex={0}
                  onClick={openDetails}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      openDetails();
                    }
                  }}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell>
                    <Box onClick={(event) => event.stopPropagation()}>
                      <ProfilePicture
                        id={row.mentor?.id}
                        src={row.mentor?.profileImage}
                        title={getFullName(row.mentor) || row.mentor?.email || 'Batch Mentor'}
                        summary={row.mentor?.email}
                        size={38}
                      />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" gap={0.75} flexWrap="wrap">
                      {(row.assignedBatches || []).map((batch: number) => (
                        <Chip key={batch} size="small" variant="outlined" label={`Batch ${batch}`} />
                      ))}
                    </Stack>
                  </TableCell>
                  <TableCell align="right">{formatCurrency(summary.mentorCustodyBalance)}</TableCell>
                  <TableCell align="right">{formatCurrency(summary.approvalCapacity)}</TableCell>
                  <TableCell align="right">{formatCurrency(summary.pendingBeneficiaryConfirmation)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>

      <Dialog
        open={Boolean(selectedMentor)}
        maxWidth="760px"
        title="Mentor Fund Details"
        subTitle={
          selectedMentor
            ? `${getFullName(selectedMentor.mentor) || selectedMentor.mentor?.email || 'Batch Mentor'} fund overview`
            : undefined
        }
        hideFooter
        onClose={() => setSelectedMentor(null)}
      >
        {selectedMentor && (
          <Box p={2.5}>
            <Stack spacing={2.5}>
              <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" gap={2}>
                <ProfilePicture
                  id={selectedMentor.mentor?.id}
                  src={selectedMentor.mentor?.profileImage}
                  title={getFullName(selectedMentor.mentor) || selectedMentor.mentor?.email || 'Batch Mentor'}
                  summary={selectedMentor.mentor?.email}
                  size={44}
                />
                <Stack direction="row" gap={0.75} flexWrap="wrap" justifyContent={{ sm: 'flex-end' }}>
                  {(selectedMentor.assignedBatches || []).map((batch: number) => (
                    <Chip key={batch} size="small" variant="outlined" label={`Batch ${batch}`} />
                  ))}
                </Stack>
              </Stack>
              <Divider />
              <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' }} gap={1.5}>
                {[
                  ['Applications', selectedSummary.totalApplications || 0],
                  ['Active beneficiaries', selectedSummary.activeBeneficiaryCount || 0],
                  ['Total released to mentor', formatCurrency(selectedSummary.totalAllocationRecorded)],
                  ['Confirmed allocation', formatCurrency(selectedSummary.confirmedAllocation)],
                  ['Allocation in dispute', formatCurrency(selectedSummary.disputedIncomingAllocation)],
                  ['Funds with mentor', formatCurrency(selectedSummary.mentorCustodyBalance)],
                  ['Available to approve', formatCurrency(selectedSummary.approvalCapacity)],
                  ['Released to beneficiaries', formatCurrency(selectedSummary.confirmedBeneficiaryDisbursement)],
                  ['Pending beneficiary confirmation', formatCurrency(selectedSummary.pendingBeneficiaryConfirmation)],
                  ['Overdue proof amount', formatCurrency(selectedSummary.overdueProofAmount)],
                ].map(([label, value]) => (
                  <Paper key={String(label)} variant="outlined" sx={{ p: 1.5, borderRadius: 1 }}>
                    <Typography fontSize={12} color="grey.600">
                      {label}
                    </Typography>
                    <Typography fontSize={17} fontWeight={700} mt={0.25}>
                      {value}
                    </Typography>
                  </Paper>
                ))}
              </Box>
            </Stack>
          </Box>
        )}
      </Dialog>
    </>
  );
});
MentorSummaryTable.displayName = 'MentorSummaryTable';

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
  const client = useApolloClient();
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
  const [recordAllocation, allocationState] = useMutation(RECORD_MENTOR_FUND_ALLOCATION);
  const walletQuery = useQuery(GET_ASSOCIATION_WALLET_SUMMARY, {
    skip: !open,
    fetchPolicy: 'cache-and-network',
  });

  const mentorOptions = React.useMemo(() => buildMentorReleaseOptions(mentors), [mentors]);
  const amount = form.amount ?? 0;
  const availableFunds = Number(walletQuery.data?.getAssociationWalletSummary?.availableFunds || 0);
  const hasInsufficientFunds = amount > 0 && availableFunds < amount;

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
    if (hasInsufficientFunds) {
      toast.error('Association funds are not enough for this release.');
      return;
    }

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
      client.cache.modify({
        id: 'ROOT_QUERY',
        fields: {
          getAssociationWalletSummary(existing) {
            if (!existing) return existing;
            const releasedAmount = Number(form.amount || 0);
            return {
              ...existing,
              totalDebits: Number(existing.totalDebits || 0) + releasedAmount,
              availableFunds: Number(existing.availableFunds || 0) - releasedAmount,
            };
          },
        },
      });
      await invalidateActiveQueryFields(client, [...SCHOLARSHIP_DASHBOARD_CACHE_FIELDS, 'getMentorFundAllocations']);
      await invalidateBillingLedgerQueries(client, { invalidateWallet: false });
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
          disabled: !form.selectedMentor || !form.amount || !form.transferDate || hasInsufficientFunds,
        },
      }}
    >
      <Box p={2.5}>
        <Alert severity="info" sx={{ mb: 2 }}>
          This records funds released by JNVPJAA to a batch mentor. The mentor will confirm the received amount before
          it becomes available for beneficiary approvals.
        </Alert>
        <Stack spacing={{ xs: 4, md: 3 }}>
          <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 1, bgcolor: 'success.50' }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" gap={1}>
              <Typography fontSize={14} color="grey.700">
                Available association funds
              </Typography>
              <Typography fontSize={16} fontWeight={800}>
                {walletQuery.loading ? 'Loading...' : formatCurrency(availableFunds)}
              </Typography>
            </Stack>
          </Paper>
          <Box>
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
          </Box>
          <Box
            display="grid"
            gridTemplateColumns={{ xs: '1fr', md: '1fr 180px' }}
            columnGap={3}
            rowGap={{ xs: 4, md: 3 }}
          >
            <CurrencyInput
              fullWidth
              label="Amount"
              size="small"
              value={form.amount}
              error={hasInsufficientFunds}
              helperText={hasInsufficientFunds ? 'Amount is higher than available association funds.' : ''}
              onValueChange={(value) => setForm((current) => ({ ...current, amount: value }))}
            />
            <TextField
              fullWidth
              label="Transfer date"
              size="small"
              type="date"
              value={form.transferDate}
              onChange={setField('transferDate')}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
          <Box
            display="grid"
            gridTemplateColumns={{ xs: '1fr', md: '180px 1fr' }}
            columnGap={3}
            rowGap={{ xs: 4, md: 3 }}
          >
            <TextField
              fullWidth
              select
              label="Transfer method"
              size="small"
              value={form.method}
              onChange={setField('method')}
            >
              <MenuItem value="BANK_TRANSFER">Bank transfer</MenuItem>
              <MenuItem value="UPI">UPI</MenuItem>
              <MenuItem value="CHEQUE">Cheque</MenuItem>
              <MenuItem value="CASH">Cash</MenuItem>
            </TextField>
            <TextField
              fullWidth
              label="Reference ID"
              size="small"
              value={form.reference}
              onChange={setField('reference')}
              placeholder="UTR, cheque number, or internal reference"
            />
          </Box>
          <TextField
            fullWidth
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
  const { can, user, roles, hasRole, hasPosition } = useAuth();
  const canRender = useScholarshipLoginGuard(user?.id);
  const canCreate = can(PERMISSION_CODES.SCHOLARSHIP_APPLICATION_CREATE);
  const canReadOrg = can(PERMISSION_CODES.SCHOLARSHIP_DASHBOARD_READ_ORG);
  const canReadMentor = can(PERMISSION_CODES.SCHOLARSHIP_DASHBOARD_READ_MENTOR);
  const canReadBatch = can(PERMISSION_CODES.SCHOLARSHIP_DASHBOARD_READ_BATCH);
  const canAccessBatchView = canReadBatch || canReadOrg;
  const canReleaseMentorFunds =
    can(PERMISSION_CODES.SCHOLARSHIP_ALLOCATION_CREATE) &&
    (hasRole(ROLE_CODES.FINANCE_MANAGER) || hasPosition(EXECUTIVE_POSITION_CODES.SECRETARY));
  const canConfirmAllocation = can(PERMISSION_CODES.SCHOLARSHIP_ALLOCATION_CONFIRM);
  const canDisputeAllocation = can(PERMISSION_CODES.SCHOLARSHIP_ALLOCATION_DISPUTE);
  const canStartReview = can(PERMISSION_CODES.SCHOLARSHIP_APPLICATION_READ_ASSIGNED);
  const coordinatorBatchOptions = React.useMemo(() => {
    const scopedBatches =
      roles
        ?.filter((role: any) => role.code === ROLE_CODES.BATCH_COORDINATOR && role.scopeBatch)
        .map((role: any) => Number(role.scopeBatch)) || [];
    const batches = canReadOrg ? getBatchOptions().map((batch) => Number(batch.value)) : scopedBatches;
    return Array.from(new Set(batches))
      .filter((batch) => batch > 0)
      .sort((a, b) => b - a)
      .map((batch) => ({ value: String(batch), label: `Batch ${batch}` }));
  }, [canReadOrg, roles]);
  const [selectedCoordinatorBatch, setSelectedCoordinatorBatch] = React.useState('');
  const [tab, setTab] = React.useState<DashboardVariant>(() =>
    canReadOrg
      ? 'org'
      : canReadMentor
        ? 'mentor'
        : canAccessBatchView && coordinatorBatchOptions.length
          ? 'batch'
          : 'mine'
  );
  const [mentorWorkspaceTab, setMentorWorkspaceTab] = React.useState<MentorWorkspaceTab>('funds');
  const [releaseDialogOpen, setReleaseDialogOpen] = React.useState(false);
  const showMentorSummaries = tab === 'mentor' && canReadOrg;
  const showMentorWorkspace = tab === 'mentor' && canReadMentor && !canReadOrg;

  React.useEffect(() => {
    if (!canRender) return;
    if (canReadOrg) {
      setTab('org');
    } else if (canReadMentor) {
      setTab('mentor');
    } else if (canAccessBatchView && coordinatorBatchOptions.length) {
      setTab('batch');
    }
  }, [canAccessBatchView, canReadMentor, canReadOrg, canRender, coordinatorBatchOptions.length]);

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
    fetchPolicy: 'cache-first',
  });
  const applications = useQuery(applicationsQuery, {
    variables: {
      options: { limit: 50, offset: 0 },
      filter: tab === 'batch' ? { batch: Number(selectedCoordinatorBatch) } : undefined,
    },
    skip: !canRender || showMentorSummaries || showMentorWorkspace || (tab === 'batch' && !selectedCoordinatorBatch),
    fetchPolicy: 'cache-first',
  });
  const mentorApplications = useQuery(GET_MENTOR_SCHOLARSHIP_APPLICATIONS, {
    variables: { options: { limit: 50, offset: 0 } },
    skip: !canRender || !showMentorWorkspace || mentorWorkspaceTab !== 'requests',
    fetchPolicy: 'cache-first',
  });
  const mentorFunds = useQuery(GET_MENTOR_FUND_ALLOCATIONS, {
    variables: { mentorUserId: user?.id, options: { limit: 50, offset: 0 } },
    skip: !canRender || !showMentorWorkspace || mentorWorkspaceTab !== 'funds',
    fetchPolicy: 'cache-first',
  });
  const mentorSummaries = useQuery(GET_SCHOLARSHIP_MENTOR_SUMMARIES, {
    skip: !canRender || !showMentorSummaries,
    fetchPolicy: 'cache-first',
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
        {canAccessBatchView && coordinatorBatchOptions.length > 0 && (
          <Tab value="batch" icon={<IconUsers size={18} />} iconPosition="start" label="Batch View" />
        )}
        {canReadOrg && <Tab value="org" icon={<IconBuilding size={18} />} iconPosition="start" label="Organisation" />}
      </Tabs>

      {tab === 'batch' && (
        <Box maxWidth={240} mb={2}>
          <TextField
            fullWidth
            select
            label="Batch"
            size="small"
            value={selectedCoordinatorBatch}
            onChange={(event) => setSelectedCoordinatorBatch(event.target.value)}
          >
            {coordinatorBatchOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
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
      ) : showMentorWorkspace ? (
        <MentorWorkspace
          dashboardData={dashboard.data}
          dashboardLoading={dashboard.loading}
          applications={mentorApplications.data?.getMentorScholarshipApplications || []}
          applicationsLoading={mentorApplications.loading}
          allocations={mentorFunds.data?.getMentorFundAllocations || []}
          allocationsLoading={mentorFunds.loading}
          canConfirmAllocation={canConfirmAllocation}
          canDisputeAllocation={canDisputeAllocation}
          canStartReview={canStartReview}
          mentorTab={mentorWorkspaceTab}
          onMentorTabChange={setMentorWorkspaceTab}
        />
      ) : tab === 'mine' ? (
        <MyRequestsWorkspace
          dashboardData={dashboard.data}
          dashboardLoading={dashboard.loading}
          applications={applications.data?.getMyScholarshipApplications || []}
          applicationsLoading={applications.loading}
        />
      ) : (
        <DashboardSummary data={dashboard.data} loading={dashboard.loading} variant={tab} />
      )}
      {!showMentorSummaries && !showMentorWorkspace && tab !== 'mine' && (
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
