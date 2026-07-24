'use client';

import React, { useState } from 'react';
import LayoutModule from '@/layouts/Layout';
import TransactionsTable from './components/TransactionsTable';
import BillingDashboard from './components/BillingDashboard';
import { Box, IconButton, Tab, Tabs, Typography, useMediaQuery, useTheme } from '@mui/material';
import Button from '@/components/core/Button';
import { IconPlus, IconCirclePlus } from '@tabler/icons-react';
import { useAuth } from '@/context/AuthContext';
import AddTransactionRecordModule from '@/modules/AddTransactionRecordModule';
import { PERMISSION_CODES } from '@/constants/access';

export default function Transactions() {
  const [addRecord, setAddRecord] = React.useState<boolean>(false);
  const [tab, setTab] = useState<'billing' | 'transactions'>('billing');
  const { can } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const canCreateTransaction = can(PERMISSION_CODES.BILLING_TRANSACTION_CREATE);

  return (
    <LayoutModule
      disableCover
      title={`Billing & Transactions • Alumni Network of JNV Paota, Jaipur`}
      //   containerProps={{ sx: { py: 2 } }}
    >
      <Box display="flex" alignItems="start" gap={2} justifyContent="space-between">
        <Box>
          <Typography variant="h1">Billing & Transactions</Typography>
          <Typography color="grey.800" mb={3}>
            Track association funds, spending, scholarship releases, and audited ledger entries.
          </Typography>
        </Box>
        {canCreateTransaction &&
          (isMobile ? (
            <IconButton color="primary" onClick={() => setAddRecord(true)}>
              <IconCirclePlus size={24} />
            </IconButton>
          ) : (
            <Button
              title="Add Record"
              onClick={() => setAddRecord(true)}
              startIcon={<IconPlus size={16} />}
              sx={{ width: 200 }}
            />
          ))}
      </Box>
      <Tabs value={tab} onChange={(_, value) => setTab(value)} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tab value="billing" label="Billing" />
        <Tab value="transactions" label="Transactions" />
      </Tabs>
      {tab === 'billing' ? <BillingDashboard /> : <TransactionsTable />}
      {addRecord && <AddTransactionRecordModule onClose={() => setAddRecord(false)} />}
    </LayoutModule>
  );
}
