import {
  useCreateCompanyInfoMutation,
  useGetCompanyInfoListByUserQuery,
  useGetCompanyInfoQuery,
  User,
  useUpdateCompanyInfoMutation,
} from '@/apollo/hooks';
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
import { useApolloClient } from '@apollo/client';
import { titleCase } from '@/utils/helpers';
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
    reset,
    formState: { errors },
  } = useForm<IProfessionInfoFormInput>({
    defaultValues: {
      country: 'IN',
    },
  });

  const watchCountry = useWatch({
    control,
    name: 'country',
  });
  const { data, loading: dataLoading } = useGetCompanyInfoListByUserQuery({
    skip: !user?.id,
    variables: {
      userId: user?.id,
    },
  });

  const [createCompanyIInfo, { loading: createCompanyLoading }] = useCreateCompanyInfoMutation();
  const [updateCompanyIInfo, { loading }] = useUpdateCompanyInfoMutation();

  React.useEffect(() => {
    const companyInfo = data?.GetCompanyInfoListByUser?.[0];
    if (companyInfo) {
      reset({
        country: companyInfo?.country || 'IN',
        state: companyInfo?.state ? titleCase(companyInfo?.state) : 'Rajasthan',
        city: companyInfo?.city,
        address: companyInfo?.address,
        companyName: companyInfo?.companyName,
        position: companyInfo?.position,
        startedWorking: companyInfo?.startedWorking,
      });
    }
  }, [data]);

  const onSubmit = React.useCallback(
    (payload: IProfessionInfoFormInput) => {
      let mutation = createCompanyIInfo;
      const variables = {
        companyName: payload?.companyName,
        position: payload?.position,
        address: payload?.city,
        city: payload?.city,
        state: payload?.state,
        country: payload?.country,
        startedWorking: payload?.startedWorking,
      };
      if (data?.GetCompanyInfoListByUser?.[0]?.id) {
        mutation = updateCompanyIInfo;
        // @ts-expect-error typerror
        variables.id = data?.GetCompanyInfoListByUser?.[0]?.id;
      }

      mutation({
        variables,
        onCompleted: (res) => {
          console.log('Completed', res);
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
            message: err?.message || 'Update failed. Please try again.',
          });
          console.log('Error: ', err?.message);
        },
      });
    },
    [updateCompanyIInfo, createCompanyIInfo, showAlert, onSuccess, client, onNext, data]
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
            label="Company/Department Name"
            autoFocus
            control={control}
            disabled={loading}
            loading={dataLoading}
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
            loading={dataLoading}
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
            loading={dataLoading}
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
            loading={dataLoading}
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
              loading={dataLoading}
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
              loading={dataLoading}
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
              loading: dataLoading,
            }}
            loading={dataLoading}
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
