'use client';

import React, { useState } from 'react';
import LayoutModule from '@/layouts/Layout';
import { useAttendEventMutation, useGetEventListQuery, useGetUserDetailsQuery } from '@/apollo/hooks';
import { Grid2 as Grid, Typography } from '@mui/material';
import EventCard from '@/components/common/EventCard/EventCard';
import EmptyView from '@/components/common/EmptyView';
import { useAlert } from '@/context/AlertContext';
import { useAuth } from '@/context/AuthContext';

export default function Events() {
  const { redirectToSignin, user } = useAuth();
  const { showAlert } = useAlert();
  const { data: eventData, loading } = useGetEventListQuery();

  const [handleRSVP] = useAttendEventMutation();

  const listData = React.useMemo(() => {
    if (loading) {
      return new Array(6).fill({ id: '', title: '', description: '', startDate: '', medium: 'Online', online: false });
    }
    return eventData?.getEventList?.data || [];
  }, [loading, eventData]);

  const markImGoing = React.useCallback(
    (id: number | string) => {
      if (!user?.id) {
        redirectToSignin(true);
        return;
      }
      showAlert(
        {
          visible: true,
          title: `You're almost in!`,
          type: 'loading',
          message: `Confirm your RSVP now to secure your spot at the event.`,
          action: 'approve',
          okayButtonProps: {
            title: `I'm Going`,
          },
          onOkay: () => {
            showAlert(
              {
                visible: true,
                //  title: 'Are you Going?',
                type: 'loading',
                message: 'Please Wait, The status is being updated.',
                action: 'loading',
              },
              true
            );
            handleRSVP({
              variables: {
                eventId: id as string,
              },
              onCompleted: () => {
                showAlert(
                  {
                    visible: true,
                    type: 'success',
                    title: `You're on the list!`,
                    message: `You're on the list! Get ready for an amazing event.`,
                    action: 'success',
                  },
                  true
                );
              },
            });
          },
        },
        true
      );
    },
    [handleRSVP, showAlert, user, redirectToSignin]
  );

  return (
    <LayoutModule
      disableCover
      title={`Events • Alumni Network of JNV Paota, Jaipur`}
      //   containerProps={{ sx: { py: 2 } }}
    >
      <Typography variant="h1" textAlign="center">
        Events
      </Typography>
      <Typography color="grey.800" mb={3} textAlign="center">
        List of all the upcoming events.
      </Typography>
      <Grid container spacing={3}>
        {listData?.length > 0 ? (
          listData?.map((ev: any, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={`events-${ev.title}-${index}`}>
              <EventCard event={ev} loading={!ev.id} markImGoing={markImGoing} />
            </Grid>
          ))
        ) : (
          <EmptyView />
        )}
      </Grid>
    </LayoutModule>
  );
}
