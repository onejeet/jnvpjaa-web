'use client';

import React, { useState } from 'react';
import LayoutModule from '@/layouts/Layout';
import MembersFilters from './components/MembersFilters';
import MmembersTable from './components/MembersTable';
import { Box, Typography } from '@mui/material';

export default function Members() {
  return (
    <LayoutModule
      disableCover
      title={`Members • Alumni Network of JNV Paota, Jaipur`}
      //   containerProps={{ sx: { py: 2 } }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography variant="h1">Alumni Members</Typography>
          <Typography color="grey.800" mb={3}>
            Find and connect with alumni and faculty members of JNVPJAA. Whether {`you're`} catching up with old friends
            or expanding your network, this directory keeps our community connected!
          </Typography>
        </Box>
      </Box>
      <MembersFilters />
      <MmembersTable />
    </LayoutModule>
  );
}
