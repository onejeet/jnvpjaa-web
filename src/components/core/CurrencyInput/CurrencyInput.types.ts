import type { TextFieldProps } from '@/components/core/TextField';

export interface CurrencyInputProps extends Omit<TextFieldProps, 'onChange' | 'type' | 'value' | 'startAdornment'> {
  value?: number | string | null;
  onValueChange?: (value: number | null) => void;
  maxFractionDigits?: number;
}
