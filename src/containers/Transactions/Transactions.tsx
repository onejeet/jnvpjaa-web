'use client';

import React, { useState } from 'react';
import LayoutModule from '@/layouts/Layout';
import TransactionsFilters from './components/TransactionsFilters';
import TransactionsTable from './components/TransactionsTable';
import { Box, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import Button from '@/components/core/Button';
import { Plus, PlusCircle } from '@phosphor-icons/react';
import { useAuth } from '@/context/AuthContext';
import AddTransactionRecordModule from '@/modules/AddTransactionRecordModule';

export default function Transactions() {
  const [addRecord, setAddRecord] = React.useState<boolean>(false);
  const { isAdmin } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <LayoutModule
      disableCover
      title={`Billing & Transactions • Alumni Network of JNV Paota, Jaipur`}
      //   containerProps={{ sx: { py: 2 } }}
    >
      <Box display="flex" alignItems="start" justifyContent="space-between">
        <Box>
          <Typography variant="h1">Billing & Transactions</Typography>
          <Typography color="grey.800" mb={3}>
            List of all the transactions from JNVPJAA Fund.
          </Typography>
        </Box>
        {isAdmin &&
          (isMobile ? (
            <IconButton color="primary" onClick={() => setAddRecord(true)}>
              <PlusCircle size={24} weight="bold" />
            </IconButton>
          ) : (
            <Button
              title="Add Record"
              onClick={() => setAddRecord(true)}
              startIcon={<Plus size={16} weight="bold" />}
            />
          ))}
      </Box>
      {/* <TransactionsFilters /> */}
      <TransactionsTable />
      {addRecord && <AddTransactionRecordModule onClose={() => setAddRecord(false)} />}
    </LayoutModule>
  );
}
