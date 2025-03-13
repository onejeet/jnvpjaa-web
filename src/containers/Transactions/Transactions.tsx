'use client';

import React, { useState } from 'react';
import LayoutModule from '@/layouts/Layout';
import TransactionsFilters from './components/TransactionsFilters';
import TransactionsTable from './components/TransactionsTable';
import { Box, Typography } from '@mui/material';
import Button from '@/components/core/Button';
import { Plus } from '@phosphor-icons/react';
import { useAuth } from '@/context/AuthContext';
import AddTransactionRecordModule from '@/modules/AddTransactionRecordModule';

export default function Transactions() {
  const [addRecord, setAddRecord] = React.useState<boolean>(false);
  const { isAdmin } = useAuth();
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
            List of all the transactions from JNVPJAA Fund.
          </Typography>
        </Box>
        {isAdmin && (
          <Button title="Add Record" onClick={() => setAddRecord(true)} startIcon={<Plus size={16} weight="bold" />} />
        )}
      </Box>
      {/* <TransactionsFilters /> */}
      <TransactionsTable />
      {addRecord && <AddTransactionRecordModule onClose={() => setAddRecord(false)} />}
    </LayoutModule>
  );
}
