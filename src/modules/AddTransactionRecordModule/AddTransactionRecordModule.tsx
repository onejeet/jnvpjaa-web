'use client';

import Dialog from '@/components/core/Dialog';
import { useAlert } from '@/context/AlertContext';
import { useForm, useWatch } from 'react-hook-form';
import { Box, Grid2 as Grid } from '@mui/material';
import FormTextField from '@/components/form/FormTextField';
import FormSelectField from '@/components/form/FormSelectField';
import FormDateTimeField from '@/components/form/FormDateTimeField';
import { Currency, TransactionStatus, TransactionType, useCreateTransactionMutation } from '@/apollo/hooks';
import { IconCurrencyRupee } from '@tabler/icons-react';
import { useApolloClient } from '@apollo/client';
import dayjs from 'dayjs';
import { IAddTransactionRecordInput } from './AddTransactionRecordModule.types';
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import ReactSelect from '@/components/core/ReactSelect';

const AddTransactionRecordModule: React.FC<any> = ({ onClose }) => {
  const { user } = useAuth();
  const client = useApolloClient();
  const { showAlert } = useAlert();
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    getValues,
    formState: { errors },
  } = useForm<IAddTransactionRecordInput>({
    defaultValues: {
      type: TransactionType.Debit,
      transactionDate: dayjs(),
      method: 'BankTransfer',
    },
  });

  console.log('PP: getValues', getValues());

  const [createTransaction, { loading: saving }] = useCreateTransactionMutation();

  const onSubmit = React.useCallback(
    (data: IAddTransactionRecordInput) => {
      createTransaction({
        variables: {
          ...data,
          status: TransactionStatus.Completed,
          userId: user?.id,
          amount: parseFloat(data?.amount),
          currency: Currency.Inr,
          transactionDate: data?.transactionDate?.toISOString(),
        },
        onCompleted: () => {
          client.refetchQueries({
            include: ['getTransactions'],
          });
          showAlert({
            visible: true,
            type: 'success',
            message: 'Transaction added successfully.',
          });
          reset({
            type: TransactionType.Debit,
            transactionDate: dayjs(),
          });
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
    [user, showAlert, client, createTransaction, reset]
  );

  return (
    <Dialog
      open
      title="Add Transaction"
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
          {/* <Grid size={{ xs: 12 }}>
            <ReactSelect
              options={[
                {
                  value: '1',
                  label: 'Alice',
                  avatarUrl: 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
                },
                { value: '2', label: 'Bob', avatarUrl: 'https://i.pravatar.cc/40?img=2' },
                { value: '3', label: 'Charlie', avatarUrl: 'https://i.pravatar.cc/40?img=3' },
              ]}
              isSearchable
              isMulti
              isClearable
              showAvatars
              placeholder="Select Contacts"
            />
          </Grid> */}
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
          <Grid size={{ xs: 12, sm: 9 }}>
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
            <FormTextField
              fullWidth
              id="amount"
              label="Amount"
              control={control}
              disabled={saving}
              startAdornment={<IconCurrencyRupee size={18} />}
              name="amount"
              size="small"
              type="number"
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
