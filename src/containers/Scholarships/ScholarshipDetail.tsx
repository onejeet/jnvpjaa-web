'use client';

import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import {
  Alert,
  Box,
  Chip,
  CircularProgress,
  Divider,
  Paper,
  Stack,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  TextField,
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
  IconFileText,
  IconHourglass,
  IconInfoCircle,
  IconReceipt,
  IconSend,
  IconShieldCheck,
  IconUsers,
} from '@tabler/icons-react';
import toast from 'react-hot-toast';
import Button from '@/components/core/Button';
import CurrencyInput from '@/components/core/CurrencyInput';
import ProfilePicture from '@/components/common/ProfilePicture';
import LayoutModule from '@/layouts/Layout';
import { useAuth } from '@/context/AuthContext';
import { PERMISSION_CODES } from '@/constants/access';
import {
  APPROVE_SCHOLARSHIP_APPLICATION,
  CONFIRM_SCHOLARSHIP_RECEIPT,
  CREATE_SCHOLARSHIP_DOCUMENT_UPLOAD,
  FINALIZE_SCHOLARSHIP_DOCUMENT_UPLOAD,
  GET_SCHOLARSHIP_APPLICATION,
  GET_SCHOLARSHIP_APPLICATION_ACTIVITY,
  GET_SCHOLARSHIP_APPLICATION_TRANSACTIONS,
  REQUEST_SCHOLARSHIP_FOLLOWUP,
  SCHOLARSHIP_DASHBOARD_REFETCH_QUERIES,
  START_SCHOLARSHIP_REVIEW,
  SUBMIT_SCHOLARSHIP_APPLICATION,
} from '@/apollo/scholarshipOperations';
import { formatCurrency, formatDate, formatDateTime, getFullName, humanizeScholarshipStatus } from './helpers';
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
    case 'SCHOLARSHIP_REVIEW_STARTED':
      return 'Review started';
    case 'SCHOLARSHIP_INFORMATION_REQUESTED':
      return 'More information requested';
    case 'SCHOLARSHIP_APPLICATION_REJECTED':
      return 'Application rejected';
    case 'SCHOLARSHIP_APPLICATION_APPROVED':
      return 'Application approved';
    case 'SCHOLARSHIP_RECEIPT_CONFIRMED':
      return 'Payment receipt confirmed';
    case 'SCHOLARSHIP_FOLLOWUP_REQUESTED':
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

