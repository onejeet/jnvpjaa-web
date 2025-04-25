'use client';

import React from 'react';
import { Box } from '@mui/material';
import EmptyView from '@/components/common/EmptyView';

export default function NotFound() {
  return (
    <Box width="100vw" height="100vh">
      <EmptyView message="404 | Page not found" />
    </Box>
  );
}
