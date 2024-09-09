import modes from '@/utils/theme/themeModes.utils';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { createContext } from 'react';

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

export { LayoutContext, LayoutProvider };
