// ** Type Imports
import { Palette, alpha, PaletteOptions, PaletteMode } from '@mui/material';

export interface SimplePaletteColorOptions {
  light?: string;
  main: string;
  dark?: string;
  snow?: string;
  border?: string;
  angelic?: string;
  navy?: string;
  medium?: string;
  blush?: string;
}

export interface AccentColorOptions {
  blush?: string;
}

export interface ShadowOptions {
  light?: string;
}

interface DefaultPaletteOptions extends PaletteOptions {
  primary?: SimplePaletteColorOptions;
  accent?: AccentColorOptions;
  secondary?: SimplePaletteColorOptions;
}
const DefaultPalette = (mode: PaletteMode): DefaultPaletteOptions => {
  // ** Vars
  const isLightMode = mode === 'light';
  const PRIMARY_COLOR = '#C62835';
  const SECONDARY_COLOR = isLightMode ? '#081D13' : '#212a33';
  const GREY_COLOR_BASE = '#c9d1d9';
  const TEXT_COLOR = isLightMode ? SECONDARY_COLOR : '#e8eaed';
  const BACKGROUND_COLOR = isLightMode ? '#FAFBFC' : '#192128';
  const PAPER_COLOR = isLightMode ? '#ffffff' : SECONDARY_COLOR;
  const SNOW_COLOR = '#ffffff';

  const GREY_COLOR = isLightMode
    ? {
        900: '#081d13',
        800: '#4E5954',
        700: '#616B67',
        600: '#838C88',
        500: '#A8AFAC',
        400: '#D2D7D6',
        300: '#E7E9E9',
        200: '#F2F3F3',
        100: '#F7F8F8',
      }
    : {
        900: alpha(GREY_COLOR_BASE, 0.9),
        800: alpha(GREY_COLOR_BASE, 0.6),
        700: alpha(GREY_COLOR_BASE, 0.45),
        600: alpha(GREY_COLOR_BASE, 0.4),
        500: alpha(GREY_COLOR_BASE, 0.35),
        400: alpha(GREY_COLOR_BASE, 0.1),
        300: alpha(GREY_COLOR_BASE, 0.05),
        200: alpha(GREY_COLOR_BASE, 0.035),
        100: alpha(GREY_COLOR_BASE, 0.025),
      };

  return {
    mode,
    primary: {
      main: PRIMARY_COLOR,
      snow: '#ffffff',
      light: isLightMode ? '#F0F8F6' : alpha(PRIMARY_COLOR, 0.4),
      medium: '#A8D5CE',
    },
    secondary: {
      main: SECONDARY_COLOR,
      medium: isLightMode ? '#E7E9E9' : '#343f47',
      angelic: '#7B69E5',
      navy: '#3066BE',
      blush: '#E85FA9',
    },
    grey: {
      ...GREY_COLOR,
    },
    error: {
      main: '#F74A46',
      dark: '#e5001a',
      light: '#ffced4',
    },
    warning: {
      main: '#F9C614',
      dark: '#aa6c00',
      light: '#ffe4b7',
    },
    info: {
      main: '#0bdaed',
      dark: '#1F263F',
    },
    success: {
      main: '#07B386',
      dark: '#3c9b09',
      light: '#e0f7de',
    },
    text: isLightMode
      ? {
          primary: TEXT_COLOR,
          disabled: !isLightMode ? alpha(TEXT_COLOR, 0.4) : undefined,
        }
      : {
          primary: TEXT_COLOR,
          disabled: alpha(TEXT_COLOR, 0.4),
        },
    background: isLightMode
      ? {
          default: '#ffffff',
        }
      : {
          default: BACKGROUND_COLOR,
          paper: PAPER_COLOR,
        },
  };
};

export default DefaultPalette;
