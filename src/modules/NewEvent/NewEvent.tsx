'use client';

import React from 'react';

import { useAlert } from '@/context/AlertContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm, useWatch } from 'react-hook-form';
import { Box, CircularProgress, Grid2 as Grid, Typography } from '@mui/material';
import FormTextField from '@/components/form/FormTextField';
import FormSelectField from '@/components/form/FormSelectField';
import FormCurrencyInput from '@/components/form/FormCurrencyInput';
import { INewEventFormInput } from './NewEvent.types';
import Button from '@/components/core/Button';
import {
  CoverField,
  EditorField,
  EditorPanel,
  EditorSection,
  EditorShell,
  EditorTitleField,
  PublishPanel,
} from '@/components/editor/EditorShell';
import FormDateTimeField from '@/components/form/FormDateTimeField';
import {
  EventStatus,
  GetEventListDocument,
  Photo,
  useCreateEventMutation,
  useGetEventDetailsQuery,
  useUpdateEventMutation,
} from '@/apollo/hooks';
import { paths } from '@/config/paths';
import TipTapTextEditor from '@/modules/TipTapTextEditor';
import { IconWorld, IconMapPin } from '@tabler/icons-react';
// import { useApolloClient } from '@apollo/client';
import { EVENT_CATEGORIES, eventHostingmedium } from '@/constants/Events.constants';
import dayjs from 'dayjs';
import { UnsplashImageSelector } from '../UnsplashImageSelector/UnsplashImamgeSelector';
import { useApolloClient } from '@apollo/client';
import { assetUrl } from '@/config/tenant';

