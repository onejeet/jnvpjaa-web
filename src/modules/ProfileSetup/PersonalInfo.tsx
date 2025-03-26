import { User, useUpdateUserMutation } from '@/apollo/hooks';
import Button from '@/components/core/Button';
import FormSelectField from '@/components/form/FormSelectField';
import FormTextField from '@/components/form/FormTextField';
import { useAlert } from '@/context/AlertContext';
import { useProfile } from '@/context/ProfileContext';
import { Box, Grid2 as Grid, Typography } from '@mui/material';
import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { IPersonalInfoFormInput } from './ProfileSetup.types';
import { CaretLeft, CaretRight, CheckCircle, User as UserIcon, X } from '@phosphor-icons/react';
import FormDateTimeField from '@/components/form/FormDateTimeField';
import TipTapTextEditor from '@/modules/TipTapTextEditor';
import dayjs from 'dayjs';
import { useApolloClient } from '@apollo/client';
import FormPhoneField from '@/components/form/FormPhoneField';
import { phoneNumberStringConverter } from '@/utils/helpers';

interface PersonalInfoProps {
  onBack?: () => void;
  onNext?: () => void;
  onSuccess?: () => void;
  onCancel?: () => void;
  user?: User;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ user, onNext, onBack, onSuccess, onCancel }) => {
  const client = useApolloClient();
  const { showAlert } = useAlert();
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<IPersonalInfoFormInput>({
    defaultValues: {
      aboutMe: '',
      ...(user || {}),
      dob: user?.dob ? dayjs(user?.dob) : undefined,
    },
  });

  const [updateUser, { loading }] = useUpdateUserMutation();

  const onSubmit = React.useCallback(
    (data: IPersonalInfoFormInput) => {
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
            include: ['getUserDetails'],
          });

          onSuccess?.();
          onNext?.();
        },
        onError: (err: Error) => {
          showAlert({
            visible: true,
            type: 'error',
            message: err?.message || 'Image upload failed. Please try again.',
          });
          console.log('Error: ', err?.message);
        },
      });
    },
    [updateUser, showAlert, onSuccess, user?.id, client]
  );

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      p={{ xs: 2, md: 3 }}
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'center',
      }}
    >
      <Box display="flex" alignItems="center" mb={3}>
        <UserIcon size={32} />
        <Typography sx={{ ml: 1 }} fontWeight={600}>
          Personal Info
        </Typography>
      </Box>
      <Grid container spacing={3} maxWidth="100%" size={{ xs: 12 }}>
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
            // onChange={(e) => {
            //   if (e?.target?.value?.length < 11) {
            //     setValue('emergencyMobile', e?.target?.value);
            //   }
            // }}
            helperText="Family member's mobile for emergency cases"
            // rules={{
            //   required: 'Required',
            // }}
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

        <Box display="flex" width="100%" alignItems="center" gap={2}>
          {onBack && (
            <Button
              title="Back"
              variant="outlined"
              startIcon={<CaretLeft size={16} />}
              disabled={loading}
              onClick={onBack}
            />
          )}

          <Box display="flex" gap={2} ml="auto">
            {!onNext && (
              <Button
                title="Cancel"
                variant="outlined"
                startIcon={<X size={16} />}
                disabled={loading}
                onClick={() => {
                  onCancel?.();
                }}
              />
            )}
            {onNext && (
              <Button
                title="Skip"
                variant="outlined"
                endIcon={<CaretRight size={16} />}
                disabled={loading}
                onClick={() => {
                  onNext?.();
                }}
              />
            )}
            <Button
              title={onNext ? 'Update & Next' : 'Update'}
              type="submit"
              startIcon={<CheckCircle size={16} />}
              loading={loading}
            />
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};

export default PersonalInfo;
