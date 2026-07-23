import { CheckboxProps } from '@mui/material/Checkbox';
import { Control, FieldPathValue, FieldValues, Path, RegisterOptions } from 'react-hook-form';

export interface FormCheckboxProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
> extends Omit<CheckboxProps, 'name' | 'defaultValue'> {
  name: TName;
  control: Control<TFieldValues>;
  rules?: RegisterOptions<TFieldValues, TName>;
  defaultValue?: FieldPathValue<TFieldValues, TName>;
  helperText?: string;
  label: string; // Label for the checkbox
  fullWidth?: boolean;
}
