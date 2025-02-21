import React from 'react';

import { useAlert } from '@/context/AlertContext';
import { useRouter } from 'next/router';
import { useForm, useWatch } from 'react-hook-form';
import { Box, CircularProgress, Grid2 as Grid, Typography } from '@mui/material';
import FormTextField from '@/components/form/FormTextField';
import FormSelectField from '@/components/form/FormSelectField';
import { INewEventFormInput } from './NewEvent.types';
import Button from '@/components/core/Button';
import FormDateTimeField from '@/components/form/FormDateTimeField';
import {
  useCreateEventMutation,
  useGetEventDetailsQuery,
  usePublishEventMutation,
  useUpdateEventMutation,
} from '@/apollo/hooks';
import { paths } from '@/config/paths';
import TipTapTextEditor from '@/modules/TipTapTextEditor';
import { CurrencyInr, FloppyDiskBack, MapPinLine } from '@phosphor-icons/react';
import { useApolloClient } from '@apollo/client';
import { alumniEventCategories, eventHostingmedium } from '@/constants/Events.constants';

const NewEvent = () => {
  const router = useRouter();
  const { eventId } = router.query;
  const client = useApolloClient();
  const { showAlert } = useAlert();
  const saveTypeRef = React.useRef('draft');

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
      startDate: null,

      endDate: null,
    },
  });

  React.useEffect(() => {
    if (eventData?.getEventDetails?.id) {
      reset({
        title: eventData?.getEventDetails?.title,
        summary: eventData?.getEventDetails?.summary,
        description: eventData?.getEventDetails?.description,
        startDate: eventData?.getEventDetails?.startDate,
        endDate: eventData?.getEventDetails?.endDate,
        medium: eventData?.getEventDetails?.medium,
        category: eventData?.getEventDetails?.category,
        tags: eventData?.getEventDetails?.tags?.join(','),
        price: eventData?.getEventDetails?.price,
      });
    }
  }, [eventData, reset]);

  console.log('ZZ: getValues', getValues());

  const watchMedium = useWatch({ control, name: 'medium' });

  const onSubmit = React.useCallback(
    (data: INewEventFormInput) => {
      if (eventId) {
        updateEvent({
          variables: {
            eventId: parseInt(eventId as string, 0),
            ...data,
          },
          onCompleted: () => {
            if (saveTypeRef.current === 'publish') {
              publishEvent({
                variables: {
                  eventId: parseInt(eventId as string, 0),
                  status: 'published',
                },
                onCompleted: () => {
                  client.refetchQueries({
                    include: ['getEventList'],
                  });
                  router.push(paths.events.root);
                },
                onError: (err) => {
                  showAlert({
                    visible: true,
                    type: 'error',
                    message: err?.message || 'ata saved bu the publish failed.',
                  });
                },
              });
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
          price: data?.price || 0,
          isPublish: saveTypeRef.current === 'publish',
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
    [crateEvent, router, client, eventId]
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
        <Typography variant="h2">Create New Event</Typography>
        <Box display="flex" gap={2} alignItems="center">
          <Button
            // size="small"
            title="Save Draft"
            onClick={() => {
              saveTypeRef.current = 'draft';
              handleSubmit(onSubmit);
            }}
            startIcon={<FloppyDiskBack size={16} />}
            type="submit"
            variant="outlined"
            disabled={saving}
            loading={saveTypeRef.current === 'draft' && saving}
          />
          <Button
            // size="small"
            title="Save & Publish"
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
        <Grid size={{ xs: 12 }}>
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
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Box display="flex" flexDirection="column">
            <Typography color="grey.600" variant="body1" fontSize={14}>
              Description
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
            fullWidth
            id="location"
            label={watchMedium === 'online' ? 'URL' : 'Location'}
            control={control}
            disabled={saving}
            startAdornment={watchMedium === 'online' ? 'https://' : <MapPinLine size={18} />}
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
            options={alumniEventCategories}
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
            startAdornment={<CurrencyInr size={18} />}
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
    </Box>
  );
};

export default NewEvent;
