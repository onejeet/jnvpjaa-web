import { DataGridProps } from '@mui/x-data-grid';
import React from 'react';
import { DataGrid as MuiDataGrid } from '@mui/x-data-grid';
import NoRowsOverlay from './NoRowsOverlay';
import { Box } from '@mui/material';

const DataGrid: React.FC<DataGridProps> = ({
  loading,
  rows,
  columns,
  rowCount,
  paginationModel,
  onPaginationModelChange,
  pageSizeOptions,
  ...restProps
}) => {
  return (
    <Box sx={{ height: !rows || rows?.length === 0 ? '400px' : 'auto', minHeight: '400px' }}>
      <MuiDataGrid
        // height={tableHeight}

        rows={rows || []}
        columns={columns}
        rowCount={rowCount}
        loading={loading}
        slots={{
          noRowsOverlay: NoRowsOverlay,
        }}
        slotProps={{
          loadingOverlay: {
            variant: 'linear-progress',
            noRowsVariant: 'skeleton',
          },
        }}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 20, page: 0 },
          },
        }}
        pageSizeOptions={pageSizeOptions || [10, 20, 50, 100]}
        paginationModel={paginationModel}
        onPaginationModelChange={onPaginationModelChange}
        rowSelection={false}
        pagination
        paginationMode="server"
        sx={{
          height: '100%',

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
        {...restProps}
      />
    </Box>
  );
};

export default React.memo(DataGrid);
