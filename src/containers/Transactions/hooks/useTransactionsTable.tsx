import { commonTableColumnProps } from '@/constants/General.contants';
import Box from '@mui/material/Box';
import { GridPaginationModel, GridRowParams } from '@mui/x-data-grid';
import React from 'react';
import ProfilePicture from '@/components/common/ProfilePicture';
import { useGetUserListQuery, useVerifyUserMutation } from '@/apollo/hooks';
import { Chip, Skeleton, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import VerifiedBadge from '@/components/common/VerifiedBadge';
import { formatPhoneNumber } from '@/utils/helpers';
import { useSearchParams } from 'next/navigation';
import Button from '@/components/core/Button';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CloseIcon from '@mui/icons-material/Close';
import { useAlert } from '@/context/AlertContext';
import { useApolloClient } from '@apollo/client';
import { useAuth } from '@/context/AuthContext';
import { StarFour } from '@phosphor-icons/react';
import FacultyBadge from '@/components/common/FacultyBadge/FacultyBadge';
import dayjs from 'dayjs';

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
  console.log('ZZ: SWARCH PARAMS', searchParams?.get('batch'));

  const { showAlert } = useAlert();
  const [handleUserVerification] = useVerifyUserMutation();

  const { data: userListData, loading } = useGetUserListQuery({
    variables: {
      options: {
        filter: {
          verified: searchParams?.get('verified') ? searchParams?.get('verified') === 'true' : undefined,
          query: searchParams.get('q') || '',
          batch: searchParams?.get('batch') ? parseInt(searchParams.get('batch') || '', 10) : undefined,
        },
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
            <Box mt={0.5} wheight="100%" display="flex" flexDirection="column" justifyContent="center">
              <Box gap={0.5} textTransform="uppercase" textAlign="center" alignItems="center" display="flex">
                <Typography fontSize="0.7rem" variant="body2">
                  {dayjs(row?.createdAt).format('MMM').toString()}
                </Typography>
                <Typography fontSize="0.9rem" variant="subtitle1">
                  {dayjs(row?.createdAt).format('DD').toString()}
                </Typography>
              </Box>
              <Typography fontSize="1rem" variant="body2">
                {dayjs(row?.createdAt).format('YYYY').toString()}
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
            row?.title || ''
          ),
      },
    ];

    setColumns(columns);
  }, [isAdmin, user, handleUserVerification]);

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
    return userListData?.getUserList?.data || [];
  }, [loading, userListData, paginationModel]);

  console.log('ZZ: rows', rows);
  return {
    rows,
    loading,
    columns,
    rowCount: userListData?.getUserList?.total || 0,
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
