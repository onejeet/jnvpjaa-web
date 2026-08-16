'use client';

import React from 'react';
import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import {
  Alert,
  Box,
  Chip,
  CircularProgress,
  Divider,
  IconButton,
  Paper,
  Stack,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  IconBell,
  IconCalendarDue,
  IconCash,
  IconCircleCheck,
  IconClipboardList,
  IconClock,
  IconEyeCheck,
  IconExclamationCircle,
  IconFileText,
  IconHourglass,
  IconInfoCircle,
  IconPencil,
  IconReceipt,
  IconSend,
  IconShieldCheck,
  IconUsers,
} from '@tabler/icons-react';
import toast from 'react-hot-toast';
import Button from '@/components/core/Button';
import CurrencyInput from '@/components/core/CurrencyInput';
import Dialog from '@/components/core/Dialog';
import ReactSelect from '@/components/core/ReactSelect';
import TextField from '@/components/core/TextField';
import ProfilePicture from '@/components/common/ProfilePicture';
import LayoutModule from '@/layouts/Layout';
import { useAuth } from '@/context/AuthContext';
import { PERMISSION_CODES } from '@/constants/access';
import {
  APPROVE_SCHOLARSHIP_APPLICATION,
  CONFIRM_SCHOLARSHIP_RECEIPT,
  CREATE_SCHOLARSHIP_DOCUMENT_UPLOAD,
  FINALIZE_SCHOLARSHIP_DOCUMENT_UPLOAD,
  GET_ELIGIBLE_SCHOLARSHIP_MENTORS,
  GET_SCHOLARSHIP_APPLICATION,
  GET_SCHOLARSHIP_APPLICATION_ACTIVITY,
  GET_SCHOLARSHIP_APPLICATION_TRANSACTIONS,
  REQUEST_SCHOLARSHIP_FOLLOWUP,
  REASSIGN_SCHOLARSHIP_APPLICATION,
  SCHOLARSHIP_DASHBOARD_CACHE_FIELDS,
  START_SCHOLARSHIP_REVIEW,
  SUBMIT_SCHOLARSHIP_APPLICATION,
} from '@/apollo/scholarshipOperations';
import { invalidateActiveQueryFields, invalidateBillingLedgerQueries } from '@/apollo/cacheInvalidation';
import { formatCurrency, formatDateTime, getFullName, humanizeScholarshipStatus } from './helpers';
import { useScholarshipLoginGuard } from './useScholarshipLoginGuard';

const getDetailGuidance = (application: any, isOwner: boolean, isAssignedMentor: boolean) => {
  if (!application) return null;

  if (isOwner) {
    if (['DRAFT', 'MORE_INFO_REQUIRED'].includes(application.status)) {
      return {
        severity: 'warning' as const,
        title: 'Your input is needed',
        message: 'Review the details and submit the application when everything is ready.',
      };
    }
    if (application.status === 'PAYMENT_CONFIRMATION_PENDING') {
      return {
        severity: 'warning' as const,
        title: 'Confirm the received amount',
        message: 'Upload credit proof and confirm the amount credited to your account.',
      };
    }
    if (['PAYMENT_CONFIRMED_PROOF_DUE', 'PROOF_PARTIAL', 'PROOF_REJECTED'].includes(application.status)) {
      return {
        severity: 'warning' as const,
        title: 'Usage proof is pending',
        message: 'Upload receipts for how the scholarship amount was used.',
      };
    }
  }

  if (isAssignedMentor && ['SUBMITTED', 'RESUBMITTED'].includes(application.status)) {
    return {
      severity: 'info' as const,
      title: 'Ready for mentor review',
      message: 'Start the review, then approve, request more information, or reject from this page.',
    };
  }

  if (isAssignedMentor && application.status === 'UNDER_REVIEW') {
    return {
      severity: 'info' as const,
      title: 'Review in progress',
      message: 'Confirm the approved amount and create the beneficiary payment when ready.',
    };
  }

  if (['PROOF_VERIFIED', 'CLOSED'].includes(application.status)) {
    return {
      severity: 'success' as const,
      title: 'Completed',
      message: 'This scholarship request is complete.',
    };
  }

  return {
    severity: 'info' as const,
    title: humanizeScholarshipStatus(application.status),
    message: 'The latest state and timeline are shown below.',
  };
};

