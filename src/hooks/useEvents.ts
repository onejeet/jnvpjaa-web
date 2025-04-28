'use client';

import React from 'react';
import {
  EventStatus,
  useAttendEventMutation,
  usePublishEventMutation,
  User,
  useVerifyEventMutation,
} from '@/apollo/hooks';
import { paths } from '@/config/paths';
import { useAlert } from '@/context/AlertContext';
import { useAuth } from '@/context/AuthContext';
import { useApolloClient } from '@apollo/client';
import { useRouter } from 'next/navigation';

interface IPayload {
  user?: User;
}

const useEvents = ({ user }: IPayload) => {
  const { redirectToSignin, isAdmin } = useAuth();
  const { showAlert } = useAlert();
  const router = useRouter();
  const client = useApolloClient();

  const [handleRSVP] = useAttendEventMutation();
  const [handleVerifyEvent] = useVerifyEventMutation();
  const [publishEvent, { loading: publishEventLoading }] = usePublishEventMutation();

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
                client.cache.evict({ fieldName: 'getEventList' });
                client.cache.evict({ fieldName: 'getEventDetails' });
                client.cache.gc();
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
                client.cache.evict({ fieldName: 'getEventList' });
                client.cache.evict({ fieldName: 'getEventDetails' });
                client.cache.gc();
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
      const targetUrl = `${paths.events.new}?id=${id}`;
      router.push(targetUrl);
    },
    [router]
  );

  const onPublishEvent = React.useCallback(
    (id: number, status?: EventStatus) => {
      if (!user?.id) {
        redirectToSignin(true);
        return;
      }
      const isMovingToDraft = status === EventStatus.Draft;
      showAlert(
        {
          visible: true,
          title: isMovingToDraft ? 'Move Back to Draft' : `Publish the Event`,
          type: 'loading',
          message: isMovingToDraft
            ? 'The event will be moved back to draft mode for user to make changes and publish again.'
            : isAdmin
              ? `The event will be open for RSVP to all users upon publication.`
              : `The event is in draft mode. Once published the admins will be notified for apporval.`,
          action: 'approve',
          okayButtonProps: {
            title: isMovingToDraft ? `Move to Draft` : `Publish Now`,
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
                status: status || EventStatus.Published,
              },
              onCompleted: () => {
                client.cache.evict({ fieldName: 'getEventList' });
                client.cache.evict({ fieldName: 'getEventDetails' });
                client.cache.gc();
                showAlert(
                  {
                    visible: true,
                    type: 'success',
                    title: isMovingToDraft
                      ? 'Moved to Draft'
                      : isAdmin
                        ? `Published`
                        : `Published. Awaiting admin approval`,
                    message: isMovingToDraft
                      ? 'The event has been moved to draft successfully.'
                      : isAdmin
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
                    title: isMovingToDraft ? `Event failed to move to draft` : `Event publishing failed. Try again`,
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
    [publishEvent, user?.id, redirectToSignin, client, showAlert, isAdmin]
  );
  return {
    markImGoing,
    verifyEvent,
    onEditEvent,
    onPublishEvent,
  };
};

export default useEvents;
