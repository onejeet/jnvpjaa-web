'use client';

import React from 'react';
import { Box } from '@mui/material';

import dynamic from 'next/dynamic';

const EmptyView = dynamic(() => import('@/components/common/EmptyView'), { ssr: false });

export default function NotFound() {
  return (
    <Box width="100vw" height="100vh">
      <EmptyView message="404 | Page not found" />
    </Box>
  );
}
