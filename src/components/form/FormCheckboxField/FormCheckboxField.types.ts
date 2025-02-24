import { Control, FieldValues, RegisterOptions } from 'react-hook-form';

export interface FormCheckboxProps {
  name: string;
  control: Control<any, any>;
  rules?: RegisterOptions;
  defaultValue?: boolean;
  helperText?: string;
  label: string; // Label for the checkbox
  [key: string]: any; // To support other checkbox props like color, disabled, etc.
}
