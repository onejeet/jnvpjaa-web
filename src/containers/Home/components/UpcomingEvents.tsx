'use client';

import React, { useState } from 'react';
import EventListModule from '@/modules/EventListModule';
import { Box, Typography } from '@mui/material';

export default function UpcomingEvents() {
  const filter = React.useMemo(() => {
    return {
      verified: true,
    };
  }, []);

  return (
    <Box gap={1.5} py={3} bgcolor="grey.200" width="100%" display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h1"> Upcoming Events</Typography>
      <EventListModule filter={filter} limit={5} isReadOnly />
    </Box>
  );
}
