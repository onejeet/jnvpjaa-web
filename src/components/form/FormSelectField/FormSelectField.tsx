import React from 'react';
import { Controller, FieldValues, Path } from 'react-hook-form';
import { Select, MenuItem, FormControl, InputLabel, FormHelperText, Skeleton } from '@mui/material';
import { FormSelectProps } from './FormSelectField.types';
import { startCase } from '@/utils/helpers';

const FormSelect = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
>({
  name,
  control,
  rules,
  disabled,
  loading,
  defaultValue,
  helperText,
  options = [],
  error = false,
  selectProps,
  label,
  onChange,
}: FormSelectProps<TFieldValues, TName>) => {
  const fieldLabel = label || startCase(name);
  const labelId = `${name}-label`;
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error: fieldError } }) =>
        loading ? (
          <Skeleton width="100%" height={40} />
        ) : (
          <FormControl
            fullWidth
            error={error || !!fieldError}
            variant="outlined"
            disabled={disabled ?? selectProps?.disabled}
          >
            <InputLabel id={labelId}>{fieldLabel}</InputLabel>
            <Select
              {...field}
              {...selectProps}
              value={field.value ?? ''}
              onChange={(event, child) => {
                field.onChange(event);
                selectProps?.onChange?.(event, child);
                onChange?.(event as React.ChangeEvent<{ value: unknown }>);
              }}
              labelId={labelId}
              label={fieldLabel}
              disabled={disabled ?? selectProps?.disabled}
            >
              <MenuItem value="" disabled>
                Select {fieldLabel}
              </MenuItem>
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {(fieldError || helperText) && (
              <FormHelperText sx={{ ml: 0 }}>{fieldError?.message || helperText}</FormHelperText>
            )}
          </FormControl>
        )
      }
    />
  );
};

export default FormSelect;
