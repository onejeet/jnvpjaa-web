import React from 'react';

import { useAlert } from '@/context/AlertContext';
import { useRouter } from 'next/router';
import { useForm, useWatch } from 'react-hook-form';
import { Box, CircularProgress, Divider, Grid2 as Grid, Typography } from '@mui/material';
import FormTextField from '@/components/form/FormTextField';
import FormSelectField from '@/components/form/FormSelectField';
import { INewEventFormInput } from './NewBlog.types';
import Button from '@/components/core/Button';
import {
  EventStatus,
  useCreateEventMutation,
  useGetEventDetailsQuery,
  usePublishEventMutation,
  useUpdateEventMutation,
} from '@/apollo/hooks';
import { paths } from '@/config/paths';
import TipTapTextEditor from '@/modules/TipTapTextEditor';
import { FloppyDiskBack } from '@phosphor-icons/react';
import { useApolloClient } from '@apollo/client';
import dayjs from 'dayjs';
import { BLOG_CATEGORIES } from '@/constants/Blog.constants';

const NewBlog = () => {
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
      });
    }
  }, [eventData, reset]);

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
        updateEvent({
          variables: {
            eventId: parseInt(eventId as string, 0),
            ...data,
            startDate: data?.startDate?.toISOString(),
            endDate: data?.endDate?.toISOString(),
          },
          onCompleted: () => {
            if (saveTypeRef.current === 'publish') {
              publishEvent({
                variables: {
                  eventId: parseInt(eventId as string, 0),
                  status: EventStatus.Published,
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
          image: `https://jnvpjaa.org/assets/events/${data?.category}.jpg`,
          price: data?.price || 0,
          startDate: data?.startDate?.toISOString(),
          endDate: data?.endDate?.toISOString(),
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
    [crateEvent, router, client, eventId, publishEvent, updateEvent]
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
        p: 3,
        // p: 3,
        // display: 'flex',
        // flexDirection: 'column',
        // alignItems: 'center',
      }}
    >
      <Grid container spacing={3}>
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
            options={BLOG_CATEGORIES}
            rules={{
              required: 'Required',
            }}
          />
        </Grid>
        <Box component={Grid} size={{ xs: 12, md: 6 }} display="flex" gap={2} alignItems="center" justifyContent="end">
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
        <Grid size={{ xs: 12 }}>
          <FormTextField
            fullWidth
            id="title"
            // label="Title"
            autoFocus
            multiline
            minRows={1}
            control={control}
            disabled={saving}
            name="title"
            size="small"
            placeholder="Title"
            variant="standard"
            InputProps={{
              disableUnderline: true,
              sx: { fontSize: '2rem', fontWeight: 500, fontFamily: 'Playfair Display', padding: 0, px: 2 }, // Custom styling
            }}
            sx={{
              backgroundColor: 'transparent', // Ensure it blends in
            }}
            rules={{
              required: 'Required',
            }}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Divider />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Box display="flex" flexDirection="column">
            <TipTapTextEditor
              value=""
              onChange={(data) => setValue('description', data)}
              sx={{
                border: 'none',
                '& .tiptap': {
                  px: 2,
                  outline: 'none',
                  minHeight: 300,
                },
              }}
              toolbarProps={{ sx: { borderRadius: '40px' } }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NewBlog;
