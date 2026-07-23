'use client';

import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Alert, Box, Chip, CircularProgress, Divider, Paper, Stack, TextField, Typography } from '@mui/material';
import toast from 'react-hot-toast';
import Button from '@/components/core/Button';
import ProfilePicture from '@/components/common/ProfilePicture';
import LayoutModule from '@/layouts/Layout';
import { useAuth } from '@/context/AuthContext';
import { PERMISSION_CODES } from '@/constants/access';
import {
  APPROVE_SCHOLARSHIP_APPLICATION,
  CONFIRM_SCHOLARSHIP_RECEIPT,
  GET_SCHOLARSHIP_APPLICATION,
  GET_SCHOLARSHIP_APPLICATION_TRANSACTIONS,
  REQUEST_SCHOLARSHIP_FOLLOWUP,
  START_SCHOLARSHIP_REVIEW,
  SUBMIT_SCHOLARSHIP_APPLICATION,
} from '@/apollo/scholarshipOperations';
import { formatCurrency, getFullName, humanizeScholarshipStatus } from './helpers';

export default function ScholarshipDetail({ applicationId }: { applicationId: string }) {
  const { can, user } = useAuth();
  const applicationQuery = useQuery(GET_SCHOLARSHIP_APPLICATION, {
    variables: { id: applicationId },
    fetchPolicy: 'cache-and-network',
  });
  const transactionsQuery = useQuery(GET_SCHOLARSHIP_APPLICATION_TRANSACTIONS, {
    variables: { applicationId },
    fetchPolicy: 'cache-and-network',
  });
  const [approvedTotalAmount, setApprovedTotalAmount] = React.useState('');
  const [installmentAmount, setInstallmentAmount] = React.useState('');
  const [confirmedAmountByTx, setConfirmedAmountByTx] = React.useState<Record<string, string>>({});

  const refetchQueries = [
    { query: GET_SCHOLARSHIP_APPLICATION, variables: { id: applicationId } },
    { query: GET_SCHOLARSHIP_APPLICATION_TRANSACTIONS, variables: { applicationId } },
    'getScholarshipApplications',
    'getMyScholarshipApplications',
    'getMyScholarshipDashboard',
    'getMentorScholarshipDashboard',
    'getScholarshipOrganizationDashboard',
  ];

  const [submitApplication, submitState] = useMutation(SUBMIT_SCHOLARSHIP_APPLICATION, { refetchQueries });
  const [startReview, reviewState] = useMutation(START_SCHOLARSHIP_REVIEW, { refetchQueries });
  const [approveApplication, approveState] = useMutation(APPROVE_SCHOLARSHIP_APPLICATION, { refetchQueries });
  const [confirmReceipt, receiptState] = useMutation(CONFIRM_SCHOLARSHIP_RECEIPT, { refetchQueries });
  const [requestFollowup, followupState] = useMutation(REQUEST_SCHOLARSHIP_FOLLOWUP);

  const application = applicationQuery.data?.getScholarshipApplication;
  const transactions = transactionsQuery.data?.getScholarshipApplicationTransactions || [];
  const isOwner = application?.beneficiaryUserId === user?.id || application?.applicantUserId === user?.id;
  const isAssignedMentor = application?.assignedMentorUserId === user?.id;
  const canSubmit = isOwner && ['DRAFT', 'MORE_INFO_REQUIRED'].includes(application?.status);
  const canReview = isAssignedMentor && can(PERMISSION_CODES.SCHOLARSHIP_APPLICATION_READ_ASSIGNED);
  const canApprove = isAssignedMentor && can(PERMISSION_CODES.SCHOLARSHIP_APPLICATION_APPROVE);

  React.useEffect(() => {
    if (application?.requestedAmount && !approvedTotalAmount) {
      setApprovedTotalAmount(String(application.requestedAmount));
      setInstallmentAmount(String(application.requestedFirstInstallmentAmount || application.requestedAmount));
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

  if (applicationQuery.loading && !application) {
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

  return (
    <LayoutModule disableCover title={`${application.referenceNumber} • Scholarships`}>
      <Box display="grid" gridTemplateColumns={{ xs: '1fr', lg: 'minmax(0, 1fr) 360px' }} gap={3}>
        <Box>
          <Typography variant="h1">{application.referenceNumber}</Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" mb={2}>
            <Chip label={humanizeScholarshipStatus(application.status)} />
            <Chip variant="outlined" label={`Proof: ${humanizeScholarshipStatus(application.proofStatus)}`} />
            <Chip variant="outlined" label={`Refund: ${humanizeScholarshipStatus(application.refundStatus)}`} />
          </Stack>

          <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 1, mb: 2 }}>
            <Typography fontSize={20} fontWeight={700}>
              {application.purpose}
            </Typography>
            <Typography color="grey.700" mt={1}>
              {application.reason}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: 'repeat(3, 1fr)' }} gap={2}>
              <Box>
                <Typography fontSize={13} color="grey.600">
                  Requested
                </Typography>
                <Typography fontWeight={700}>{formatCurrency(application.requestedAmount)}</Typography>
              </Box>
              <Box>
                <Typography fontSize={13} color="grey.600">
                  Disbursed
                </Typography>
                <Typography fontWeight={700}>{formatCurrency(application.approvedAmountDisbursed)}</Typography>
              </Box>
              <Box>
                <Typography fontSize={13} color="grey.600">
                  Payout
                </Typography>
                <Typography fontWeight={700}>{application.payoutMaskedSnapshot || application.payoutMethod}</Typography>
              </Box>
            </Box>
          </Paper>

          <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 1 }}>
            <Typography fontSize={18} fontWeight={700} mb={2}>
              Scholarship Transactions
            </Typography>
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
                    <Chip size="small" label={humanizeScholarshipStatus(transaction.scholarshipProofStatus)} />
                  </Box>
                  {isOwner && transaction.scholarshipStatus === 'PENDING_BENEFICIARY_CONFIRMATION' && (
                    <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: '1fr auto auto' }} gap={1.5} mt={2}>
                      <TextField
                        size="small"
                        type="number"
                        label="Amount received"
                        value={confirmedAmountByTx[transaction.id] || transaction.amount}
                        onChange={(event) =>
                          setConfirmedAmountByTx((current) => ({ ...current, [transaction.id]: event.target.value }))
                        }
                      />
                      <Button
                        title="Confirm Receipt"
                        loading={receiptState.loading}
                        onClick={() =>
                          runAction(
                            () =>
                              confirmReceipt({
                                variables: {
                                  transactionId: transaction.id,
                                  confirmedAmount: Number(confirmedAmountByTx[transaction.id] || transaction.amount),
                                },
                              }),
                            'Receipt confirmed.'
                          )
                        }
                      />
                      <Button
                        variant="outlined"
                        title="Follow Up"
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
        </Box>

        <Stack spacing={2}>
          <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 1 }}>
            <Typography fontSize={18} fontWeight={700} mb={2}>
              People
            </Typography>
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
                summary="Assigned mentor"
                size={42}
              />
            ) : (
              <Alert severity="warning">Mentor routing is pending.</Alert>
            )}
          </Paper>

          <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 1 }}>
            <Typography fontSize={18} fontWeight={700} mb={2}>
              Actions
            </Typography>
            <Stack spacing={1.5}>
              {canSubmit && (
                <Button
                  title="Submit Application"
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
                  loading={reviewState.loading}
                  onClick={() => runAction(() => startReview({ variables: { applicationId } }), 'Review started.')}
                />
              )}
              {canApprove && ['UNDER_REVIEW', 'SUBMITTED', 'RESUBMITTED'].includes(application.status) && (
                <>
                  <TextField
                    size="small"
                    type="number"
                    label="Approved total amount"
                    value={approvedTotalAmount}
                    onChange={(event) => setApprovedTotalAmount(event.target.value)}
                  />
                  <TextField
                    size="small"
                    type="number"
                    label="Installment amount"
                    value={installmentAmount}
                    onChange={(event) => setInstallmentAmount(event.target.value)}
                  />
                  <Button
                    title="Approve And Create Payment"
                    loading={approveState.loading}
                    onClick={() =>
                      runAction(
                        () =>
                          approveApplication({
                            variables: {
                              applicationId,
                              approvedTotalAmount: Number(approvedTotalAmount),
                              installmentAmount: Number(installmentAmount),
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
                <Typography color="grey.700">No action is available for your access and current status.</Typography>
              )}
            </Stack>
          </Paper>
        </Stack>
      </Box>
    </LayoutModule>
  );
}
