'use client';

import LayoutModule from '@/layouts/Layout';
import { Box, Card } from '@mui/material';
import NewEvent from 'src/modules/NewEvent';
import Breadcrumbs from '@/components/common/Breadcrumbs';

// Note: This is a Client Component because it requires authentication
// Metadata is defined in the layout.tsx file

const breadcrumbsList = [
  {
    label: 'Events',
    path: '/events',
  },
  {
    label: 'New Event',
  },
];

export default function NewEventPage() {
  return (
    <LayoutModule disableCover title="Create New Event • JNVPJAA" containerProps={{}}>
      <Breadcrumbs items={breadcrumbsList} />
      <Box display="flex" justifyContent="center" sx={{ py: { xs: 1, md: 2 } }}>
        <Card
          elevation={0}
          sx={{
            width: '100%',
            maxWidth: 1040,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2.5,
          }}
        >
          <NewEvent />
        </Card>
      </Box>
    </LayoutModule>
  );
}
