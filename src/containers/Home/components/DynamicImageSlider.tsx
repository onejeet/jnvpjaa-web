'use client';

import dynamic from 'next/dynamic';
import Box from '@mui/material/Box';
import React from 'react';
import SpecialTitle from '@/components/common/SpecialTitle';

// Import the ImageSlider component dynamically with SSR disabled
const ImageSlider = dynamic(() => import('./ImageSlider'), {
  ssr: false, // This prevents server-side rendering
  loading: () => (
    <Box width="100%" textAlign="center" px={2} py={{ xs: 4, md: 6 }} bgcolor="primary.50" overflow="hidden">
      <Box width="100%" display="flex" justifyContent="center">
        <SpecialTitle title="Timeless Moments" containerProps={{ mb: { xs: 5, md: 8 } }} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 300,
        }}
      >
        Loading gallery...
      </Box>
    </Box>
  ),
});

export default ImageSlider;
