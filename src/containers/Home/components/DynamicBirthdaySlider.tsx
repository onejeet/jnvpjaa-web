'use client';

import dynamic from 'next/dynamic';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// Import the BirthdaySlider component dynamically with SSR disabled
const BirthdaySlider = dynamic(() => import('./BirthdaySlider'), {
  ssr: false, // This prevents server-side rendering
  loading: () => (
    <Box
      component="div"
      display="flex"
      flexDirection="row"
      justifyContent="start"
      alignItems="stretch"
      height={{
        xs: 150,
        md: 200,
      }}
      sx={{ maxWidth: '100%', margin: 'auto', textAlign: 'center' }}
    >
      <Box
        display="flex"
        alignItems="center"
        bgcolor="grey.800"
        color="common.white"
        height="100%"
        minWidth="30%"
        px={{ xs: 1, sm: 2, md: 4 }}
      >
        <Typography variant="h1" lineHeight="normal" fontSize={{ xs: '18px', sm: '28px', md: '40px' }}>
          Upcoming Birthdays
        </Typography>
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid',
          borderColor: 'grey.800',
          borderLeftWidth: 0,
          borderRightWidth: 0,
        }}
      >
        Loading birthdays...
      </Box>
    </Box>
  ),
});

export default BirthdaySlider;
