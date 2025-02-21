import { useGetEventListQuery } from '@/apollo/hooks';
import EmptyView from '@/components/common/EmptyView';
import EventCard from '@/components/common/EventCard/EventCard';
import { useProfile } from '@/context/ProfileContext';
import { Box, Typography, Grid2 as Grid, Card, CardContent, CardMedia } from '@mui/material';
import React from 'react';

export default function EventSection() {
  const { user } = useProfile();

  const { data: eventsData, loading } = useGetEventListQuery({
    skip: !user?.id,
    variables: {
      options: {
        filter: {
          userId: user?.id,
        },
      },
    },
  });

  const listData = React.useMemo(() => {
    if (loading) {
      return new Array(3).fill({ id: '', title: '', description: '', startDate: '', medium: 'Online', online: false });
    }
    return eventsData?.getEventList?.data || [];
  }, [loading, eventsData]);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Associated events
      </Typography>
      <Grid container spacing={3}>
        {listData?.length > 0 ? (
          listData?.map((ev: any, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={`events-${ev.title}-${index}`}>
              <EventCard event={ev} loading={!ev.id} />
            </Grid>
          ))
        ) : (
          <EmptyView message="No associated events found." />
        )}
      </Grid>
    </Box>
  );
}
