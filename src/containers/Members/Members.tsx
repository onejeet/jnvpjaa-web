'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import LayoutModule from '@/layouts/Layout';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import { useGetUserDetailsQuery } from '@/apollo/hooks';
import MembersFilters from './components/MembersFilters';
import MmembersTable from './components/MembersTable';

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
      containerProps={{ sx: { py: 0 } }}
    >
      <Box p={3}>
        <MembersFilters />
        <MmembersTable />
      </Box>
    </LayoutModule>
  );
}
