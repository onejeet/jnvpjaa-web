'use client';

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
    />
  );
};

export default MmembersTable;
