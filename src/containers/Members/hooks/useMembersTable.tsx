import { commonTableColumnProps } from '@/constants/General.contants';
import Box from '@mui/material/Box';
import { GridRowParams } from '@mui/x-data-grid';
import React from 'react';

import ProfilePicture from '@/components/common/ProfilePicture';
import { useGetUserListQuery } from '@/apollo/hooks';
import { Tooltip, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import VerifiedBadge from '@/components/common/VerifiedBadge';
import { formatPhoneNumber } from '@/utils/helpers';
import { useSearchParams } from 'next/navigation';

const useMembersTable = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [columns, setColumns] = React.useState<any[]>([]);

  const { data, loading } = useGetUserListQuery({
    variables: {
      filter: {
        verified: searchParams?.get('verified') ? searchParams?.get('verified') === 'true' : undefined,
        query: searchParams.get('q') || '',
      },
    },
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
            sx={{ cursor: 'pointer' }}
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
        width: 150,
        ...commonTableColumnProps,
        sortable: true,
      },
      {
        field: 'batch',
        headerName: 'Batch',
        width: 200,
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

      // {
      //   field: 'phone',
      //   headerName: 'Phone',
      //   ...commonTableColumnProps,
      //   sortable: true,
      //   width: 200,
      //   renderCell: (params: GridRowParams) => formatPhoneNumber(params?.row?.phone),
      // },
      // {
      //   field: 'user_type',
      //   headerName: 'User Type',
      //   sortable: true,
      //   ...commonTableColumnProps,
      //   width: 150,
      //   renderCell: (params: GridRowParams) => {
      //     if (params.row.user_group === 'Master') {
      //       return InvitedUserTypesWithValues.OWNER;
      //     }
      //     if (
      //       params.row.user_type &&
      //       InvitedUserTypesWithValues[params.row.user_type.toUpperCase() as InvitedUserTypes]
      //     ) {
      //       return InvitedUserTypesWithValues[params.row.user_type.toUpperCase() as InvitedUserTypes];
      //     }
      //     return params.row.metadata?.title;
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
      //   getActions: (params: GridRowParams) => getActionsList(params.row),
      // },
    ];

    setColumns(columns);
  }, []);

  // const rows = React.useMemo(() => {
  //   if (!searchQuery) return PAST_PRESIDENTS;
  //   PAST_PRESIDENTS?.filter(
  //     (coord: Record<string, any>) => coord.name?.includes(searchQuery) || coord?.batch?.includes(searchQuery)
  //   );
  // }, [searchQuery]);

  return {
    rows: data?.getUserList || [],
    loading,
    // rows: usersListData,
    columns,
    // rowCount: total,
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
