'use client';

import React, { Suspense } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useSignupMutation } from 'src/apollo/hooks';
import { ISignupFormInput } from './Signup.types';
import FormTextField from '@/components/form/FormTextField';
import { useAlert } from '@/context/AlertContext';
import Button from '@/components/core/Button';
import FormSelectField from '@/components/form/FormSelectField';
import { getBatchOptions, phoneNumberStringConverter, removeSpaces, startCase } from '@/utils/helpers';
import { Info } from '@mui/icons-material';
import { paths } from '@/config/paths';
import { useRouter } from 'next/navigation';
import FormPhoneField from '@/components/form/FormPhoneField';
import Lottie from '@/components/common/DynamicLottie';
import successLottieIcon from '@/utils/lottie/success3_icon.json';
import FormCheckbox from '@/components/form/FormCheckboxField/FormCheckboxField';

const batchList = getBatchOptions();

const SignupForm = () => {
  const [signupSuccess, setSignupSuccess] = React.useState<boolean>(false);
  const router = useRouter();
  const { showAlert } = useAlert();
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<ISignupFormInput>({});

  const watchPassword = useWatch({ control, name: 'password' });
  const watchIsFaculty = useWatch({ control, name: 'isFaculty' });

  console.log('ZZ: getValues', getValues());

  const [signup, { loading }] = useSignupMutation();

  const onSubmit = React.useCallback(
    (data: ISignupFormInput) => {
      signup({
        variables: {
          firstName: startCase(data?.first_name?.trim()),
          lastName: startCase(data?.last_name?.trim()),
          email: data?.email?.trim(),
          password: data?.password,
          gender: data?.gender,
          mobile: data?.mobile ? phoneNumberStringConverter(data?.mobile) : data?.mobile,
          batch: data?.isFaculty ? 0 : data?.batch,
          isFaculty: data?.isFaculty,
        },
        onCompleted: (res) => {
          console.log('COmpleted', res);
          // router.push(paths.signin);
          setSignupSuccess(true);
        },
        onError: (err: Error) => {
          showAlert({
            type: 'error',
            message: err?.message || 'Something went wrong',
          });
          console.log('Error: ', err?.message);
        },
      });
    },
    [signup, showAlert, router]
  );

  if (signupSuccess) {
    return (
      <Box
        sx={{
          width: '100%',
          my: 2,
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Suspense fallback={null}>
          <Lottie animationData={successLottieIcon} loop={true} style={{ width: '100px', height: '100px' }} />
        </Suspense>
        <Typography variant="h2">Signup Successful!</Typography>
        <Typography variant="body1" mt={1} textAlign="center" width="60%">
          The request email has been sent to the admins and upon approval you should be able to login.{' '}
        </Typography>
      </Box>
    );
  }

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
        <Grid size={{ xs: 12 }}>
          <FormCheckbox
            fullWidth
            id="isFaculty"
            label="Are you a registering as faculty in JNV Paota?"
            autoFocus
            control={control}
            disabled={loading}
            name="isFaculty"
            size="small"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <FormTextField
            fullWidth
            id="first_name"
            label="First Name"
            autoFocus
            control={control}
            disabled={loading}
            name="first_name"
            size="small"
            rules={{
              required: 'Required',
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <FormTextField
            fullWidth
            id="last_name"
            label="Last Name"
            autoFocus
            control={control}
            disabled={loading}
            name="last_name"
            size="small"
            rules={{
              required: 'Required',
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: watchIsFaculty ? 12 : 6 }}>
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

        {!watchIsFaculty && (
          <Grid size={{ xs: 12, md: 6 }}>
            <FormSelectField
              control={control}
              name="batch"
              selectProps={{
                size: 'small',
                id: 'batch',
                disabled: loading,
              }}
              disabled={watchIsFaculty}
              options={batchList}
              rules={{
                required: watchIsFaculty ? false : 'Required',
              }}
            />
          </Grid>
        )}

        <Grid size={{ xs: 12, md: 6 }}>
          <FormTextField
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
            control={control}
            disabled={loading}
            name="email"
            size="small"
            rules={{
              required: 'Required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Invalid email',
              },
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <FormPhoneField
            fullWidth
            id="mobile"
            label="Mobile"
            control={control}
            disabled={loading}
            startAdornment="+91"
            name="mobile"
            size="small"
            onChange={(e) => {
              if (e?.target?.value?.length < 11) {
                setValue('mobile', e?.target?.value);
              }
            }}
            rules={{
              required: 'Required',
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <FormTextField
            fullWidth
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            control={control}
            disabled={loading}
            name="password"
            size="small"
            rules={{
              required: 'Required',
              pattern: {
                value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
                message: 'Invalid password.',
              },
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <FormTextField
            fullWidth
            label="Confirm Password"
            type="password"
            id="confirm-password"
            autoComplete="current-password"
            control={control}
            disabled={loading}
            name="confirm-password"
            size="small"
            rules={{
              required: 'Required',
              validate: (value) => value === watchPassword || 'Passwords do not match',
            }}
          />
        </Grid>
        <Grid size={{ xs: 12 }} mt={-1}>
          <Typography variant="body2" color="grey.600">
            <Info sx={{ fontSize: '14px' }} />
            The password must be a minimum of 8 characters in length and include at least one uppercase letter, one
            lowercase letter, and one numeric digit.
          </Typography>
        </Grid>

        <Button title="Register" type="submit" fullWidth loading={loading} />
      </Grid>
    </Box>
  );
};

export default React.memo(SignupForm);
