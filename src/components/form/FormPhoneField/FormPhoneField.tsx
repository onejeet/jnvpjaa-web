import React from 'react';
import { Controller } from 'react-hook-form';
import { FormPhoneFieldProps } from './FormPhoneField.types';
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input';
import { phoneNumberJSONConverter } from '@/utils/helpers';

const FormPhoneField: React.FC<FormPhoneFieldProps> = ({
  name,
  control,
  rules,
  defaultValue = '',
  helperText = '',
  defaultCountry = 'IN',
  ...textFieldProps
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        ...rules,
        // Add a custom validation rule to check the length
        validate: {
          maxLength: (value) => {
            const { phoneNumber } = phoneNumberJSONConverter(value); // Remove non-numeric characters
            if (value) {
              console.log('ZZ: BB VALIDARION', value, matchIsValidTel(value));
            }
            if (value) {
              if (matchIsValidTel(value)) return true;
              else return 'Invalid mobile number';
            }
            return true;
          },
        },
      }}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => {
        const handleChange = (value: any, countryData: any) => {
          const { phoneNumber } = phoneNumberJSONConverter(value);
          console.log('ZZ: BBB', value, countryData, phoneNumber);
          if (!countryData.countryCode) {
            return;
          }
          // // Strip non-digit characters and ensure the length is <= 10

          // if (!phoneNumber || phoneNumber?.length <= 10) {
          //   field.onChange(value); // Update the field value if within the limit
          // }
          field.onChange(value);
        };
        return (
          <MuiTelInput
            {...field}
            {...textFieldProps}
            error={!!error}
            helperText={error ? error.message : helperText}
            onChange={handleChange} // Properly hook up the onChange handler
            value={field.value || defaultValue} // Ensuring the value is set correctly
            defaultCountry={defaultCountry}
            sx={{
              '& .MuiFormHelperText-root': {
                position: 'absolute',
                left: 0,
                bottom: '-16px',
                fontSize: '0.65rem',
                ml: 0,
              },
            }}
          />
        );
      }}
    />
  );
};

export default FormPhoneField;
