'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { Box } from '@mui/material';
import { ISigninFormInput } from './Signin.types';
import FormTextField from '@/components/form/FormTextField';
import { useAlert } from '@/context/AlertContext';
import Button from '@/components/core/Button';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useSigninMutation } from '@/apollo/hooks';
import { useApolloClient } from '@apollo/client';

const SigninForm = () => {
  const router = useRouter();
  const { showAlert } = useAlert();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISigninFormInput>();
  const { setUser } = useAuth();
  const client = useApolloClient();

  const [signin, { loading }] = useSigninMutation();

  const onSubmit = React.useCallback(
    (data: ISigninFormInput) => {
      client.resetStore();
      signin({
        variables: {
          email: data?.email?.trim(),
          password: data?.password,
        },
        onCompleted: (res: any) => {
          localStorage.setItem('logged_in', 'true');
          client.resetStore();
          client.cache.reset();
          setUser(res?.signin?.user);
          // auth redirection will be handled from AuthContext
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
    [signin, showAlert, setUser, router]
  );

  return (
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
  );
};

export default React.memo(SigninForm);
