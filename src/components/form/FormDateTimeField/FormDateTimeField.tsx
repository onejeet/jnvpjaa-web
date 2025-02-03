import React from 'react';
import { Controller } from 'react-hook-form';
import { FormDateTimeFieldProps } from './FormDateTimeField.types';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider, MobileDateTimePicker } from '@mui/x-date-pickers';
import TextField from '@/components/core/TextField';
import ScheduleIcon from '@mui/icons-material/Schedule';

const FormDateTimeField: React.FC<FormDateTimeFieldProps> = ({
  name,
  control,
  rules,
  defaultValue = dayjs(),
  helperText = '',
  inputProps = {},
  ...dateTimePickerProps
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={defaultValue}
        render={({ field, fieldState: { error } }) => (
          <MobileDateTimePicker
            {...field}
            {...dateTimePickerProps}
            onChange={(newValue: Dayjs | null) => field.onChange(newValue)}
            slots={{
              textField: (params) => (
                <TextField
                  fullWidth
                  endAdornment={<ScheduleIcon />}
                  size="small"
                  {...params}
                  {...inputProps}
                  error={!!error}
                  helperText={error ? error.message : helperText}
                />
              ),
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default FormDateTimeField;
