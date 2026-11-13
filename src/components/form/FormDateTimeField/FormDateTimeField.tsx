import React from 'react';
import { Controller, FieldValues, Path } from 'react-hook-form';
import { FormDateTimeFieldProps } from './FormDateTimeField.types';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import { LocalizationProvider, MobileDateTimePicker } from '@mui/x-date-pickers';
import { Box, Skeleton } from '@mui/material';

const FormDateTimeField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
>({
  name,
  control,
  rules,
  defaultValue,
  helperText = '',
  isDateOnly,
  loading,
  inputProps = {},
  ...dateTimePickerProps
}: FormDateTimeFieldProps<TFieldValues, TName>) => {
  const [cleared, setCleared] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (cleared) {
      const timeout = setTimeout(() => {
        setCleared(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }
    return () => {};
  }, [cleared]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={defaultValue}
        render={({ field, fieldState: { error } }) =>
          loading ? (
            <Skeleton width="100%" height={41} />
          ) : isDateOnly ? (
            <Box
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              <DesktopDatePicker
                {...field}
                format="MMM DD, YYYY"
                {...dateTimePickerProps}
                onChange={(newValue: Dayjs | null) => field.onChange(newValue)}
                slotProps={{
                  field: { clearable: true, onClear: () => setCleared(true) },
                  textField: {
                    ...inputProps,
                    fullWidth: true,
                    size: 'small',
                    error: !!error,
                    helperText: error?.message || helperText,
                  },
                }}
              />
            </Box>
          ) : (
            <MobileDateTimePicker
              {...field}
              {...dateTimePickerProps}
              ampm={true}
              format="MMM DD, YYYY hh:mm A"
              onChange={(newValue: Dayjs | null) => field.onChange(newValue)}
              slotProps={{
                textField: {
                  ...inputProps,
                  fullWidth: true,
                  size: 'small',
                  error: !!error,
                  helperText: error?.message || helperText,
                },
              }}
            />
          )
        }
      />
    </LocalizationProvider>
  );
};

export default FormDateTimeField;