const getActivityTitle = (action?: string | null) => {
  switch (action) {
    case 'SCHOLARSHIP_DRAFT_CREATED':
      return 'Draft created';
    case 'SCHOLARSHIP_DRAFT_UPDATED':
      return 'Draft updated';
    case 'SCHOLARSHIP_APPLICATION_SUBMITTED':
      return 'Application submitted';
    case 'SCHOLARSHIP_APPLICATION_ROUTING_PENDING':
      return 'Mentor routing pending';
    case 'SCHOLARSHIP_APPLICATION_REASSIGNED':
      return 'Mentor reassigned';
    case 'SCHOLARSHIP_REVIEW_STARTED':
      return 'Review started';
    case 'SCHOLARSHIP_INFO_REQUESTED':
      return 'More information requested';
    case 'SCHOLARSHIP_APPLICATION_REJECTED':
      return 'Application rejected';
    case 'SCHOLARSHIP_APPLICATION_APPROVED':
      return 'Application approved';
    case 'SCHOLARSHIP_RECEIPT_CONFIRMED':
      return 'Payment receipt confirmed';
    case 'DISBURSAL_FOLLOWUP_REQUESTED':
      return 'Payment follow-up requested';
    case 'SCHOLARSHIP_PROOF_UPLOADED':
      return 'Usage proof uploaded';
    case 'SCHOLARSHIP_PROOF_REVIEWED':
      return 'Usage proof reviewed';
    case 'SCHOLARSHIP_WRONG_DISBURSEMENT_MARKED':
      return 'Wrong disbursement marked';
    default:
      return humanizeScholarshipStatus(action);
  }
};

const CompletedTimelineIcon = () => (
  <Box component="span" sx={{ display: 'inline-flex', color: 'success.main' }}>
    <IconCircleCheck size={24} />
  </Box>
);

const getActivityAmount = (activity: any) => {
  const after = activity?.after || {};
  const amount =
    after?.approvedTotalAmount ||
    after?.approvedAmountDisbursed ||
    after?.scholarshipConfirmedAmount ||
    after?.amount ||
    after?.transaction?.amount;
  return amount ? formatCurrency(amount) : null;
};

const getNextTimelineStep = (application: any) => {
  if (!application?.status) return null;

  switch (application.status) {
    case 'DRAFT':
    case 'MORE_INFO_REQUIRED':
      return {
        title: 'Submit application',
        message: 'Applicant needs to review the details and submit the scholarship request.',
      };
    case 'ROUTING_PENDING':
      return {
        title: 'Assign primary mentor',
        message: 'A mentor needs to be assigned before review can begin.',
      };
    case 'SUBMITTED':
    case 'RESUBMITTED':
      return {
        title: 'Start mentor review',
        message: 'Assigned mentor needs to start reviewing the application.',
      };
    case 'UNDER_REVIEW':
      return {
        title: 'Approve or request changes',
        message: 'Assigned mentor needs to complete the review decision.',
      };
    case 'APPROVED':
      return {
        title: 'Create beneficiary payment',
        message: 'Scholarship payment needs to be created for the beneficiary.',
      };
    case 'PAYMENT_CONFIRMATION_PENDING':
      return {
        title: 'Confirm payment receipt',
        message: 'Beneficiary needs to upload credit proof and confirm the received amount.',
      };
    case 'PAYMENT_CONFIRMED_PROOF_DUE':
    case 'PROOF_PARTIAL':
    case 'PROOF_MORE_INFO_REQUIRED':
    case 'PROOF_REJECTED':
      return {
        title: 'Submit usage proof',
        message: 'Beneficiary needs to upload receipts or usage proof for the scholarship amount.',
      };
    case 'PROOF_FULL_SUBMITTED':
      return {
        title: 'Review usage proof',
        message: 'Assigned mentor needs to verify the submitted usage proof.',
      };
    case 'WRONG_DISBURSEMENT':
      return {
        title: 'Resolve wrong disbursement',
        message: 'Finance team needs to resolve the wrong disbursement case.',
      };
    case 'REFUND_IN_PROGRESS':
      return {
        title: 'Complete refund case',
        message: 'Refund tracking needs to be completed before this request can close.',
      };
    default:
      return null;
  }
};

const DetailMetric = ({
  label,
  value,
  icon,
  caption,
}: {
  label: string;
  value: React.ReactNode;
  icon: React.ReactNode;
  caption?: string;
}) => (
  <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 1, height: '100%' }}>
    <Stack direction="row" spacing={1} alignItems="center">
      <Box component="span" sx={{ display: 'inline-flex', color: 'primary.main' }}>
        {icon}
      </Box>
      <Typography fontSize={13} color="grey.700">
        {label}
      </Typography>
    </Stack>
    <Typography fontSize={20} fontWeight={700} mt={0.5}>
      {value}
    </Typography>
    {caption && (
      <Typography fontSize={12} color="grey.600">
        {caption}
      </Typography>
    )}
  </Paper>
);

