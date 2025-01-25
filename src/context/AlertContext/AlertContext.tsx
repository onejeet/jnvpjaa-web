import React, { createContext, useContext } from 'react';
import Toast from '@/components/common/Toast';
import Box from '@mui/material/Box';
import { WRAPPER_ID } from './AlertContext.constant';
import type { AlertContextProps, AlertProviderProps } from './AlertContext.types';
import { ToastProps } from '@/components/common/Toast/Toast.types';

const defaultProvider: AlertContextProps = {
  showAlert: () => {},
  hideAlert: () => {},
};

const AlertContext = createContext(defaultProvider);

const AlertProvider = ({ children }: AlertProviderProps) => {
  const [notification, setNotification] = React.useState<Partial<ToastProps>>({
    visible: false,
  });

  // handler to trigger notification
  const showAlert = React.useCallback((options: Omit<ToastProps, 'onClose'>) => {
    setNotification({
      ...options,
      visible: true,
    });
  }, []);

  // handler to hide notification
  const hideAlert = React.useCallback(() => {
    setNotification({
      ...notification,
      visible: false,
    });
  }, [notification]);

  return (
    <AlertContext.Provider
      value={{
        notification,
        showAlert,
        hideAlert,
      }}
    >
      <Toast
        onClose={() => {
          setNotification({
            ...notification,
            visible: false,
          });
        }}
        variant="minimal"
        {...notification}
      />
      ,<Box id={WRAPPER_ID}>{children}</Box>
    </AlertContext.Provider>
  );
};

const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) throw new Error('Alert context can only be used inside AlertProvider');

  return context;
};

export { AlertContext, AlertProvider, useAlert };
