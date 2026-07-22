'use client';

import React from 'react';
import { ListInput, useGetEventListQuery } from '@/apollo/hooks';
import { Box, Grid2 as Grid, Typography } from '@mui/material';
import EventCard from '@/components/common/EventCard/EventCard';
import { IconPlus, IconTicket } from '@tabler/icons-react';
import useEvents from '@/hooks/useEvents';
import { useAuth } from '@/context/AuthContext';
import { paths } from '@/config/paths';
import EmptyView from '@/components/common/EmptyView';
import { useRouter } from 'next/navigation';

interface EventListModuleProps {
  filter?: ListInput['filter'];
  skip?: boolean;
  limit?: number;
  loading?: boolean;
  isCreateAllowed?: boolean;
  isReadOnly?: boolean;
}

const EventListModule: React.FC<EventListModuleProps> = ({
  filter = {},
  limit = 50,
  skip,
  loading: propLoading,
  isCreateAllowed = true,
  isReadOnly,
}) => {
  const { user, isAdmin } = useAuth();
  const router = useRouter();

  const { markImGoing, verifyEvent, onEditEvent, onPublishEvent, onDelete } = useEvents({ user });

  const dummyEvents = React.useMemo(() => {
    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString();
    const dayAfter = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString();

    return [
      {
        id: 900001,
        title: 'Dummy Online Event',
        summary: 'Test online event for live UI verification.',
        description: 'This is a dummy online event created for testing.',
        startDate: tomorrow,
        endDate: dayAfter,
        medium: 'online',
        location: 'https://meet.google.com/abc-defg-hij',
        status: 'PUBLISHED',
        total_attendies: 0,
        attendees: [],
        category: 'GENERAL',
      },
      {
        id: 900002,
        title: 'Dummy Offline Event',
        summary: 'Test offline event for live UI verification.',
        description: 'This is a dummy offline event created for testing.',
        startDate: tomorrow,
        endDate: dayAfter,
        medium: 'offline',
        location: 'Paota, Jaipur, Rajasthan',
        status: 'PUBLISHED',
        total_attendies: 0,
        attendees: [],
        category: 'GENERAL',
      },
    ];
  }, []);

  const { data: eventData, loading } = useGetEventListQuery({
    skip,
    variables: {
      options: {
        filter,
        limit,
      },
    },
    notifyOnNetworkStatusChange: true,
  });

  const listData = React.useMemo(() => {
    if (loading || propLoading) {
      return new Array(6).fill({ id: '', title: '', description: '', startDate: '', medium: 'Online', online: false });
    }
    return [...dummyEvents, ...(eventData?.getEventList?.data || [])];
  }, [loading, eventData, propLoading, dummyEvents]);

  console.log('ZZ: listData', listData);

  return (
    <Grid container spacing={3} mt={2}>
      {listData?.length > 0 ? (
        listData?.map((ev: any, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={`events-${ev.title}-${index}`}>
            <EventCard
              event={ev}
              loading={!ev.id}
              markImGoing={markImGoing}
              user={user}
              isAdmin={isAdmin}
              verifyEvent={verifyEvent}
              onEdit={onEditEvent}
              onPublish={onPublishEvent}
              isReadOnly={isReadOnly}
              onDelete={onDelete}
            />
          </Grid>
        ))
      ) : (
        <EmptyView
          message="No events available"
          buttonProps={
            user?.id && isCreateAllowed
              ? {
                  title: 'Create New Event',
                  startIcon: <IconPlus size={16} />,
                  onClick: () => router.push(paths.events.new),
                }
              : undefined
          }
        />
      )}
    </Grid>
  );
};

export default EventListModule;
