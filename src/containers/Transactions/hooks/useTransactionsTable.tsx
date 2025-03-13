import { commonTableColumnProps } from '@/constants/General.contants';
import Box from '@mui/material/Box';
import { GridPaginationModel, GridRowParams } from '@mui/x-data-grid';
import React from 'react';
import { useGetTransactionsQuery } from '@/apollo/hooks';
import { Skeleton, Typography } from '@mui/material';
import { useRouter } from 'next/router';

import { useSearchParams } from 'next/navigation';

import { useAlert } from '@/context/AlertContext';
import { useApolloClient } from '@apollo/client';
import { useAuth } from '@/context/AuthContext';

import dayjs from 'dayjs';
import { formatCurrency, getCurrencySymbol } from '@/utils/helpers';
import ProfilePicture from '@/components/common/ProfilePicture';
import VerifiedBadge from '@/components/common/FacultyBadge';
import { ArrowDown, ArrowUp } from '@phosphor-icons/react';

const useTransactionsTable = () => {
  const client = useApolloClient();
  const { isAdmin, user } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [columns, setColumns] = React.useState<any[]>([]);
  const [paginationModel, setPaginationModel] = React.useState<GridPaginationModel>({
    page: 0,
    pageSize: 50,
  });

  const { showAlert } = useAlert();

  const { data: transactionsData, loading } = useGetTransactionsQuery({
    variables: {
      options: {
        offset: paginationModel?.page || 0,
        limit: paginationModel?.pageSize || 10,
      },
    },
    notifyOnNetworkStatusChange: true,
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
              <Typography variant="body1">{row?.title || ''}</Typography>
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
              {row?.type === 'DEBIT' ? <ArrowDown size={16} weight="bold" /> : <ArrowUp size={16} weight="bold" />}
              <Typography variant="h5" color={row?.type === 'DEBIT' ? 'error.main' : 'success.main'} ml={0.5}>
                {row?.type || ''}
              </Typography>
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
        headerName: 'Added By',
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
              <ProfilePicture
                loading={row.loading}
                src={row?.user?.profileImage}
                title={`${row.user.firstName} ${row?.user?.lastName}`}
                summary={row?.user?.batch === 0 ? 'Faculty' : `Batch of ${row?.user?.batch}`}
                id={row?.user?.id}
                alt={`${row?.user?.firstname || ''} ${row?.user?.lastname || ''}`}
                titleComponentProps={{
                  titleContainerProps: {
                    className: 'title-container',
                  },
                }}

                // titleProps={{
                //   fontSize: '14px',
                //   lineHeight: '16.41px',
                //   bgcolor: 'none',
                // }}
              />
            </Box>
          ),
      },
    ];

    setColumns(columns);
  }, [isAdmin, user]);

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
    return transactionsData?.getTransactions?.data || [];
  }, [loading, transactionsData, paginationModel]);

  console.log('ZZ: rows', rows);
  return {
    rows,
    loading,
    columns,
    rowCount: transactionsData?.getTransactions?.total || 0,
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
