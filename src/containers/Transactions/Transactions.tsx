'use client';

import React, { useState } from 'react';
import LayoutModule from '@/layouts/Layout';
import TransactionsFilters from './components/TransactionsFilters';
import TransactionsTable from './components/TransactionsTable';
import { Box, Typography } from '@mui/material';

export default function Transactions() {
  return (
    <LayoutModule
      disableCover
      title={`Billing & Transactions • Alumni Network of JNV Paota, Jaipur`}
      //   containerProps={{ sx: { py: 2 } }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography variant="h1">Billing & Transactions</Typography>
          <Typography color="grey.800" mb={3}>
            List of all the verified and non-verified users registered for JNVPJAA portal.
          </Typography>
        </Box>
      </Box>
      {/* <TransactionsFilters /> */}
      <TransactionsTable />
    </LayoutModule>
  );
}
