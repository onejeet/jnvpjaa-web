import React from 'react';
import { IconCurrencyRupee } from '@tabler/icons-react';
import TextField from '@/components/core/TextField';
import type { CurrencyInputProps } from './CurrencyInput.types';

const numberFormatter = new Intl.NumberFormat('en-IN', {
  maximumFractionDigits: 2,
});

export const parseCurrencyInputValue = (value?: number | string | null): number | null => {
  if (value === null || value === undefined || value === '') return null;
  const normalized = String(value).replace(/,/g, '').trim();
  if (!normalized) return null;
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
};

const normalizeInputText = (value: string, maxFractionDigits: number) => {
  const withoutCommas = value.replace(/,/g, '');
  const numericOnly = withoutCommas.replace(/[^\d.]/g, '');
  const [wholePart, ...fractionParts] = numericOnly.split('.');
  const fraction = fractionParts.join('').slice(0, maxFractionDigits);
  return fractionParts.length ? `${wholePart}.${fraction}` : wholePart;
};

const formatCurrencyInputValue = (value?: number | string | null) => {
  const parsed = parseCurrencyInputValue(value);
  if (parsed === null) return '';
  const rawValue = String(value);
  if (rawValue.endsWith('.')) return `${numberFormatter.format(parsed)}.`;
  return numberFormatter.format(parsed);
};

const CurrencyInput = React.forwardRef<HTMLDivElement, CurrencyInputProps>(
  ({ value, onValueChange, maxFractionDigits = 2, inputProps, ...props }, ref) => {
    const [displayValue, setDisplayValue] = React.useState(formatCurrencyInputValue(value));

    React.useEffect(() => {
      setDisplayValue(formatCurrencyInputValue(value));
    }, [value]);

    return (
      <TextField
        {...props}
        ref={ref}
        value={displayValue}
        type="text"
        inputProps={{
          inputMode: 'decimal',
          ...inputProps,
        }}
        startAdornment={<IconCurrencyRupee size={18} />}
        onChange={(event) => {
          const normalized = normalizeInputText(event.target.value, maxFractionDigits);
          setDisplayValue(formatCurrencyInputValue(normalized));
          onValueChange?.(parseCurrencyInputValue(normalized));
        }}
      />
    );
  }
);

CurrencyInput.displayName = 'CurrencyInput';

export default React.memo(CurrencyInput);
