'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client';
import { Alert, Box, MenuItem, Paper, Stack, TextField, Typography } from '@mui/material';
import toast from 'react-hot-toast';
import Button from '@/components/core/Button';
import LayoutModule from '@/layouts/Layout';
import { CREATE_SCHOLARSHIP_DRAFT, SUBMIT_SCHOLARSHIP_APPLICATION } from '@/apollo/scholarshipOperations';

const initialForm = {
  requestedAmount: '',
  paymentMode: 'FULL',
  requestedFirstInstallmentAmount: '',
  purpose: '',
  reason: '',
  proposedProofDays: '30',
  payoutMethod: 'UPI',
  upiId: '',
  accountHolderName: '',
  accountNumber: '',
  confirmAccountNumber: '',
  ifsc: '',
  bankName: '',
};

const buildInput = (form: typeof initialForm) => ({
  requestedAmount: Number(form.requestedAmount),
  paymentMode: form.paymentMode,
  requestedFirstInstallmentAmount:
    form.paymentMode === 'INSTALLMENT' ? Number(form.requestedFirstInstallmentAmount) : null,
  purpose: form.purpose,
  reason: form.reason,
  proposedProofDays: Number(form.proposedProofDays),
  payoutMethod: form.payoutMethod,
  payoutSnapshot:
    form.payoutMethod === 'UPI'
      ? { upiId: form.upiId }
      : {
          accountHolderName: form.accountHolderName,
          accountNumber: form.accountNumber,
          confirmAccountNumber: form.confirmAccountNumber,
          ifsc: form.ifsc,
          bankName: form.bankName,
        },
});

export default function ScholarshipForm() {
  const router = useRouter();
  const [form, setForm] = React.useState(initialForm);
  const [createDraft, createState] = useMutation(CREATE_SCHOLARSHIP_DRAFT);
  const [submitApplication, submitState] = useMutation(SUBMIT_SCHOLARSHIP_APPLICATION, {
    refetchQueries: ['getMyScholarshipApplications', 'getMyScholarshipDashboard'],
  });

  const loading = createState.loading || submitState.loading;

  const setField = (field: keyof typeof initialForm) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleSave = async (submitAfterCreate: boolean) => {
    try {
      const response = await createDraft({ variables: { input: buildInput(form) } });
      const application = response.data?.createScholarshipApplicationDraft;
      if (submitAfterCreate && application?.id) {
        await submitApplication({ variables: { applicationId: application.id } });
        toast.success('Scholarship application submitted.');
      } else {
        toast.success('Scholarship draft saved.');
      }
      router.push(application?.id ? `/scholarships/${application.id}` : '/scholarships');
    } catch (error: any) {
      toast.error(error?.message || 'Could not save scholarship application.');
    }
  };

  return (
    <LayoutModule disableCover title="New Scholarship Application • Alumni Network of JNV Paota, Jaipur">
      <Box maxWidth={900} mx="auto">
        <Typography variant="h1">New Scholarship Application</Typography>
        <Typography color="grey.800" mb={3}>
          Submit the request details and payout information for mentor review.
        </Typography>

        <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 }, borderRadius: 1 }}>
          <Stack spacing={2.5}>
            <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={2}>
              <TextField
                label="Requested amount"
                size="small"
                type="number"
                value={form.requestedAmount}
                onChange={setField('requestedAmount')}
                required
              />
              <TextField
                select
                label="Payment mode"
                size="small"
                value={form.paymentMode}
                onChange={setField('paymentMode')}
              >
                <MenuItem value="FULL">Full payment</MenuItem>
                <MenuItem value="INSTALLMENT">Installment</MenuItem>
              </TextField>
              {form.paymentMode === 'INSTALLMENT' && (
                <TextField
                  label="First installment amount"
                  size="small"
                  type="number"
                  value={form.requestedFirstInstallmentAmount}
                  onChange={setField('requestedFirstInstallmentAmount')}
                  required
                />
              )}
              <TextField
                label="Proof days"
                size="small"
                type="number"
                value={form.proposedProofDays}
                onChange={setField('proposedProofDays')}
                required
              />
            </Box>

            <TextField label="Purpose" size="small" value={form.purpose} onChange={setField('purpose')} required />
            <TextField
              label="Reason"
              size="small"
              value={form.reason}
              onChange={setField('reason')}
              multiline
              minRows={4}
              required
            />

            <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={2}>
              <TextField
                select
                label="Payout method"
                size="small"
                value={form.payoutMethod}
                onChange={setField('payoutMethod')}
              >
                <MenuItem value="UPI">UPI</MenuItem>
                <MenuItem value="BANK_TRANSFER">Bank transfer</MenuItem>
              </TextField>
              {form.payoutMethod === 'UPI' ? (
                <TextField label="UPI ID" size="small" value={form.upiId} onChange={setField('upiId')} required />
              ) : (
                <>
                  <TextField
                    label="Account holder name"
                    size="small"
                    value={form.accountHolderName}
                    onChange={setField('accountHolderName')}
                    required
                  />
                  <TextField
                    label="Account number"
                    size="small"
                    value={form.accountNumber}
                    onChange={setField('accountNumber')}
                    required
                  />
                  <TextField
                    label="Confirm account number"
                    size="small"
                    value={form.confirmAccountNumber}
                    onChange={setField('confirmAccountNumber')}
                    required
                  />
                  <TextField label="IFSC" size="small" value={form.ifsc} onChange={setField('ifsc')} required />
                  <TextField label="Bank name" size="small" value={form.bankName} onChange={setField('bankName')} />
                </>
              )}
            </Box>

            <Alert severity="warning">
              Payout details are stored privately and shown only to authorized scholarship reviewers and finance users.
            </Alert>

            <Box display="flex" justifyContent="flex-end" gap={1.5}>
              <Button variant="outlined" title="Save Draft" loading={loading} onClick={() => handleSave(false)} />
              <Button title="Submit" loading={loading} onClick={() => handleSave(true)} />
            </Box>
          </Stack>
        </Paper>
      </Box>
    </LayoutModule>
  );
}
