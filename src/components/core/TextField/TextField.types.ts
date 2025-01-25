import type React from 'react';
import type { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';

export interface TextFieldProps extends Omit<MuiTextFieldProps, 'title'> {
  viewModeIsEnabled?: boolean;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  border?: boolean;
  outline?: boolean;
  height?: string | number;
}
