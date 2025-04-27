'use client';

import { Event, useGetEventDetailsQuery } from '@/apollo/hooks';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import EmptyView from '@/components/common/EmptyView';
import SingleEventView from '@/components/common/SingleEventView';
import { useAuth } from '@/context/AuthContext';
import useEvents from '@/hooks/useEvents';
import LayoutModule from '@/layouts/Layout';
import { Box } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

interface EventDetailsProps {
  event: Event;
}

const EventDetails: React.FC<EventDetailsProps> = ({ event: initialData }) => {
  // const searchParams = useSearchParams();
  const { user, isAdmin } = useAuth();
  // const id = searchParams.get('id');
  const methods = useEvents({ user });
  const loading = false;
  // const { data, loading } = useGetEventDetailsQuery({
  //   skip: !id,
  //   variables: {
  //     id: parseInt(id as string, 10),
  //   },
  // });

  const event: Event = React.useMemo(() => initialData, [initialData]);

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
    <LayoutModule disableCover title={`${event?.title || 'Event'} • Alumni Network of JNV Paota, Jaipur`}>
      <Box mb={1} display="flex" justifyContent="start" alignItems="center">
        <Breadcrumbs items={breadcrumbsList} loading={loading} />
        {/* {buttonProps && (
          <Box display="flex" alignItems="center" gap={1.5} ml="auto">
            {buttonProps.map((btProps: ButtonProps, index: number) => (
              <Button key={`single-blog-btn-${index}`} {...btProps} />
            ))}
          </Box>
        )} */}
      </Box>
      {loading || event?.id ? (
        <SingleEventView event={event} user={user} isAdmin={isAdmin} showDescription loading={loading} {...methods} />
      ) : (
        <EmptyView message="No event found!" />
      )}
    </LayoutModule>
  );
};

export default EventDetails;
