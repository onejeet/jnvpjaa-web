import React from 'react';
import { Controller } from 'react-hook-form';
import { FormTextFieldProps } from './FormTextField.types';
import TextField from '@/components/core/TextField';

const FormTextField: React.FC<FormTextFieldProps> = ({
  name,
  control,
  rules,
  defaultValue = '',
  helperText = '',
  ...textFieldProps
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <TextField {...field} {...textFieldProps} error={!!error} helperText={error ? error.message : helperText} />
      )}
    />
  );
};

export default FormTextField;
