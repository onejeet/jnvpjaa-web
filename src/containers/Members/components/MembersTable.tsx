import { DataGrid } from '@mui/x-data-grid';
import { useSearchParams } from 'next/navigation';
import useMembersTable from '../hooks/useMembersTable';

const MmembersTable = () => {
  const searchParams = useSearchParams();
  const filters = Object.fromEntries(searchParams.entries());
  const { rows, columns } = useMembersTable();

  const handleEdit = (id: string) => {
    console.log('Edit user:', id);
  };

  const handleDelete = (id: string) => {
    console.log('Delete user:', id);
  };

  return (
    <DataGrid
      // height={tableHeight}
      rows={rows}
      columns={columns}
      // loading={loading}
      rowCount={0}
      initialState={{
        pagination: {
          paginationModel: { pageSize: 100, page: 0 },
        },
      }}
      // initialState={memoizedInitialState}
      // checkboxSelection
      pagination
      paginationMode="server"
      // hideFooter
      /* handlers */
      // onPageChange={loading ? () => null : onPageChange}
      // onPageSizeChange={onPageSizeChange}
      // onSortModelChange={onSortModelChange}
      // onColumnResize={onColumnResize}
      // onSelectionModelChange={onColumnModelChange}
      // selectionModel={selectionModel}
      // components={memoizedComponents}
      // disableVirtualization
      // columnBuffer={5}
      // rowBuffer={15}
      // keepNonExistentRowsSelected
      // treeData={memoizedTreeData}
      // isRowSelectable={isRowSelectable}
      // sortModel={sortModel || []}
      // defaultGroupingExpansionDepth={1}
      sx={{
        '& .MuiDataGrid-pinnedColumnHeaders .MuiDataGrid-columnHeader:nth-child(2) svg': {
          display: 'none',
        },
        '& .MuiDataGrid-pinnedColumns .MuiDataGrid-row .MuiDataGrid-cell:nth-child(2) svg': {
          display: 'none',
        },
        '@media (max-width: 1200px)': {
          '& .MuiPaginationItem-page, .MuiPaginationItem-ellipsis': {
            display: 'none',
          },
        },
        '& .MuiDataGrid-topContainer': {
          backgroundColor: 'primary.main',
        },
        '& .MuiDataGrid-columnHeaders': {
          maxHeight: 40,
          backgroundColor: 'primary.main',
        },
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
