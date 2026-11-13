'use client';

import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Alert, Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Info } from '@mui/icons-material';
import type { SignupMutationVariables } from 'src/apollo/hooks';
import { SIGNUP_WITH_HONEYPOT } from '@/apollo/signupOperation';
import { useMutation } from '@apollo/client';
import { ISignupFormInput } from './Signup.types';
import FormTextField from '@/components/form/FormTextField';
import Button from '@/components/core/Button';
import FormSelectField from '@/components/form/FormSelectField';
import { getBatchOptions, phoneNumberStringConverter, startCase } from '@/utils/helpers';
import FormPhoneField from '@/components/form/FormPhoneField';
import FormCheckbox from '@/components/form/FormCheckboxField/FormCheckboxField';

const batchList = getBatchOptions().filter((batch) => batch.value > 0);

const SignupForm = () => {
  const [signupSuccess, setSignupSuccess] = React.useState<boolean>(false);
  const [error, setError] = React.useState('');
  const { control, handleSubmit, register, setValue } = useForm<ISignupFormInput>({ defaultValues: { website: '' } });

  const watchPassword = useWatch({ control, name: 'password' });
  const watchIsFaculty = useWatch({ control, name: 'isFaculty' });

  const [signup, { loading }] = useMutation<
    { signup: { id: string } },
    SignupMutationVariables & { website?: string | null }
  >(SIGNUP_WITH_HONEYPOT);

  const onSubmit = React.useCallback(
    (data: ISignupFormInput) => {
      setError('');
      signup({
        variables: {
          firstName: startCase(data?.first_name?.trim()),
          lastName: startCase(data?.last_name?.trim()),
          email: data?.email?.toLowerCase()?.trim(),
          password: data?.password,
          gender: data?.gender,
          mobile: data?.mobile ? phoneNumberStringConverter(data?.mobile) : data?.mobile,
          batch: data?.isFaculty ? 0 : data?.batch,
          isFaculty: data?.isFaculty,
          website: data.website || '',
        },
        onCompleted: () => {
          setSignupSuccess(true);
        },
        onError: (err: Error) => {
          setError(err?.message || 'Could not submit your registration. Please try again.');
        },
      });
    },
    [signup]
  );

  if (signupSuccess) {
    return (
      <Alert severity="success" sx={{ width: '100%' }}>
        <Typography variant="h3" component="h2" mb={1}>
          Registration submitted
        </Typography>
        Your registration is awaiting approval. You can sign in after the association or your batch coordinator approves
        it.
      </Alert>
    );
  }

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        width: '100%',
        mt: 0,
        p: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box
        aria-hidden="true"
        sx={{ position: 'absolute', left: '-10000px', width: '1px', height: '1px', overflow: 'hidden' }}
      >
        <label htmlFor="signup-website">Website</label>
        <input id="signup-website" type="text" autoComplete="off" tabIndex={-1} {...register('website')} />
      </Box>
      <Grid container spacing={2.5} sx={{ width: '100%' }}>
        {error && (
          <Grid size={12}>
            <Alert severity="error">{error}</Alert>
          </Grid>
        )}
        <Grid size={12}>
          <Typography variant="h3" component="h2">
            About you
          </Typography>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <FormCheckbox
            fullWidth
            id="isFaculty"
            label="I am a faculty member"
            control={control}
            disabled={loading}
            name="isFaculty"
            size="small"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <FormTextField
            fullWidth
            id="first_name"
            label="First name"
            autoComplete="given-name"
            control={control}
            disabled={loading}
            name="first_name"
            size="small"
            rules={{
              required: 'Required',
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <FormTextField
            fullWidth
            id="last_name"
            label="Last name"
            autoComplete="family-name"
            control={control}
            disabled={loading}
            name="last_name"
            size="small"
            rules={{
              required: 'Required',
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: watchIsFaculty ? 12 : 6 }}>
          <FormSelectField
            control={control}
            name="gender"
            label="Gender"
            selectProps={{
              size: 'small',
              id: 'gender',
              disabled: loading,
            }}
            options={[
              {
                label: 'Male',
                value: 'male',
              },
              {
                label: 'Female',
                value: 'female',
              },
            ]}
            rules={{
              required: 'Required',
            }}
          />
        </Grid>

        {!watchIsFaculty && (
          <Grid size={{ xs: 12, md: 6 }}>
            <FormSelectField
              control={control}
              name="batch"
              label="Alumni batch"
              selectProps={{
                size: 'small',
                id: 'batch',
                disabled: loading,
              }}
              disabled={watchIsFaculty}
              options={batchList}
              rules={{
                required: watchIsFaculty ? false : 'Required',
              }}
            />
          </Grid>
        )}

        <Grid size={12}>
          <Typography variant="h3" component="h2" mt={1}>
            Contact details
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <FormTextField
            fullWidth
            type="email"
            id="email"
            label="Email Address"
            autoComplete="email"
            control={control}
            disabled={loading}
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
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <FormPhoneField
            fullWidth
            id="mobile"
            label="Mobile"
            control={control}
            disabled={loading}
            startAdornment="+91"
            name="mobile"
            size="small"
            onChange={(e) => {
              if (e?.target?.value?.length < 11) {
                setValue('mobile', e?.target?.value);
              }
            }}
            rules={{
              required: 'Enter your mobile number.',
              validate: (value) =>
                (String(value).replace(/\D/g, '').length >= 7 && String(value).replace(/\D/g, '').length <= 15) ||
                'Enter a valid mobile number.',
            }}
          />
        </Grid>
        <Grid size={12}>
          <Typography variant="h3" component="h2" mt={1}>
            Secure your account
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <FormTextField
            fullWidth
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            control={control}
            disabled={loading}
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
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <FormTextField
            fullWidth
            label="Confirm Password"
            type="password"
            id="confirm-password"
            autoComplete="new-password"
            control={control}
            disabled={loading}
            name="confirm-password"
            size="small"
            rules={{
              required: 'Required',
              validate: (value) => value === watchPassword || 'Passwords do not match',
            }}
          />
        </Grid>
        <Grid size={{ xs: 12 }} mt={-1}>
          <Typography variant="body2" color="grey.600">
            <Info sx={{ fontSize: '14px' }} />
            Use at least 8 characters, including uppercase, lowercase and a number. Allowed symbols: @ _ - $.
          </Typography>
        </Grid>

        <Grid size={12}>
          <Button title="Submit for approval" type="submit" fullWidth loading={loading} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default React.memo(SignupForm);
