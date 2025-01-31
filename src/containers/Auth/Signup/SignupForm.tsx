'use client';

import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useSignupMutation } from 'src/apollo/hooks';
import { ISignupFormInput } from './Signup.types';
import FormTextField from '@/components/form/FormTextField';
import { useAlert } from '@/context/AlertContext';
import Button from '@/components/core/Button';
import FormSelectField from '@/components/form/FormSelectField';
import { getBatchOptions } from '@/utils/helpers';
import { Info } from '@mui/icons-material';
import { paths } from '@/config/paths';
import { useRouter } from 'next/router';

const batchList = getBatchOptions();

const SignupForm = () => {
  const router = useRouter();
  const { showAlert } = useAlert();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupFormInput>({});

  const watchPassword = useWatch({ control, name: 'password' });

  const [signup, { loading }] = useSignupMutation();

  const onSubmit = React.useCallback(
    (data: ISignupFormInput) => {
      signup({
        variables: {
          firstName: data?.first_name?.trim(),
          lastName: data?.last_name?.trim(),
          email: data?.email?.trim(),
          password: data?.password,
          gender: data?.gender,
          mobile: data?.mobile,
          batch: data?.batch,
        },
        onCompleted: (res) => {
          console.log('COmpleted', res);
          router.push(paths.signin);
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
    [signup, showAlert, router]
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

        <Grid size={{ xs: 12, md: 6 }}>
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

        <Grid size={{ xs: 12, md: 6 }}>
          <FormSelectField
            control={control}
            name="batch"
            selectProps={{
              size: 'small',
              id: 'batch',
              disabled: loading,
            }}
            options={batchList}
            rules={{
              required: 'Required',
            }}
          />
        </Grid>
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
          <FormTextField
            fullWidth
            id="mobile"
            label="Mobile"
            control={control}
            disabled={loading}
            startAdornment="+91"
            name="mobile"
            size="small"
            type="number"
            rules={{
              required: 'Required',
              maxLength: {
                value: 10,
                message: 'Invalid mobile number',
              },
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
