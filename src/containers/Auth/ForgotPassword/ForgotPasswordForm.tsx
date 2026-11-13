'use client';
import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Alert, Box, Button as MuiButton, Stack, Typography } from '@mui/material';
import { MarkEmailReadOutlined } from '@mui/icons-material';
import { IForgotPasswordFormInput } from './ForgotPassword.types';
import FormTextField from '@/components/form/FormTextField';
import Button from '@/components/core/Button';
import { useSearchParams } from 'next/navigation';
import { useForgotPasswordMutation, useResetPasswordMutation } from '@/apollo/hooks';
import Link from 'next/link';
export default function ForgotPasswordForm() {
  const token = useSearchParams().get('c');
  const [mailSent, setMailSent] = React.useState(false);
  const [resetDone, setResetDone] = React.useState(false);
  const [error, setError] = React.useState('');
  const { control, handleSubmit, getValues } = useForm<IForgotPasswordFormInput>();
  const password = useWatch({ control, name: 'password' });
  const [reset, { loading: resetting }] = useResetPasswordMutation();
  const [forgot, { loading: sending }] = useForgotPasswordMutation();
  const busy = resetting || sending;
  const submit = async (data: IForgotPasswordFormInput) => {
    setError('');
    try {
      if (token) {
        await reset({ variables: { token, newPassword: data.password } });
        localStorage.removeItem('logged_in');
        setResetDone(true);
      } else {
        await forgot({ variables: { email: data.email.trim().toLowerCase() } });
        setMailSent(true);
      }
    } catch (err: any) {
      setError(err.message || 'Could not complete your request. Please try again.');
    }
  };
  if (resetDone)
    return (
      <Stack spacing={2}>
        <Alert severity="success">Your password has been updated.</Alert>
        <MuiButton component={Link} href="/signin" variant="contained">
          Sign in with your new password
        </MuiButton>
      </Stack>
    );
  if (mailSent)
    return (
      <Stack spacing={2} alignItems="flex-start">
        <MarkEmailReadOutlined color="primary" sx={{ fontSize: 40 }} />
        <Typography variant="h3" component="h2">
          Check your inbox
        </Typography>
        <Typography variant="body2" sx={{ overflowWrap: 'anywhere', lineHeight: 1.7 }}>
          If an account exists for <strong>{getValues('email')}</strong>, you’ll receive a password reset link. Check
          your spam folder too.
        </Typography>
        <MuiButton onClick={() => setMailSent(false)} variant="outlined">
          Use a different email
        </MuiButton>
      </Stack>
    );
  return (
    <Box component="form" onSubmit={handleSubmit(submit)} noValidate>
      <Stack spacing={2.5}>
        {error && (
          <Alert severity="error">
            {error}
            {token && (
              <Box mt={1}>
                <Link href="/forgot-password">Request a new reset link</Link>
              </Box>
            )}
          </Alert>
        )}
        {token ? (
          <>
            <FormTextField
              fullWidth
              label="New password"
              type="password"
              autoComplete="new-password"
              control={control}
              name="password"
              disabled={busy}
              rules={{
                required: 'Enter a new password.',
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@_\-$]{8,}$/,
                  message: 'Use 8+ characters with uppercase, lowercase and a number.',
                },
              }}
            />
            <Typography variant="body2" color="text.secondary">
              Use at least 8 characters, including uppercase, lowercase and a number. Allowed symbols: @ _ - $.
            </Typography>
            <FormTextField
              fullWidth
              label="Confirm new password"
              type="password"
              autoComplete="new-password"
              control={control}
              name="confirm-password"
              disabled={busy}
              rules={{
                required: 'Confirm your new password.',
                validate: (value) => value === password || 'Passwords do not match.',
              }}
            />
          </>
        ) : (
          <FormTextField
            fullWidth
            label="Email address"
            type="email"
            autoComplete="email"
            control={control}
            name="email"
            disabled={busy}
            rules={{
              required: 'Enter your email address.',
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email address.' },
            }}
          />
        )}
        <Button title={token ? 'Save new password' : 'Send reset link'} type="submit" fullWidth loading={busy} />
      </Stack>
    </Box>
  );
}
