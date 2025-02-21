import { Box, Grid, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import useBatchCoordinators from './Hooks/usePastPresidents';

const PastPresidents = () => {
  const { columns, rows } = useBatchCoordinators();

  return (
    <Box>
      <Typography variant="h1">Past Presidents</Typography>
      <Typography color="grey.800" mt={2}>
        Leadership is the heartbeat of any organization, and it is the pulse that has guided the JNVPJ Alumni
        Association from its humble beginnings to its current grandeur. With a legacy shaped by 3 visionary past
        presidents, this Association has evolved from a modest assembly into a vibrant community. Originally sparked by
        a small group of pioneers, our association now stands as a colossal forum for brilliant minds dedicated to the
        advancement of Science and Technology, fostering human understanding and knowledge.
      </Typography>
      <Typography color="grey.800" mt={2}>
        {`These esteemed leaders, along with their Executive Committee members and the dedicated Alumni, have etched an
        indelible mark on our journey. Their collective efforts have brought together the Institute’s Alumni onto a
        unified platform, nurturing and upholding the cherished ideals of our Alma Mater. `}
      </Typography>
      <Typography color="grey.800" mt={2} mb={3}>
        We celebrate and extend our heartfelt gratitude to these remarkable individuals for their unwavering commitment
        and invaluable contributions to our shared mission.
      </Typography>

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

export default PastPresidents;