const PendingTimelineStep = ({ step }: { step: { title: string; message: string } }) => (
  <Step expanded completed={false}>
    <StepLabel
      error
      icon={
        <Box component="span" sx={{ display: 'inline-flex', color: 'error.main' }}>
          <IconExclamationCircle size={24} />
        </Box>
      }
      optional={
        <Typography fontSize={12} color="error.main" fontWeight={700}>
          Pending
        </Typography>
      }
    >
      <Typography fontWeight={700} color="error.main">
        {step.title}
      </Typography>
    </StepLabel>
    <StepContent>
      <Typography fontSize={13} color="grey.700">
        {step.message}
      </Typography>
    </StepContent>
  </Step>
);

const Timeline = ({ activities, loading, application }: { activities: any[]; loading: boolean; application: any }) => {
  const nextStep = getNextTimelineStep(application);

  if (loading) {
    return (
      <Box py={4} display="flex" justifyContent="center">
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (!activities.length) {
    return nextStep ? (
      <Stack spacing={1.5}>
        <Alert severity="info">Timeline will appear after the first workflow action is recorded.</Alert>
        <Stepper activeStep={0} orientation="vertical">
          <PendingTimelineStep step={nextStep} />
        </Stepper>
      </Stack>
    ) : (
      <Alert severity="info">Timeline will appear after the first workflow action is recorded.</Alert>
    );
  }

  const sortedActivities = [...activities].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  return (
    <Stepper activeStep={sortedActivities.length} orientation="vertical">
      {sortedActivities.map((activity) => {
        const isMentorReassignment = activity.action === 'SCHOLARSHIP_APPLICATION_REASSIGNED';
        const isRoutingPending = activity.action === 'SCHOLARSHIP_APPLICATION_ROUTING_PENDING';
        const timelineUser = isMentorReassignment ? activity.assignedMentor : activity.actor;
        const timelineUserName = getFullName(timelineUser) || timelineUser?.email || 'System';
        const showUser = !isRoutingPending && Boolean(timelineUser);
        const amount = getActivityAmount(activity);
        const hasDetails = showUser || amount || activity.reason || activity.isHighRisk;
        return (
          <Step key={activity.id} expanded completed>
            <StepLabel
              icon={<CompletedTimelineIcon />}
              optional={
                <Typography fontSize={12} color="grey.600">
                  {formatDateTime(activity.createdAt)}
                </Typography>
              }
            >
              <Typography fontWeight={700}>{getActivityTitle(activity.action)}</Typography>
            </StepLabel>
            {hasDetails && (
              <StepContent>
                <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
                  {showUser && (
                    <ProfilePicture
                      id={timelineUser.id}
                      src={timelineUser.profileImage}
                      title={timelineUserName}
                      summary={
                        isMentorReassignment
                          ? `New assigned mentor • Batch ${timelineUser.batch ?? 'NA'}`
                          : timelineUser.batch
                            ? `Batch ${timelineUser.batch}`
                            : 'Workflow action'
                      }
                      size={30}
                    />
                  )}
                  {amount && <Chip size="small" variant="outlined" label={amount} />}
                  {activity.reason && <Chip size="small" variant="outlined" label={activity.reason} />}
                  {activity.isHighRisk && <Chip size="small" color="error" variant="outlined" label="High risk" />}
                </Stack>
              </StepContent>
            )}
          </Step>
        );
      })}
      {nextStep && <PendingTimelineStep step={nextStep} />}
    </Stepper>
  );
};

export default function ScholarshipDetail({ applicationId }: { applicationId: string }) {
  const client = useApolloClient();
  const { can, user } = useAuth();
  const canRender = useScholarshipLoginGuard(user?.id);
  const applicationQuery = useQuery(GET_SCHOLARSHIP_APPLICATION, {
    variables: { id: applicationId },
    skip: !canRender,
    fetchPolicy: 'cache-first',
  });
  const transactionsQuery = useQuery(GET_SCHOLARSHIP_APPLICATION_TRANSACTIONS, {
    variables: { applicationId },
    skip: !canRender,
    fetchPolicy: 'cache-first',
  });
  const activityQuery = useQuery(GET_SCHOLARSHIP_APPLICATION_ACTIVITY, {
    variables: { applicationId },
    skip: !canRender,
    fetchPolicy: 'cache-first',
  });
  const [approvedTotalAmount, setApprovedTotalAmount] = React.useState<number | null>(null);
  const [installmentAmount, setInstallmentAmount] = React.useState<number | null>(null);
  const [confirmedAmountByTx, setConfirmedAmountByTx] = React.useState<Record<string, number | null>>({});
  const [creditProofFileByTx, setCreditProofFileByTx] = React.useState<Record<string, File | null>>({});
  const [reassignOpen, setReassignOpen] = React.useState(false);
  const [selectedMentor, setSelectedMentor] = React.useState<any>(null);
  const [reassignmentReason, setReassignmentReason] = React.useState('');

  const [submitApplication, submitState] = useMutation(SUBMIT_SCHOLARSHIP_APPLICATION);
  const [startReview, reviewState] = useMutation(START_SCHOLARSHIP_REVIEW);
  const [approveApplication, approveState] = useMutation(APPROVE_SCHOLARSHIP_APPLICATION);
  const [confirmReceipt, receiptState] = useMutation(CONFIRM_SCHOLARSHIP_RECEIPT);
  const [createDocumentUpload, createDocumentState] = useMutation(CREATE_SCHOLARSHIP_DOCUMENT_UPLOAD);
  const [finalizeDocumentUpload, finalizeDocumentState] = useMutation(FINALIZE_SCHOLARSHIP_DOCUMENT_UPLOAD);
  const [requestFollowup, followupState] = useMutation(REQUEST_SCHOLARSHIP_FOLLOWUP);
  const [reassignApplication, reassignState] = useMutation(REASSIGN_SCHOLARSHIP_APPLICATION);

  const application = applicationQuery.data?.getScholarshipApplication;
  const eligibleMentorsQuery = useQuery(GET_ELIGIBLE_SCHOLARSHIP_MENTORS, {
    variables: { batch: application?.batchSnapshot ?? 0 },
    skip: !reassignOpen || !application?.batchSnapshot,
    fetchPolicy: 'cache-first',
  });
  const transactions = transactionsQuery.data?.getScholarshipApplicationTransactions || [];
  const activities = activityQuery.data?.getScholarshipApplicationActivity || [];
  const isOwner = application?.beneficiaryUserId === user?.id || application?.applicantUserId === user?.id;
  const isAssignedMentor = application?.assignedMentorUserId === user?.id;
  const canSubmit = isOwner && ['DRAFT', 'MORE_INFO_REQUIRED'].includes(application?.status);
  const canReview = isAssignedMentor && can(PERMISSION_CODES.SCHOLARSHIP_APPLICATION_READ_ASSIGNED);
  const canApprove = isAssignedMentor && can(PERMISSION_CODES.SCHOLARSHIP_APPLICATION_APPROVE);
  const canReassign =
    can(PERMISSION_CODES.SCHOLARSHIP_APPLICATION_REASSIGN) &&
    ['ROUTING_PENDING', 'SUBMITTED', 'RESUBMITTED', 'UNDER_REVIEW', 'MORE_INFO_REQUIRED'].includes(application?.status);
  const guidance = getDetailGuidance(application, isOwner, isAssignedMentor);
  const mentorOptions = React.useMemo(
    () =>
      (eligibleMentorsQuery.data?.getEligibleScholarshipMentors || [])
        .filter((mentor: any) => mentor.id !== application?.assignedMentorUserId)
        .map((mentor: any) => ({
          value: mentor.id,
          label: getFullName(mentor) || `Batch ${mentor.batch} mentor`,
          title: getFullName(mentor),
          summary: `Batch ${mentor.batch ?? 'NA'}`,
          avatarUrl: mentor.profileImage,
        })),
    [eligibleMentorsQuery.data?.getEligibleScholarshipMentors, application?.assignedMentorUserId]
  );

  React.useEffect(() => {
    if (application?.requestedAmount && approvedTotalAmount === null) {
      setApprovedTotalAmount(Number(application.requestedAmount));
      setInstallmentAmount(Number(application.requestedFirstInstallmentAmount || application.requestedAmount));
    }
  }, [application?.requestedAmount, application?.requestedFirstInstallmentAmount, approvedTotalAmount]);

  const runAction = async (
    action: () => Promise<any>,
    success: string,
    cacheFields: readonly string[] = ['getScholarshipApplicationActivity', ...SCHOLARSHIP_DASHBOARD_CACHE_FIELDS],
    invalidateBilling = false
  ) => {
    try {
      await action();
      await invalidateActiveQueryFields(client, cacheFields);
      if (invalidateBilling) {
        await invalidateBillingLedgerQueries(client, { invalidateWallet: false });
      }
      toast.success(success);
      return true;
    } catch (error: any) {
      toast.error(error?.message || 'Action failed.');
      return false;
    }
  };

  const closeReassignDialog = () => {
    if (reassignState.loading) return;
    setReassignOpen(false);
    setSelectedMentor(null);
    setReassignmentReason('');
  };

  const submitReassignment = async () => {
    if (!selectedMentor || !reassignmentReason.trim()) return;
    const succeeded = await runAction(
      () =>
        reassignApplication({
          variables: {
            applicationId,
            mentorUserId: selectedMentor.value,
            reason: reassignmentReason.trim(),
          },
        }),
      application.status === 'ROUTING_PENDING' ? 'Mentor assigned.' : 'Mentor changed.',
      [
        'getScholarshipApplicationActivity',
        'getMyScholarshipApplications',
        'getMentorScholarshipApplications',
        'getScholarshipApplications',
        ...SCHOLARSHIP_DASHBOARD_CACHE_FIELDS,
      ]
    );
    if (succeeded) closeReassignDialog();
  };
  const uploadCreditProof = async (transaction: any, file: File) => {
    const upload = await createDocumentUpload({
      variables: {
        input: {
          applicationId: application.id,
          transactionId: transaction.id,
          category: 'BENEFICIARY_CREDIT_PROOF',
          filename: file.name,
          mimeType: file.type || 'application/octet-stream',
          sizeBytes: file.size,
        },
      },
    });
    const uploadUrl = upload.data?.createScholarshipDocumentUpload?.uploadUrl;
    const documentId = upload.data?.createScholarshipDocumentUpload?.document?.id;
    if (!uploadUrl || !documentId) throw new Error('Could not prepare credit proof upload.');

    const uploadResponse = await fetch(uploadUrl, {
      method: 'PUT',
      headers: { 'Content-Type': file.type || 'application/octet-stream' },
      body: file,
    });
    if (!uploadResponse.ok) throw new Error('Credit proof upload failed.');

    await finalizeDocumentUpload({ variables: { documentId } });
    return documentId;
  };

  const uploadCreditProofIfStorageAvailable = async (transaction: any, file: File) => {
    try {
      return await uploadCreditProof(transaction, file);
    } catch (error: any) {
      const message = error?.message || '';
      if (message.includes('Scholarship storage bucket is not configured')) {
        toast('Storage bucket is not configured. Confirming receipt without proof upload.');
        return null;
      }
      throw error;
    }
  };

  if (!canRender || (applicationQuery.loading && !application)) {
    return (
      <LayoutModule disableCover title="Scholarship Application • Alumni Network of JNV Paota, Jaipur">
        <Box py={8} display="flex" justifyContent="center">
          <CircularProgress size={28} />
        </Box>
      </LayoutModule>
    );
  }

  if (!application) {
    return (
      <LayoutModule disableCover title="Scholarship Application • Alumni Network of JNV Paota, Jaipur">
        <Alert severity="error">Scholarship application could not be loaded.</Alert>
      </LayoutModule>
    );
  }

  const approvedTotal = Number(application.approvedTotalAmount || 0);
  const disbursedTotal = Number(application.approvedAmountDisbursed || 0);
  const remainingApproved = Math.max(approvedTotal - disbursedTotal, 0);
  const confirmedByBeneficiary = transactions.reduce(
    (sum: number, transaction: any) => sum + Number(transaction.scholarshipConfirmedAmount || 0),
    0
  );

  return (
    <LayoutModule disableCover title={`${application.referenceNumber} • Scholarships`}>
      <Box display="grid" gridTemplateColumns={{ xs: '1fr', lg: 'minmax(0, 1fr) 380px' }} gap={3}>
        <Box>
          <Box mb={2}>
            <Typography variant="h1">{application.referenceNumber}</Typography>
            <Typography color="grey.800" mt={0.5}>
              {application.purpose}
            </Typography>
          </Box>

          <Stack
            direction="row"
            alignItems="center"
            flexWrap="wrap"
            useFlexGap
            columnGap={1}
            rowGap={0.5}
            mb={2}
            color="grey.600"
          >
            <Typography component="span" fontSize={14} fontWeight={700} color="grey.900">
              {humanizeScholarshipStatus(application.status)}
            </Typography>
            <Box component="span" display="inline-flex" alignItems="center" gap={1}>
              <Typography component="span" fontSize={14} color="grey.400" aria-hidden>
                •
              </Typography>
              <Typography component="span" fontSize={14}>
                Proof {humanizeScholarshipStatus(application.proofStatus).toLowerCase()}
              </Typography>
            </Box>
            <Box component="span" display="inline-flex" alignItems="center" gap={1}>
              <Typography component="span" fontSize={14} color="grey.400" aria-hidden>
                •
              </Typography>
              <Typography component="span" fontSize={14}>
                Refund {humanizeScholarshipStatus(application.refundStatus).toLowerCase()}
              </Typography>
            </Box>
          </Stack>

          {guidance && (
            <Alert severity={guidance.severity} sx={{ mb: 2 }}>
              <Typography fontWeight={700}>{guidance.title}</Typography>
              <Typography fontSize={14}>{guidance.message}</Typography>
            </Alert>
          )}

          <Box
            display="grid"
            gridTemplateColumns={{ xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', xl: 'repeat(4, minmax(0, 1fr))' }}
            gap={1.5}
            mb={2}
          >
            <DetailMetric
              label="Requested"
              value={formatCurrency(application.requestedAmount)}
              icon={<IconFileText size={18} />}
            />
            <DetailMetric
              label="Approved"
              value={formatCurrency(approvedTotal)}
              icon={<IconShieldCheck size={18} />}
              caption={approvedTotal ? `${formatCurrency(remainingApproved)} remaining` : 'Not approved yet'}
            />
            <DetailMetric
              label="Released"
              value={formatCurrency(disbursedTotal)}
              icon={<IconCash size={18} />}
              caption={`${formatCurrency(confirmedByBeneficiary)} confirmed by beneficiary`}
            />
            <DetailMetric
              label="Proof timeline"
              value={application.approvedProofDays ? `${application.approvedProofDays} days` : 'Not set'}
              icon={<IconCalendarDue size={18} />}
              caption={`Requested ${application.proposedProofDays} days`}
            />
          </Box>

          <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 1, mb: 2 }}>
            <Stack direction="row" spacing={1} alignItems="center" mb={1.5}>
              <IconInfoCircle size={20} />
              <Typography fontSize={18} fontWeight={700}>
                Request Details
              </Typography>
            </Stack>
            <Typography color="grey.700" mt={1}>
              {application.reason}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: 'repeat(3, 1fr)' }} gap={2}>
              <Box>
                <Typography fontSize={13} color="grey.600">
                  Payment mode
                </Typography>
                <Typography fontWeight={700}>{humanizeScholarshipStatus(application.paymentMode)}</Typography>
              </Box>
              <Box>
                <Typography fontSize={13} color="grey.600">
                  First installment
                </Typography>
                <Typography fontWeight={700}>
                  {application.requestedFirstInstallmentAmount
                    ? formatCurrency(application.requestedFirstInstallmentAmount)
                    : 'Not requested'}
                </Typography>
              </Box>
              <Box>
                <Typography fontSize={13} color="grey.600">
                  Payout
                </Typography>
                <Typography fontWeight={700}>{application.payoutMaskedSnapshot || application.payoutMethod}</Typography>
              </Box>
            </Box>
          </Paper>

          <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 1, mb: 2 }}>
            <Stack direction="row" spacing={1} alignItems="center" mb={2}>
              <IconReceipt size={20} />
              <Typography fontSize={18} fontWeight={700}>
                Scholarship Transactions
              </Typography>
            </Stack>
            {!transactions.length && <Alert severity="info">No scholarship transaction has been created yet.</Alert>}
            <Stack spacing={2}>
              {transactions.map((transaction: any) => (
                <Paper key={transaction.id} variant="outlined" sx={{ p: 2, borderRadius: 1 }}>
                  <Box display="flex" justifyContent="space-between" gap={2}>
                    <Box>
                      <Typography fontWeight={700}>
                        Installment {transaction.scholarshipInstallmentSequence} · {formatCurrency(transaction.amount)}
                      </Typography>
                      <Typography fontSize={13} color="grey.600">
                        {humanizeScholarshipStatus(transaction.scholarshipStatus)}
                      </Typography>
                    </Box>
                    <Chip
                      size="small"
                      icon={<IconReceipt size={14} />}
                      label={humanizeScholarshipStatus(transaction.scholarshipProofStatus)}
                    />
                  </Box>
                  {isOwner &&
                    ['PENDING_BENEFICIARY_CONFIRMATION', 'PARTIALLY_RECEIVED'].includes(
                      transaction.scholarshipStatus
                    ) && (
                      <Box
                        display="grid"
                        gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr auto auto' }}
                        columnGap={3}
                        rowGap={{ xs: 4, sm: 3 }}
                        mt={2}
                      >
                        <CurrencyInput
                          fullWidth
                          size="small"
                          label="Amount received"
                          value={confirmedAmountByTx[transaction.id] ?? transaction.amount}
                          onValueChange={(value) =>
                            setConfirmedAmountByTx((current) => ({ ...current, [transaction.id]: value }))
                          }
                        />
                        <TextField
                          fullWidth
                          size="small"
                          type="file"
                          label="Credit proof"
                          InputLabelProps={{ shrink: true }}
                          inputProps={{ accept: 'image/*,application/pdf' }}
                          onChange={(event) => {
                            const file = (event.target as HTMLInputElement).files?.[0] || null;
                            setCreditProofFileByTx((current) => ({ ...current, [transaction.id]: file }));
                          }}
                        />
                        <Button
                          title="Confirm Receipt"
                          startIcon={<IconCircleCheck size={16} />}
                          loading={receiptState.loading || createDocumentState.loading || finalizeDocumentState.loading}
                          disabled={!creditProofFileByTx[transaction.id]}
                          onClick={() =>
                            runAction(
                              async () => {
                                const creditProofDocumentId = await uploadCreditProofIfStorageAvailable(
                                  transaction,
                                  creditProofFileByTx[transaction.id] as File
                                );
                                await confirmReceipt({
                                  variables: {
                                    transactionId: transaction.id,
                                    confirmedAmount: confirmedAmountByTx[transaction.id] ?? Number(transaction.amount),
                                    creditProofDocumentId,
                                  },
                                });
                                setCreditProofFileByTx((current) => ({ ...current, [transaction.id]: null }));
                              },
                              'Receipt confirmed.',
                              [
                                'getScholarshipApplication',
                                'getScholarshipApplicationActivity',
                                ...SCHOLARSHIP_DASHBOARD_CACHE_FIELDS,
                              ],
                              true
                            )
                          }
                        />
                        <Button
                          variant="outlined"
                          title="Follow Up"
                          startIcon={<IconBell size={16} />}
                          loading={followupState.loading}
                          onClick={() =>
                            runAction(
                              () => requestFollowup({ variables: { transactionId: transaction.id } }),
                              'Follow-up requested.',
                              ['getScholarshipApplicationActivity']
                            )
                          }
                        />
                      </Box>
                    )}
                </Paper>
              ))}
            </Stack>
          </Paper>
        </Box>

        <Stack spacing={2}>
          <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 1 }}>
            <Stack direction="row" spacing={1} alignItems="center" mb={2}>
              <IconUsers size={20} />
              <Typography fontSize={18} fontWeight={700}>
                People
              </Typography>
            </Stack>
            <ProfilePicture
              id={application.beneficiary?.id}
              src={application.beneficiary?.profileImage}
              title={getFullName(application.beneficiary) || 'Beneficiary'}
              summary={`Batch ${application.batchSnapshot}`}
              size={42}
            />
            <Divider sx={{ my: 2 }} />
            <Box display="flex" alignItems="center" gap={1}>
              <Box flex={1} minWidth={0}>
                {application.assignedMentor ? (
                  <ProfilePicture
                    id={application.assignedMentor?.id}
                    src={application.assignedMentor?.profileImage}
                    title={getFullName(application.assignedMentor)}
                    summary={
                      application.status === 'ROUTING_PENDING'
                        ? 'Temporary routing owner • Secretary'
                        : `Assigned mentor • Batch ${application.assignedMentor?.batch ?? 'NA'}`
                    }
                    size={42}
                  />
                ) : (
                  <Alert severity="warning">Mentor routing is pending.</Alert>
                )}
              </Box>
              {canReassign && (
                <Tooltip title={application.assignedMentor ? 'Change mentor' : 'Assign mentor'}>
                  <IconButton
                    size="small"
                    color="primary"
                    aria-label={application.assignedMentor ? 'Change mentor' : 'Assign mentor'}
                    onClick={() => setReassignOpen(true)}
                  >
                    <IconPencil size={18} />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          </Paper>

          <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 1 }}>
            <Stack direction="row" spacing={1} alignItems="center" mb={2}>
              <IconClipboardList size={20} />
              <Typography fontSize={18} fontWeight={700}>
                Actions
              </Typography>
            </Stack>
            <Stack spacing={1.5}>
              {canSubmit && (
                <Button
                  title="Submit Application"
                  startIcon={<IconSend size={16} />}
                  loading={submitState.loading}
                  onClick={() =>
                    runAction(
                      () => submitApplication({ variables: { applicationId } }),
                      'Scholarship application submitted.'
                    )
                  }
                />
              )}
              {canReview && ['SUBMITTED', 'RESUBMITTED'].includes(application.status) && (
                <Button
                  title="Start Review"
                  startIcon={<IconEyeCheck size={16} />}
                  loading={reviewState.loading}
                  onClick={() => runAction(() => startReview({ variables: { applicationId } }), 'Review started.')}
                />
              )}
              {canApprove && ['UNDER_REVIEW', 'SUBMITTED', 'RESUBMITTED'].includes(application.status) && (
                <>
                  <CurrencyInput
                    fullWidth
                    size="small"
                    label="Approved total amount"
                    value={approvedTotalAmount}
                    onValueChange={setApprovedTotalAmount}
                  />
                  <CurrencyInput
                    fullWidth
                    size="small"
                    label="Installment amount"
                    value={installmentAmount}
                    onValueChange={setInstallmentAmount}
                  />
                  <Button
                    title="Approve And Create Payment"
                    startIcon={<IconCash size={16} />}
                    loading={approveState.loading}
                    onClick={() =>
                      runAction(
                        () =>
                          approveApplication({
                            variables: {
                              applicationId,
                              approvedTotalAmount: approvedTotalAmount ?? 0,
                              installmentAmount: installmentAmount ?? 0,
                              proofDueDays: application.proposedProofDays,
                            },
                          }),
                        'Scholarship payment created for beneficiary confirmation.',
                        [
                          'getScholarshipApplicationTransactions',
                          'getScholarshipApplicationActivity',
                          ...SCHOLARSHIP_DASHBOARD_CACHE_FIELDS,
                        ],
                        true
                      )
                    }
                  />
                </>
              )}
              {!canSubmit && !canReview && !canApprove && (
                <Alert severity="info">No action is available for your access and the current status.</Alert>
              )}
            </Stack>
          </Paper>

          <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 1 }}>
            <Stack direction="row" spacing={1} alignItems="center" mb={2}>
              <IconClock size={20} />
              <Typography fontSize={18} fontWeight={700}>
                Timeline
              </Typography>
            </Stack>
            <Timeline activities={activities} loading={activityQuery.loading} application={application} />
          </Paper>
        </Stack>
      </Box>

      <Dialog
        open={reassignOpen}
        maxWidth="560px"
        title={application.status === 'ROUTING_PENDING' ? 'Assign Scholarship Mentor' : 'Change Scholarship Mentor'}
        subTitle={`Choose an eligible mentor for beneficiary batch ${application.batchSnapshot}.`}
        onClose={closeReassignDialog}
        disableBackdropClick={reassignState.loading}
        footerProps={{
          onCancel: closeReassignDialog,
          onOkay: submitReassignment,
          okayButtonProps: {
            title: application.status === 'ROUTING_PENDING' ? 'Assign Mentor' : 'Change Mentor',
            loading: reassignState.loading,
            disabled: !selectedMentor || !reassignmentReason.trim(),
          },
        }}
      >
        <Stack spacing={{ xs: 4, md: 3 }} p={2.5}>
          <Alert severity="info">
            Only active mentors assigned to this beneficiary batch are available. The mentor must belong to a different
            batch.
          </Alert>
          <Box>
            <Typography variant="caption" color="text.secondary">
              Mentor
            </Typography>
            <ReactSelect
              options={mentorOptions}
              value={selectedMentor}
              placeholder="Select an eligible mentor"
              size="small"
              isSearchable
              showAvatars
              isLoading={eligibleMentorsQuery.loading}
              noOptionsMessage="No other eligible mentor is available"
              onChange={(option) => setSelectedMentor(Array.isArray(option) ? null : option)}
            />
          </Box>
          <TextField
            fullWidth
            label="Reason"
            size="small"
            value={reassignmentReason}
            onChange={(event) => setReassignmentReason(event.target.value)}
            required
            multiline
            minRows={2}
            placeholder="Why is this mentor being assigned?"
          />
        </Stack>
      </Dialog>
    </LayoutModule>
  );
}
