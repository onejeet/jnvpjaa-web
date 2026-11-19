'use client';

import { Event, EventStatus, useGetEventDetailsQuery } from '@/apollo/hooks';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import EmptyView from '@/components/common/EmptyView';
import SingleEventView from '@/components/common/SingleEventView';
import CommentsModule from '@/modules/CommentsModule';
import { useAuth } from '@/context/AuthContext';
import useEvents from '@/hooks/useEvents';
import LayoutModule from '@/layouts/Layout';
import { Box } from '@mui/material';
import { useParams } from 'next/navigation';
import React from 'react';
import { brand } from '@/config/tenant';

interface EventDetailsProps {
  event?: Event;
}

const EventDetails: React.FC<EventDetailsProps> = ({ event: initialData }) => {
  const params = useParams();
  const eventId = initialData?.id || Number(params.id);
  const { user, isAdmin } = useAuth();
  // const id = searchParams.get('id');
  const methods = useEvents({ user });
  const { data, loading } = useGetEventDetailsQuery({
    skip: !Number.isSafeInteger(eventId) || eventId <= 0,
    variables: {
      id: eventId,
    },
  });

  const event = React.useMemo(() => data?.getEventDetails || initialData, [data, initialData]);
  const contentLoading = loading && !event?.id;

  const breadcrumbsList = React.useMemo(
    () => [
      {
        label: 'Events',
        path: '/events',
      },
      {
        label: event?.title || 'Event',
      },
    ],
    [event]
  );

  return (
    <LayoutModule disableCover title={`${event?.title || 'Event'} • ${brand.tagline}`}>
      <Box mb={1} display="flex" justifyContent="start" alignItems="center">
        <Breadcrumbs items={breadcrumbsList} loading={contentLoading} />
        {/* {buttonProps && (
          <Box display="flex" alignItems="center" gap={1.5} ml="auto">
            {buttonProps.map((btProps: ButtonProps, index: number) => (
              <Button key={`single-blog-btn-${index}`} {...btProps} />
            ))}
          </Box>
        )} */}
      </Box>
      {contentLoading || event?.id ? (
        <SingleEventView
          event={event}
          user={user}
          isAdmin={isAdmin}
          showDescription
          loading={contentLoading}
          {...methods}
        />
      ) : (
        <EmptyView message="No event found!" />
      )}
      {event?.id && event.status === EventStatus.Published && (
        <CommentsModule targetType="EVENT" targetId={String(event.id)} />
      )}
    </LayoutModule>
  );
};

export default EventDetails;
