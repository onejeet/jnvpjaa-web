'use client';

import React from 'react';

import { useAlert } from '@/context/AlertContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm, useWatch } from 'react-hook-form';
import { Box, CircularProgress, Grid2 as Grid, Typography } from '@mui/material';
import FormTextField from '@/components/form/FormTextField';
import FormSelectField from '@/components/form/FormSelectField';
import { INewEventFormInput } from './NewEvent.types';
import Button from '@/components/core/Button';
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
import { IconCurrencyRupee, IconDeviceFloppy, IconWorld, IconMapPin, IconPhoto } from '@tabler/icons-react';
// import { useApolloClient } from '@apollo/client';
import { EVENT_CATEGORIES, eventHostingmedium } from '@/constants/Events.constants';
import dayjs from 'dayjs';
import Image from 'next/image';
import { UnsplashImageSelector } from '../UnsplashImageSelector/UnsplashImamgeSelector';
import { useApolloClient } from '@apollo/client';

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
          image: `https://assets.jnvpjaa.org/events/${data?.category}.jpg`,
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
      <Box my={3} width="100%" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <CircularProgress />
        <Typography>Loading event data...</Typography>
      </Box>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%', p: { xs: 2, sm: 3, md: 4 } }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: 2,
          mb: 4,
        }}
      >
        <Box>
          <Typography variant="overline" sx={{ color: 'text.secondary', letterSpacing: '0.1em' }}>
            Community events
          </Typography>
          <Typography component="h1" variant="h2" sx={{ mt: 0.25 }}>
            {eventId ? 'Edit event' : 'Create an event'}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
            Share the details members need to join.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
          <Button
            title={eventData?.getEventDetails?.status === EventStatus.Published ? 'Unpublish' : 'Save'}
            onClick={() => {
              saveTypeRef.current = 'draft';
              handleSubmit(onSubmit);
            }}
            startIcon={<IconDeviceFloppy size={16} />}
            type="submit"
            color={eventData?.getEventDetails?.status === EventStatus.Published ? 'error' : 'primary'}
            variant="outlined"
            disabled={saving}
            loading={saveTypeRef.current === 'draft' && saving}
          />
          <Button
            title={isPublishAllowed ? 'Save & Publish' : 'Update'}
            onClick={() => {
              saveTypeRef.current = 'publish';
              handleSubmit(onSubmit);
            }}
            action="save"
            type="submit"
            color="success"
            disabled={saving}
            loading={saveTypeRef.current === 'publish' && saving}
          />
        </Box>
      </Box>
      <Grid container spacing={{ xs: 2.5, md: 3 }}>
        <Grid size={{ xs: 12 }}>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            The essentials
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            These details appear in the event listing.
          </Typography>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <FormTextField
            fullWidth
            id="title"
            label="Event title"
            autoFocus
            control={control}
            disabled={saving}
            name="title"
            rules={{
              required: 'Required',
            }}
          />
        </Grid>
        <Grid
          size={{ xs: 12, md: 3 }}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 0.75,
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            Cover image
          </Typography>
          <Box
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1.5,
              minHeight: 110,
              p: 1.25,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              flexWrap: 'wrap',
            }}
          >
            {cover?.thumbUrl && (
              <Image
                src={cover.thumbUrl}
                width={90}
                height={64}
                alt="Selected event cover"
                style={{ borderRadius: 6, objectFit: 'cover' }}
              />
            )}
            <Button
              title={cover ? 'Change image' : 'Choose image'}
              startIcon={<IconPhoto size={18} />}
              variant="outlined"
              size="small"
              onClick={() => setSelectCoverImage(true)}
            />
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 9 }}>
          <FormTextField
            fullWidth
            id="summary"
            label="Summary"
            multiline
            minRows={3}
            control={control}
            disabled={saving}
            name="summary"
            // size="small"
            rules={{
              required: 'Required',
            }}
            helperText="A short introduction for the event listing."
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Typography variant="subtitle2" sx={{ mb: 0.5, fontWeight: 600 }}>
            Full description{' '}
            <Box component="span" sx={{ color: 'text.secondary', fontWeight: 400 }}>
              (optional)
            </Box>
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
            Add the agenda, audience, and anything participants should prepare.
          </Typography>
          <TipTapTextEditor
            value={description}
            onChange={(data) => setValue('description', data, { shouldDirty: true })}
            disabled={saving}
            height="clamp(340px, 48vh, 480px)"
            placeholder="Describe the event..."
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 3, mt: 0.5 }}>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              When and where
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Set the date and how members can join.
            </Typography>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <FormDateTimeField
            control={control}
            name="startDate"
            inputProps={{
              label: 'Start Date',
            }}
            rules={{
              required: 'Required',
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <FormDateTimeField
            control={control}
            name="endDate"
            inputProps={{
              label: 'End Date',
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <FormSelectField
            control={control}
            name="medium"
            selectProps={{
              size: 'small',
              id: 'hosting medium',
              disabled: saving,
            }}
            options={eventHostingmedium}
            rules={{
              required: 'Required',
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <FormTextField
            key={watchMedium}
            fullWidth
            id="location"
            label={watchMedium === 'online' ? 'URL' : 'Location'}
            control={control}
            disabled={saving}
            startAdornment={watchMedium === 'online' ? <IconWorld size={18} /> : <IconMapPin size={18} />}
            name="location"
            size="small"
            rules={{
              required: 'Required',
              pattern:
                watchMedium === 'online'
                  ? {
                      value: /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-_]+\.)+[a-zA-Z]{2,}(:\d{1,5})?(\/.*)?$/,
                      message: 'Enter a valid URL',
                    }
                  : undefined,
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <FormSelectField
            control={control}
            name="category"
            selectProps={{
              //label: 'Category',
              size: 'small',
              id: 'medium',
              disabled: saving,
            }}
            options={EVENT_CATEGORIES}
            rules={{
              required: 'Required',
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <FormTextField
            fullWidth
            id="price"
            label="Price"
            control={control}
            disabled={saving}
            startAdornment={<IconCurrencyRupee size={18} />}
            name="price"
            size="small"
            type="number"
            helperText="Optional"
            // rules={{
            //   required: 'Required',
            // }}
          />
        </Grid>
      </Grid>
      {selectCoverImage && (
        <UnsplashImageSelector
          open={selectCoverImage}
          onClose={() => setSelectCoverImage(false)}
          defaultKeyword={getValues('title')}
          onSelect={(image: Photo) => setValue('cover', image, { shouldDirty: true })}
        />
      )}
    </Box>
  );
};

export default NewEvent;
