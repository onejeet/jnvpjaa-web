'use client';

import React from 'react';
import { Box } from '@mui/material';

import dynamic from 'next/dynamic';
import Button from '@/components/core/Button';
import { IconArrowRampLeft } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

const EmptyView = dynamic(() => import('@/components/common/EmptyView'), { ssr: false });

export default function NotFound() {
  const router = useRouter();
  return (
    <Box
      width="100vw"
      height="100vh"
      gap={3}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <EmptyView message="404 | Page not found" />
      <Button
        title="Go Back"
        startIcon={<IconArrowRampLeft size={18} />}
        sx={{ mt: 3 }}
        onClick={() => router.back()}
      />
    </Box>
  );
}
