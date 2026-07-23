import { SelectProps as MUISelectProps } from '@mui/material/Select';
import { Control, FieldPathValue, FieldValues, Path, RegisterOptions } from 'react-hook-form';

export interface FormSelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
> {
  name: TName;
  control: Control<TFieldValues>;
  rules?: RegisterOptions<TFieldValues, TName>; // Validation rules for react-hook-form
  defaultValue?: FieldPathValue<TFieldValues, TName>;
  helperText?: React.ReactNode;
  options: { value: string | number; label: string }[];
  error?: boolean;
  onChange?: (event: React.ChangeEvent<{ value: unknown }>) => void;
  // MUI SelectProps we want to extend
  selectProps?: MUISelectProps;
  disabled?: boolean;
  loading?: boolean;
}
