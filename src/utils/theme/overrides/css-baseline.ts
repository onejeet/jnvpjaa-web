import { PaletteMode, Theme, alpha } from '@mui/material';

import { OwnerStateThemeType } from '.';

const CssBaseline = (mode: PaletteMode) => {
  return {
    MuiCssBaseline: {
      styleOverrides: () => ({
        '*::-webkit-scrollbar': {
          backgroundColor: 'transparent',
          width: '8px',
          height: '8px',
          cursor: 'grab !important',
        },
        '*::-webkit-scrollbar:hover': {
          cursor: 'grab !important',
        },
        '*::-webkit-scrollbar-track': {
          backgroundColor: 'transparent',
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor:
            mode === 'light'
              ? '#E7E9E9'
              : (theme: Theme) => {
                  return alpha(theme.palette.grey[400], 0.2);
                },
          borderRadius: '12px',
          border: '1px solid transparent',
          backgroundClip: 'content-box',
          cursor: 'grab !important',
        },
        '*::-webkit-scrollbar-thumb:hover': {
          backgroundColor: mode === 'light' ? '#E7E9E9' : (theme: Theme) => alpha(theme.palette.grey[400], 0.2),
          borderRadius: '12px',
          border: '1px solid',
          borderColor: mode === 'light' ? '#E7E9E9' : (theme: Theme) => alpha(theme.palette.grey[400], 0.2),
          backgroundClip: 'content-box',
          cursor: 'grab !important',
        },
        '*::-webkit-scrollbar-button': {
          display: 'none',
        },
      }),
    },
  };
};

export default CssBaseline;
