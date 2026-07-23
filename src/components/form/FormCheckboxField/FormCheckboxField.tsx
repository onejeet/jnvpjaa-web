import React from 'react';
import { Controller, FieldValues, Path } from 'react-hook-form';
import { FormCheckboxProps } from './FormCheckboxField.types';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';

const FormCheckbox = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
>({
  name,
  control,
  rules,
  defaultValue,
  helperText = '',
  label,
  fullWidth,
  ...checkboxProps
}: FormCheckboxProps<TFieldValues, TName>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <>
          <FormControlLabel
            sx={{ width: fullWidth ? '100%' : undefined }}
            control={
              <Checkbox
                {...field}
                {...checkboxProps}
                checked={field.value} // MUI Checkbox expects `checked` prop to manage its state
                onChange={(e) => field.onChange(e.target.checked)} // Handle the change event
              />
            }
            label={label}
          />
          {error && <FormHelperText error>{error.message}</FormHelperText>}
          {helperText && !error && <FormHelperText>{helperText}</FormHelperText>}
        </>
      )}
    />
  );
};

export default FormCheckbox;
