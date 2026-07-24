'use client';

import Dialog from '@/components/core/Dialog';
import { useAlert } from '@/context/AlertContext';
import { useForm, useWatch } from 'react-hook-form';
import { Box, Grid2 as Grid } from '@mui/material';
import FormTextField from '@/components/form/FormTextField';
import FormCurrencyInput from '@/components/form/FormCurrencyInput';
import FormSelectField from '@/components/form/FormSelectField';
import FormDateTimeField from '@/components/form/FormDateTimeField';
import { TransactionType } from '@/apollo/hooks';
import { useApolloClient, useMutation } from '@apollo/client';
import dayjs from 'dayjs';
import { IAddTransactionRecordInput } from './AddTransactionRecordModule.types';
import React from 'react';
import {
  BILLING_REFETCH_QUERIES,
  CREATE_ASSOCIATION_CREDIT,
  CREATE_ASSOCIATION_DEBIT,
} from '@/apollo/billingOperations';

const AddTransactionRecordModule: React.FC<any> = ({ onClose }) => {
  const client = useApolloClient();
  const { showAlert } = useAlert();
  const { control, handleSubmit, setValue, reset } = useForm<IAddTransactionRecordInput>({
    defaultValues: {
      type: TransactionType.Debit,
      billingCategory: 'OTHER_ACTIVITY',
      transactionDate: dayjs(),
      method: 'BankTransfer',
    },
  });

  const selectedType = useWatch({ control, name: 'type' });
  const [createCredit, creditState] = useMutation(CREATE_ASSOCIATION_CREDIT, {
    refetchQueries: BILLING_REFETCH_QUERIES,
  });
  const [createDebit, debitState] = useMutation(CREATE_ASSOCIATION_DEBIT, {
    refetchQueries: BILLING_REFETCH_QUERIES,
  });
  const saving = creditState.loading || debitState.loading;

  React.useEffect(() => {
    setValue('billingCategory', selectedType === TransactionType.Credit ? 'DONATION' : 'OTHER_ACTIVITY');
  }, [selectedType, setValue]);

  const onSubmit = React.useCallback(
    (data: IAddTransactionRecordInput) => {
      const mutation = data.type === TransactionType.Credit ? createCredit : createDebit;
      mutation({
        variables: {
          title: data.title,
          amount: data.amount,
          transactionDate: data?.transactionDate?.toISOString(),
          billingCategory: data.billingCategory,
          referenceId: data.referenceId || null,
          method: data.method || null,
          description: data.description || null,
        },
        onCompleted: () => {
          client.cache.evict({ fieldName: 'getTransactions' });
          client.cache.evict({ fieldName: 'getAssociationTransactions' });
          client.cache.evict({ fieldName: 'getBillingDashboard' });
          client.cache.evict({ fieldName: 'getAssociationWalletSummary' });
          client.cache.gc();
          showAlert({
            visible: true,
            type: 'success',
            message: 'Billing entry recorded successfully.',
          });
          reset({
            type: TransactionType.Debit,
            billingCategory: 'OTHER_ACTIVITY',
            transactionDate: dayjs(),
          });
          onClose();
        },
        onError: (err) => {
          showAlert({
            visible: true,
            type: 'error',
            message: err?.message || 'Something went wrong.',
          });
        },
      });
    },
    [showAlert, client, createCredit, createDebit, reset, onClose]
  );

  return (
    <Dialog
      open
      title="Record Billing Entry"
      disableBackdropClick
      onClose={onClose}
      footerProps={{
        onOkay: handleSubmit(onSubmit),
        okayButtonProps: {
          title: 'Add Record',
          loading: saving,
        },
        onCancel: onClose,
        cancelButtonProps: {
          disabled: saving,
        },
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          width: '100%',
          p: 2,
          // p: 3,
          // display: 'flex',
          // flexDirection: 'column',
          // alignItems: 'center',
        }}
      >
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 3 }}>
            <FormSelectField
              control={control}
              name="type"
              selectProps={{
                size: 'small',
                id: 'type',
                disabled: saving,
              }}
              options={[
                {
                  label: TransactionType.Debit,
                  value: TransactionType.Debit,
                },
                {
                  label: TransactionType.Credit,
                  value: TransactionType.Credit,
                },
              ]}
              rules={{
                required: 'Required',
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <FormSelectField
              control={control}
              name="billingCategory"
              selectProps={{
                size: 'small',
                id: 'billingCategory',
                disabled: saving,
              }}
              options={
                selectedType === TransactionType.Credit
                  ? [
                      { label: 'Donation', value: 'DONATION' },
                      { label: 'Membership', value: 'MEMBERSHIP' },
                      { label: 'Event Income', value: 'EVENT' },
                      { label: 'Adjustment', value: 'ADJUSTMENT' },
                    ]
                  : [
                      { label: 'Other Activity', value: 'OTHER_ACTIVITY' },
                      { label: 'Event Spending', value: 'EVENT' },
                      { label: 'Adjustment', value: 'ADJUSTMENT' },
                    ]
              }
              rules={{
                required: 'Required',
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 5 }}>
            <FormTextField
              fullWidth
              id="title"
              label="Title"
              autoFocus
              control={control}
              disabled={saving}
              name="title"
              size="small"
              rules={{
                required: 'Required',
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <FormDateTimeField
              control={control}
              name="transactionDate"
              inputProps={{
                name: 'transactionDate',
                label: 'Transaction Date',
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
              label="Amount"
              control={control}
              disabled={saving}
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
              label="Transaction Id (if any)"
              control={control}
              disabled={saving}
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
                disabled: saving,
              }}
              options={[
                {
                  label: 'Cash',
                  value: 'Cash',
                },
                {
                  label: 'UPI',
                  value: 'UPI',
                },
                {
                  label: 'Bank Transfer',
                  value: 'BankTransfer',
                },
                {
                  label: 'Credit Card',
                  value: 'CreditCard',
                },
                {
                  label: 'Debit Card',
                  value: 'DebitCard',
                },
              ]}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <FormTextField
              fullWidth
              id="description"
              label="Description"
              multiline
              minRows={2}
              control={control}
              disabled={saving}
              size="small"
              name="description"
              // size="small"
            />
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
};

export default AddTransactionRecordModule;
