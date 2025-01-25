'use client';

import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Box, Card, Typography } from '@mui/material';
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
      sx={{ maxWidth: 400, bgcolor: 'grey.100', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      {/* <Image src={'/assets/svg/profile-website-icon.svg'} width={200} height={100} alt="login" /> */}

      <Typography variant="h3" mt={3}>
        Register Yourself
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          width: 400,
          mt: 1,
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormTextField
              fullWidth
              id="first_name"
              label="First Name"
              autoFocus
              control={control}
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
            {/* <FormTextField
              fullWidth
              id="batch"
              label="Batch"
              autoFocus
              control={control}
              name="batch"
              size="small"
              type="number"
              rules={{
                required: 'Required',
              }}
            /> */}
            <FormSelectField
              control={control}
              name="batch"
              selectProps={{
                size: 'small',
                id: 'batch',
              }}
              options={batchList}
              rules={{
                required: 'Required',
              }}
            />
          </Grid>
          <FormTextField
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
            control={control}
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
          <FormTextField
            fullWidth
            id="mobile"
            label="Mobile"
            control={control}
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
          <FormTextField
            fullWidth
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            control={control}
            name="password"
            size="small"
            rules={{
              required: 'Required',
              pattern: {
                value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                message: 'Invalid password.',
              },
            }}
          />
          <Typography variant="body2" color="grey.600">
            <Info sx={{ fontSize: '14px' }} />
            Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, and one
            number.
          </Typography>
          <FormTextField
            fullWidth
            label="Confirm Password"
            type="password"
            id="confirm-password"
            autoComplete="current-password"
            control={control}
            name="confirm-password"
            size="small"
            rules={{
              required: 'Required',
              validate: (value) => value === watchPassword || 'Passwords do not match',
            }}
          />
          <Button title="Register" type="submit" fullWidth loading={loading} />
        </Grid>
      </Box>
      <Box display="flex" mb={2} alignItems="center">
        <Typography variant="body1" mr={1}>
          Already have an account?{' '}
        </Typography>
        <Link href="/signin" as="/signin" style={{ textDecoration: 'none' }}>
          <Typography variant="body1" component="span" color="primary.main" sx={{ textDecoration: 'underline' }}>
            Signin
          </Typography>
        </Link>
      </Box>
    </Card>
  );
};

export default React.memo(SignupForm);
