'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useApolloClient, useMutation } from '@apollo/client';
import { Alert, Box, MenuItem, Paper, Stack, Typography } from '@mui/material';
import { IconBuildingBank, IconDeviceFloppy, IconFileText, IconSend } from '@tabler/icons-react';
import toast from 'react-hot-toast';
import Button from '@/components/core/Button';
import CurrencyInput from '@/components/core/CurrencyInput';
import TextField from '@/components/core/TextField';
import LayoutModule from '@/layouts/Layout';
import { useAuth } from '@/context/AuthContext';
import {
  CREATE_SCHOLARSHIP_DRAFT,
  SCHOLARSHIP_APPLICATION_CACHE_FIELDS,
  SCHOLARSHIP_DASHBOARD_CACHE_FIELDS,
  SUBMIT_SCHOLARSHIP_APPLICATION,
} from '@/apollo/scholarshipOperations';
import { invalidateActiveQueryFields } from '@/apollo/cacheInvalidation';
import { useScholarshipLoginGuard } from './useScholarshipLoginGuard';

type ScholarshipFormState = {
  requestedAmount: number | null;
  paymentMode: string;
  requestedFirstInstallmentAmount: number | null;
  purpose: string;
  reason: string;
  proposedProofDays: string;
  payoutMethod: string;
  upiId: string;
  accountHolderName: string;
  accountNumber: string;
  confirmAccountNumber: string;
  ifsc: string;
  bankName: string;
};

const initialForm: ScholarshipFormState = {
  requestedAmount: null,
  paymentMode: 'FULL',
  requestedFirstInstallmentAmount: null,
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

const buildInput = (form: ScholarshipFormState) => ({
  requestedAmount: form.requestedAmount ?? 0,
  paymentMode: form.paymentMode,
  requestedFirstInstallmentAmount:
    form.paymentMode === 'INSTALLMENT' ? (form.requestedFirstInstallmentAmount ?? 0) : null,
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
  const client = useApolloClient();
  const router = useRouter();
  const { user } = useAuth();
  const canRender = useScholarshipLoginGuard(user?.id);
  const [form, setForm] = React.useState(initialForm);
  const [createDraft, createState] = useMutation(CREATE_SCHOLARSHIP_DRAFT);
  const [submitApplication, submitState] = useMutation(SUBMIT_SCHOLARSHIP_APPLICATION);

  const loading = createState.loading || submitState.loading;

  const setField = (field: keyof ScholarshipFormState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const setAmountField = (field: 'requestedAmount' | 'requestedFirstInstallmentAmount') => (value: number | null) => {
    setForm((current) => ({ ...current, [field]: value }));
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
      await invalidateActiveQueryFields(client, [
        ...SCHOLARSHIP_DASHBOARD_CACHE_FIELDS,
        ...SCHOLARSHIP_APPLICATION_CACHE_FIELDS,
      ]);
      router.push(application?.id ? `/scholarships/${application.id}` : '/scholarships');
    } catch (error: any) {
      toast.error(error?.message || 'Could not save scholarship application.');
    }
  };

  if (!canRender) {
    return (
      <LayoutModule disableCover title="New Scholarship Application • Alumni Network of JNV Paota, Jaipur">
        <Box py={8} display="flex" justifyContent="center">
          <Typography color="grey.700">Loading...</Typography>
        </Box>
      </LayoutModule>
    );
  }

  return (
    <LayoutModule disableCover title="New Scholarship Application • Alumni Network of JNV Paota, Jaipur">
      <Box maxWidth={900} mx="auto">
        <Typography variant="h1">New Scholarship Application</Typography>
        <Typography color="grey.800" mb={3}>
          Submit the request details and payout information for mentor review.
        </Typography>

        <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 }, borderRadius: 1 }}>
          <Stack spacing={{ xs: 4, md: 3 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <IconFileText size={20} />
              <Typography fontSize={18} fontWeight={700}>
                Request Details
              </Typography>
            </Stack>
            <Box
              display="grid"
              gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }}
              columnGap={3}
              rowGap={{ xs: 4, md: 3 }}
            >
              <CurrencyInput
                fullWidth
                label="Requested amount"
                size="small"
                value={form.requestedAmount}
                onValueChange={setAmountField('requestedAmount')}
                required
              />
              <TextField
                fullWidth
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
                <CurrencyInput
                  fullWidth
                  label="First installment amount"
                  size="small"
                  value={form.requestedFirstInstallmentAmount}
                  onValueChange={setAmountField('requestedFirstInstallmentAmount')}
                  required
                />
              )}
              <TextField
                fullWidth
                label="Proof days"
                size="small"
                type="number"
                value={form.proposedProofDays}
                onChange={setField('proposedProofDays')}
                required
              />
            </Box>

            <TextField
              fullWidth
              label="Purpose"
              size="small"
              value={form.purpose}
              onChange={setField('purpose')}
              required
            />
            <TextField
              fullWidth
              label="Reason"
              size="small"
              value={form.reason}
              onChange={setField('reason')}
              multiline
              minRows={4}
              required
            />

            <Stack direction="row" spacing={1} alignItems="center">
              <IconBuildingBank size={20} />
              <Typography fontSize={18} fontWeight={700}>
                Payout Details
              </Typography>
            </Stack>
            <Box
              display="grid"
              gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }}
              columnGap={3}
              rowGap={{ xs: 4, md: 3 }}
            >
              <TextField
                fullWidth
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
                <TextField
                  fullWidth
                  label="UPI ID"
                  size="small"
                  value={form.upiId}
                  onChange={setField('upiId')}
                  required
                />
              ) : (
                <>
                  <TextField
                    fullWidth
                    label="Account holder name"
                    size="small"
                    value={form.accountHolderName}
                    onChange={setField('accountHolderName')}
                    required
                  />
                  <TextField
                    fullWidth
                    label="Account number"
                    size="small"
                    value={form.accountNumber}
                    onChange={setField('accountNumber')}
                    required
                  />
                  <TextField
                    fullWidth
                    label="Confirm account number"
                    size="small"
                    value={form.confirmAccountNumber}
                    onChange={setField('confirmAccountNumber')}
                    required
                  />
                  <TextField
                    fullWidth
                    label="IFSC"
                    size="small"
                    value={form.ifsc}
                    onChange={setField('ifsc')}
                    required
                  />
                  <TextField
                    fullWidth
                    label="Bank name"
                    size="small"
                    value={form.bankName}
                    onChange={setField('bankName')}
                  />
                </>
              )}
            </Box>

            <Alert severity="warning">
              Payout details are stored privately and shown only to authorized scholarship reviewers and finance users.
            </Alert>

            <Box display="flex" justifyContent="flex-end" gap={1.5}>
              <Button
                variant="outlined"
                title="Save Draft"
                startIcon={<IconDeviceFloppy size={16} />}
                loading={loading}
                onClick={() => handleSave(false)}
              />
              <Button
                title="Submit"
                startIcon={<IconSend size={16} />}
                loading={loading}
                onClick={() => handleSave(true)}
              />
            </Box>
          </Stack>
        </Paper>
      </Box>
    </LayoutModule>
  );
}
