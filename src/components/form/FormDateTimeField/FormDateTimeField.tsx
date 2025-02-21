import React from 'react';
import { Controller } from 'react-hook-form';
import { FormDateTimeFieldProps } from './FormDateTimeField.types';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider, MobileDateTimePicker } from '@mui/x-date-pickers';
import TextField from '@/components/core/TextField';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { Box } from '@mui/material';

const FormDateTimeField: React.FC<FormDateTimeFieldProps> = ({
  name,
  control,
  rules,
  defaultValue,
  helperText = '',
  isDateOnly,
  inputProps = {},
  ...dateTimePickerProps
}) => {
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
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <Controller
          name={name}
          control={control}
          rules={rules}
          defaultValue={defaultValue}
          render={({ field, fieldState: { error } }) =>
            isDateOnly ? (
              <DesktopDatePicker
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
                slotProps={{
                  field: { clearable: true, onClear: () => setCleared(true) },
                }}
              />
            ) : (
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
            )
          }
        />
      </Box>
    </LocalizationProvider>
  );
};

export default FormDateTimeField;
