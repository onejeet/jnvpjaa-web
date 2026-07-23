import { TextFieldProps } from '@/components/core/TextField';
import { Control, FieldPathValue, FieldValues, Path, RegisterOptions } from 'react-hook-form';
import { type MuiTelInputCountry } from 'mui-tel-input';

export interface FormPhoneFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
> extends TextFieldProps {
  name: TName;
  control: Control<TFieldValues>;
  rules?: RegisterOptions<TFieldValues, TName>; // Validation rules for react-hook-form
  defaultValue?: FieldPathValue<TFieldValues, TName>;
  defaultCountry?: MuiTelInputCountry;
}
