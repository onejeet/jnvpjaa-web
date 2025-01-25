import React, { createContext, useContext } from 'react';
import modes from '@/utils/theme/ThemeOptions';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import type { LayoutContextProps, LayoutProviderProps, SettingsProps } from './LayoutContext.types';

const defaultProvider: LayoutContextProps = {
  settings: {
    mode: 'light',
  },
  setSettings: () => {},
};

// context
const LayoutContext = createContext(defaultProvider);

const LayoutProvider = ({ children }: LayoutProviderProps) => {
  const [settings, setSettings] = React.useState<SettingsProps>(defaultProvider.settings);
  const { mode } = settings;

  const theme = createTheme(modes[mode]);

  return (
    <LayoutContext.Provider
      value={{
        settings,
        setSettings,
      }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </LayoutContext.Provider>
  );
};

const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) throw new Error('Layout context can only be used inside LayoutProvider');

  return context;
};

export { LayoutContext, LayoutProvider, useLayout };
