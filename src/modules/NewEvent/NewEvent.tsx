import React from 'react';

import { useAlert } from '@/context/AlertContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm, useWatch } from 'react-hook-form';
import { Box, CircularProgress, Grid2 as Grid, IconButton, Typography } from '@mui/material';
import FormTextField from '@/components/form/FormTextField';
import FormSelectField from '@/components/form/FormSelectField';
import { INewEventFormInput } from './NewEvent.types';
import Button from '@/components/core/Button';
import FormDateTimeField from '@/components/form/FormDateTimeField';
import {
  EventStatus,
  Photo,
  useCreateEventMutation,
  useGetEventDetailsQuery,
  usePublishEventMutation,
  useUpdateEventMutation,
} from '@/apollo/hooks';
import { paths } from '@/config/paths';
import TipTapTextEditor from '@/modules/TipTapTextEditor';
import {
  IconCurrencyRupee,
  IconDeviceFloppy,
  IconWorld,
  IconMapPin,
  IconPencil,
  IconUpload,
} from '@tabler/icons-react';
import { useApolloClient } from '@apollo/client';
import { EVENT_CATEGORIES, eventHostingmedium } from '@/constants/Events.constants';
import dayjs from 'dayjs';
import Image from 'next/image';
import { UnsplashImageSelector } from '../UnsplashImageSelector/UnsplashImamgeSelector';

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
  const [publishEvent, { loading: publishEventLoading }] = usePublishEventMutation();
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

  console.log('ZZ: getValues', getValues());

  const watchMedium = useWatch({ control, name: 'medium' });

  React.useEffect(() => {
    if (eventData && watchMedium === eventData?.getEventDetails?.medium) {
      setValue('location', eventData?.getEventDetails?.location || (watchMedium === 'online' ? 'http://' : ''));
    } else {
      setValue('location', watchMedium === 'online' ? 'http://' : '');
    }
  }, [watchMedium, eventData]);

  const onSubmit = React.useCallback(
    (data: INewEventFormInput) => {
      if (eventId) {
        if (!data?.cover) {
          showAlert({
            visible: true,
            type: 'error',
            message: 'Please select cover image',
          });
        }
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
              client.refetchQueries({
                include: ['getEventList'],
              });
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
          image: `https://jnvpjaa.org/assets/events/${data?.category}.jpg`,
          price: data?.price || 0,
          startDate: data?.startDate?.toISOString(),
          endDate: data?.endDate?.toISOString(),
          status: saveTypeRef.current === 'publish' ? EventStatus.Published : EventStatus.Draft,
        },
        onCompleted: async () => {
          client.refetchQueries({
            include: ['getEventList'],
          });
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
    [isPublishAllowed, crateEvent, router, client, eventId, publishEvent, updateEvent]
  );

  const saving = React.useMemo(() => {
    return updateEventLoading || loading || publishEventLoading;
  }, [loading, updateEventLoading, publishEventLoading]);

  if (eventDetailsLoading) {
    return (
      <Box my={3} width="100%" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <CircularProgress />
        <Typography>Loading event data...</Typography>
      </Box>
    );
  }

  console.log("ZZ: setValue('cover'", getValues('cover'));

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        width: '100%',
        py: 1,
        // p: 3,
        // display: 'flex',
        // flexDirection: 'column',
        // alignItems: 'center',
      }}
    >
      <Box display="flex" width="100%" mb={3} justifyContent="space-between" alignItems="center">
        <Typography variant="h2">{eventId ? 'Edit Event' : 'Create New Event'}</Typography>
        <Box display="flex" gap={2} alignItems="center">
          <Button
            // size="small"
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
            // size="small"
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
      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <FormTextField
            fullWidth
            id="title"
            label="Title"
            autoFocus
            control={control}
            disabled={saving}
            name="title"
            size="small"
            rules={{
              required: 'Required',
            }}
          />
        </Grid>
        <Grid
          size={{ xs: 12, md: 3 }}
          sx={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px dotted',
            borderColor: 'grey.500',
            borderRadius: '8px',
            // p: 2,
            cursor: 'pointer',
            maxHeight: 110,
            maxWidth: {
              xs: 200,
              md: '100%',
            },
            '&:hover img': {
              opacity: 0.4,
            },
          }}
          onClick={() => setSelectCoverImage(true)}
          gap={1}
        >
          {getValues('cover') ? (
            <>
              <Image
                src={getValues('cover')?.thumbUrl}
                width={200}
                height={100}
                layout="responsive"
                alt="cover"
                style={{ borderRadius: '6px', maxHeight: '100%' }}
              />
              <IconButton
                onClick={() => setSelectCoverImage(true)}
                size="small"
                sx={{
                  zIndex: 1,
                  position: 'absolute',
                  right: '4px',
                  top: '4px',
                  bgcolor: 'grey.200',
                  // border: '1px solid',
                  svg: { color: 'grey.900' },
                }}
              >
                <IconPencil size={18} />
              </IconButton>
            </>
          ) : (
            <Button title={getValues('cover') ? 'Change Cover Image' : 'Select Cover Image'} variant="text" />
          )}
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
            helperText="Write about the event in minimal words possible."
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Box display="flex" flexDirection="column">
            <Typography color="grey.600" variant="body1" fontSize={14}>
              Description (optional)
            </Typography>
            <TipTapTextEditor value="" onChange={(data) => setValue('description', data)} />
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
          onSelect={(image: Photo) => setValue('cover', image)}
        />
      )}
    </Box>
  );
};

export default NewEvent;
