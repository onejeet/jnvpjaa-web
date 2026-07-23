import { Control, FieldPathValue, FieldValues, Path, RegisterOptions } from 'react-hook-form';
import { DateTimePickerProps } from '@mui/x-date-pickers/DateTimePicker';
import { Dayjs } from 'dayjs'; // Import Dayjs type from dayjs
import { TextFieldProps } from '@/components/core/TextField';
import { DateView } from '@mui/x-date-pickers';

export interface FormDateTimeFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
> {
  name: TName;
  control: Control<TFieldValues>;
  rules?: RegisterOptions<TFieldValues, TName>; // Validation rules for react-hook-form
  defaultValue?: FieldPathValue<TFieldValues, TName>;
  helperText?: string;
  dateTimePickerProps?: DateTimePickerProps<Dayjs, false>;
  inputProps?: Partial<TextFieldProps>;
  isDateOnly?: boolean;
  loading?: boolean;
  views?: DateView[];
  format?: string;
}
