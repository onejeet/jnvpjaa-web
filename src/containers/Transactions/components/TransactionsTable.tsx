'use client';

import useTransactionsTable from '../hooks/useTransactionsTable';
import React from 'react';
import { useApolloClient } from '@apollo/client';
import { useRouter } from 'next/navigation';
import DataGrid from '@/components/core/DataGrid';
import Dialog from '@/components/core/Dialog';
import ProfilePicture from '@/components/common/ProfilePicture';
import { formatCurrency, valueToLabelFormatter } from '@/utils/helpers';
import { Box, Chip, Divider, Grid2 as Grid, Stack, Typography } from '@mui/material';
import { GridRowParams } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { IconArrowRight, IconExternalLink, IconPaperclip } from '@tabler/icons-react';
import Button from '@/components/core/Button';
import { GET_TRANSACTION_ATTACHMENT_READ_URL } from '@/apollo/billingOperations';

const DetailItem = ({ label, value }: { label: string; value?: React.ReactNode }) => (
  <Box>
    <Typography fontSize={12} color="grey.600" textTransform="uppercase">
      {label}
    </Typography>
    <Typography fontSize={14} fontWeight={600} sx={{ wordBreak: 'break-word' }}>
      {value || '--'}
    </Typography>
  </Box>
);

const getUserName = (user: any) => `${user?.firstName || ''} ${user?.lastName || ''}`.trim();

const getUserSummary = (user: any) => {
  if (!user) return '';
  return user.batch === 0 ? 'Faculty' : `Batch of ${user.batch}`;
};

const getAssociationParticipants = (transaction: any) => {
  const isBeneficiaryPayment = transaction?.billingCategory === 'SCHOLARSHIP_BENEFICIARY_PAYMENT';
  const isMentorAllocation = transaction?.billingCategory === 'SCHOLARSHIP_MENTOR_ALLOCATION';
  const from = isBeneficiaryPayment
    ? transaction?.scholarshipMentor || transaction?.recordedBy
    : transaction?.recordedBy;
  const to = isBeneficiaryPayment
    ? transaction?.scholarshipBeneficiary || transaction?.user
    : isMentorAllocation
      ? transaction?.scholarshipMentor || transaction?.user
      : transaction?.user?.id && transaction?.user?.id !== from?.id
        ? transaction.user
        : null;

  return {
    from: from || null,
    to: to?.id && to.id !== from?.id ? to : null,
  };
};

