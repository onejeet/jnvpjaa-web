'use client';

import React from 'react';
import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { Alert, Box, Grid2 as Grid, Typography } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { useForm } from 'react-hook-form';
import {
  BILLING_CACHE_FIELDS,
  GET_ASSOCIATION_WALLET_SUMMARY,
  SET_ASSOCIATION_OPENING_BALANCE,
} from '@/apollo/billingOperations';
import { invalidateActiveQueryFields } from '@/apollo/cacheInvalidation';
import Dialog from '@/components/core/Dialog';
import FormCurrencyInput from '@/components/form/FormCurrencyInput';
import FormDateTimeField from '@/components/form/FormDateTimeField';
import FormSelectField from '@/components/form/FormSelectField';
import FormTextField from '@/components/form/FormTextField';
import { useAlert } from '@/context/AlertContext';

interface ISetOpeningBalanceInput {
  amount: number;
  transactionDate: Dayjs;
  referenceId?: string;
  method?: string;
  description?: string;
}

const formatCurrency = (amount?: number, currency = 'INR') =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(Number(amount || 0));

const SetOpeningBalanceModule: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const client = useApolloClient();
  const { showAlert } = useAlert();
  const { data } = useQuery(GET_ASSOCIATION_WALLET_SUMMARY, { fetchPolicy: 'cache-and-network' });
  const { control, handleSubmit } = useForm<ISetOpeningBalanceInput>({
    defaultValues: {
      transactionDate: dayjs(),
      method: 'BankTransfer',
    },
  });

  const [setOpeningBalance, { loading }] = useMutation(SET_ASSOCIATION_OPENING_BALANCE);
  const wallet = data?.getAssociationWalletSummary;

  const onSubmit = React.useCallback(
    async (formData: ISetOpeningBalanceInput) => {
      try {
        await setOpeningBalance({
          variables: {
            amount: formData.amount,
            transactionDate: formData.transactionDate?.toISOString(),
            referenceId: formData.referenceId || null,
            method: formData.method || null,
            description: formData.description || null,
          },
        });
        await invalidateActiveQueryFields(client, BILLING_CACHE_FIELDS);
        showAlert({
          visible: true,
          type: 'success',
          message: 'Opening balance recorded. Future ledger entries will update the association wallet.',
        });
        onClose();
      } catch (err: any) {
        showAlert({
          visible: true,
          type: 'error',
          message: err?.message || 'Unable to record opening balance.',
        });
      }
    },
    [client, onClose, setOpeningBalance, showAlert]
  );

  return (
    <Dialog
      open
      title="Set Association Opening Balance"
      disableBackdropClick
      onClose={onClose}
      footerProps={{
        onOkay: handleSubmit(onSubmit),
        okayButtonProps: {
          title: 'Set Opening Balance',
          loading,
        },
        onCancel: onClose,
        cancelButtonProps: {
          disabled: loading,
        },
      }}
    >
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%', p: 2 }}>
        <Alert severity="info" sx={{ mb: 3 }}>
          Record the current association cash/bank balance once. The wallet will then be derived from this entry plus
          all completed credits, debits, scholarship releases, refunds, and adjustments.
        </Alert>

        {wallet && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Current derived available funds
            </Typography>
            <Typography variant="h5">{formatCurrency(wallet.availableFunds, wallet.currency)}</Typography>
          </Box>
        )}

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormDateTimeField
              control={control}
              name="transactionDate"
              inputProps={{
                name: 'transactionDate',
                label: 'Balance Date',
                size: 'small',
              }}
              isDateOnly
              rules={{
                required: 'Required',
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormCurrencyInput
              fullWidth
              id="amount"
              label="Current Association Amount"
              control={control}
              disabled={loading}
              name="amount"
              size="small"
              rules={{
                required: 'Required',
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormTextField
              fullWidth
              id="referenceId"
              label="Reference Id (if any)"
              control={control}
              disabled={loading}
              name="referenceId"
              size="small"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormSelectField
              control={control}
              name="method"
              selectProps={{
                size: 'small',
                id: 'method',
                disabled: loading,
              }}
              options={[
                { label: 'Cash', value: 'Cash' },
                { label: 'UPI', value: 'UPI' },
                { label: 'Bank Transfer', value: 'BankTransfer' },
                { label: 'Credit Card', value: 'CreditCard' },
                { label: 'Debit Card', value: 'DebitCard' },
              ]}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <FormTextField
              fullWidth
              id="description"
              label="Notes"
              multiline
              minRows={2}
              control={control}
              disabled={loading}
              size="small"
              name="description"
            />
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
};

export default SetOpeningBalanceModule;
