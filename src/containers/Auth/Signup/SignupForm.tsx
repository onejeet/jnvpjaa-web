'use client';

import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Box, Card, Divider, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useSignupMutation } from 'src/apollo/hooks';
import { ISignupFormInput } from './Signup.types';
import FormTextField from '@/components/form/FormTextField';
import { useAlert } from '@/context/AlertContext';
import Button from '@/components/core/Button';
import FormSelectField from '@/components/form/FormSelectField';
import { getBatchOptions } from '@/utils/helpers';
import { Info } from '@mui/icons-material';
import Link from 'next/link';
import Image from 'next/image';

const batchList = getBatchOptions();

const SignupForm = () => {
  const { showAlert } = useAlert();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupFormInput>({
    // defaultValues: {
    //   gender: 'male',
    // },
  });

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
    [signup, showAlert]
  );

  return (
    <Card
      elevation={3}
      sx={{ maxWidth: 700, bgcolor: 'grey.100', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}
    >
      {/* <Image src={'/assets/svg/profile-website-icon.svg'} width={200} height={100} alt="login" /> */}

      <Typography variant="h2">JNV Paota Alumni Registration</Typography>
      <Typography color="grey.500" variant="body2" textAlign="center" mb={2}>
        The registration will be reviewed and verified by the Alumni Association and batch coordinators,
        <br /> and will be approved accordingly.
      </Typography>
      <Image
        onClick={() => {}}
        src="/assets/svg/google-signin.svg"
        width={300}
        height={38}
        alt="Sign in with Google"
        style={{ cursor: 'pointer' }}
      />
      <Divider sx={{ width: '100%', mt: 2 }}>OR</Divider>
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
      <Box display="flex" alignItems="center">
        <Typography variant="body2" mr={1}>
          Already have an account?{' '}
        </Typography>
        <Link href="/signin" as="/signin" style={{ textDecoration: 'none' }}>
          <Typography variant="body2" component="span" color="primary.main" sx={{ textDecoration: 'underline' }}>
            Signin
          </Typography>
        </Link>
      </Box>
    </Card>
  );
};

export default React.memo(SignupForm);
