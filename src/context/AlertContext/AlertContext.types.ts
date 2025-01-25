import type React from 'react';
import type { Toast } from 'react-hot-toast';

export interface AlertContextProps {
  showAlert: (options: ToastProps) => void;
  hideAlert: () => void;
}

export interface AlertProviderProps {
  children: React.ReactNode;
}

export interface ToastProps extends Partial<Omit<Toast, 'message' | 'type'>> {
  message: string;
  type: Toast['type'];
}
