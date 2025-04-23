import { PaletteMode, ThemeOptions } from '@mui/material';
import overrides from './overrides';
import palette from './palette';
import typography from './typography';

const themeOptions = (mode: PaletteMode): ThemeOptions => {
  return {
    palette: palette(mode),
    typography,
    components: {
      ...overrides(mode),
    },
  };
};

const modes = {
  light: themeOptions('light'),
  dark: themeOptions('dark'),
};

export default modes;
