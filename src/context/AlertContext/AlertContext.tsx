import React, { createContext, useContext } from 'react';
import Box from '@mui/material/Box';
import { WRAPPER_ID } from './AlertContext.constant';
import CloseIcon from '@mui/icons-material/Close';
import type { AlertContextProps, AlertProviderProps } from './AlertContext.types';
import toast, { Toast, ToastBar, Toaster } from 'react-hot-toast';
import { IconButton, useTheme } from '@mui/material';

const defaultProvider: AlertContextProps = {
  showAlert: () => {},
  hideAlert: () => {},
};

const AlertContext = createContext(defaultProvider);

const AlertProvider = ({ children }: AlertProviderProps) => {
  const theme = useTheme();

  // handler to trigger notification
  const showAlert = React.useCallback((options: Toast) => {
    const { type, message, ...other } = options;
    toast.dismiss();
    switch (options.type) {
      case 'success':
        return toast.success(options.message, { ...other });

      case 'error':
        return toast.error(options.message, { ...other });

      case 'loading':
        return toast.loading(options.message, { ...other });

      case 'custom':
        return toast.loading(options.message, { ...other });

      default:
        return toast.loading(options.message, { ...other });
    }
  }, []);

  // handler to hide notification
  const hideAlert = React.useCallback(() => {
    toast.dismiss();
  }, []);

  return (
    <AlertContext.Provider
      value={{
        showAlert,
        hideAlert,
      }}
    >
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: '',
          duration: 5000,
          removeDelay: 1000,
          style: {
            background: theme.palette.grey[100],
            color: theme.palette.common.black,
          },

          // Default options for specific types
          // success: {
          //   duration: 5000,
          //   iconTheme: {
          //     primary: theme.palette.primary.main,
          //     secondary: 'black',
          //   },
          // },
        }}
      >
        {(t) => (
          <ToastBar toast={t}>
            {({ icon, message }) => (
              <>
                {icon}
                {message}
                {t.type !== 'loading' && (
                  <IconButton onClick={() => toast.dismiss(t.id)} size="small">
                    <CloseIcon sx={{ fontSize: '16px' }} />
                  </IconButton>
                )}
              </>
            )}
          </ToastBar>
        )}
      </Toaster>
      <Box id={WRAPPER_ID}>{children}</Box>
    </AlertContext.Provider>
  );
};

const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) throw new Error('Alert context can only be used inside AlertProvider');

  return context;
};

export { AlertContext, AlertProvider, useAlert };
