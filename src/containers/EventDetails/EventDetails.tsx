import { Event, useGetEventDetailsQuery } from '@/apollo/hooks';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import EmptyView from '@/components/common/EmptyView';
import EventCard from '@/components/common/EventCard/EventCard';
import SingleEventView from '@/components/common/SingleEventView';
import LayoutModule from '@/layouts/Layout';
import { Box } from '@mui/material';
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
  // @ts-expect-error type-error
  const event: Event = React.useMemo(() => data?.getEventDetails, [data]);

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
        <Breadcrumbs items={breadcrumbsList} loading={loading} sx={{ display: { xs: 'none', sm: 'flex' } }} />
        {/* {buttonProps && (
          <Box display="flex" alignItems="center" gap={1.5} ml="auto">
            {buttonProps.map((btProps: ButtonProps, index: number) => (
              <Button key={`single-blog-btn-${index}`} {...btProps} />
            ))}
          </Box>
        )} */}
      </Box>
      {loading || event?.id ? (
        <SingleEventView event={event} showDescription loading={loading} />
      ) : (
        <EmptyView message="No event found!" />
      )}
    </LayoutModule>
  );
};

export default EventDetails;
