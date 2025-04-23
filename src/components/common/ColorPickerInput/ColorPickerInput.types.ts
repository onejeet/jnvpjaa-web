import type { IconButtonProps } from '@mui/material/IconButton';

export interface ColorPickerInputProps {
  defaultColors?: string[];
  disabled?: boolean;
  value?: string;
  onChange?: (x: string) => void;
  size?: number;
  pickerIconButtonProps?: IconButtonProps;
  alwaysShowPickerIcon?: boolean;
}
