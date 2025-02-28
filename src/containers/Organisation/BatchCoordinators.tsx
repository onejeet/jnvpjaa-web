import SearchIcon from '@mui/icons-material/Search';
import { Box, OutlinedInput, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { DataGrid } from '@mui/x-data-grid';

import useBatchCoordinators from './Hooks/useBatchCoordinators';

const BatchCoordinators = () => {
  const { columns, rows, onSearch } = useBatchCoordinators();

  return (
    <Box>
      <Typography variant="h1" textAlign="center">
        Batch Coordinators
      </Typography>
      <Typography color="grey.800" mt={2} mb={3}>
        {`Welcome to the JNVPJAA Executive Committee page! Here, you'll find the dedicated individuals who lead and shape
        our vibrant alumni association. Our committee members bring diverse expertise and a shared passion for fostering
        community and connection among JNVPJAA alumni. Meet the team driving our mission forward and discover the faces
        behind the initiatives that keep our alumni network strong and engaged.`}
      </Typography>
      <Box component={Grid} container width="100%" mb={3}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <OutlinedInput
            placeholder="Search Coordinators"
            startAdornment={<SearchIcon sx={{ color: 'grey.800', mr: '8px' }} />}
            onChange={(e) => onSearch(e.target.value)}
          />
        </Grid>
        {/* <Grid item xs={12} sm={6} md={3}>
          <Select
            placeholder="Search Coordinators"
            startAdornment={<SearchIcon sx={{ color: 'grey.800', mr: '8px' }} />}
            options={[]}
            onChange={(e) => onSearch(e.target.value)}
          />
        </Grid> */}
      </Box>
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
        hideFooter
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
    </Box>
  );
};

export default BatchCoordinators;
