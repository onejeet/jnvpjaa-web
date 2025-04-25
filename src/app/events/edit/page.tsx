'use client';

import LayoutModule from '@/layouts/Layout';
import { Box, Card } from '@mui/material';
import NewEvent from 'src/modules/NewEvent';

// Note: This is a Client Component because it requires authentication
// Metadata is defined in the layout.tsx file

export default function EditEventPage() {
  return (
    <LayoutModule disableCover title="Edit Event • Alumni Network of JNV Paota, Jaipur" containerProps={{}}>
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
