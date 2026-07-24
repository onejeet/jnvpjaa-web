import type { CurrencyInputProps } from '@/components/core/CurrencyInput';
import { Control, FieldPathValue, FieldValues, Path, RegisterOptions } from 'react-hook-form';

export interface FormCurrencyInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
> extends CurrencyInputProps {
  name: TName;
  control: Control<TFieldValues>;
  rules?: RegisterOptions<TFieldValues, TName>;
  defaultValue?: FieldPathValue<TFieldValues, TName>;
}
