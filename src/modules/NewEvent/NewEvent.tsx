import React from 'react';

import { useAlert } from '@/context/AlertContext';
import { useRouter } from 'next/router';
import { useForm, useWatch } from 'react-hook-form';
import { Box, Grid2 as Grid, Typography } from '@mui/material';
import FormTextField from '@/components/form/FormTextField';
import FormSelectField from '@/components/form/FormSelectField';
import { INewEventFormInput } from './NewEvent.types';
import Button from '@/components/core/Button';
import FormDateTimeField from '@/components/form/FormDateTimeField';
import { useCreateEventMutation } from '@/apollo/hooks';
import { paths } from '@/config/paths';
import TipTapTextEditor from '@/modules/TipTapTextEditor';
import { CurrencyInr, FloppyDiskBack, MapPinLine } from '@phosphor-icons/react';
import { useApolloClient } from '@apollo/client';
import { alumniEventCategories, eventHostingmedium } from '@/constants/Events.constants';

const NewEvent = () => {
  const router = useRouter();
  const client = useApolloClient();
  const { showAlert } = useAlert();
  const saveTypeRef = React.useRef('draft');

  const [crateEvent, { loading }] = useCreateEventMutation();
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<INewEventFormInput>({
    // defaultValues: {
    //   medium: 'online',
    // },
  });

  console.log('Z: getValues', getValues());

  const watchMedium = useWatch({ control, name: 'medium' });

  const onSubmit = React.useCallback(
    (data: INewEventFormInput) => {
      crateEvent({
        variables: {
          ...data,
          isPublish: saveTypeRef.current === 'publish',
        },
        onCompleted: () => {
          client.refetchQueries({
            include: ['getUserList'],
          });
          router.push(paths.events.root);
        },
      });
    },
    [crateEvent, router, client]
  );

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
      <Box display="flex" width="100%" mb={3} justifyContent="space-between">
        <Typography variant="h2">Create New Event</Typography>
        <Box display="flex" gap={2}>
          <Button
            size="small"
            title="Save Draft"
            onClick={() => {
              saveTypeRef.current = 'draft';
              handleSubmit(onSubmit);
            }}
            startIcon={<FloppyDiskBack size={16} />}
            type="submit"
            variant="outlined"
            disabled={loading}
            loading={saveTypeRef.current === 'draft' && loading}
          />
          <Button
            size="small"
            title="Save & Publish"
            onClick={() => {
              saveTypeRef.current = 'publish';
              handleSubmit(onSubmit);
            }}
            action="save"
            type="submit"
            color="success"
            disabled={loading}
            loading={saveTypeRef.current === 'publish' && loading}
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
            disabled={loading}
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
            disabled={loading}
            name="summary"

            // size="small"

            // rules={{
            //   required: 'Required',
            // }}
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
              disabled: loading,
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
            disabled={loading}
            startAdornment={watchMedium === 'online' ? 'https://' : <MapPinLine size={18} />}
            name="location"
            size="small"
            rules={{
              required: 'Required',
              pattern: {
                value: /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-_]+\.)+[a-zA-Z]{2,}(:\d{1,5})?(\/.*)?$/,
                message: 'Enter a valid URL',
              },
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
              disabled: loading,
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
            disabled={loading}
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
