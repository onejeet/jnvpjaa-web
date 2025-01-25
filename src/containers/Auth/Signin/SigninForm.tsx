'use client';

import React from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { Box, Button, Card, Typography } from '@mui/material';
import { useSigninMutation } from 'src/apollo/hooks';
import { ISigninFormInput } from './Signin.types';
import FormTextField from '@/components/form/FormTextField';
import { useAlert } from '@/context/AlertContext';

const SigninForm = () => {
  const { showAlert } = useAlert();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISigninFormInput>();

  const [signin] = useSigninMutation();

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
            visible: true,
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
      sx={{ maxWidth: 400, bgcolor: 'grey.100', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Image src={'/assets/svg/profile-website-icon.svg'} width={200} height={100} alt="login" />
      {/* </Box> */}
      <Typography variant="h3" mb={2}>
        Alumni Center Access
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          width: 400,
          mt: 1,
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
          rules={{
            required: 'Required',
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
          rules={{
            required: 'Required',
          }}
        />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Sign In
        </Button>
      </Box>
    </Card>
  );
};

export default React.memo(SigninForm);
