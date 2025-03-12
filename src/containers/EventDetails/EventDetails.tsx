import { Event, useGetEventDetailsQuery } from '@/apollo/hooks';
import EmptyView from '@/components/common/EmptyView';
import EventCard from '@/components/common/EventCard/EventCard';
import LayoutModule from '@/layouts/Layout';
import { useRouter } from 'next/router';
import React from 'react';

const EventDetails = () => {
  const { query } = useRouter();
  const { id } = query;
  const { data, loading } = useGetEventDetailsQuery({
    skip: !id,
    variables: {
      id: parseInt(id as string, 10),
    },
  });
  const event: Event | undefined = React.useMemo(() => data?.getEventDetails, [data]);

  return (
    <LayoutModule disableCover title={`${event?.title || 'Event'} • Alumni Network of JNV Paota, Jaipur`}>
      {loading || event?.id ? (
        <EventCard event={event} showDescription loading={loading} />
      ) : (
        <EmptyView message="No event found!" />
      )}
    </LayoutModule>
  );
};

export default EventDetails;
