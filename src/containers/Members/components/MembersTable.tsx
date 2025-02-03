import { useSearchParams } from 'next/navigation';
import useMembersTable from '../hooks/useMembersTable';
import React from 'react';
import DataGrid from '@/components/core/DataGrid';

const MmembersTable = () => {
  const searchParams = useSearchParams();
  const filters = Object.fromEntries(searchParams.entries());
  const { rows, loading, columns, rowCount, paginationModel, onPaginationModelChange } = useMembersTable();

  const handleEdit = (id: string) => {
    console.log('Edit user:', id);
  };

  const handleDelete = (id: string) => {
    console.log('Delete user:', id);
  };

  return (
    <DataGrid
      // height={tableHeight}
      rows={rows || []}
      columns={columns}
      rowCount={rowCount}
      // initialState={{
      //   pagination: {
      //     paginationModel: { pageSize: 100, page: 0 },
      //   },
      // }}
      pageSizeOptions={[10, 20, 50, 100]}
      paginationModel={paginationModel}
      rowSelection={false}
      pagination
      paginationMode="server"
      onPaginationModelChange={onPaginationModelChange}
      sx={{
        // '& .MuiDataGrid-pinnedColumnHeaders .MuiDataGrid-columnHeader:nth-child(2) svg': {
        //   display: 'none',
        // },
        // '& .MuiDataGrid-pinnedColumns .MuiDataGrid-row .MuiDataGrid-cell:nth-child(2) svg': {
        //   display: 'none',
        // },
        // '@media (max-width: 1200px)': {
        //   '& .MuiPaginationItem-page, .MuiPaginationItem-ellipsis': {
        //     display: 'none',
        //   },
        // },
        // '& .MuiDataGrid-topContainer': {
        //   backgroundColor: 'primary.main',
        // },
        // '& .MuiDataGrid-columnHeaders': {
        //   maxHeight: 40,
        //   backgroundColor: 'primary.main',
        // },
        '& .MuiDataGrid-columnHeader': {
          fontWeight: 400,
          backgroundColor: 'primary.main',
          color: 'common.white',
          maxHeight: 40,
        },
      }}
    />
  );
};

export default MmembersTable;
