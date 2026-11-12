'use client';

import { commonTableColumnProps } from '@/constants/General.contants';
import Box from '@mui/material/Box';
import { GridPaginationModel, GridRowParams } from '@mui/x-data-grid';
import React from 'react';
import ProfilePicture from '@/components/common/ProfilePicture';
import { useGetUserListQuery, useVerifyUserMutation } from '@/apollo/hooks';
import { Chip, Skeleton, Typography } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import VerifiedBadge from '@/components/common/VerifiedBadge';
import { formatPhoneNumber } from '@/utils/helpers';
import { useSearchParams } from 'next/navigation';
import Button from '@/components/core/Button';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CloseIcon from '@mui/icons-material/Close';
import { useAlert } from '@/context/AlertContext';
import { useApolloClient, useMutation } from '@apollo/client';
import { useAuth } from '@/context/AuthContext';
import { IconCircleCheck, IconStar } from '@tabler/icons-react';
import FacultyBadge from '@/components/common/FacultyBadge';
import { PERMISSION_CODES, ROLE_CODES } from '@/constants/access';
import { REMOVE_MEMBER, SET_MEMBER_DISABLED } from '@/apollo/memberOperations';
import BlockIcon from '@mui/icons-material/Block';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const useMembersTable = () => {
  const client = useApolloClient();
  const { isAdmin, user, can, canForBatch, hasRole } = useAuth();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [columns, setColumns] = React.useState<any[]>([]);
  const [paginationModel, setPaginationModel] = React.useState<GridPaginationModel>({
    page: 0,
    pageSize: 50,
  });
  console.log('ZZ: SWARCH PARAMS', searchParams?.get('batch'));

  const { showAlert } = useAlert();
  const [handleUserVerification] = useVerifyUserMutation();
  const [setMemberDisabled, { loading: changingMemberStatus }] = useMutation(SET_MEMBER_DISABLED);
  const [removeMember, { loading: removingMember }] = useMutation(REMOVE_MEMBER);
  const isSuperAdmin = hasRole(ROLE_CODES.SUPER_ADMIN);
  const canApproveRegistrations = can(PERMISSION_CODES.MEMBERSHIP_REGISTRATION_APPROVE);
  const canApproveBatchRegistrations = can(PERMISSION_CODES.MEMBERSHIP_REGISTRATION_APPROVE_BATCH);
  const canManagePendingRegistrations = canApproveRegistrations || canApproveBatchRegistrations;
  const verifiedFilter = React.useMemo(() => {
    if (!canManagePendingRegistrations || !searchParams?.get('verified')) {
      return undefined;
    }

    return searchParams.get('verified') === 'true';
  }, [canManagePendingRegistrations, searchParams]);

  const {
    data: userListData,
    loading,
    refetch,
  } = useGetUserListQuery({
    variables: {
      options: {
        filter: {
          verified: verifiedFilter,
          query: searchParams.get('q') || '',
          batch: searchParams?.get('batch') ? parseInt(searchParams.get('batch') || '', 10) : undefined,
        },
        offset: (paginationModel?.page || 0) * (paginationModel?.pageSize || 50),
        limit: paginationModel?.pageSize || 10,
      },
    },
    notifyOnNetworkStatusChange: true,
  });

  const manageMember = React.useCallback(
    (row: any, action: 'disable' | 'enable' | 'remove') => {
      const name = `${row.firstName || ''} ${row.lastName || ''}`.trim();
      const isRemoval = action === 'remove';
      showAlert(
        {
          visible: true,
          type: isRemoval ? 'error' : 'custom',
          action: isRemoval ? 'delete' : 'update',
          title: `${isRemoval ? 'Remove' : action === 'disable' ? 'Disable' : 'Enable'} ${name}?`,
          message: isRemoval
            ? 'This removes their access and directory listing. Their posts and audit history will remain.'
            : action === 'disable'
              ? 'They will lose access immediately. A Super Admin can enable the account later.'
              : 'They will be able to sign in again.',
          okayButtonProps: { title: isRemoval ? 'Remove member' : action === 'disable' ? 'Disable' : 'Enable' },
          onOkay: async () => {
            showAlert({ visible: true, type: 'loading', action: 'loading', message: 'Updating member...' }, true);
            try {
              if (isRemoval) {
                await removeMember({ variables: { id: row.id } });
              } else {
                await setMemberDisabled({ variables: { id: row.id, disabled: action === 'disable' } });
              }
              await refetch();
              showAlert(
                {
                  visible: true,
                  type: 'success',
                  action: 'success',
                  message: `${name} ${isRemoval ? 'was removed' : action === 'disable' ? 'was disabled' : 'was enabled'}.`,
                },
                true
              );
            } catch (error: any) {
              showAlert(
                {
                  visible: true,
                  type: 'error',
                  action: 'error',
                  message: error?.message || 'Could not update this member.',
                },
                true
              );
            }
          },
        },
        true
      );
    },
    [refetch, removeMember, setMemberDisabled, showAlert]
  );

  React.useEffect(() => {
    const columns = [
      {
        field: 'name',
        headerName: 'Alumni',
        width: 400,
        minWidth: 300,
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
                  {row.isVerified && <VerifiedBadge isPrivate={row?.isConfidential} />}
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

    if (isSuperAdmin) {
      columns.push({
        field: 'accountStatus',
        headerName: 'Status',
        width: 120,
        ...commonTableColumnProps,
        renderCell: ({ row }: GridRowParams) =>
          row.loading ? (
            <Skeleton width={90} />
          ) : (
            <Chip
              label={!row.isVerified ? 'Pending' : row.disabled ? 'Disabled' : 'Active'}
              color={!row.isVerified ? 'default' : row.disabled ? 'warning' : 'success'}
              size="small"
              sx={{ fontWeight: 600 }}
            />
          ),
      });
      columns.push({
        field: 'memberManagement',
        // @ts-expect-error MUI DataGrid action column typing
        type: 'actions',
        headerName: 'Manage',
        width: 260,
        sortable: false,
        resizable: false,
        getActions: ({ row }: GridRowParams) => {
          const ordinaryMember = row.role?.code === ROLE_CODES.MEMBER || row.role?.name?.toLowerCase() === 'member';
          if (row.loading || !row.isVerified || row.id === user?.id || !ordinaryMember) return [];
          return [
            <Box key={`manage-${row.id}`} display="flex" gap={1}>
              <Button
                title={row.disabled ? 'Enable' : 'Disable'}
                size="small"
                disabled={changingMemberStatus || removingMember}
                startIcon={row.disabled ? <CheckCircleOutlineIcon fontSize="small" /> : <BlockIcon fontSize="small" />}
                onClick={() => manageMember(row, row.disabled ? 'enable' : 'disable')}
              />
              <Button
                title="Remove"
                size="small"
                color="error"
                disabled={changingMemberStatus || removingMember}
                startIcon={<DeleteOutlineIcon fontSize="small" />}
                onClick={() => manageMember(row, 'remove')}
              />
            </Box>,
          ];
        },
      });
    }

    if (canManagePendingRegistrations) {
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
            : row?.isVerified ||
                !(
                  canApproveRegistrations ||
                  canForBatch(PERMISSION_CODES.MEMBERSHIP_REGISTRATION_APPROVE_BATCH, row?.batch)
                )
              ? []
              : [
                  <Box display="flex" key="buttons" gap={2}>
                    {' '}
                    <Button
                      title="Approve"
                      size="small"
                      startIcon={<IconCircleCheck size={18} />}
                      color="success"
                      onClick={() => {
                        showAlert(
                          {
                            visible: true,
                            title: `Approve ${row.firstName || ''}?`,
                            type: 'loading',
                            message: `Once the user ${row.firstName || ''} from batch ${row.batch} is approved, will be able to access alumni portal.`,
                            action: 'approve',
                            okayButtonProps: {
                              title: `Approve`,
                            },
                            onOkay: () => {
                              showAlert(
                                {
                                  visible: true,
                                  //  title: 'Are you Going?',
                                  type: 'loading',
                                  message: 'Please Wait, The status is being updated.',
                                  action: 'loading',
                                },
                                true
                              );
                              handleUserVerification({
                                variables: {
                                  user_id: row.id,
                                  verified: true,
                                },
                                onCompleted: () => {
                                  router.replace(pathname);
                                  client.cache.evict({ fieldName: 'getUserList' });
                                  client.cache.gc();
                                  showAlert(
                                    {
                                      visible: true,
                                      type: 'success',
                                      title: `${row.firstName} is Verified`,
                                      message: `${row.firstName} is verified and can access the portal. Email has been sent to him to notify the approval.`,
                                      action: 'success',
                                    },
                                    true
                                  );
                                },
                                onError: (err) => {
                                  showAlert(
                                    {
                                      visible: true,
                                      type: 'error',
                                      title: `Verification failed. Try again`,
                                      message: err?.message || 'Something went wrong.',
                                      action: 'error',
                                    },
                                    true
                                  );
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
                            title: `Reject ${row.firstName || 'member'}?`,
                            message: 'This permanently deletes the pending registration.',
                            open: true,
                            action: 'reject',
                            onOkay: async () => {
                              showAlert({
                                visible: true,
                                type: 'loading',
                                message: 'Rejection is in progress...',
                              });
                              try {
                                await handleUserVerification({ variables: { user_id: row.id, verified: false } });
                                await refetch();
                                showAlert(
                                  {
                                    visible: true,
                                    type: 'success',
                                    message: `${row?.firstName || ''} ${row?.lastName || ''} was rejected and deleted.`,
                                  },
                                  true
                                );
                              } catch (error: any) {
                                showAlert(
                                  {
                                    visible: true,
                                    type: 'error',
                                    message: error?.message || 'Could not reject this registration.',
                                  },
                                  true
                                );
                              }
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
  }, [
    canApproveRegistrations,
    canForBatch,
    canManagePendingRegistrations,
    isSuperAdmin,
    changingMemberStatus,
    removingMember,
    manageMember,
    user,
    handleUserVerification,
    refetch,
    pathname,
    showAlert,
    router,
    client,
  ]);

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
