// ** MUI Theme Provider
import { PaletteMode, ThemeOptions } from '@mui/material';

// ** Theme Override Imports
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

export default themeOptions;
