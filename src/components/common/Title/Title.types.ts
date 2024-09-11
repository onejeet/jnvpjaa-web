import { BoxProps } from '@mui/material/Box';
import { TypographyProps } from '@mui/material/Typography';
import React from 'react';

export interface TitleProps {
  containerProps?: BoxProps;
  icon?: React.ReactNode;
  iconContainerProps?: BoxProps;
  contentContainerProps?: BoxProps;
  title?: string | React.ReactNode;
  titleProps?: TypographyProps;
  titleContainerProps?: BoxProps;
  summary?: string | React.ReactNode;
  summaryProps?: TypographyProps;
  summaryContainerProps?: BoxProps;
}
