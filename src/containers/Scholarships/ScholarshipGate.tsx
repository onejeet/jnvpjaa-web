'use client';

import { Alert, Box, CircularProgress } from '@mui/material';
import React from 'react';

import EmptyView from '@/components/common/EmptyView';
import { useAuth } from '@/context/AuthContext';
import useScholarshipAvailability from '@/hooks/useScholarshipAvailability';
import LayoutModule from '@/layouts/Layout';
import { brand } from '@/config/tenant';

const TITLE = `Scholarships • ${brand.tagline}`;

/**
 * Keeps every /scholarships page closed until a Super Admin switches the module on.
 * Signed-out visitors fall through to the pages' own login guard.
 */
const ScholarshipGate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const { enabled, testMode, loading } = useScholarshipAvailability();

  if (!user?.id) return <>{children}</>;

  if (loading) {
    return (
      <LayoutModule disableCover title={TITLE}>
        <Box py={8} display="flex" justifyContent="center">
          <CircularProgress size={28} />
        </Box>
      </LayoutModule>
    );
  }

  if (!enabled) {
    return (
      <LayoutModule disableCover title={TITLE}>
        <Box py={6}>
          <EmptyView message="Scholarship requests aren't open yet. We'll announce it here when they are." />
        </Box>
      </LayoutModule>
    );
  }

  return (
    <>
      {testMode && (
        <Alert
          severity="warning"
          variant="filled"
          role="status"
          sx={{
            position: 'fixed',
            left: 16,
            right: 16,
            bottom: 16,
            zIndex: (theme) => theme.zIndex.snackbar,
            maxWidth: 640,
            mx: 'auto',
          }}
        >
          Scholarships are in test mode. Anything you create here is test data and will be wiped.
        </Alert>
      )}
      {children}
    </>
  );
};

export default ScholarshipGate;
