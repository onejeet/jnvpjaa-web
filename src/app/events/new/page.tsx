'use client';

import LayoutModule from '@/layouts/Layout';
import { Box, Card } from '@mui/material';
import NewEvent from 'src/modules/NewEvent';
import { Metadata } from 'next';
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
      <Box display="flex" justifyContent="center">
        <Card
          elevation={3}
          sx={{
            maxWidth: '1000px',
            bgcolor: 'grey.100',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            px: 3,
            pt: 2,
            pb: 4,
            position: 'relative',
          }}
        >
          <NewEvent />
        </Card>
      </Box>
    </LayoutModule>
  );
}
