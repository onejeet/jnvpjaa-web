import { User, useUpdateUserMutation } from '@/apollo/hooks';
import Button from '@/components/core/Button';
import FormSelectField from '@/components/form/FormSelectField';
import FormTextField from '@/components/form/FormTextField';
import { useAlert } from '@/context/AlertContext';
import { Box, Grid2 as Grid, Typography } from '@mui/material';
import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { IProfessionInfoFormInput } from './ProfileSetup.types';
import { CaretLeft, CaretRight, CheckCircle, SuitcaseSimple, User as UserIcon, X } from '@phosphor-icons/react';
import FormDateTimeField from '@/components/form/FormDateTimeField';
import TipTapTextEditor from '@/modules/TipTapTextEditor';
import dayjs from 'dayjs';
import { useApolloClient } from '@apollo/client';
import FormPhoneField from '@/components/form/FormPhoneField';
import { phoneNumberStringConverter } from '@/utils/helpers';
import { COUNTRIES, STATES_INDIA } from '@/constants/Address.constant';

interface ProfessionInfoProps {
  onBack?: () => void;
  onNext?: () => void;
  onSuccess?: () => void;
  onCancel?: () => void;
  user?: User;
}

const ProfessionInfo: React.FC<ProfessionInfoProps> = ({ user, onNext, onBack, onSuccess, onCancel }) => {
  const client = useApolloClient();
  const { showAlert } = useAlert();
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<IProfessionInfoFormInput>({
    defaultValues: {},
  });

  const watchCountry = useWatch({
    control,
    name: 'country',
  });

  const [updateUser, { loading }] = useUpdateUserMutation();

  const onSubmit = React.useCallback(
    (data: IProfessionInfoFormInput) => {
      updateUser({
        variables: {
          id: user?.id,
          companyName: data?.companyName,
          position: data?.position,
          location: data?.city,
          startedWorking: data?.startedWorking,
        },
        onCompleted: (res) => {
          console.log('COmpleted', res);
          client?.refetchQueries({
            include: ['getUserDetails'],
          });

          onSuccess?.();
          onNext?.();
        },
        onError: (err: Error) => {
          showAlert({
            visible: true,
            type: 'error',
            message: err?.message || 'Image upload failed. Please try again.',
          });
          console.log('Error: ', err?.message);
        },
      });
    },
    [updateUser, showAlert, onSuccess, user?.id, client]
  );

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      p={{ xs: 2, md: 3 }}
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'center',
      }}
    >
      <Box display="flex" alignItems="center" mb={3}>
        <SuitcaseSimple size={32} />
        <Typography sx={{ ml: 1 }} fontWeight={600}>
          Profession Info
        </Typography>
      </Box>
      <Grid container spacing={3} maxWidth="100%" size={{ xs: 12 }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormTextField
            fullWidth
            id="companyName"
            label="Company Name"
            autoFocus
            control={control}
            disabled={loading}
            name="companyName"
            size="small"
            rules={{
              required: 'Required',
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormTextField
            fullWidth
            id="position"
            label="Position"
            autoFocus
            control={control}
            disabled={loading}
            name="position"
            size="small"
            rules={{
              required: 'Required',
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <FormSelectField
            control={control}
            name="country"
            selectProps={{
              size: 'small',
              id: 'country',
              disabled: loading,
            }}
            // loading={addressesLoading}
            onChange={(value: any) => {
              setValue('country', value?.target?.value);
              if (value?.target?.value !== 'IN') {
                setValue('state', '');
              } else if (value?.target?.value === 'IN' && getValues('state') !== 'Rajasthan') {
                setValue('state', 'Rajasthan');
              }
            }}
            options={COUNTRIES}
            rules={{
              required: 'Required',
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <FormTextField
            fullWidth
            id="city"
            label="City"
            autoFocus
            control={control}
            disabled={loading}
            name="city"
            size="small"
            rules={{
              required: 'Required',
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          {watchCountry === 'IN' ? (
            <FormSelectField
              control={control}
              name="state"
              selectProps={{
                size: 'small',
                id: 'state',
                disabled: loading,
              }}
              // loading={addressesLoading}
              options={STATES_INDIA}
              rules={{
                required: 'Required',
              }}
            />
          ) : (
            <FormTextField
              fullWidth
              id="state"
              label="State"
              placeholder="State"
              control={control}
              disabled={loading}
              name="state"
              // loading={addressesLoading}
              size="small"
              // onChange={(e) => {
              //   if (e?.target?.value?.length < 11) {
              //     setValue('mobile', e?.target?.value);
              //   }
              // }}
              rules={{
                required: 'Required',
              }}
            />
          )}
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <FormDateTimeField
            control={control}
            name="startedWorking"
            isDateOnly
            inputProps={{
              label: 'Working Since',
              disabled: loading,
              size: 'small',
            }}
            // rules={{
            //   required: 'Required',
            //   maxLength: {
            //     value: 10,
            //     message: 'Invalid mobile number',
            //   },
            // }}
          />
        </Grid>

        <Box display="flex" width="100%" alignItems="center" gap={2}>
          {onBack && (
            <Button
              title="Back"
              variant="outlined"
              startIcon={<CaretLeft size={16} />}
              disabled={loading}
              onClick={onBack}
            />
          )}

          <Box display="flex" gap={2} ml="auto">
            {!onNext && (
              <Button
                title="Cancel"
                variant="outlined"
                startIcon={<X size={16} />}
                disabled={loading}
                onClick={() => {
                  onCancel?.();
                }}
              />
            )}
            {onNext && (
              <Button
                title="Skip"
                variant="outlined"
                endIcon={<CaretRight size={16} />}
                disabled={loading}
                onClick={() => {
                  onNext?.();
                }}
              />
            )}
            <Button
              title={onNext ? 'Update & Next' : 'Update'}
              type="submit"
              startIcon={<CheckCircle size={16} />}
              loading={loading}
            />
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};

export default ProfessionInfo;
