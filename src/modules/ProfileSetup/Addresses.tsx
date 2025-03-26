import {
  useGetUserAddressesQuery,
  User,
  useUpdateUserMutation,
  useUpsertMultipleAddressesMutation,
} from '@/apollo/hooks';
import Button from '@/components/core/Button';
import FormSelectField from '@/components/form/FormSelectField';
import FormTextField from '@/components/form/FormTextField';
import { useAlert } from '@/context/AlertContext';
import { Box, Grid2 as Grid, Typography } from '@mui/material';
import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { IAddressFormInput, IPersonalInfoFormInput } from './ProfileSetup.types';
import { CaretLeft, CaretRight, CheckCircle, House, X } from '@phosphor-icons/react';
import dayjs from 'dayjs';
import { useApolloClient } from '@apollo/client';
import { phoneNumberStringConverter, titleCase } from '@/utils/helpers';
import { COUNTRIES, STATES_INDIA } from '@/constants/Address.constant';

interface AddressesProps {
  onBack?: () => void;
  onNext?: () => void;
  onSuccess?: () => void;
  onCancel?: () => void;
  user?: User;
}

const Addresses: React.FC<AddressesProps> = ({ user, onNext, onBack, onSuccess, onCancel }) => {
  const client = useApolloClient();
  const { showAlert } = useAlert();

  const { data: addresses, loading: addressesLoading } = useGetUserAddressesQuery({
    skip: !user?.id,
  });

  const [upsertMultipleAddresses, { loading }] = useUpsertMultipleAddressesMutation();

  const defaultValues = React.useMemo(() => {
    return {
      country: 'IN',
    };
  }, []);

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    reset,
  } = useForm<IAddressFormInput>({
    defaultValues: {
      ...defaultValues,
      state: defaultValues?.country === 'IN' ? 'Rajasthan' : undefined,
    },
  });

  React.useEffect(() => {
    const address = addresses?.getUserAddresses?.data?.[0];
    if (address) {
      reset({
        id: address?.id,
        country: address?.country || 'IN',
        state: address?.state ? titleCase(address?.state) : 'Rajasthan',
        city: address?.city,
        address: address?.address,
        type: 'home',
        postalCode: address?.postalCode,
      });
    }
  }, [addresses]);

  const watchCountry = useWatch({
    control,
    name: 'country',
  });

  const onSubmit = React.useCallback(
    (data: IAddressFormInput) => {
      upsertMultipleAddresses({
        variables: {
          updates: [
            {
              type: 'home',
              id: data.id,
              address: data?.address,
              city: data?.city,
              state: data?.state,
              country: data?.country,
              postalCode: data?.postalCode,
            },
          ],
        },
        onCompleted: () => {
          onSuccess?.();
          onNext?.();
        },
        onError: (err) => {
          showAlert({
            visible: true,
            type: 'error',
            message: err?.message || 'Address update failed. Please try again.',
          });
        },
      });
    },
    [showAlert, onSuccess, user?.id, client, upsertMultipleAddresses, onNext]
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
        alignItems: 'center',
      }}
    >
      <Grid container spacing={3} width="100%" size={{ xs: 12 }}>
        <Grid size={{ xs: 12 }} sx={{ display: 'flex', alignItems: 'center' }}>
          <House size={32} />
          <Typography sx={{ ml: 1 }} fontWeight={600}>
            Home Address
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <FormSelectField
            control={control}
            name="country"
            selectProps={{
              size: 'small',
              id: 'country',
              disabled: loading,
            }}
            loading={addressesLoading}
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
        <Grid size={{ xs: 12, sm: 8 }}>
          <FormTextField
            fullWidth
            id="address"
            label="Address"
            autoFocus
            loading={addressesLoading}
            control={control}
            disabled={loading}
            name="address"
            size="small"
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
            loading={addressesLoading}
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
              loading={addressesLoading}
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
              loading={addressesLoading}
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
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <FormTextField
            fullWidth
            id="postalCode"
            label="Zip Code"
            placeholder="Zip Code"
            control={control}
            loading={addressesLoading}
            disabled={loading}
            name="postalCode"
            size="small"
            // onChange={(e) => {
            //   if (e?.target?.value?.length < 11) {
            //     setValue('extraMobile', e?.target?.value);
            //   }
            // }}
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
              disabled={loading || addressesLoading}
              onClick={onBack}
            />
          )}

          <Box display="flex" gap={2} ml="auto">
            {!onNext && (
              <Button
                title="Cancel"
                variant="outlined"
                startIcon={<X size={16} />}
                disabled={loading || addressesLoading}
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
                disabled={loading || addressesLoading}
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
              disabled={addressesLoading}
            />
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};

export default Addresses;
