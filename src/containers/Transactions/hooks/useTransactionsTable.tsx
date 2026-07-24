'use client';

import { commonTableColumnProps } from '@/constants/General.contants';
import Box from '@mui/material/Box';
import { GridPaginationModel, GridRowParams } from '@mui/x-data-grid';
import React from 'react';
import { useQuery } from '@apollo/client';
import { Skeleton, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import dayjs from 'dayjs';
import { formatCurrency } from '@/utils/helpers';
import ProfilePicture from '@/components/common/ProfilePicture';
import { IconArrowDown, IconArrowRight, IconArrowUp } from '@tabler/icons-react';
import { GET_ASSOCIATION_TRANSACTIONS } from '@/apollo/billingOperations';

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

const useTransactionsTable = () => {
  const router = useRouter();
  const [columns, setColumns] = React.useState<any[]>([]);
  const [paginationModel, setPaginationModel] = React.useState<GridPaginationModel>({
    page: 0,
    pageSize: 50,
  });

  const { data: transactionsData, loading } = useQuery(GET_ASSOCIATION_TRANSACTIONS, {
    variables: {
      options: {
        offset: (paginationModel?.page || 0) * (paginationModel?.pageSize || 10),
        limit: paginationModel?.pageSize || 10,
      },
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  });

  React.useEffect(() => {
    const columns = [
      {
        field: 'date',
        headerName: 'Date',
        width: 100,
        ...commonTableColumnProps,
        sortable: true,
        renderCell: ({ row }: GridRowParams) =>
          row.loading ? (
            <Box width="100%" height="100%" display="flex" alignItems="center">
              {' '}
              <Skeleton width="100%" height={30} />
            </Box>
          ) : (
            <Box height="100%" display="flex" flexDirection="column" justifyContent="center">
              <Box gap={0.5} textTransform="uppercase" textAlign="center" alignItems="center" display="flex">
                <Typography fontSize="0.7rem" variant="body2">
                  {dayjs(row?.transactionDate).format('MMM').toString()}
                </Typography>
                <Typography fontSize="0.9rem" variant="subtitle1">
                  {dayjs(row?.transactionDate).format('DD').toString()}
                </Typography>
              </Box>
              <Typography fontSize="1rem" variant="body2">
                {dayjs(row?.transactionDate).format('YYYY').toString()}
              </Typography>
            </Box>
          ),
      },
      {
        field: 'title',
        headerName: 'Title',
        width: 230,
        flex: 1,
        ...commonTableColumnProps,
        sortable: true,
        renderCell: ({ row }: GridRowParams) =>
          row.loading ? (
            <Box width="100%" height="100%" display="flex" alignItems="center">
              {' '}
              <Skeleton width="100%" height={30} />
            </Box>
          ) : (
            <Box height="100%" display="flex" alignItems="center">
              {row?.scholarshipApplicationId ? (
                <Typography
                  component={Link}
                  href={`/scholarships/${row.scholarshipApplicationId}`}
                  variant="body1"
                  color="primary.main"
                  sx={{
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                  onClick={(event) => event.stopPropagation()}
                >
                  {row?.title || '--'}
                </Typography>
              ) : (
                <Typography variant="body1">{row?.title || '--'}</Typography>
              )}
            </Box>
          ),
      },
      {
        field: 'amount',
        headerName: 'Amount',
        width: 150,
        flex: 1,
        ...commonTableColumnProps,
        sortable: true,
        renderCell: ({ row }: GridRowParams) =>
          row.loading ? (
            <Box width="100%" height="100%" display="flex" alignItems="center">
              {' '}
              <Skeleton width="100%" height={30} />
            </Box>
          ) : (
            <Box
              height="100%"
              display="flex"
              alignItems="center"
              color={row?.type === 'DEBIT' ? 'error.main' : 'success.main'}
              sx={{
                svg: {
                  color: row?.type === 'DEBIT' ? 'error.main' : 'success.main',
                },
              }}
            >
              {row?.type === 'DEBIT' ? <IconArrowDown size={16} /> : <IconArrowUp size={16} />}
              <Typography variant="h5" ml={0.5}>
                {`${formatCurrency(row?.amount)}` || ''}
              </Typography>
            </Box>
          ),
      },
      {
        field: 'user',
        headerName: 'Associations',
        width: 360,
        flex: 1,
        ...commonTableColumnProps,
        sortable: true,
        renderCell: ({ row }: GridRowParams) => {
          const { from, to } = getAssociationParticipants(row);

          return row.loading ? (
            <Box width="100%" height="100%" display="flex" alignItems="center">
              {' '}
              <Skeleton width="100%" height={30} />
            </Box>
          ) : (
            <Stack height="100%" direction="row" alignItems="center" spacing={1} minWidth={0}>
              {from ? (
                <Box minWidth={0}>
                  <ProfilePicture
                    loading={row.loading}
                    src={from.profileImage}
                    title={getUserName(from)}
                    summary={getUserSummary(from)}
                    id={from.id}
                    alt={getUserName(from)}
                    maxWidth={150}
                    containerProps={{
                      onClick: (event) => {
                        event.stopPropagation();
                        router.push(`/profile/${from.id}`);
                      },
                    }}
                    titleComponentProps={{
                      titleContainerProps: {
                        className: 'title-container',
                      },
                      titleProps: {
                        noWrap: true,
                      },
                    }}
                  />
                </Box>
              ) : (
                <Typography variant="body2" color="grey.600">
                  Historical record
                </Typography>
              )}
              {to && (
                <>
                  <Box component="span" color="grey.500" display="inline-flex" flexShrink={0}>
                    <IconArrowRight size={16} />
                  </Box>
                  <Box minWidth={0}>
                    <ProfilePicture
                      loading={row.loading}
                      src={to.profileImage}
                      title={getUserName(to)}
                      summary={getUserSummary(to)}
                      id={to.id}
                      alt={getUserName(to)}
                      maxWidth={150}
                      containerProps={{
                        onClick: (event) => {
                          event.stopPropagation();
                          router.push(`/profile/${to.id}`);
                        },
                      }}
                      titleComponentProps={{
                        titleContainerProps: {
                          className: 'title-container',
                        },
                        titleProps: {
                          noWrap: true,
                        },
                      }}
                    />
                  </Box>
                </>
              )}
            </Stack>
          );
        },
      },
    ];

    setColumns(columns);
  }, [router]);

  const onPaginationModelChange = React.useCallback((model: GridPaginationModel) => {
    setPaginationModel(model);
  }, []);

  const rows = React.useMemo(() => {
    if (loading) {
      return new Array(paginationModel.pageSize).fill({}).map((item, index) => {
        return {
          id: index,
          loading: true,
        };
      });
    }
    return transactionsData?.getAssociationTransactions?.data || [];
  }, [loading, transactionsData, paginationModel]);

  return {
    rows,
    loading,
    columns,
    rowCount: transactionsData?.getAssociationTransactions?.total || 0,
    paginationModel,
    onPaginationModelChange,
    // state,
    // users,
    // loadingUsers,
    // onSortModelChange,
    // onPageSizeChange,
    // onPageChange,
    // onColumnResize,
    // sortModel: state?.sort_data.map((item: any) => ({
    //   field: item.key,
    //   sort: item.value,
    // })),
    // userToDisable,
    // replaceUserId,
    // setReplaceUserId,
    // onDialogClose,
    // handleResourceTransfer,
    // transferringResource,
  };
};

export default useTransactionsTable;
