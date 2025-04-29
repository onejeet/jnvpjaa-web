import { ButtonProps } from '@/components/core/Button/Button.types';
import type React from 'react';

export interface AlertContentProps {
  title?: string;
  message?: string | React.ReactNode;
  action?:
    | 'approve'
    | 'reject'
    | 'delete'
    | 'unsaved'
    | 'loading'
    | 'deleting'
    | 'success'
    | 'error'
    | 'request'
    | 'app';
  items?: string[];
}

export interface AlertDialogProps extends AlertContentProps {
  open: boolean;
  onClose?: () => void;
  onOkay?: () => void;
  onCancel?: () => void;
  okayButtonProps?: Partial<ButtonProps>;
  cancelButtonProps?: Partial<ButtonProps>;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}
