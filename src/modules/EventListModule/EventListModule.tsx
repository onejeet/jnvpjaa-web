'use client';

import React, { useState } from 'react';
import LayoutModule from '@/layouts/Layout';
import {
  EventStatus,
  ListInput,
  useAttendEventMutation,
  useGetEventListQuery,
  useGetUserDetailsQuery,
  usePublishEventMutation,
  useVerifyEventMutation,
} from '@/apollo/hooks';
import { Box, Checkbox, FormControlLabel, Grid2 as Grid, Typography } from '@mui/material';
import EventCard from '@/components/common/EventCard/EventCard';
import EmptyView from '@/components/common/EmptyView';
import { useAlert } from '@/context/AlertContext';
import { useAuth } from '@/context/AuthContext';
import { paths } from '@/config/paths';
import { useRouter } from 'next/router';
import { Plus, Ticket } from '@phosphor-icons/react';
import { useApolloClient } from '@apollo/client';
import Button from '@/components/core/Button';
import { isDefined } from '@/utils/helpers';

interface EventListModuleProps {
  filter: ListInput['filter'];
  skip?: boolean;
  loading?: boolean;
  isCreateAllowed?: boolean;
}

const EventListModule: React.FC<EventListModuleProps> = ({
  filter,
  skip,
  loading: propLoading,
  isCreateAllowed = true,
}) => {
  const { redirectToSignin, user, isAdmin } = useAuth();
  const { showAlert } = useAlert();
  const router = useRouter();
  const client = useApolloClient();
  const { data: eventData, loading } = useGetEventListQuery({
    skip,
    variables: {
      options: {
        filter,
      },
    },
    notifyOnNetworkStatusChange: true,
  });

  const [handleRSVP] = useAttendEventMutation();
  const [handleVerifyEvent] = useVerifyEventMutation();
  const [publishEvent, { loading: publishEventLoading }] = usePublishEventMutation();

  const listData = React.useMemo(() => {
    if (loading || propLoading) {
      return new Array(6).fill({ id: '', title: '', description: '', startDate: '', medium: 'Online', online: false });
    }
    return eventData?.getEventList?.data || [];
  }, [loading, eventData, propLoading]);

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
              onError: (err) => {
                showAlert(
                  {
                    visible: true,
                    type: 'error',
                    title: `RSVP failed. Try again`,
                    message: err?.message || 'Something went wrong.',
                    action: 'error',
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
                status: EventStatus.Published,
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
              onError: (err) => {
                showAlert(
                  {
                    visible: true,
                    type: 'error',
                    title: `Event publishing failed. Try again`,
                    message: err?.message || 'Something went wrong.',
                    action: 'error',
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
    [handleVerifyEvent, user?.id, client, isAdmin, redirectToSignin, showAlert]
  );

  const onEditEvent = React.useCallback(
    (id: number) => {
      router.push({
        pathname: paths.events.new,
        query: {
          id,
        },
      });
    },
    [router]
  );

  const onPublishEvent = React.useCallback(
    (id: number) => {
      if (!user?.id) {
        redirectToSignin(true);
        return;
      }
      showAlert(
        {
          visible: true,
          title: `Publish the Event`,
          type: 'loading',
          message: isAdmin
            ? `The event will be open for RSVP to all users upon publication.`
            : `The event is in draft mode. Once published the admins will be notified for apporval.`,
          action: 'approve',
          okayButtonProps: {
            title: `Publish Now`,
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
            publishEvent({
              variables: {
                eventId: id,
                status: EventStatus.Published,
              },
              onCompleted: () => {
                client.refetchQueries({
                  include: ['getEventDetails'],
                });
                showAlert(
                  {
                    visible: true,
                    type: 'success',
                    title: isAdmin ? `Published` : `Published. Awaiting admin approval`,
                    message: isAdmin
                      ? `The event has been published successfully.`
                      : `The event has been published and sent for apporval to admin. Once apporved, will be visible to all the alumni.`,
                    action: 'success',
                  },
                  true
                );
              },
              onError: (err) => {
                showAlert(
                  {
                    visible: true,
                    type: 'error',
                    title: `Event publishing failed. Try again`,
                    message: err?.message || 'Something went wrong.',
                    action: 'error',
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
    [publishEvent, user?.id, redirectToSignin, client, showAlert]
  );

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
                  startIcon: <Plus size={16} />,
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
