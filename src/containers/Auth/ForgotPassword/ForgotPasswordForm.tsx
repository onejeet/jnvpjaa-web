'use client';

import React from 'react';
import Image from 'next/image';
import { useForm, useWatch } from 'react-hook-form';
import { Box, Card, Typography } from '@mui/material';
import { useSigninMutation } from 'src/apollo/hooks';
import { IForgotPasswordFormInput } from './ForgotPassword.types';
import FormTextField from '@/components/form/FormTextField';
import { useAlert } from '@/context/AlertContext';
import Button from '@/components/core/Button';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Info } from '@mui/icons-material';

const SigninForm = () => {
  const router = useRouter();
  const { e = '', c = '' } = router.query;
  const { showAlert } = useAlert();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IForgotPasswordFormInput>();

  const watchPassword = useWatch({ control, name: 'password' });

  const [signin, { loading }] = useSigninMutation();

  const onSubmit = React.useCallback(
    (data: IForgotPasswordFormInput) => {
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
      <Image src={'/assets/svg/profile-website-icon.svg'} width={200} height={100} alt="forgot password" />
      <Typography variant="h3">{c && e ? 'Change Password' : 'Forgot Password?'}</Typography>
      {c && e && (
        <Typography color="grey.500" variant="body2" textAlign="center">
          {`Please submit new password for ${e}`}
        </Typography>
      )}

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
        {c ? (
          <>
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
              The password must be a minimum of 8 characters in length and include at least one uppercase letter, one
              lowercase letter, and one numeric digit.
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
          </>
        ) : (
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
        )}

        <Button title={c ? 'Change Password' : 'Reset Password'} type="submit" fullWidth loading={loading} />
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

export default React.memo(SigninForm);
