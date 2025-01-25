'use client';

import React from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { Box, Card, Typography } from '@mui/material';
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
    [signin, showAlert]
  );

  return (
    <Card
      elevation={3}
      sx={{ maxWidth: 400, bgcolor: 'grey.100', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}
    >
      <Image src={'/assets/svg/profile-website-icon.svg'} width={200} height={100} alt="login" />
      {/* </Box> */}
      <Typography variant="h3">Alumni Center Access</Typography>
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
    </Card>
  );
};

export default React.memo(SigninForm);