const Timeline = ({ activities, loading }: { activities: any[]; loading: boolean }) => {
  if (loading) {
    return (
      <Box py={4} display="flex" justifyContent="center">
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (!activities.length) {
    return <Alert severity="info">Timeline will appear after the first workflow action is recorded.</Alert>;
  }

  return (
    <Stepper activeStep={activities.length} orientation="vertical">
      {[...activities]
        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        .map((activity) => {
          const actorName = getFullName(activity.actor) || activity.actor?.email || 'System';
          const amount = getActivityAmount(activity);

          return (
            <Step key={activity.id} expanded completed={!activity.isHighRisk}>
              <StepLabel
                error={activity.isHighRisk}
                optional={
                  <Typography fontSize={12} color="grey.600">
                    {formatDateTime(activity.createdAt)}
                  </Typography>
                }
              >
                <Typography fontWeight={700}>{getActivityTitle(activity.action)}</Typography>
              </StepLabel>
              <StepContent>
                <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
                  <ProfilePicture
                    id={activity.actor?.id}
                    src={activity.actor?.profileImage}
                    title={actorName}
                    summary={activity.actor?.batch ? `Batch ${activity.actor.batch}` : 'Workflow action'}
                    size={30}
                  />
                  {amount && <Chip size="small" variant="outlined" label={amount} />}
                  {activity.reason && <Chip size="small" variant="outlined" label={activity.reason} />}
                  {activity.isHighRisk && <Chip size="small" color="error" variant="outlined" label="High risk" />}
                </Stack>
              </StepContent>
            </Step>
          );
        })}
    </Stepper>
  );
};

export default function ScholarshipDetail({ applicationId }: { applicationId: string }) {
  const { can, user } = useAuth();
  const canRender = useScholarshipLoginGuard(user?.id);
  const applicationQuery = useQuery(GET_SCHOLARSHIP_APPLICATION, {
    variables: { id: applicationId },
    skip: !canRender,
    fetchPolicy: 'cache-and-network',
  });
  const transactionsQuery = useQuery(GET_SCHOLARSHIP_APPLICATION_TRANSACTIONS, {
    variables: { applicationId },
    skip: !canRender,
    fetchPolicy: 'cache-and-network',
  });
  const activityQuery = useQuery(GET_SCHOLARSHIP_APPLICATION_ACTIVITY, {
    variables: { applicationId },
    skip: !canRender,
    fetchPolicy: 'cache-and-network',
  });
  const [approvedTotalAmount, setApprovedTotalAmount] = React.useState<number | null>(null);
  const [installmentAmount, setInstallmentAmount] = React.useState<number | null>(null);
  const [confirmedAmountByTx, setConfirmedAmountByTx] = React.useState<Record<string, number | null>>({});
  const [creditProofFileByTx, setCreditProofFileByTx] = React.useState<Record<string, File | null>>({});

  const refetchQueries = [
    { query: GET_SCHOLARSHIP_APPLICATION, variables: { id: applicationId } },
    { query: GET_SCHOLARSHIP_APPLICATION_TRANSACTIONS, variables: { applicationId } },
    { query: GET_SCHOLARSHIP_APPLICATION_ACTIVITY, variables: { applicationId } },
    ...SCHOLARSHIP_DASHBOARD_REFETCH_QUERIES,
  ];

  const [submitApplication, submitState] = useMutation(SUBMIT_SCHOLARSHIP_APPLICATION, { refetchQueries });
  const [startReview, reviewState] = useMutation(START_SCHOLARSHIP_REVIEW, { refetchQueries });
  const [approveApplication, approveState] = useMutation(APPROVE_SCHOLARSHIP_APPLICATION, { refetchQueries });
  const [confirmReceipt, receiptState] = useMutation(CONFIRM_SCHOLARSHIP_RECEIPT, { refetchQueries });
  const [createDocumentUpload, createDocumentState] = useMutation(CREATE_SCHOLARSHIP_DOCUMENT_UPLOAD);
  const [finalizeDocumentUpload, finalizeDocumentState] = useMutation(FINALIZE_SCHOLARSHIP_DOCUMENT_UPLOAD);
  const [requestFollowup, followupState] = useMutation(REQUEST_SCHOLARSHIP_FOLLOWUP);

  const application = applicationQuery.data?.getScholarshipApplication;
  const transactions = transactionsQuery.data?.getScholarshipApplicationTransactions || [];
  const activities = activityQuery.data?.getScholarshipApplicationActivity || [];
  const isOwner = application?.beneficiaryUserId === user?.id || application?.applicantUserId === user?.id;
  const isAssignedMentor = application?.assignedMentorUserId === user?.id;
  const canSubmit = isOwner && ['DRAFT', 'MORE_INFO_REQUIRED'].includes(application?.status);
  const canReview = isAssignedMentor && can(PERMISSION_CODES.SCHOLARSHIP_APPLICATION_READ_ASSIGNED);
  const canApprove = isAssignedMentor && can(PERMISSION_CODES.SCHOLARSHIP_APPLICATION_APPROVE);
  const guidance = getDetailGuidance(application, isOwner, isAssignedMentor);

  React.useEffect(() => {
    if (application?.requestedAmount && approvedTotalAmount === null) {
      setApprovedTotalAmount(Number(application.requestedAmount));
      setInstallmentAmount(Number(application.requestedFirstInstallmentAmount || application.requestedAmount));
    }
  }, [application?.requestedAmount, application?.requestedFirstInstallmentAmount, approvedTotalAmount]);

  const runAction = async (action: () => Promise<any>, success: string) => {
    try {
      await action();
      toast.success(success);
    } catch (error: any) {
      toast.error(error?.message || 'Action failed.');
    }
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

          <Stack direction="row" spacing={1} flexWrap="wrap" mb={2}>
            <Chip icon={<IconClipboardList size={14} />} label={humanizeScholarshipStatus(application.status)} />
            <Chip
              icon={<IconReceipt size={14} />}
              variant="outlined"
              label={`Proof: ${humanizeScholarshipStatus(application.proofStatus)}`}
            />
            <Chip
              icon={<IconCash size={14} />}
              variant="outlined"
              label={`Refund: ${humanizeScholarshipStatus(application.refundStatus)}`}
            />
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
                      <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr auto auto' }} gap={1.5} mt={2}>
                        <CurrencyInput
                          size="small"
                          label="Amount received"
                          value={confirmedAmountByTx[transaction.id] ?? transaction.amount}
                          onValueChange={(value) =>
                            setConfirmedAmountByTx((current) => ({ ...current, [transaction.id]: value }))
                          }
                        />
                        <TextField
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
                            runAction(async () => {
                              const creditProofDocumentId = await uploadCreditProof(
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
                            }, 'Receipt confirmed.')
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
                              'Follow-up requested.'
                            )
                          }
                        />
                      </Box>
                    )}
                </Paper>
              ))}
            </Stack>
          </Paper>

          <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 1 }}>
            <Stack direction="row" spacing={1} alignItems="center" mb={2}>
              <IconClock size={20} />
              <Typography fontSize={18} fontWeight={700}>
                Timeline
              </Typography>
            </Stack>
            <Timeline activities={activities} loading={activityQuery.loading} />
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
            {application.assignedMentor ? (
              <ProfilePicture
                id={application.assignedMentor?.id}
                src={application.assignedMentor?.profileImage}
                title={getFullName(application.assignedMentor)}
                summary={`Assigned mentor • Batch ${application.assignedMentor?.batch ?? 'NA'}`}
                size={42}
              />
            ) : (
              <Alert severity="warning">Mentor routing is pending.</Alert>
            )}
          </Paper>

          <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 1 }}>
            <Stack direction="row" spacing={1} alignItems="center" mb={2}>
              <IconCalendarDue size={20} />
              <Typography fontSize={18} fontWeight={700}>
                Important Dates
              </Typography>
            </Stack>
            <Stack spacing={1.5}>
              <Box>
                <Typography fontSize={13} color="grey.600">
                  Submitted
                </Typography>
                <Typography fontWeight={700}>{formatDate(application.submittedAt)}</Typography>
              </Box>
              <Box>
                <Typography fontSize={13} color="grey.600">
                  Approved
                </Typography>
                <Typography fontWeight={700}>{formatDate(application.approvedAt)}</Typography>
              </Box>
              <Box>
                <Typography fontSize={13} color="grey.600">
                  Rejected
                </Typography>
                <Typography fontWeight={700}>{formatDate(application.rejectedAt)}</Typography>
              </Box>
              <Box>
                <Typography fontSize={13} color="grey.600">
                  Last activity
                </Typography>
                <Typography fontWeight={700}>{formatDateTime(application.lastActivityAt)}</Typography>
              </Box>
            </Stack>
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
                    size="small"
                    label="Approved total amount"
                    value={approvedTotalAmount}
                    onValueChange={setApprovedTotalAmount}
                  />
                  <CurrencyInput
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
                        'Scholarship payment created for beneficiary confirmation.'
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
        </Stack>
      </Box>
    </LayoutModule>
  );
}
