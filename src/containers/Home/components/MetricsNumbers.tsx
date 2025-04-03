'use client';

import React, { useState } from 'react';
import { Box, Grid2 as Grid, Typography } from '@mui/material';

const metrics = [
  {
    label: 'Years of Togetherness',
    value: '40+',
  },
  {
    label: 'Batches',
    value: '34+',
  },
  {
    label: 'Alumni Members',
    value: '2400+',
  },
  {
    label: 'Funds Dispursed',
    value: '70+ lac',
  },
];

export default function MetricsNumbers() {
  const filter = React.useMemo(() => {
    return {
      verified: true,
    };
  }, []);

  return (
    <Box py={{ xs: 2, sm: 3 }} bgcolor="grey.100" width="100%" display="flex">
      {/* <Typography variant="h1" fontSize="40px">
        Recent Stories & Experiences
        <Image src="/assets/svg/underline.svg" width={300} height={40} alt="uderline" />
      </Typography> */}
      {/* <SpecialTitle title="Recent Stories & Experiences" /> */}
      <Box
        component={Grid}
        container
        px={{ xs: 2, md: 5 }}
        display="flex"
        // flexDirection={{ xs: 'column', md: 'row' }}
        alignItems="center"
        width="100%"
        justifyContent={{
          xs: 'center',
          md: 'space-evenly',
        }}
        rowGap={{ xs: 5, md: 2 }}
      >
        {metrics?.map((m, index) => (
          <Box
            component={Grid}
            size={{ xs: 6, md: 3 }}
            key={`metrics-home-${index}`}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Typography color="primary.300" variant="h5" fontWeight={700} fontSize={{ xs: 45, sm: 60 }}>
              {m.value}
            </Typography>
            <Typography color="grey.600" variant="body2" mt={{ xs: 2, md: 3 }}>
              {m?.label || ''}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
