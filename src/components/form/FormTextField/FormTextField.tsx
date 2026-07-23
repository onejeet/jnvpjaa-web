import React from 'react';
import { Controller, FieldValues, Path } from 'react-hook-form';
import { FormTextFieldProps } from './FormTextField.types';
import TextField from '@/components/core/TextField';

const FormTextField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
>({
  name,
  control,
  rules,
  defaultValue,
  helperText = '',
  ...textFieldProps
}: FormTextFieldProps<TFieldValues, TName>) => {
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
