import { commonTableColumnProps } from '@/constants/General.contants';
import { formatPhoneNumber, getDefaultAvatar } from '@/utils/helpers';
import Box from '@mui/material/Box';
import { GridRowParams } from '@mui/x-data-grid';
import React from 'react';

import ProfilePicture from '@/components/common/ProfilePicture';
import { useGetAllBatchCoordinatorsQuery } from '@/apollo/hooks';
import { Skeleton, Typography } from '@mui/material';
import VerifiedBadge from '@/components/common/VerifiedBadge';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

const useBatchCoordinators = () => {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [columns, setColumns] = React.useState<any[]>([]);
  const [searchQuery, setSearchQuery] = React.useState<string>('');

  const { data: coordinators, loading } = useGetAllBatchCoordinatorsQuery({
    variables: {
      options: {
        filter: {
          verified: searchParams?.get('verified') ? searchParams?.get('verified') === 'true' : undefined,
          query: searchParams.get('q') || '',
          batch: searchParams?.get('batch') ? parseInt(searchParams.get('batch') || '', 10) : undefined,
        },
      },
    },
    notifyOnNetworkStatusChange: true,
  });

  //   const [state, dispatch] = useImmerReducer(reducer, initialState);
  //   const { replace, query, pathname } = useRouter();

  React.useEffect(() => {
    const columns = [
      {
        field: 'name',
        headerName: 'COORDINATOR',
        width: 250,
        flex: 1,
        ...commonTableColumnProps,
        sortable: true,
        renderCell: ({ row }: GridRowParams) => (
          <Box
            display="flex"
            alignItems="center"
            height="100%"
            sx={{
              cursor: row?.loading || !user?.id ? 'default' : 'pointer',
              '&:hover .title-container': {
                transition: 'color 0.2s ease',
                color: 'primary.main',
              },
            }}
            onClick={() => (row?.loading || !user?.id ? () => null : router.push(`/profile/${row?.user?.id}`))}
          >
            <ProfilePicture
              loading={row.loading}
              id={row?.id}
              src={row?.user?.profileImage || getDefaultAvatar(row?.user?.gender)}
              title={
                <Box display="flex" alignItems="center">
                  <Typography mr={0.5}>{`${row?.user?.firstName} ${row?.user?.lastName}`}</Typography>
                  {row?.user?.isVerified && <VerifiedBadge isPrivate={row?.user?.isConfidential} />}
                </Box>
              }
              summary={`Batch of ${row.user.batch}`}
              alt={`${row?.user?.firstname || ''} ${row?.user?.lastname || ''}`}
              titleComponentProps={{
                titleContainerProps: {
                  className: 'title-container',
                },
              }}
              // titleComponentProps={{
              //   titleProps: {
              //     fontSize: '14px',
              //     lineHeight: '16.41px',
              //     bgcolor: 'none',
              //   },
              // }}
            />
          </Box>
        ),
      },
      {
        field: 'batch',
        headerName: 'BATCH (PASSOUT YEAR)',
        width: 200,
        ...commonTableColumnProps,
        sortable: true,
        renderCell: ({ row }: GridRowParams) =>
          row.loading ? (
            <Box height="100%" display="flex" alignItems="center">
              <Skeleton width="100%" height={30} />
            </Box>
          ) : (
            row?.user?.batch || ''
          ),
      },
      {
        field: 'email',
        headerName: 'EMAIL',
        minWidth: 250,
        ...commonTableColumnProps,
        sortable: true,
        renderCell: ({ row }: GridRowParams) =>
          row.loading ? (
            <Box width="100%" height="100%" display="flex" alignItems="center">
              {' '}
              <Skeleton width="100%" height={30} />
            </Box>
          ) : (
            row?.user?.email || ''
          ),
      },
      {
        field: 'mobile',
        headerName: 'Mobile',
        minWidth: 150,
        ...commonTableColumnProps,
        sortable: true,
        renderCell: ({ row }: GridRowParams) =>
          row.loading ? (
            <Box height="100%" display="flex" alignItems="center">
              <Skeleton width="100%" height={30} />
            </Box>
          ) : (
            formatPhoneNumber(row?.user?.mobile)?.international
          ),
      },
      {
        field: 'whatsappMobile',
        headerName: 'WhatsApp Number',
        width: 150,
        ...commonTableColumnProps,
        sortable: true,
        renderCell: ({ row }: GridRowParams) =>
          row.loading ? (
            <Box height="100%" display="flex" alignItems="center">
              <Skeleton width="100%" height={30} />
            </Box>
          ) : (
            formatPhoneNumber(row.whatsappMobile)?.international || '--'
          ),
      },
      {
        field: 'emergencyMobile',
        headerName: 'Emergency Contact',
        width: 150,
        ...commonTableColumnProps,
        sortable: true,
        renderCell: ({ row }: GridRowParams) =>
          row.loading ? (
            <Box height="100%" display="flex" alignItems="center">
              <Skeleton width="100%" height={30} />
            </Box>
          ) : (
            formatPhoneNumber(row.emergencyMobile)?.international || '--'
          ),
      },
      // {
      //   field: 'phone',
      //   headerName: 'Phone',
      //   ...commonTableColumnProps,
      //   sortable: true,
      //   width: 200,
      //   renderCell: (params: GridRowParams) => formatPhoneNumber(params?.row.user?.phone),
      // },
      // {
      //   field: 'user_type',
      //   headerName: 'User Type',
      //   sortable: true,
      //   ...commonTableColumnProps,
      //   width: 150,
      //   renderCell: (params: GridRowParams) => {
      //     if (params.row.user.user_group === 'Master') {
      //       return InvitedUserTypesWithValues.OWNER;
      //     }
      //     if (
      //       params.row.user.user_type &&
      //       InvitedUserTypesWithValues[params.row.user.user_type.toUpperCase() as InvitedUserTypes]
      //     ) {
      //       return InvitedUserTypesWithValues[params.row.user.user_type.toUpperCase() as InvitedUserTypes];
      //     }
      //     return params.row.user.metadata?.title;
      //   },
      // },

      // {
      //   field: 'actions',
      //   type: 'actions',
      //   headerName: '',
      //   // headerClassName: 'users-data-grid-header',
      //   align: 'right',
      //   sortbale: false,
      //   resizable: false,
      //   width: 100,
      //   minWidth: 100,
      //   // flex: 1,
      //   cellClassName: 'actions_cell',
      //   getActions: (params: GridRowParams) => getActionsList(params.row.user),
      // },
    ];

    setColumns(columns);
  }, []);

  const onSearch = React.useCallback((q: string) => {
    setSearchQuery(q);
  }, []);

  const rows = React.useMemo(() => {
    if (loading) {
      return new Array(50).fill({}).map((item, index) => {
        return {
          id: index,
          loading: true,
          user: {},
        };
      });
    }
    return coordinators?.getAllBatchCoordinators || [];
  }, [loading, coordinators]);

  return {
    rows,
    loading,
    // loading: usersListLoading || ViewSchemaLoading,
    // rows: usersListData,
    columns,
    // rowCount: total,
    onSearch,
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

export default useBatchCoordinators;
