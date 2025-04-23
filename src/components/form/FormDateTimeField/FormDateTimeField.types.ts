import { Control, FieldValues, Path, RegisterOptions } from 'react-hook-form';
import { DateTimePickerProps } from '@mui/x-date-pickers/DateTimePicker';
import { Dayjs } from 'dayjs'; // Import Dayjs type from dayjs
import { TextFieldProps } from '@/components/core/TextField';
import { DateView } from '@mui/x-date-pickers';

export interface FormDateTimeFieldProps<TFieldValues extends FieldValues = FieldValues> {
  name: Path<TFieldValues>;
  control: Control<any, any>;
  rules?: RegisterOptions<any>; // Validation rules for react-hook-form
  defaultValue?: Dayjs;
  helperText?: string;
  dateTimePickerProps?: DateTimePickerProps<Dayjs, false>;
  inputProps?: Partial<TextFieldProps>;
  isDateOnly?: boolean;
  loading?: boolean;
  views?: DateView[];
  format?: string;
}
