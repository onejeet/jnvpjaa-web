import { TextFieldProps } from '@/components/core/TextField';
import { Control, FieldValues, InputValidationRules, RegisterOptions } from 'react-hook-form';

export interface FormTextFieldProps extends TextFieldProps {
  name: string;
  control: Control<any, any>;
  rules: RegisterOptions<any>; // Validation rules for react-hook-form
  defaultValue?: string;
}
