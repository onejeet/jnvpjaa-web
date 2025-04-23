import type React from 'react';
import type { BoxProps } from '@mui/material/Box';
import type { DialogProps as MuiDialogProps } from '@mui/material/Dialog';
import type { DialogContentProps } from '@mui/material/DialogContent';
import type { ModalProps } from '@mui/material/Modal';
import type { StackProps } from '@mui/material/Stack';
import type { TypographyProps } from '@mui/material/Typography';
import type { ButtonProps } from '../Button/Button.types';

export interface DialogFooterProps extends Omit<BoxProps, 'title'> {
  title?: string | React.ReactNode;
  buttons?: ButtonProps[];
  titleProps?: TypographyProps;
  onOkay?: () => void;
  onCancel?: () => void;
  cancelButtonProps?: Partial<ButtonProps>;
  okayButtonProps?: Partial<ButtonProps>;
  buttonsStackProps?: StackProps;
}

export interface DialogHeaderProps extends Omit<BoxProps, 'title'> {
  title?: string | React.ReactNode;
  subTitle?: string | React.ReactNode;
  icon?: React.ReactNode;
  iconContainerProps?: BoxProps;
  summary?: string | React.ReactNode;
  buttons?: ButtonProps[];
  titleProps?: TypographyProps;
  subTitleProps?: TypographyProps;
  summaryProps?: TypographyProps;
  buttonsStackProps?: StackProps;
  onClose?: ModalProps['onClose'];
  closeIconContainerProps?: BoxProps;
  closeIcon?: React.ReactNode;
}

export interface DialogProps extends Omit<MuiDialogProps, 'title' | 'maxWidth'> {
  title?: string | React.ReactNode;
  header?: React.ReactNode;
  headerProps?: DialogHeaderProps;
  footerProps?: DialogFooterProps;
  disablePadding?: boolean;
  formWrapperProps?: BoxProps & { ref?: React.RefObject<HTMLInputElement> };
  hideHeader?: boolean;
  hideFooter?: boolean;
  maxWidth?: string;
  dialogContentProps?: DialogContentProps;
  disableBackdropClick?: boolean;
  subTitle?: string | React.ReactNode;
  alertWrapperId?: string;
  alertWrapperProps?: BoxProps;
  transitionDirection?: 'up' | 'down' | 'left' | 'right';
}
