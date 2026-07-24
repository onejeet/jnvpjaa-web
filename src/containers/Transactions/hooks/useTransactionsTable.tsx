'use client';

import { commonTableColumnProps } from '@/constants/General.contants';
import Box from '@mui/material/Box';
import { GridPaginationModel, GridRowParams } from '@mui/x-data-grid';
import React from 'react';
import { useQuery } from '@apollo/client';
import { Skeleton, Typography } from '@mui/material';

import dayjs from 'dayjs';
import { formatCurrency, valueToLabelFormatter } from '@/utils/helpers';
import ProfilePicture from '@/components/common/ProfilePicture';
import { IconArrowDown, IconArrowUp } from '@tabler/icons-react';
import { GET_ASSOCIATION_TRANSACTIONS } from '@/apollo/billingOperations';

const useTransactionsTable = () => {
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
              <Typography variant="body1">{row?.title || '--'}</Typography>
            </Box>
          ),
      },
      {
        field: 'type',
        headerName: 'Type',
        width: 150,
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
              sx={{
                svg: {
                  color: row?.type === 'DEBIT' ? 'error.main' : 'success.main',
                },
              }}
            >
              {row?.type === 'DEBIT' ? <IconArrowDown size={16} /> : <IconArrowUp size={16} />}
              <Typography variant="h5" color={row?.type === 'DEBIT' ? 'error.main' : 'success.main'} ml={0.5}>
                {row?.type || ''}
              </Typography>
            </Box>
          ),
      },
      {
        field: 'billingCategory',
        headerName: 'Category',
        width: 190,
        ...commonTableColumnProps,
        sortable: true,
        renderCell: ({ row }: GridRowParams) =>
          row.loading ? (
            <Box width="100%" height="100%" display="flex" alignItems="center">
              <Skeleton width="100%" height={30} />
            </Box>
          ) : (
            <Box height="100%" display="flex" alignItems="center">
              <Typography variant="body2">{valueToLabelFormatter(row?.billingCategory || 'OTHER_ACTIVITY')}</Typography>
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
            >
              <Typography variant="h5">{`${formatCurrency(row?.amount)}` || ''}</Typography>
            </Box>
          ),
      },
      {
        field: 'user',
        headerName: 'Recorded By',
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
              {row?.recordedBy ? (
                <ProfilePicture
                  loading={row.loading}
                  src={row?.recordedBy?.profileImage}
                  title={`${row.recordedBy.firstName} ${row?.recordedBy?.lastName}`}
                  summary={row?.recordedBy?.batch === 0 ? 'Faculty' : `Batch of ${row?.recordedBy?.batch}`}
                  id={row?.recordedBy?.id}
                  alt={`${row?.recordedBy?.firstName || ''} ${row?.recordedBy?.lastName || ''}`}
                  titleComponentProps={{
                    titleContainerProps: {
                      className: 'title-container',
                    },
                  }}
                />
              ) : (
                <Typography variant="body2" color="grey.600">
                  Historical record
                </Typography>
              )}
            </Box>
          ),
      },
    ];

    setColumns(columns);
  }, []);

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
