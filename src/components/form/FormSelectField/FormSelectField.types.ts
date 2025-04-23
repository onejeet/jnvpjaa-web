import { SelectProps as MUISelectProps } from '@mui/material/Select';
import { Control, FieldValues, InputValidationRules, RegisterOptions } from 'react-hook-form';

export interface FormSelectProps {
  name: string;
  control: Control<any, any>;
  rules?: RegisterOptions<any>; // Validation rules for react-hook-form
  defaultValue?: any;
  helperText?: React.ReactNode;
  options: { value: string | number; label: string }[];
  error?: boolean;
  onChange?: (event: React.ChangeEvent<{ value: unknown }>) => void;
  // MUI SelectProps we want to extend
  selectProps?: MUISelectProps;
  disabled?: boolean;
  loading?: boolean;
}
