'use client';

import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import LayoutModule from '@/layouts/Layout';
import TransactionsTable from './components/TransactionsTable';
import BillingDashboard from './components/BillingDashboard';
import { Box, IconButton, Tab, Tabs, Typography, useMediaQuery, useTheme } from '@mui/material';
import Button from '@/components/core/Button';
import { IconPlus, IconCirclePlus, IconWallet } from '@tabler/icons-react';
import { useAuth } from '@/context/AuthContext';
import AddTransactionRecordModule from '@/modules/AddTransactionRecordModule';
import SetOpeningBalanceModule from '@/modules/SetOpeningBalanceModule';
import { GET_ASSOCIATION_OPENING_BALANCE_STATUS } from '@/apollo/billingOperations';
import { EXECUTIVE_POSITION_CODES, PERMISSION_CODES } from '@/constants/access';

export default function Transactions() {
  const [addRecord, setAddRecord] = React.useState<boolean>(false);
  const [setOpeningBalance, setSetOpeningBalance] = React.useState<boolean>(false);
  const [tab, setTab] = useState<'billing' | 'transactions'>('billing');
  const { can, hasPosition } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const canManageOpeningBalance =
    can(PERMISSION_CODES.SYSTEM_FULL_ACCESS) || hasPosition(EXECUTIVE_POSITION_CODES.SECRETARY);
  const canCreateTransaction = can(PERMISSION_CODES.BILLING_TRANSACTION_CREATE) || canManageOpeningBalance;
  const { data: openingBalanceData, loading: openingBalanceLoading } = useQuery(
    GET_ASSOCIATION_OPENING_BALANCE_STATUS,
    {
      skip: !canManageOpeningBalance,
      fetchPolicy: 'cache-first',
    }
  );
  const hasOpeningBalance = Number(openingBalanceData?.getAssociationTransactions?.total || 0) > 0;
  const canSetOpeningBalance = canManageOpeningBalance && !openingBalanceLoading && !hasOpeningBalance;

  return (
    <LayoutModule
      disableCover
      title={`Billing & Transactions • Alumni Network of JNV Paota, Jaipur`}
      //   containerProps={{ sx: { py: 2 } }}
    >
      <Box display="flex" alignItems="start" gap={2} justifyContent="space-between">
        <Box flex={1}>
          <Typography variant="h1">Billing & Transactions</Typography>
          <Typography color="grey.800" mb={3}>
            Track association funds, spending, scholarship releases, and audited ledger entries.
          </Typography>
        </Box>
        {(canCreateTransaction || canSetOpeningBalance) &&
          (isMobile ? (
            <Box display="flex" gap={1}>
              {canSetOpeningBalance && (
                <IconButton color="primary" onClick={() => setSetOpeningBalance(true)}>
                  <IconWallet size={24} />
                </IconButton>
              )}
              {canCreateTransaction && (
                <IconButton color="primary" onClick={() => setAddRecord(true)}>
                  <IconCirclePlus size={24} />
                </IconButton>
              )}
            </Box>
          ) : (
            <Box display="flex" gap={1} justifyContent="flex-end">
              {canSetOpeningBalance && (
                <Button
                  title="Opening Balance"
                  onClick={() => setSetOpeningBalance(true)}
                  startIcon={<IconWallet size={16} />}
                  sx={{ width: 200 }}
                />
              )}
              {canCreateTransaction && (
                <Button
                  title="Add Transaction"
                  onClick={() => setAddRecord(true)}
                  startIcon={<IconPlus size={16} />}
                  sx={{ width: 190 }}
                />
              )}
            </Box>
          ))}
      </Box>
      <Tabs value={tab} onChange={(_, value) => setTab(value)} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tab value="billing" label="Billing" />
        <Tab value="transactions" label="Transactions" />
      </Tabs>
      {tab === 'billing' ? <BillingDashboard /> : <TransactionsTable />}
      {addRecord && <AddTransactionRecordModule onClose={() => setAddRecord(false)} />}
      {setOpeningBalance && <SetOpeningBalanceModule onClose={() => setSetOpeningBalance(false)} />}
    </LayoutModule>
  );
}
