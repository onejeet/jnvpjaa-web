import { useGetEventDetailsQuery } from '@/apollo/hooks';
import EventCard from '@/components/common/EventCard/EventCard';
import LayoutModule from '@/layouts/Layout';
import { useRouter } from 'next/router';
import React from 'react';

const EventDetails = () => {
  const { query } = useRouter();
  const { id } = query;
  const { data } = useGetEventDetailsQuery({
    skip: !id,
    variables: {
      id: parseInt(id as string, 10),
    },
  });
  const event = React.useMemo(() => data?.getEventDetails || {}, [data]);
  return (
    <LayoutModule disableCover title={`${event?.title || 'Event'} • Alumni Network of JNV Paota, Jaipur`}>
      <EventCard event={event} />
    </LayoutModule>
  );
};

export default EventDetails;
