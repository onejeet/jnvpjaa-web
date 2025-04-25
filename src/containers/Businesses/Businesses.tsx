'use client';

import React, { useState } from 'react';
import LayoutModule from '@/layouts/Layout';

import { Box, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import Button from '@/components/core/Button';
import { IconPlus, IconCirclePlus } from '@tabler/icons-react';
import { useAuth } from '@/context/AuthContext';
import BusinessListModule from '@/modules/BusinessListModule';
import BusinessListFilters from './components/BusinessListFilters';
import { useSearchParams } from 'next/navigation';
import Dialog from '@/components/core/Dialog';

export default function Businesses() {
  const [addBusiness, setAddBusiness] = React.useState<boolean>(false);
  const { user } = useAuth();
  const searchParams = useSearchParams();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const filters = React.useMemo(
    () => ({
      verified: searchParams?.get('verified') ? searchParams?.get('verified') === 'true' : undefined,
      query: searchParams.get('q') || '',
    }),
    [searchParams]
  );

  return (
    <LayoutModule
      disableCover
      title={`Businesses By Alumni • Alumni Network of JNV Paota, Jaipur`}
      //   containerProps={{ sx: { py: 2 } }}
    >
      <Box display="flex" alignItems="start" gap={2} justifyContent="space-between">
        <Box>
          <Typography variant="h1">Businesses By Alumni</Typography>
          <Typography color="grey.800" mb={3}>
            {`Check out businesses started by our alumni. Lots of them offer special discounts just for alumni, so it’s a win-win: support your network and save too!`}
          </Typography>
        </Box>
        {user?.id ? (
          isMobile ? (
            <IconButton color="primary" onClick={() => setAddBusiness(true)}>
              <IconCirclePlus size={24} />
            </IconButton>
          ) : (
            <Button
              title="List your Business"
              onClick={() => setAddBusiness(true)}
              startIcon={<IconPlus size={16} />}
              sx={{ width: 250 }}
            />
          )
        ) : null}
      </Box>
      <BusinessListFilters />
      <BusinessListModule filter={filters} />
      {addBusiness && (
        <Dialog
          open={addBusiness}
          title="Add your business"
          onClose={() => setAddBusiness(false)}
          footerProps={{ onOkay: () => setAddBusiness(false), okayButtonProps: { title: 'Okay' } }}
        >
          <Typography p={3}>
            If you would like to list your business and gain visibility within the JNVPJAA alumni network, we invite you
            to connect with the alumni association. Simply reach out to us at{' '}
            <a href="mailto: jnvpjaaorg@gmail.com">jnvpjaaorg@gmail.com</a> with your business details, including the
            name, description, and contact information. <br />
            Our team will guide you through the process of getting your business featured and help you tap into the
            strength of our supportive alumni community.
          </Typography>
        </Dialog>
      )}
      {/* {addRecord && <AddTransactionRecordModule onClose={() => setAddRecord(false)} />} */}
    </LayoutModule>
  );
}
