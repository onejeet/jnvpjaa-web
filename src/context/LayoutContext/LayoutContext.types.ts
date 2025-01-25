export interface LayoutContextProps {
  settings: SettingsProps;
  setSettings: (data: SettingsProps) => void;
}

export interface SettingsProps {
  mode: 'light' | 'dark';
}

export interface LayoutProviderProps {
  children: React.ReactNode;
}
