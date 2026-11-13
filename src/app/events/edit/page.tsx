'use client';

import LayoutModule from '@/layouts/Layout';
import { Box, Card } from '@mui/material';
import NewEvent from 'src/modules/NewEvent';

// Note: This is a Client Component because it requires authentication
// Metadata is defined in the layout.tsx file

export default function EditEventPage() {
  return (
    <LayoutModule disableCover title="Edit Event • Alumni Network of JNV Paota, Jaipur" containerProps={{}}>
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
