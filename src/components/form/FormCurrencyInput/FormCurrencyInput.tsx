import React from 'react';
import { Controller, FieldValues, Path } from 'react-hook-form';
import CurrencyInput from '@/components/core/CurrencyInput';
import type { FormCurrencyInputProps } from './FormCurrencyInput.types';

const FormCurrencyInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
>({
  name,
  control,
  rules,
  defaultValue,
  helperText = '',
  ...currencyInputProps
}: FormCurrencyInputProps<TFieldValues, TName>) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    defaultValue={defaultValue}
    render={({ field, fieldState: { error } }) => (
      <CurrencyInput
        {...currencyInputProps}
        value={field.value}
        onBlur={field.onBlur}
        onValueChange={(amount) => field.onChange(amount)}
        error={!!error}
        helperText={error ? error.message : helperText}
      />
    )}
  />
);

export default FormCurrencyInput;
