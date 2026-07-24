'use client';

import React from 'react';
import { useQuery } from '@apollo/client';
import { Alert, Box, Card, CardContent, Grid2 as Grid, Skeleton, Stack, Tooltip, Typography } from '@mui/material';
import {
  IconCash,
  IconCreditCardPay,
  IconCreditCardRefund,
  IconHelpCircle,
  IconPigMoney,
  IconReceiptRupee,
  IconSchool,
  IconTrendingDown,
  IconTrendingUp,
  IconWallet,
} from '@tabler/icons-react';
import { GET_BILLING_DASHBOARD } from '@/apollo/billingOperations';
import { formatCompactCurrency } from '@/utils/helpers';

const metricCards = [
  {
    key: 'availableFunds',
    label: 'Available Association Funds',
    description: 'Money currently available with the association after completed credits and debits.',
    icon: IconWallet,
    color: 'success.main',
  },
  {
    key: 'totalCredits',
    label: 'Total Money Received',
    description: 'All completed wallet-impacting credits recorded in the association ledger.',
    icon: IconTrendingUp,
    color: 'success.main',
  },
  {
    key: 'totalDebits',
    label: 'Total Money Spent',
    description: 'All completed wallet-impacting debits recorded in the association ledger.',
    icon: IconTrendingDown,
    color: 'error.main',
  },
  {
    key: 'scholarshipReleasedToMentors',
    label: 'Scholarship Funds Sent to Mentors',
    description:
      'Current scholarship balance with mentors, including available mentor funds and beneficiary payments awaiting confirmation.',
    icon: IconSchool,
    color: 'primary.main',
  },
  {
    key: 'scholarshipPaidToBeneficiaries',
    label: 'Scholarship Paid to Beneficiaries',
    description: 'Scholarship amount confirmed as received by beneficiaries.',
    icon: IconReceiptRupee,
    color: 'info.main',
  },
  {
    key: 'otherActivitySpending',
    label: 'Other Activity Spending',
    description: 'Completed spending for non-scholarship activities and events.',
    icon: IconCash,
    color: 'warning.main',
  },
  {
    key: 'donationsReceived',
    label: 'Donations Received',
    description: 'Completed donation credits recorded for the association.',
    icon: IconPigMoney,
    color: 'success.main',
  },
  {
    key: 'adjustmentsAndRefunds',
    label: 'Adjustments and Refunds',
    description: 'Completed corrections and scholarship refunds in the ledger.',
    icon: IconCreditCardRefund,
    color: 'secondary.main',
  },
  {
    key: 'pendingMentorReleaseAmount',
    label: 'Pending Beneficiary Verification',
    description: 'Scholarship payments released by mentors that beneficiaries have not fully confirmed yet.',
    icon: IconCreditCardPay,
    color: 'warning.main',
    hideWhenZero: true,
  },
];

export default function BillingDashboard() {
  const { data, loading, error } = useQuery(GET_BILLING_DASHBOARD, {
    fetchPolicy: 'cache-and-network',
  });
  const dashboard = data?.getBillingDashboard;

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error.message || 'Unable to load billing dashboard.'}
      </Alert>
    );
  }

  return (
    <Box mt={2}>
      <Grid container spacing={2}>
        {metricCards
          .filter((card) => !card.hideWhenZero || Number(dashboard?.[card.key] || 0) > 0 || loading)
          .map((card) => {
            const Icon = card.icon;
            return (
              <Grid key={card.key} size={{ xs: 12, sm: 6, md: 4 }}>
                <Card variant="outlined" sx={{ height: '100%', borderRadius: 1 }}>
                  <CardContent>
                    <Stack spacing={1.5}>
                      <Stack direction="row" alignItems="center" justifyContent="space-between" gap={1}>
                        <Box
                          width={38}
                          height={38}
                          display="grid"
                          sx={{ placeItems: 'center', borderRadius: 1, bgcolor: 'grey.100', color: card.color }}
                        >
                          <Icon size={22} />
                        </Box>
                        <Tooltip title={card.description}>
                          <Box color="grey.600" display="flex">
                            <IconHelpCircle size={18} />
                          </Box>
                        </Tooltip>
                      </Stack>
                      <Typography variant="body2" color="grey.700">
                        {card.label}
                      </Typography>
                      <Typography variant="body1" fontWeight={700} fontSize={24}>
                        {loading ? <Skeleton width={110} /> : formatCompactCurrency(dashboard?.[card.key])}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </Box>
  );
}
