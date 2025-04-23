import { TextFieldProps } from '@/components/core/TextField';
import { Control, FieldValues, InputValidationRules, RegisterOptions } from 'react-hook-form';
import {
  type MuiTelInputCountry,
  type MuiTelInputInfo,
  type MuiTelInputContinent,
  type MuiTelInputFlagElement,
} from 'mui-tel-input';

export interface FormPhoneFieldProps extends TextFieldProps {
  name: string;
  control: Control<any, any>;
  rules?: RegisterOptions<any>; // Validation rules for react-hook-form
  defaultValue?: string;
  defaultCountry?: MuiTelInputCountry;
}
