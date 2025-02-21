'use client';

import React, { useState } from 'react';
import LayoutModule from '@/layouts/Layout';
import {
  useAttendEventMutation,
  useGetEventListQuery,
  useGetUserDetailsQuery,
  useVerifyEventMutation,
} from '@/apollo/hooks';
import { Grid2 as Grid, Typography } from '@mui/material';
import EventCard from '@/components/common/EventCard/EventCard';
import EmptyView from '@/components/common/EmptyView';
import { useAlert } from '@/context/AlertContext';
import { useAuth } from '@/context/AuthContext';
import { paths } from '@/config/paths';
import { useRouter } from 'next/router';
import { Plus, Ticket } from '@phosphor-icons/react';
import { useApolloClient } from '@apollo/client';

export default function Events() {
  const { redirectToSignin, user, isAdmin } = useAuth();
  const { showAlert } = useAlert();
  const router = useRouter();
  const client = useApolloClient();
  const { data: eventData, loading } = useGetEventListQuery();

  const [handleRSVP] = useAttendEventMutation();
  const [handleVerifyEvent] = useVerifyEventMutation();

  const listData = React.useMemo(() => {
    if (loading) {
      return new Array(6).fill({ id: '', title: '', description: '', startDate: '', medium: 'Online', online: false });
    }
    return eventData?.getEventList?.data || [];
  }, [loading, eventData]);

  const markImGoing = React.useCallback(
    (id: number) => {
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
                eventId: id,
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

  const verifyEvent = React.useCallback(
    (id: number) => {
      if (!user?.id) {
        redirectToSignin(true);
        return;
      }
      if (!isAdmin) {
        showAlert({
          visible: true,
          //  title: 'Are you Going?',
          type: 'error',
          message: 'Unauthorized access. Only admins can apporve events.',
        });
        return;
      }
      showAlert(
        {
          visible: true,
          title: `Apporve the Event`,
          type: 'loading',
          message: `The event is awaiting admin approval for publication. Please review and approve. Once published, it will be visible to all alumni.`,
          action: 'approve',
          okayButtonProps: {
            title: `Approve`,
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
            handleVerifyEvent({
              variables: {
                eventId: id,
                verified: true,
              },
              onCompleted: () => {
                client.refetchQueries({
                  include: ['getEventDetails'],
                });
                showAlert(
                  {
                    visible: true,
                    type: 'success',
                    title: `Event has been verified & published`,
                    message: `The event has been published and will be visible to all the users.`,
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
    [handleVerifyEvent, user?.id, isAdmin, redirectToSignin, showAlert]
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
              <EventCard
                event={ev}
                loading={!ev.id}
                markImGoing={markImGoing}
                user={user}
                isAdmin={isAdmin}
                verifyEvent={verifyEvent}
              />
            </Grid>
          ))
        ) : (
          <EmptyView
            message="No events available"
            buttonProps={{
              title: 'Create New Event',
              startIcon: <Plus size={16} />,
              onClick: () => router.push(paths.events.new),
            }}
          />
        )}
      </Grid>
    </LayoutModule>
  );
}
