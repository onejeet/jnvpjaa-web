'use client';

import dynamic from 'next/dynamic';
import { Box, CircularProgress } from '@mui/material';

// Dynamically import the Lottie component with SSR disabled
const Lottie = dynamic(() => import('lottie-react'), {
  ssr: false, // This prevents server-side rendering
  loading: () => (
    <Box display="flex" justifyContent="center" alignItems="center" width="100%" height="100%">
      <CircularProgress size={24} />
    </Box>
  ),
});

// Export the dynamic component
export default Lottie;
