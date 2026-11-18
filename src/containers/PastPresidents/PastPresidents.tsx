'use client';

import { Box, Typography } from '@mui/material';
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import ProfilePicture from '@/components/common/ProfilePicture';
import DataGrid from '@/components/core/DataGrid';
import { commonTableColumnProps } from '@/constants/General.contants';
import PageRichText from '@/modules/ContentPages/PageRichText';
import type { PeopleListFields, Person } from '@/modules/ContentPages/contentPages.schema';

type Row = Person & { id: number };

const columns = [
  {
    field: 'name',
    headerName: 'PRESIDENT',
    width: 250,
    ...commonTableColumnProps,
    sortable: true,
    renderCell: ({ row }: GridRenderCellParams<Row>) => (
      <Box display="flex" alignItems="center" height="100%">
        <ProfilePicture
          id={String(row.id)}
          src={row.photo?.url}
          title={row.name}
          summary={row.batch ? `Batch of ${row.batch}` : undefined}
          alt={row.photo?.alt || row.name}
          titleComponentProps={{ titleProps: { fontSize: '14px', lineHeight: '16.41px', bgcolor: 'none' } }}
        />
      </Box>
    ),
  },
  { field: 'tenure', headerName: 'TENURE', width: 150, ...commonTableColumnProps, sortable: true },
  {
    field: 'batch',
    headerName: 'BATCH (PASSOUT YEAR)',
    minWidth: 200,
    flex: 1,
    ...commonTableColumnProps,
    sortable: true,
  },
] as GridColDef<Row>[]; // commonTableColumnProps types align as string

const PastPresidents = ({ fields }: { fields: PeopleListFields }) => {
  const visibleGroups = new Set(fields.groups.filter((group) => group.visible).map((group) => group.key));
  const rows: Row[] = fields.people
    .filter((person) => visibleGroups.has(person.group))
    .map((person, id) => ({ ...person, id }));

  return (
    <Box>
      <Typography variant="h1">{fields.heading}</Typography>
      {fields.intro && <PageRichText html={fields.intro} mt={2} mb={3} />}
      <DataGrid
        rows={rows}
        columns={columns}
        rowCount={rows.length}
        initialState={{ pagination: { paginationModel: { pageSize: 100, page: 0 } } }}
        pagination
        hideFooter
      />
    </Box>
  );
};

export default PastPresidents;
