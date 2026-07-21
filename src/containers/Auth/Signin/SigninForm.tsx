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
import { paths } from '@/config/paths';

const SigninForm = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const { showAlert } = useAlert();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISigninFormInput>();
  const { setUser } = useAuth();
  const client = useApolloClient();

  const [signin] = useSigninMutation();

  const onSubmit = React.useCallback(
    async (data: ISigninFormInput) => {
      await client.clearStore();
      setLoading(true);
      signin({
        variables: {
          email: data?.email?.toLowerCase()?.trim(),
          password: data?.password,
        },
        onCompleted: (res: any) => {
          if (typeof window !== 'undefined') {
            localStorage.setItem('logged_in', 'true');
          }

          setUser(res?.signin?.user);
          client.clearStore();
          const targetUrl =
            res?.signin?.user?.metadata?.isFirstLogin !== false
              ? `${paths.profile.setup}?welcome=1`
              : paths.profile.root;
          router.push(targetUrl);
        },
        onError: (err: Error) => {
          setLoading(false);
          showAlert({
            type: 'error',
            message: err?.message || 'Something went wrong',
          });
          console.log('Error: ', err);
        },
      });
    },
    [client, signin, showAlert, setUser, router]
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
