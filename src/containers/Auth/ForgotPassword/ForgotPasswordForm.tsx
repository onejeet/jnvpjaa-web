'use client';

import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Box, Card, Typography } from '@mui/material';
import { IForgotPasswordFormInput } from './ForgotPassword.types';
import FormTextField from '@/components/form/FormTextField';
import { useAlert } from '@/context/AlertContext';
import Button from '@/components/core/Button';
import { useRouter } from 'next/navigation';
import { Info } from '@mui/icons-material';
import { useForgotPasswordMutation, useResetPasswordMutation } from '@/apollo/hooks';
import Image from 'next/image';
import { paths } from '@/config/paths';

const SigninForm = () => {
  const [mailSent, setMailSent] = React.useState<boolean>(false);
  const router = useRouter();
  const { e = '', c = '' } = router.query;
  const { showAlert } = useAlert();
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IForgotPasswordFormInput>();

  const watchPassword = useWatch({ control, name: 'password' });
  const [handlePasswordReset, { loading: resetPasswordLoading }] = useResetPasswordMutation();
  const [handleForgotPassword, { loading: forgotPassLoading }] = useForgotPasswordMutation();
  const onSubmit = React.useCallback(
    (data: IForgotPasswordFormInput) => {
      if (c) {
        handlePasswordReset({
          variables: {
            token: c as string,
            newPassword: data?.password,
          },
          onCompleted: () => {
            showAlert({
              visible: true,
              type: 'success',
              message: 'Password reset successfully. Please login with your new password.',
            });
            router.push(paths.home);
          },
        });
      } else {
        handleForgotPassword({
          variables: {
            email: data?.email?.trim(),
          },
          onCompleted: (res: any) => {
            console.log('COmpleted', res);
            setMailSent(true);
          },
          onError: (err: Error) => {
            showAlert({
              type: 'error',
              message: 'Something went wrong',
            });
            console.log('Error: ', err?.message);
          },
        });
      }
    },
    [c, handlePasswordReset, showAlert, handlePasswordReset]
  );

  if (mailSent) {
    return (
      <Box
        width={400}
        my={7}
        // width="100%"
        height="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Image src="/assets/svg/email_sent.svg" width={100} height={100} alt="mail sent immage" />
        <Typography textAlign="center" color="grey.600" mt={1}>
          Email sent{getValues('email') ? ` to ${getValues('email')}` : ''}.
          <br />
          Please check your email inbox.
        </Typography>
      </Box>
    );
  }
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

      <Button
        title={c ? 'Change Password' : 'Reset Password'}
        type="submit"
        fullWidth
        loading={resetPasswordLoading || forgotPassLoading}
      />
    </Box>
  );
};

export default React.memo(SigninForm);