const NewEvent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const eventId = searchParams.get('id');
  const client = useApolloClient();

  const { showAlert } = useAlert();
  const saveTypeRef = React.useRef('draft');
  const [selectCoverImage, setSelectCoverImage] = React.useState<boolean>(false);
  const [crateEvent, { loading }] = useCreateEventMutation();
  const [updateEvent, { loading: updateEventLoading }] = useUpdateEventMutation();
  const { data: eventData, loading: eventDetailsLoading } = useGetEventDetailsQuery({
    skip: !eventId,
    variables: {
      id: parseInt(eventId as string, 10),
    },
  });

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    getValues,
    formState: { errors },
  } = useForm<INewEventFormInput>({
    defaultValues: {
      medium: 'online',
      description: '',
    },
  });

  React.useEffect(() => {
    if (eventData?.getEventDetails?.id) {
      reset({
        title: eventData?.getEventDetails?.title,
        summary: eventData?.getEventDetails?.summary,
        description: eventData?.getEventDetails?.description,
        startDate: dayjs(eventData?.getEventDetails?.startDate),
        endDate: dayjs(eventData?.getEventDetails?.endDate),
        medium: eventData?.getEventDetails?.medium,
        location: eventData?.getEventDetails?.location,
        category: eventData?.getEventDetails?.category,
        tags: eventData?.getEventDetails?.tags?.join(','),
        price: eventData?.getEventDetails?.price,
        cover: eventData?.getEventDetails?.cover,
      });
    }
  }, [eventData, reset]);

  const isPublishAllowed = React.useMemo(() => {
    return (
      !eventData?.getEventDetails?.status ||
      eventData?.getEventDetails?.status === EventStatus.Draft ||
      eventData?.getEventDetails?.status === EventStatus.RequestChanges
    );
  }, [eventData]);

  const watchMedium = useWatch({ control, name: 'medium' });
  const description = useWatch({ control, name: 'description' }) || '';
  const cover = useWatch({ control, name: 'cover' });

  React.useEffect(() => {
    if (eventData && watchMedium === eventData?.getEventDetails?.medium) {
      setValue('location', eventData?.getEventDetails?.location || (watchMedium === 'online' ? 'http://' : ''));
    } else {
      setValue('location', watchMedium === 'online' ? 'http://' : '');
    }
  }, [watchMedium, eventData, setValue]);

  const onSubmit = React.useCallback(
    (data: INewEventFormInput) => {
      if (eventId) {
        const variables: any = {
          eventId: parseInt(eventId as string, 0),
          ...data,
          startDate: data?.startDate?.toISOString(),
          endDate: data?.endDate?.toISOString(),
        };

        if (isPublishAllowed && saveTypeRef.current === 'publish') {
          variables.status = EventStatus.Published;
        }

        if (!isPublishAllowed && saveTypeRef.current === 'draft') {
          variables.status = EventStatus.Draft;
        }

        updateEvent({
          variables,
          onCompleted: () => {
            if (saveTypeRef.current === 'publish') {
              client.cache.evict({ fieldName: 'getEventList' });
              client.cache.gc();
              router.push(paths.events.root);
            }
          },
          onError: (err) => {
            showAlert({
              visible: true,
              type: 'error',
              message: err?.message || 'Something went wrong.',
            });
          },
        });
        return;
      }
      crateEvent({
        variables: {
          ...data,
          image: assetUrl(`/events/${data?.category}.jpg`),
          price: data?.price || 0,
          startDate: data?.startDate?.toISOString(),
          endDate: data?.endDate?.toISOString(),
          status: saveTypeRef.current === 'publish' ? EventStatus.Published : EventStatus.Draft,
        },
        onCompleted: async () => {
          client.cache.evict({ fieldName: 'getEventList' }); // Wipe from cache
          client.cache.gc();
          router.push(paths.events.root);
        },
        onError: (err) => {
          showAlert({
            visible: true,
            type: 'error',
            message: err?.message || 'Something went wrong.',
          });
        },
      });
    },
    [isPublishAllowed, crateEvent, router, client, eventId, updateEvent, showAlert]
  );

  const saving = React.useMemo(() => {
    return updateEventLoading || loading;
  }, [loading, updateEventLoading]);

  if (eventDetailsLoading) {
    return (
      <Box my={8} display="flex" flexDirection="column" alignItems="center" gap={1.5}>
        <CircularProgress size={28} />
        <Typography color="text.secondary">Loading the event…</Typography>
      </Box>
    );
  }

  const status = eventData?.getEventDetails?.status;
  const isLive = status === EventStatus.Published;
  const state = !status
    ? { label: 'New event', tone: 'neutral' as const, note: 'Not saved yet. Drafts are visible only to you.' }
    : isLive
      ? { label: 'Published', tone: 'live' as const, note: 'Listed on the events page for all members.' }
      : status === EventStatus.RequestChanges
        ? { label: 'Changes requested', tone: 'attention' as const, note: 'Make the edits, then publish again.' }
        : status === EventStatus.PendingApproval
          ? {
              label: 'Waiting for review',
              tone: 'scheduled' as const,
              note: 'An admin reviews it before it goes live.',
            }
          : status === EventStatus.Closed
            ? { label: 'Closed', tone: 'neutral' as const, note: 'This event has ended.' }
            : { label: 'Draft', tone: 'neutral' as const, note: 'Only you can see this event.' };

  return (
    <EditorShell
      onSubmit={handleSubmit(onSubmit)}
      heading={eventId ? 'Edit event' : 'Create an event'}
      description="Give members everything they need to decide, plan and show up."
      publish={
        <PublishPanel status={state.label} tone={state.tone} note={state.note}>
          <Button
            title={isPublishAllowed ? 'Publish' : 'Update'}
            type="submit"
            onClick={() => (saveTypeRef.current = 'publish')}
            disabled={saving}
            loading={saveTypeRef.current === 'publish' && saving}
          />
          <Button
            title={isLive ? 'Unpublish' : 'Save draft'}
            type="submit"
            variant="outlined"
            color={isLive ? 'error' : 'primary'}
            onClick={() => (saveTypeRef.current = 'draft')}
            disabled={saving}
            loading={saveTypeRef.current === 'draft' && saving}
          />
        </PublishPanel>
      }
      aside={
        <EditorPanel title="Event settings">
          <EditorField label="Category">
            <FormSelectField
              control={control}
              name="category"
              label="Choose a category"
              selectProps={{ size: 'small', disabled: saving }}
              options={EVENT_CATEGORIES}
              rules={{ required: 'Pick a category' }}
            />
          </EditorField>
          <EditorField label="Ticket price" optional="Leave empty if free">
            <FormCurrencyInput fullWidth id="price" control={control} disabled={saving} name="price" size="small" />
          </EditorField>
          <EditorField label="Cover image" optional>
            <CoverField
              src={cover?.url || cover?.thumbUrl}
              alt={cover?.altDescription || undefined}
              onPick={() => setSelectCoverImage(true)}
              disabled={saving}
            />
          </EditorField>
        </EditorPanel>
      }
    >
      <EditorTitleField
        control={control}
        name="title"
        placeholder="Name your event"
        ariaLabel="Event title"
        disabled={saving}
        rules={{ required: 'Add a title' }}
      />
      <EditorField label="Summary" hint="One or two lines shown on the event card." sx={{ mt: 3 }}>
        <FormTextField
          fullWidth
          id="summary"
          multiline
          minRows={2}
          control={control}
          disabled={saving}
          name="summary"
          placeholder="e.g. An evening of stories and dinner with the 2004 batch"
          rules={{ required: 'Add a short summary' }}
        />
      </EditorField>

      <EditorSection title="When and where">
        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <EditorField label="Starts">
              <FormDateTimeField
                control={control}
                name="startDate"
                inputProps={{ label: 'Start date and time', size: 'small', fullWidth: true }}
                rules={{ required: 'Pick a start time' }}
              />
            </EditorField>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <EditorField label="Ends" optional>
              <FormDateTimeField
                control={control}
                name="endDate"
                inputProps={{ label: 'End date and time', size: 'small', fullWidth: true }}
              />
            </EditorField>
          </Grid>
          <Grid size={{ xs: 12, sm: 5 }}>
            <EditorField label="Format">
              <FormSelectField
                control={control}
                name="medium"
                selectProps={{ size: 'small', id: 'hosting medium', disabled: saving }}
                options={eventHostingmedium}
                rules={{ required: 'Pick a format' }}
              />
            </EditorField>
          </Grid>
          <Grid size={{ xs: 12, sm: 7 }}>
            <EditorField label={watchMedium === 'online' ? 'Meeting link' : 'Venue'}>
              <FormTextField
                key={watchMedium}
                fullWidth
                id="location"
                control={control}
                disabled={saving}
                startAdornment={watchMedium === 'online' ? <IconWorld size={18} /> : <IconMapPin size={18} />}
                name="location"
                size="small"
                placeholder={watchMedium === 'online' ? 'https://meet.google.com/…' : 'Venue name and city'}
                rules={{
                  required: watchMedium === 'online' ? 'Add the meeting link' : 'Add the venue',
                  pattern:
                    watchMedium === 'online'
                      ? {
                          value: /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-_]+\.)+[a-zA-Z]{2,}(:\d{1,5})?(\/.*)?$/,
                          message: 'Enter a valid link',
                        }
                      : undefined,
                }}
              />
            </EditorField>
          </Grid>
        </Grid>
      </EditorSection>

      <EditorSection
        title="About the event"
        hint="Agenda, who it is for, and anything people should bring or prepare. Optional."
      >
        <TipTapTextEditor
          value={description}
          onChange={(data) => setValue('description', data, { shouldDirty: true })}
          disabled={saving}
          height="clamp(320px, 46vh, 480px)"
          placeholder="Describe the event…"
        />
      </EditorSection>
      {selectCoverImage && (
        <UnsplashImageSelector
          open={selectCoverImage}
          onClose={() => setSelectCoverImage(false)}
          defaultKeyword={getValues('title')}
          onSelect={(image: Photo) => setValue('cover', image, { shouldDirty: true })}
        />
      )}
    </EditorShell>
  );
};

export default NewEvent;
