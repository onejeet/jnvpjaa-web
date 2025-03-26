import { commonTableColumnProps } from '@/constants/General.contants';
import Box from '@mui/material/Box';
import { GridPaginationModel, GridRowParams } from '@mui/x-data-grid';
import React from 'react';
import ProfilePicture from '@/components/common/ProfilePicture';
import { useGetUserListQuery, useVerifyUserMutation } from '@/apollo/hooks';
import { Chip, Skeleton, Typography } from '@mui/material';
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
import FacultyBadge from '@/components/common/FacultyBadge';

const useMembersTable = () => {
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
        field: 'name',
        headerName: 'Alumni',
        width: 300,
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
                color: user?.id ? 'primary.main' : 'inherit',
              },
            }}
            onClick={() => (row?.loading || !user?.id ? () => null : router.push(`/profile/${row?.id}`))}
          >
            <ProfilePicture
              loading={row.loading}
              src={row.profileImage}
              title={
                <Box display="flex" alignItems="center">
                  <Typography mr={0.5}>{`${row.firstName} ${row.lastName}`}</Typography>
                  {row.isVerified && <VerifiedBadge />}
                  {row.batch === 0 && <FacultyBadge />}
                </Box>
              }
              summary={row?.batch === 0 ? 'Faculty' : `Batch of ${row?.batch}`}
              id={row.id}
              alt={`${row.firstname || ''} ${row.lastname || ''}`}
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
      {
        field: 'email',
        headerName: 'Email',
        width: 200,
        ...commonTableColumnProps,
        sortable: true,
        renderCell: ({ row }: GridRowParams) =>
          row.loading ? (
            <Box width="100%" height="100%" display="flex" alignItems="center">
              {' '}
              <Skeleton width="100%" height={30} />
            </Box>
          ) : (
            row?.email || ''
          ),
      },
      {
        field: 'batch',
        headerName: 'Batch',
        width: 100,
        ...commonTableColumnProps,
        sortable: true,
        renderCell: ({ row }: GridRowParams) =>
          row.loading ? (
            <Box height="100%" display="flex" alignItems="center">
              <Skeleton width="100%" height={30} />
            </Box>
          ) : row?.batch >= 0 ? (
            <Chip label={row?.batch === 0 ? 'Faculty' : row?.batch} sx={{ fontWeight: 500 }} />
          ) : (
            ''
          ),
      },
      {
        field: 'mobile',
        headerName: 'Mobile',
        width: 150,
        ...commonTableColumnProps,
        sortable: true,
        renderCell: ({ row }: GridRowParams) =>
          row.loading ? (
            <Box height="100%" display="flex" alignItems="center">
              <Skeleton width="100%" height={30} />
            </Box>
          ) : (
            formatPhoneNumber(row.mobile)?.international
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
    ];

    if (isAdmin) {
      columns.push({
        field: 'actions',
        // @ts-expect-error type error
        type: 'actions',
        headerName: '',
        // headerClassName: 'users-data-grid-header',
        align: 'right',
        sortable: false,
        resizable: false,
        width: 250,
        // flex: 1,
        getActions: ({ row }: GridRowParams) =>
          row.loading
            ? [
                <Box width="100%" height="100%" display="flex" alignItems="center" key="loading-action">
                  <Skeleton width="100%" height={30} />
                </Box>,
              ]
            : row?.isVerified || !isAdmin
              ? []
              : [
                  <Box display="flex" key="buttons" gap={2}>
                    {' '}
                    <Button
                      title="Approve"
                      size="small"
                      startIcon={<TaskAltIcon />}
                      color="success"
                      onClick={() => {
                        showAlert(
                          {
                            visible: true,
                            type: 'loading',
                            message: '',
                            open: true,
                            action: 'approve',
                            onOkay: () => {
                              showAlert({
                                visible: true,
                                type: 'loading',
                                message: 'Approval is in progress...',
                              });
                              handleUserVerification({
                                variables: {
                                  user_id: row.id,
                                  verified: true,
                                },
                                onCompleted: () => {
                                  showAlert({
                                    visible: true,
                                    type: 'success',
                                    message: `${row?.firstName || ''} ${row?.lastName || ''} is approved. `,
                                  });
                                  client.refetchQueries({
                                    include: ['getUserList'],
                                  });
                                },
                              });
                            },
                          },
                          true
                        );
                      }}
                    />
                    <Button
                      title="Reject"
                      size="small"
                      startIcon={<CloseIcon />}
                      onClick={() => {
                        showAlert(
                          {
                            visible: true,
                            type: 'error',
                            message: '',
                            open: true,
                            action: 'reject',
                            onOkay: () => {
                              showAlert({
                                visible: true,
                                type: 'loading',
                                message: 'Rejection is in progress...',
                              });
                              handleUserVerification({
                                variables: {
                                  user_id: row.id,
                                  verified: false,
                                },
                                onCompleted: () => {
                                  showAlert({
                                    visible: true,
                                    type: 'success',
                                    message: `${row?.firstName || ''} ${row?.lastName || ''} is rejected. `,
                                  });
                                  client.refetchQueries({
                                    include: ['getUserList'],
                                  });
                                },
                              });
                            },
                          },
                          true
                        );
                      }}
                    />
                  </Box>,
                ],
      });
    }

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

export default useMembersTable;
