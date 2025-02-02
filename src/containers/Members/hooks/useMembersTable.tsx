import { commonTableColumnProps } from '@/constants/General.contants';
import Box from '@mui/material/Box';
import { GridRowParams } from '@mui/x-data-grid';
import React from 'react';
import ProfilePicture from '@/components/common/ProfilePicture';
import { useGetUserListQuery, useVerifyUserMutation } from '@/apollo/hooks';
import { Typography } from '@mui/material';
import { useRouter } from 'next/router';
import VerifiedBadge from '@/components/common/VerifiedBadge';
import { formatPhoneNumber } from '@/utils/helpers';
import { useSearchParams } from 'next/navigation';
import Button from '@/components/core/Button';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CloseIcon from '@mui/icons-material/Close';
import { useAlert } from '@/context/AlertContext';
import { useApolloClient } from '@apollo/client';

const useMembersTable = () => {
  const [columns, setColumns] = React.useState<any[]>([]);
  const [page, setPage] = React.useState<number>(0);
  const [pageSize, setPageSize] = React.useState<number>(20);
  const router = useRouter();
  const client = useApolloClient();
  const searchParams = useSearchParams();

  const { showAlert } = useAlert();
  const [handleUserVerification] = useVerifyUserMutation();

  const { data: userListData, loading } = useGetUserListQuery({
    variables: {
      options: {
        filter: {
          verified: searchParams?.get('verified') ? searchParams?.get('verified') === 'true' : undefined,
          query: searchParams.get('q') || '',
        },
        offset: page || 0,
        limit: pageSize || 10,
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
        headerName: 'Alumni',
        width: 250,
        ...commonTableColumnProps,
        sortable: true,
        renderCell: ({ row }: GridRowParams) => (
          <Box
            display="flex"
            alignItems="center"
            height="100%"
            sx={{
              cursor: 'pointer',
              '&:hover .title-container': {
                transition: 'color 0.2s ease',
                color: 'primary.main',
              },
            }}
            onClick={() => router.push(`/profile/${row.id}`)}
          >
            <ProfilePicture
              src={row.profileImage}
              title={
                <Box display="flex" alignItems="center">
                  <Typography mr={0.5}>{`${row.firstName} ${row.lastName}`}</Typography>
                  {row.isVerified && <VerifiedBadge />}
                </Box>
              }
              summary={`Batch of ${row.batch}`}
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
      },
      {
        field: 'batch',
        headerName: 'Batch',
        width: 100,
        ...commonTableColumnProps,
        sortable: true,
      },
      {
        field: 'mobile',
        headerName: 'Mobile',
        minWidth: 270,
        flex: 1,
        ...commonTableColumnProps,
        sortable: true,
        renderCell: ({ row }: GridRowParams) => formatPhoneNumber(row.mobile),
      },
      {
        field: 'actions',
        type: 'actions',
        headerName: '',
        // headerClassName: 'users-data-grid-header',
        align: 'right',
        sortbale: false,
        resizable: false,
        width: 250,
        minWidth: 100,
        // flex: 1,
        cellClassName: 'actions_cell',
        getActions: ({ row }: GridRowParams) =>
          row?.isVerified
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
                        },
                        true,
                        {
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
                        }
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
                        },
                        true,
                        {
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
                        }
                      );
                    }}
                  />
                </Box>,
              ],
      },
    ];

    setColumns(columns);
  }, []);

  // const rows = React.useMemo(() => {
  //   if (!searchQuery) return PAST_PRESIDENTS;
  //   PAST_PRESIDENTS?.filter(
  //     (coord: Record<string, any>) => coord.name?.includes(searchQuery) || coord?.batch?.includes(searchQuery)
  //   );
  // }, [searchQuery]);

  const onPageSizeChange = React.useCallback((size: number) => {
    console.log('SIZEE', size);
    setPageSize(size);
    setPage(0);
  }, []);

  const onPageChange = React.useCallback((page: number) => {
    setPage(page);
  }, []);

  return {
    rows: userListData?.getUserList?.data || [],
    loading,
    columns,
    rowCount: userListData?.getUserList?.total || 0,
    page,
    pageSize,
    onPageChange,
    onPageSizeChange,
    // onSearch,
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
