import type React from 'react';
import type { Toast } from 'react-hot-toast';

export interface AlertContextProps {
  showAlert: (options: Toast) => void;
  hideAlert: () => void;
}

export interface AlertProviderProps {
  children: React.ReactNode;
}
