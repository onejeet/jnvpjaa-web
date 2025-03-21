'use client';

import React, { useState } from 'react';
import LayoutModule from '@/layouts/Layout';
import { Box, Checkbox, FormControlLabel, Grid2 as Grid, Typography } from '@mui/material';

import { useAlert } from '@/context/AlertContext';
import { useAuth } from '@/context/AuthContext';
import { paths } from '@/config/paths';
import { useRouter } from 'next/router';
import { Plus, Ticket } from '@phosphor-icons/react';
import Button from '@/components/core/Button';
import EventListModule from '@/modules/EventListModule';

export default function Events() {
  const [isPendingApporvalOnly, setIsPendingApporvalOnly] = React.useState<boolean>(false);
  const { user, isAdmin } = useAuth();
  const router = useRouter();

  const filter = React.useMemo(() => {
    return {
      verified: isPendingApporvalOnly ? false : undefined,
    };
  }, [isPendingApporvalOnly]);

  return (
    <LayoutModule
      disableCover
      title={`Events • Alumni Network of JNV Paota, Jaipur`}
      //   containerProps={{ sx: { py: 2 } }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
        <Box>
          <Typography variant="h1" mb={1}>
            Events
          </Typography>
          <Typography color="grey.800">List of all the ongoing & upcoming events.</Typography>
        </Box>
        {user?.id && isAdmin && (
          <Button
            title="Create Event"
            startIcon={<Plus size={16} />}
            onClick={() => router.push(paths.events.new)}
            sx={{
              width: '150px',
              display: {
                xs: 'none',
                md: 'flex',
              },
            }}
          />
        )}
      </Box>
      {isAdmin && (
        <Box display="flex" alignItems="center" mb={1}>
          <FormControlLabel
            label="Pending approval events only"
            control={
              <Checkbox
                checked={isPendingApporvalOnly}
                // indeterminate={checked[0] !== checked[1]}
                onChange={(e, checked) => setIsPendingApporvalOnly(checked)}
              />
            }
            sx={{
              color: 'grey.800',
            }}
          />
        </Box>
      )}

      <EventListModule filter={filter} />
    </LayoutModule>
  );
}
