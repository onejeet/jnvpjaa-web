import { useUpdateUserMutation } from '@/apollo/hooks';
import Button from '@/components/core/Button';
import FormSelectField from '@/components/form/FormSelectField';
import FormTextField from '@/components/form/FormTextField';
import { useAlert } from '@/context/AlertContext';
import { useProfile } from '@/context/ProfileContext';
import { Box, Grid2 as Grid, Typography } from '@mui/material';
import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { IProfileFormInput } from '../Profile.types';
import { IconUser, IconPhone, IconMapPin, IconBuilding, IconCalendar } from '@tabler/icons-react';
import FormDateTimeField from '@/components/form/FormDateTimeField';
import TipTapTextEditor from '@/modules/TipTapTextEditor';
import dayjs from 'dayjs';
import { useApolloClient } from '@apollo/client';
import FormPhoneField from '@/components/form/FormPhoneField';
import { phoneNumberStringConverter } from '@/utils/helpers';

const ProfileForm = () => {
  const client = useApolloClient();
  const { user, setEditingProfile } = useProfile();
  const { showAlert } = useAlert();
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<IProfileFormInput>({
    defaultValues: {
      aboutMe: '',
      ...(user || {}),
      dob: user?.dob ? dayjs(user?.dob) : undefined,
    },
  });

  const [updateUser, { loading }] = useUpdateUserMutation();

  const onSubmit = React.useCallback(
    (data: IProfileFormInput) => {
      updateUser({
        variables: {
          id: user?.id,
          firstName: data?.firstName?.trim(),
          lastName: data?.lastName?.trim(),
          gender: data?.gender,
          aboutMe: data?.aboutMe,
          // @ts-expect-error type error
          dob: data?.dob ? dayjs(data?.dob)?.toISOString() : null,
          whatsAppMobile: data?.whatsAppMobile
            ? phoneNumberStringConverter(data?.whatsAppMobile)
            : data?.whatsAppMobile,
          mobile: data?.mobile ? phoneNumberStringConverter(data?.mobile) : data?.mobile,
          extraMobile: data?.extraMobile ? phoneNumberStringConverter(data?.extraMobile) : data?.extraMobile,
          emergencyMobile: data?.emergencyMobile
            ? phoneNumberStringConverter(data?.emergencyMobile)
            : data?.emergencyMobile,
          //   batch: data?.batch,
        },
        onCompleted: (res) => {
          console.log('COmpleted', res);
          client?.refetchQueries({
            include: ['getIconUserDetails'],
          });
          setEditingProfile(false);
        },
        onError: (err: Error) => {
          showAlert({
            type: 'error',
            message: 'Something went wrong',
          });
          console.log('Error: ', err?.message);
        },
      });
    },
    [updateUser, showAlert, setEditingProfile, user?.id, client]
  );

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        width: '100%',
        mt: 1,
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormTextField
            fullWidth
            id="firstName"
            label="First Name"
            autoFocus
            control={control}
            disabled={loading}
            name="firstName"
            size="small"
            rules={{
              required: 'Required',
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormTextField
            fullWidth
            id="lastName"
            label="Last Name"
            autoFocus
            control={control}
            disabled={loading}
            name="lastName"
            size="small"
            rules={{
              required: 'Required',
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <FormPhoneField
            fullWidth
            id="mobile"
            label="Primary Mobile"
            placeholder="Mobile"
            control={control}
            disabled={loading}
            name="mobile"
            size="small"
            //  startIcon={<IconPhone size={16} />}
            // onChange={(e) => {
            //   if (e?.target?.value?.length < 11) {
            //     setValue('mobile', e?.target?.value);
            //   }
            // }}
            onBlur={(e) => {
              if (e?.target?.value?.length < 11) {
                setValue('whatsAppMobile', e?.target?.value);
              }
            }}
            rules={{
              required: 'Required',
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <FormPhoneField
            fullWidth
            id="WhatsAppMobile"
            label="WhatsApp Mobile"
            placeholder="WhatsApp Mobile"
            control={control}
            disabled={loading}
            name="whatsAppMobile"
            size="small"
            // startIcon={<IconPhone size={16} />}
            // onChange={(e) => {
            //   if (e?.target?.value?.length < 11) {
            //     setValue('extraMobile', e?.target?.value);
            //   }
            // }}
            // rules={{
            //   required: 'Required',
            //   maxLength: {
            //     value: 10,
            //     message: 'Invalid mobile number',
            //   },
            // }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <FormPhoneField
            fullWidth
            id="mobile2"
            label="Emergency Mobile"
            placeholder="Emergency Mobile"
            control={control}
            disabled={loading}
            name="emergencyMobile"
            size="small"
            //  startIcon={<IconPhone size={16} />}
            // onChange={(e) => {
            //   if (e?.target?.value?.length < 11) {
            //     setValue('emergencyMobile', e?.target?.value);
            //   }
            // }}
            helperText="Family member's mobile for emergency cases"
            rules={{
              required: 'Required',
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormDateTimeField
            control={control}
            name="dob"
            isDateOnly
            inputProps={{
              label: 'Date of Birth',
              disabled: loading,
              size: 'small',
            }}
            // rules={{
            //   required: 'Required',
            //   maxLength: {
            //     value: 10,
            //     message: 'Invalid mobile number',
            //   },
            // }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormSelectField
            control={control}
            name="gender"
            selectProps={{
              size: 'small',
              id: 'gender',
              disabled: loading,
            }}
            options={[
              {
                label: 'Male',
                value: 'male',
              },
              {
                label: 'Female',
                value: 'female',
              },
            ]}
            rules={{
              required: 'Required',
            }}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Grid size={{ xs: 12 }}>
            <Box display="flex" flexDirection="column">
              <Typography color="grey.600" variant="body1" fontSize={14}>
                About Me
              </Typography>
              <TipTapTextEditor value={getValues('aboutMe') || ''} onChange={(data) => setValue('aboutMe', data)} />
            </Box>
          </Grid>
        </Grid>

        <Box display="flex" ml="auto" gap={2}>
          <Button
            title="Cancel"
            variant="outlined"
            startIcon={<IconBuilding size={16} />} // Consider if this is the correct icon for 'Cancel', else revert to no icon.
            disabled={loading}
            onClick={() => setEditingProfile(false)}
          />
          <Button title="Update" type="submit" startIcon={<IconUser size={16} />} loading={loading} />
        </Box>
      </Grid>
    </Box>
  );
};

export default ProfileForm;
