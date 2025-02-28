import BATCH_COORDINATORS from '@/constants/BatchCoordinators.json';
import { commonTableColumnProps } from '@/constants/General.contants';
import { getDefaultAvatar } from '@/utils/helpers';
import Box from '@mui/material/Box';
import { GridRowParams } from '@mui/x-data-grid';
import React from 'react';

import ProfilePicture from '@/components/common/ProfilePicture';

const useBatchCoordinators = () => {
  const [columns, setColumns] = React.useState<any[]>([]);
  const [searchQuery, setSearchQuery] = React.useState<string>('');

  //   const [state, dispatch] = useImmerReducer(reducer, initialState);
  //   const { replace, query, pathname } = useRouter();

  React.useEffect(() => {
    const columns = [
      {
        field: 'name',
        headerName: 'COORDINATOR',
        width: 250,
        ...commonTableColumnProps,
        sortable: true,
        renderCell: (params: GridRowParams) => (
          <Box display="flex" alignItems="center" height="100%">
            <ProfilePicture
              src={params.row.profile_image || getDefaultAvatar(params.row.gender)}
              title={params.row.name}
              summary={`Batch of ${params.row.year}`}
              alt={`${params.row.firstname || ''} ${params.row.lastname || ''}`}
              titleComponentProps={{
                titleProps: {
                  fontSize: '14px',
                  lineHeight: '16.41px',
                  bgcolor: 'none',
                },
              }}
            />
          </Box>
        ),
      },
      {
        field: 'year',
        headerName: 'BATCH (PASSOUT YEAR)',
        width: 200,
        ...commonTableColumnProps,
        sortable: true,
      },
      {
        field: 'email',
        headerName: 'EMAIL',
        minWidth: 270,
        flex: 1,
        ...commonTableColumnProps,
        sortable: true,
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

  const onSearch = React.useCallback((q: string) => {
    setSearchQuery(q);
  }, []);

  const rows = React.useMemo(() => {
    if (!searchQuery) return BATCH_COORDINATORS;

    return BATCH_COORDINATORS?.filter(
      (coord: Record<string, any>) =>
        coord.name?.includes(searchQuery) || coord?.year?.toString()?.includes(searchQuery)
    );
  }, [searchQuery]);

  return {
    rows,
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
