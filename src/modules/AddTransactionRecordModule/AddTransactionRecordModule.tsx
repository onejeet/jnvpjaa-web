'use client';

import Dialog from '@/components/core/Dialog';
import { useAlert } from '@/context/AlertContext';
import { useForm, useWatch } from 'react-hook-form';
import { Box, Grid2 as Grid, TextField } from '@mui/material';
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
  CREATE_ASSOCIATION_CREDIT,
  CREATE_ASSOCIATION_DEBIT,
  CREATE_TRANSACTION_ATTACHMENT_UPLOAD,
  FINALIZE_TRANSACTION_ATTACHMENT_UPLOAD,
} from '@/apollo/billingOperations';
import { invalidateBillingLedgerQueries } from '@/apollo/cacheInvalidation';

const AddTransactionRecordModule: React.FC<any> = ({ onClose }) => {
  const client = useApolloClient();
  const { showAlert } = useAlert();
  const [attachmentFile, setAttachmentFile] = React.useState<File | null>(null);
  const { control, handleSubmit, setValue, reset } = useForm<IAddTransactionRecordInput>({
    defaultValues: {
      type: TransactionType.Debit,
      billingCategory: 'OTHER_ACTIVITY',
      transactionDate: dayjs(),
      method: 'BankTransfer',
    },
  });

  const selectedType = useWatch({ control, name: 'type' });
  const [createCredit, creditState] = useMutation(CREATE_ASSOCIATION_CREDIT);
  const [createDebit, debitState] = useMutation(CREATE_ASSOCIATION_DEBIT);
  const [createAttachmentUpload, attachmentUploadState] = useMutation(CREATE_TRANSACTION_ATTACHMENT_UPLOAD);
  const [finalizeAttachmentUpload, finalizeAttachmentState] = useMutation(FINALIZE_TRANSACTION_ATTACHMENT_UPLOAD);
  const saving =
    creditState.loading || debitState.loading || attachmentUploadState.loading || finalizeAttachmentState.loading;

  React.useEffect(() => {
    setValue('billingCategory', selectedType === TransactionType.Credit ? 'DONATION' : 'OTHER_ACTIVITY');
  }, [selectedType, setValue]);

  const uploadAttachment = React.useCallback(
    async (transactionId: string, file: File) => {
      const upload = await createAttachmentUpload({
        variables: {
          transactionId,
          filename: file.name,
          mimeType: file.type || 'application/octet-stream',
          sizeBytes: file.size,
        },
      });
      const uploadUrl = upload.data?.createTransactionAttachmentUpload?.uploadUrl;
      const attachmentId = upload.data?.createTransactionAttachmentUpload?.attachment?.id;
      if (!uploadUrl || !attachmentId) throw new Error('Could not prepare attachment upload.');

      const uploadResponse = await fetch(uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': file.type || 'application/octet-stream' },
        body: file,
      });
      if (!uploadResponse.ok) throw new Error('Attachment upload failed.');

      await finalizeAttachmentUpload({ variables: { attachmentId } });
    },
    [createAttachmentUpload, finalizeAttachmentUpload]
  );

  const refreshBillingQueries = React.useCallback(() => {
    return invalidateBillingLedgerQueries(client);
  }, [client]);

  const onSubmit = React.useCallback(
    async (data: IAddTransactionRecordInput) => {
      const mutation = data.type === TransactionType.Credit ? createCredit : createDebit;
      try {
        const result = await mutation({
          variables: {
            title: data.title,
            amount: data.amount,
            transactionDate: data?.transactionDate?.toISOString(),
            billingCategory: data.billingCategory,
            referenceId: data.referenceId || null,
            method: data.method || null,
            description: data.description || null,
          },
        });
        const transactionId = result.data?.createAssociationCredit?.id || result.data?.createAssociationDebit?.id;
        if (attachmentFile && transactionId) {
          await uploadAttachment(transactionId, attachmentFile);
        }

        await refreshBillingQueries();
        showAlert({
          visible: true,
          type: 'success',
          message: attachmentFile
            ? 'Billing entry and attachment recorded successfully.'
            : 'Billing entry recorded successfully.',
        });
        setAttachmentFile(null);
        reset({
          type: TransactionType.Debit,
          billingCategory: 'OTHER_ACTIVITY',
          transactionDate: dayjs(),
        });
        onClose();
      } catch (err: any) {
        showAlert({
          visible: true,
          type: 'error',
          message: err?.message || 'Something went wrong.',
        });
      }
    },
    [attachmentFile, createCredit, createDebit, onClose, refreshBillingQueries, reset, showAlert, uploadAttachment]
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
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              type="file"
              label="Attachment"
              size="small"
              disabled={saving}
              InputLabelProps={{ shrink: true }}
              inputProps={{ accept: 'image/*,application/pdf' }}
              onChange={(event) => {
                const file = (event.target as HTMLInputElement).files?.[0] || null;
                setAttachmentFile(file);
              }}
              helperText="Optional. Upload a protected image or PDF receipt/document."
            />
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
};

export default AddTransactionRecordModule;
