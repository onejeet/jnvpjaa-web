'use client';

import React from 'react';
import { Box, Chip, Divider, Grid2 as Grid, Typography } from '@mui/material';
import { IconHistory } from '@tabler/icons-react';
import { Event, ListInput, useGetEventListQuery } from '@/apollo/hooks';
import EventCard from '@/components/common/EventCard/EventCard';
import { useAuth } from '@/context/AuthContext';
import { groupEventsByYearMonth } from './groupEventsByYearMonth';

export const PAST_EVENTS_LIMIT = 24;

interface PastEventListModuleProps {
  filter?: ListInput['filter'];
  limit?: number;
}

const PastEventListModule: React.FC<PastEventListModuleProps> = ({ filter, limit = PAST_EVENTS_LIMIT }) => {
  const { user, isAdmin } = useAuth();

  const { data, loading } = useGetEventListQuery({
    fetchPolicy: 'cache-and-network',
    variables: { options: { filter: { ...filter, past: true }, limit } },
  });

  const events = React.useMemo(() => (data?.getEventList?.data?.filter(Boolean) as Event[]) || [], [data]);
  const groups = React.useMemo(() => groupEventsByYearMonth(events), [events]);
  const total = data?.getEventList?.total || 0;

  if (!loading && events.length === 0) return null;

  const renderCard = (event?: Event, index = 0) => (
    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={event ? `past-event-${event.id}` : `past-event-skeleton-${index}`}>
      <EventCard event={event || ({} as Event)} loading={!event} isReadOnly user={user} isAdmin={isAdmin} />
    </Grid>
  );

  return (
    <Box component="section" aria-labelledby="past-events-heading" mt={8}>
      <Box display="flex" alignItems="center" gap={1.5} mb={1}>
        <Box sx={{ display: 'flex', color: 'text.secondary' }}>
          <IconHistory size={26} />
        </Box>
        <Typography id="past-events-heading" variant="h2">
          Past Events
        </Typography>
      </Box>
      <Typography color="grey.800">Look back at the reunions, meetups and moments we&apos;ve shared.</Typography>

      {!data && loading ? (
        <Grid container spacing={3} mt={3}>
          {[0, 1, 2].map((i) => renderCard(undefined, i))}
        </Grid>
      ) : (
        groups.map(({ year, months }) => (
          <Box key={year} component="section" aria-label={`${year} events`} mt={4}>
            <Divider textAlign="left" sx={{ '&::before': { width: 0 }, '& .MuiDivider-wrapper': { pl: 0, pr: 2 } }}>
              <Typography component="h3" variant="h2" fontWeight={700} color="text.primary">
                {year}
              </Typography>
            </Divider>

            {months.map(({ key, label, items }) => (
              <Box key={key} mt={3}>
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography
                    component="h4"
                    variant="body2"
                    fontWeight={600}
                    color="text.secondary"
                    sx={{ textTransform: 'uppercase', letterSpacing: '0.08em' }}
                  >
                    {label}
                  </Typography>
                  <Chip size="small" label={items.length} sx={{ height: 20, fontSize: 12 }} />
                </Box>
                <Grid container spacing={3} mt={1.5}>
                  {items.map((event) => renderCard(event))}
                </Grid>
              </Box>
            ))}
          </Box>
        ))
      )}

      {total > events.length && (
        <Typography variant="body2" color="text.secondary" textAlign="center" mt={5}>
          Showing the {events.length} most recent of {total} past events.
        </Typography>
      )}
    </Box>
  );
};

export default PastEventListModule;
