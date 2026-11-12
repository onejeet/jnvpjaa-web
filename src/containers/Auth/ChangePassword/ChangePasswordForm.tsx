'use client';

import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Box, BoxProps, Typography } from '@mui/material';
import FormTextField from '@/components/form/FormTextField';
import { useAlert } from '@/context/AlertContext';
import Button from '@/components/core/Button';
import { useRouter } from 'next/navigation';
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
  const { user, redirectOnSignin } = useAuth();
  const { showAlert } = useAlert();
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ChangePasswordFormInput>();

  const watchPassword = useWatch({ control, name: 'password' });
  const [handlePasswordReset, { loading: resetPasswordLoading }] = useMutation(CHANGE_PASSWORD_MUTATION);
  const onSubmit = React.useCallback(
    (data: ChangePasswordFormInput) => {
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
          showAlert({
            type: 'error',
            message: err?.message || 'Something went wrong',
          });
          console.log('Error: ', err?.message);
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
            message: 'Invalid password.',
          },
        }}
      />

      <FormTextField
        fullWidth
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
