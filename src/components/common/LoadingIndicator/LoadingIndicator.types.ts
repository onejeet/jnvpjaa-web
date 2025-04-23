import type { BackdropProps } from '@mui/material/Backdrop';
import type { BoxProps } from '@mui/material/Box';

export interface LoadingIndicatorProps extends BoxProps {
  size?: number;
  BackdropProps?: BackdropProps;
  isBackdrop?: boolean;
  icon?: string;
}