const TransactionDetailsDialog = ({ transaction, onClose }: { transaction: any; onClose: () => void }) => {
  const client = useApolloClient();
  const router = useRouter();
  const isDebit = transaction?.type === 'DEBIT';
  const attachments = transaction?.attachments || [];
  const { from, to } = getAssociationParticipants(transaction);

  const openAttachment = React.useCallback(
    async (attachmentId: string) => {
      const result = await client.query({
        query: GET_TRANSACTION_ATTACHMENT_READ_URL,
        variables: { attachmentId },
        fetchPolicy: 'network-only',
      });
      const url = result.data?.getTransactionAttachmentReadUrl;
      if (url) window.open(url, '_blank', 'noopener,noreferrer');
    },
    [client]
  );

  return (
    <Dialog
      open
      title="Transaction Details"
      onClose={onClose}
      maxWidth="760px"
      footerProps={{
        onCancel: onClose,
        cancelButtonProps: {
          title: 'Close',
        },
      }}
    >
      <Box p={2.5}>
        <Stack spacing={2.5}>
          <Box>
            <Typography fontSize={12} color="grey.600" textTransform="uppercase">
              Title
            </Typography>
            <Typography fontSize={20} fontWeight={700}>
              {transaction?.title || '--'}
            </Typography>
          </Box>

          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Chip
              size="small"
              color={isDebit ? 'error' : 'success'}
              label={`${transaction?.type || '--'} ${formatCurrency(transaction?.amount)}`}
            />
            {transaction?.status && (
              <Chip size="small" variant="outlined" label={valueToLabelFormatter(transaction.status)} />
            )}
            {transaction?.billingCategory && (
              <Chip size="small" variant="outlined" label={valueToLabelFormatter(transaction.billingCategory)} />
            )}
            {transaction?.sourceType && (
              <Chip size="small" variant="outlined" label={valueToLabelFormatter(transaction.sourceType)} />
            )}
          </Stack>

          <Divider />

          <Grid container spacing={2.5}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <DetailItem
                label="Transaction Date"
                value={transaction?.transactionDate ? dayjs(transaction.transactionDate).format('DD MMM YYYY') : null}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <DetailItem label="Currency" value={transaction?.currency} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <DetailItem label="Method" value={transaction?.method} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <DetailItem label="Reference Id" value={transaction?.referenceId} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <DetailItem label="Wallet Impact" value={transaction?.walletImpact ? 'Yes' : 'No'} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <DetailItem label="Transaction Id" value={transaction?.id} />
            </Grid>
          </Grid>

          <Box>
            <Typography fontSize={12} color="grey.600" textTransform="uppercase">
              Associations
            </Typography>
            {from ? (
              <Stack
                mt={1}
                direction={{ xs: 'column', sm: 'row' }}
                alignItems={{ xs: 'flex-start', sm: 'center' }}
                spacing={1.5}
              >
                <ProfilePicture
                  src={from.profileImage}
                  title={getUserName(from)}
                  summary={getUserSummary(from)}
                  id={from.id}
                  alt={getUserName(from)}
                  maxWidth={220}
                  onClick={() => router.push(`/profile/${from.id}`)}
                />
                {to && (
                  <>
                    <Box component="span" color="grey.500" display="inline-flex">
                      <IconArrowRight size={18} />
                    </Box>
                    <ProfilePicture
                      src={to.profileImage}
                      title={getUserName(to)}
                      summary={getUserSummary(to)}
                      id={to.id}
                      alt={getUserName(to)}
                      maxWidth={220}
                      onClick={() => router.push(`/profile/${to.id}`)}
                    />
                  </>
                )}
              </Stack>
            ) : (
              <Typography fontSize={14} fontWeight={600}>
                Historical record
              </Typography>
            )}
          </Box>

          <Box>
            <Typography fontSize={12} color="grey.600" textTransform="uppercase">
              Description
            </Typography>
            <Typography fontSize={14} color="grey.800" sx={{ whiteSpace: 'pre-wrap' }}>
              {transaction?.description || '--'}
            </Typography>
          </Box>

          <Box>
            <Typography fontSize={12} color="grey.600" textTransform="uppercase" mb={1}>
              Attachments
            </Typography>
            {attachments.length ? (
              <Stack spacing={1}>
                {attachments.map((attachment: any) => (
                  <Box
                    key={attachment.id}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    gap={2}
                    sx={{ border: '1px solid', borderColor: 'grey.300', borderRadius: 1, p: 1.25 }}
                  >
                    <Stack direction="row" spacing={1} alignItems="center" minWidth={0}>
                      <Box component="span" sx={{ display: 'inline-flex', color: 'primary.main' }}>
                        <IconPaperclip size={18} />
                      </Box>
                      <Box minWidth={0}>
                        <Typography fontSize={14} fontWeight={700} noWrap>
                          {attachment.originalFilename}
                        </Typography>
                        <Typography fontSize={12} color="grey.600">
                          {attachment.mimeType}
                        </Typography>
                      </Box>
                    </Stack>
                    <Button
                      variant="outlined"
                      title="View"
                      startIcon={<IconExternalLink size={16} />}
                      onClick={() => openAttachment(attachment.id)}
                    />
                  </Box>
                ))}
              </Stack>
            ) : (
              <Typography fontSize={14} color="grey.700">
                No attachment uploaded.
              </Typography>
            )}
          </Box>
        </Stack>
      </Box>
    </Dialog>
  );
};

const TransactionsTable = () => {
  const [selectedTransaction, setSelectedTransaction] = React.useState<any | null>(null);
  const { rows, loading, columns, rowCount, paginationModel, onPaginationModelChange } = useTransactionsTable();

  const handleRowClick = React.useCallback((params: GridRowParams) => {
    if (params.row?.loading) return;
    setSelectedTransaction(params.row);
  }, []);

  return (
    <>
      <DataGrid
        // height={tableHeight}

        rows={rows || []}
        columns={columns}
        rowCount={rowCount}
        // initialState={{
        //   pagination: {
        //     paginationModel: { pageSize: 100, page: 0 },
        //   },
        // }}
        pageSizeOptions={[10, 20, 50, 100]}
        paginationModel={paginationModel}
        rowSelection={false}
        pagination
        paginationMode="server"
        onPaginationModelChange={onPaginationModelChange}
        onRowClick={handleRowClick}
      />
      {selectedTransaction && (
        <TransactionDetailsDialog transaction={selectedTransaction} onClose={() => setSelectedTransaction(null)} />
      )}
    </>
  );
};

export default TransactionsTable;
