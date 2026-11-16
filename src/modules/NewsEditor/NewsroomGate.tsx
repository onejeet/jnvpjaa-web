'use client';

import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import EmptyView from '@/components/common/EmptyView';
import { PERMISSION_CODES } from '@/constants/access';
import { useAuth } from '@/context/AuthContext';

/** UI gate only; the API authorises every newsroom read and write on its own. */
const NewsroomGate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, access, can } = useAuth();
  if (!user?.id || !access) {
    return (
      <Box display="flex" justifyContent="center" my={8}>
        <CircularProgress />
      </Box>
    );
  }
  if (!can(PERMISSION_CODES.NEWSROOM_POST_MANAGE)) {
    return <EmptyView message="You don't have access to manage the newsroom." />;
  }
  return <>{children}</>;
};

export default NewsroomGate;
