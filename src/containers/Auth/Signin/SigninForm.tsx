'use client';

import React from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { Box, Card, Divider, Typography } from '@mui/material';
import { useSigninMutation } from 'src/apollo/hooks';
import { ISigninFormInput } from './Signin.types';
import FormTextField from '@/components/form/FormTextField';
import { useAlert } from '@/context/AlertContext';
import Button from '@/components/core/Button';
import Link from 'next/link';

const SigninForm = () => {
  const { showAlert } = useAlert();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISigninFormInput>();

  const [signin, { loading }] = useSigninMutation();

  const onSubmit = React.useCallback(
    (data: ISigninFormInput) => {
      signin({
        variables: {
          email: data?.email?.trim(),
          password: data?.password,
        },
        onCompleted: (res) => {
          // localStorage.setItem('accessToken', res?.signin?.token || '');
          console.log('Signed in', res?.signin);
        },
        onError: (err: Error) => {
          showAlert({
            type: 'error',
            message: err?.message || 'Something went wrong',
          });
          console.log('Error: ', err);
        },
      });
    },
    [signin, showAlert]
  );

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          width: 400,

          p: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        gap={2.5}
      >
        {/* <Box
          component={Paper}
          sx={{ width: 'fit-content', p: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        > */}

        <FormTextField
          fullWidth
          id="email"
          label="Email Address"
          autoComplete="email"
          autoFocus
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
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          control={control}
          name="password"
          size="small"
          rules={{
            required: 'Required',
          }}
        />
        <Button title=" Sign In" type="submit" fullWidth loading={loading} />
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" gap={1.5}>
        <Link href="/forgot-password" as="/forgot-password" style={{ textDecoration: 'none' }}>
          <Typography variant="body2" component="span" color="primary.main" sx={{ textDecoration: 'underline' }}>
            Forgot Password?
          </Typography>
        </Link>
        <Box display="flex" alignItems="center">
          <Typography variant="body2" mr={1}>
            Not registered yet?{' '}
          </Typography>
          <Link href="/signup" as="/signup" style={{ textDecoration: 'none' }}>
            <Typography variant="body2" component="span" color="primary.main" sx={{ textDecoration: 'underline' }}>
              Register Now
            </Typography>
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default React.memo(SigninForm);
