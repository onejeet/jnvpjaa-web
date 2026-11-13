'use client';

import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Alert, Box, BoxProps, Typography } from '@mui/material';
import FormTextField from '@/components/form/FormTextField';
import { useAlert } from '@/context/AlertContext';
import Button from '@/components/core/Button';
import { Info } from '@mui/icons-material';
import { useMutation } from '@apollo/client';
import { CHANGE_PASSWORD_MUTATION } from '@/apollo/authOperations';
import { useAuth } from '@/context/AuthContext';
import { IconCircleCheck as CheckCircle } from '@tabler/icons-react';

type ChangePasswordFormInput = {
  currentPassword: string;
  password: string;
  'confirm-password': string;
};

interface ChangePasswordFormProps {
  onNext?: () => void;
  containerProps?: Partial<BoxProps>;
}

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({ onNext, containerProps = {} }) => {
  const { redirectOnSignin } = useAuth();
  const { showAlert } = useAlert();
  const [error, setError] = React.useState('');
  const { control, handleSubmit } = useForm<ChangePasswordFormInput>();

  const watchPassword = useWatch({ control, name: 'password' });
  const [handlePasswordReset, { loading: resetPasswordLoading }] = useMutation(CHANGE_PASSWORD_MUTATION);
  const onSubmit = React.useCallback(
    (data: ChangePasswordFormInput) => {
      setError('');
      handlePasswordReset({
        variables: {
          currentPassword: data.currentPassword,
          newPassword: data?.password,
        },
        onCompleted: () => {
          showAlert({
            visible: true,
            type: 'success',
            message: 'Password reset successfully!',
          });

          if (onNext) {
            onNext();
            return;
          }
          redirectOnSignin(true);
        },
        onError: (err: Error) => {
          setError(err?.message || 'Could not change your password. Please try again.');
        },
      });
    },
    [handlePasswordReset, showAlert, redirectOnSignin, onNext]
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
      {...containerProps}
    >
      {error && (
        <Alert severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      )}
      <FormTextField
        fullWidth
        disabled={resetPasswordLoading}
        label="Current Password"
        type="password"
        id="current-password"
        autoComplete="current-password"
        control={control}
        name="currentPassword"
        size="small"
        rules={{ required: 'Required' }}
      />

      <FormTextField
        fullWidth
        disabled={resetPasswordLoading}
        label="New Password"
        type="password"
        id="password"
        autoComplete="new-password"
        control={control}
        name="password"
        size="small"
        rules={{
          required: 'Required',
          pattern: {
            value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@_\-$]{8,}$/,
            message: 'Use 8+ characters with uppercase, lowercase and a number.',
          },
        }}
      />

      <FormTextField
        fullWidth
        disabled={resetPasswordLoading}
        label="Confirm New Password"
        type="password"
        id="confirm-password"
        autoComplete="new-password"
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
        Use at least 8 characters, including uppercase, lowercase and a number. Allowed symbols: @ _ - $.
      </Typography>
      <Box width="100%" display="flex" ml={onNext ? 'auto' : 'none'}>
        <Button
          startIcon={<CheckCircle size={16} />}
          title={onNext ? 'Save password and continue' : 'Change Password'}
          type="submit"
          fullWidth
          disabled={resetPasswordLoading}
          loading={resetPasswordLoading}
        />
      </Box>
    </Box>
  );
};

export default React.memo(ChangePasswordForm);
