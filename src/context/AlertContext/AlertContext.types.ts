import { ToastProps } from '@/components/common/Toast/Toast.types';
import type React from 'react';

export interface AlertContextProps {
  showAlert: (options: Omit<ToastProps, 'onClose'>, portalId?: string) => void;
  hideAlert: () => void;
  notification?: any;
}

export interface AlertProviderProps {
  children: React.ReactNode;
}
