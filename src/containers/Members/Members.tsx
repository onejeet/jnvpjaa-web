'use client';

import React, { useState } from 'react';
import LayoutModule from '@/layouts/Layout';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import { useGetUserDetailsQuery } from '@/apollo/hooks';
import MembersFilters from './components/MembersFilters';
import MmembersTable from './components/MembersTable';
import { Box, Typography } from '@mui/material';

export default function Members() {
  const router = useRouter();
  const { id } = router.query;
  const { data: userData, loading } = useGetUserDetailsQuery({
    skip: !id,
    variables: {
      id: id as string,
    },
  });
  const { user } = useAuth();

  const userInfo = React.useMemo(() => {
    return id ? userData?.getUserDetails : user;
  }, [id, user, userData]);

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
            List of all the verified and non-verified users registered for JNVPJAA portal.
          </Typography>
        </Box>
      </Box>
      <MembersFilters />
      <MmembersTable />
    </LayoutModule>
  );
}
