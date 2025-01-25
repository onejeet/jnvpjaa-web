import React from 'react';
import { ButtonProps as MuiButtonProps } from '@mui/material/Button';

export interface ButtonProps extends Omit<MuiButtonProps, 'title'> {
  title: string | React.ReactNode;
  loading?: boolean;
}
