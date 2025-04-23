import React from 'react';
import { Controller } from 'react-hook-form';
import { FormSelectProps } from './FormSelectField.types';
import { Select, MenuItem, FormControl, InputLabel, FormHelperText, Typography, Skeleton } from '@mui/material';
import { startCase } from '@/utils/helpers';

const FormSelect: React.FC<FormSelectProps> = ({
  name,
  control,
  rules,
  disabled,
  loading,
  defaultValue = '',
  helperText = '',
  options = [],
  error = false,
  selectProps,
  ...rest
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error: fieldError } }) =>
        loading ? (
          <Skeleton width="100%" height={41} />
        ) : (
          <FormControl fullWidth error={error || !!fieldError} variant="outlined">
            {/* <InputLabel id={`${name}-label`}>Select Option</InputLabel> */}
            {/* @ts-expect-error het */}
            <Select
              {...field} // Spread the react-hook-form field
              {...selectProps} // Spread any additional MUI Select props
              {...rest} // Allow any other extra props (e.g., helperText, error)
              labelId={`${name}-label`}
              variant="outlined" // Ensure the Select has the outlined variant
              displayEmpty
              disabled={disabled}
              // renderValue={(selected: unknown) => {
              //   return selected ? String(selected) : name;
              // }}
            >
              <MenuItem value="" disabled>
                <Typography sx={{ color: error || !!fieldError ? 'error.main' : 'grey.700' }}>
                  {' '}
                  {`Select ${name ? startCase(name) : ''}`}
                </Typography>
              </MenuItem>
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {(error || fieldError) && (
              <FormHelperText
                sx={{
                  // '& .MuiFormHelperText-root': {
                  position: 'absolute',
                  left: 0,
                  bottom: '-16px',
                  fontSize: '0.65rem',
                  ml: 0,
                  //},
                }}
              >
                {fieldError ? fieldError.message : helperText}
              </FormHelperText>
            )}
          </FormControl>
        )
      }
    />
  );
};

export default FormSelect;
