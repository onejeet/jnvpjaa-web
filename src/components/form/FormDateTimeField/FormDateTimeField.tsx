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
import { Box, Skeleton } from '@mui/material';

const FormDateTimeField: React.FC<FormDateTimeFieldProps> = ({
  name,
  control,
  rules,
  defaultValue,
  helperText = '',
  isDateOnly,
  loading,
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
                slots={{
                  textField: (params: any) => (
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
            </Box>
          ) : (
            <MobileDateTimePicker
              {...field}
              {...dateTimePickerProps}
              ampm={true}
              format="MMM DD, YYYY hh:mm A"
              onChange={(newValue: Dayjs | null) => field.onChange(newValue)}
              slots={{
                textField: (params: any) => (
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
    </LocalizationProvider>
  );
};

export default FormDateTimeField;
