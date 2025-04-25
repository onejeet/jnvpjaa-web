'use client';

import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Box, BoxProps, Typography } from '@mui/material';
import FormTextField from '@/components/form/FormTextField';
import { useAlert } from '@/context/AlertContext';
import Button from '@/components/core/Button';
import { useRouter } from 'next/navigation';
import { Info } from '@mui/icons-material';
import { useResetPasswordMutation } from '@/apollo/hooks';
import { useAuth } from '@/context/AuthContext';
import { IForgotPasswordFormInput } from '../ForgotPassword/ForgotPassword.types';
import { IconCheckCircle as CheckCircle } from '@tabler/icons-react';

interface ChangePasswordFormProps {
  onNext?: () => void;
  containerProps?: Partial<BoxProps>;
}

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({ onNext, containerProps = {} }) => {
  const { user, redirectOnSignin } = useAuth();
  const { showAlert } = useAlert();
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IForgotPasswordFormInput>();

  const watchPassword = useWatch({ control, name: 'password' });
  const [handlePasswordReset, { loading: resetPasswordLoading }] = useResetPasswordMutation();
  const onSubmit = React.useCallback(
    (data: IForgotPasswordFormInput) => {
      handlePasswordReset({
        variables: {
          newPassword: data?.password,
        },
        onCompleted: () => {
          showAlert({
            visible: true,
            type: 'success',
            message: 'Password reset successfully!',
          });
          onNext?.();
          redirectOnSignin(true);
        },
      });
    },
    [handlePasswordReset, showAlert, redirectOnSignin, onNext]
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
      {...containerProps}
    >
      <FormTextField
        fullWidth
        label="New Password"
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

      <FormTextField
        fullWidth
        label="Confirm New Password"
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

      <Typography variant="body2" color="grey.600">
        <Info sx={{ fontSize: '14px' }} />
        The password must be a minimum of 8 characters in length and include at least one uppercase letter, one
        lowercase letter, and one numeric digit.
      </Typography>
      <Box width="100%" display="flex" ml={onNext ? 'auto' : 'none'}>
        <Button
          startIcon={<CheckCircle size={16} />}
          title={onNext ? 'Change Password & Next' : 'Change Password'}
          type="submit"
          fullWidth
          loading={resetPasswordLoading}
        />
      </Box>
    </Box>
  );
};

export default React.memo(ChangePasswordForm);
