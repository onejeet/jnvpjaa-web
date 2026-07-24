'use client';

import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Alert, Box, Chip, CircularProgress, Divider, Paper, Stack, TextField, Typography } from '@mui/material';
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
  GET_SCHOLARSHIP_APPLICATION_TRANSACTIONS,
  REQUEST_SCHOLARSHIP_FOLLOWUP,
  SCHOLARSHIP_DASHBOARD_REFETCH_QUERIES,
  START_SCHOLARSHIP_REVIEW,
  SUBMIT_SCHOLARSHIP_APPLICATION,
} from '@/apollo/scholarshipOperations';
import { formatCurrency, getFullName, humanizeScholarshipStatus } from './helpers';
import { useScholarshipLoginGuard } from './useScholarshipLoginGuard';

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
  const [approvedTotalAmount, setApprovedTotalAmount] = React.useState<number | null>(null);
  const [installmentAmount, setInstallmentAmount] = React.useState<number | null>(null);
  const [confirmedAmountByTx, setConfirmedAmountByTx] = React.useState<Record<string, number | null>>({});
  const [creditProofFileByTx, setCreditProofFileByTx] = React.useState<Record<string, File | null>>({});

  const refetchQueries = [
    { query: GET_SCHOLARSHIP_APPLICATION, variables: { id: applicationId } },
    { query: GET_SCHOLARSHIP_APPLICATION_TRANSACTIONS, variables: { applicationId } },
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
  const isOwner = application?.beneficiaryUserId === user?.id || application?.applicantUserId === user?.id;
  const isAssignedMentor = application?.assignedMentorUserId === user?.id;
  const canSubmit = isOwner && ['DRAFT', 'MORE_INFO_REQUIRED'].includes(application?.status);
  const canReview = isAssignedMentor && can(PERMISSION_CODES.SCHOLARSHIP_APPLICATION_READ_ASSIGNED);
  const canApprove = isAssignedMentor && can(PERMISSION_CODES.SCHOLARSHIP_APPLICATION_APPROVE);

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
                <Typography color="grey.700">No action is available for your access and current status.</Typography>
              )}
            </Stack>
          </Paper>
        </Stack>
      </Box>
    </LayoutModule>
  );
}
