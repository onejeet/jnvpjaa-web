'use client';

import { commonTableColumnProps } from '@/constants/General.contants';
import { formatPhoneNumber, getDefaultAvatar } from '@/utils/helpers';
import Box from '@mui/material/Box';
import { GridRowParams } from '@mui/x-data-grid';
import React from 'react';

import ProfilePicture from '@/components/common/ProfilePicture';
import { Skeleton, Typography } from '@mui/material';
import VerifiedBadge from '@/components/common/VerifiedBadge';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { BatchCoordinatorRoleAssignment } from '@/types/access';

const useBatchCoordinators = (coordinators?: BatchCoordinatorRoleAssignment[]) => {
  const { user } = useAuth();
  const router = useRouter();
  const [columns, setColumns] = React.useState<any[]>([]);
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const loading = false;
  React.useEffect(() => {
    const columns: any[] = [
      {
        field: 'name',
        headerName: 'COORDINATOR',
        width: 250,
        minWidth: 250,
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
                  {row?.user?.isVerified && <VerifiedBadge />}
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
          ) : user?.id ? (
            row?.user?.email || ''
          ) : (
            <Typography
              display="flex"
              alignItems="center"
              height="100%"
              color="grey.600"
              variant="body2"
              fontWeight={400}
            >
              login to view
            </Typography>
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
          ) : user?.id ? (
            formatPhoneNumber(row?.user?.mobile)?.international
          ) : (
            <Typography
              display="flex"
              alignItems="center"
              height="100%"
              color="grey.600"
              variant="body2"
              fontWeight={400}
            >
              login to view
            </Typography>
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
          ) : user?.id ? (
            formatPhoneNumber(row?.user?.whatsAppMobile)?.international || '--'
          ) : (
            <Typography
              display="flex"
              alignItems="center"
              height="100%"
              color="grey.600"
              variant="body2"
              fontWeight={400}
            >
              login to view
            </Typography>
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
          ) : user?.id ? (
            formatPhoneNumber(row?.user?.emergencyMobile)?.international || '--'
          ) : (
            <Typography
              display="flex"
              alignItems="center"
              height="100%"
              color="grey.600"
              variant="body2"
              fontWeight={400}
            >
              login to view
            </Typography>
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
    ];

    setColumns(columns);
  }, [router, user]);

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
    return coordinators || [];
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
