'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { Alert, Box } from '@mui/material';
import { ISigninFormInput } from './Signin.types';
import FormTextField from '@/components/form/FormTextField';
import Button from '@/components/core/Button';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useSigninMutation } from '@/apollo/hooks';
import { useApolloClient } from '@apollo/client';
import { paths } from '@/config/paths';

const SigninForm = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const [error, setError] = React.useState('');
  const { control, handleSubmit } = useForm<ISigninFormInput>();
  const { setUser } = useAuth();
  const client = useApolloClient();

  const [signin] = useSigninMutation();

  const onSubmit = React.useCallback(
    async (data: ISigninFormInput) => {
      setError('');
      setLoading(true);
      try {
        await client.clearStore();
        const { data: result } = await signin({
          variables: { email: data.email.trim().toLowerCase(), password: data.password },
        });
        if (!result?.signin?.user) throw new Error('Could not sign in. Please try again.');
        localStorage.setItem('logged_in', 'true');
        setUser(result.signin.user);
        let destination = paths.profile.root;
        try {
          const encoded = new URLSearchParams(window.location.search).get('r');
          const requested = encoded ? atob(encoded) : '';
          if (requested.startsWith('/') && !requested.startsWith('//') && !requested.includes('\\'))
            destination = requested;
        } catch {
          /* Keep the profile destination for an invalid return path. */
        }
        router.push(
          result.signin.user.metadata?.isFirstLogin !== false ? `${paths.profile.setup}?welcome=1` : destination
        );
      } catch (err: any) {
        setError(err.message || 'Could not sign in. Please try again.');
        setLoading(false);
      }
    },
    [client, signin, setUser, router]
  );

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        width: '100%',
        p: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      gap={2.5}
    >
      {error && (
        <Alert severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      )}
      <FormTextField
        fullWidth
        type="email"
        disabled={loading}
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
        disabled={loading}
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
      <Box sx={{ alignSelf: 'flex-end', fontSize: 14 }}>
        <Link href="/forgot-password">Forgot password?</Link>
      </Box>
      <Button title="Sign in" type="submit" fullWidth loading={loading} />
    </Box>
  );
};

export default React.memo(SigninForm);
