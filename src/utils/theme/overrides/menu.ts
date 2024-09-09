import { PaletteMode, alpha } from '@mui/material';

import { OwnerStateThemeType } from '.';

const Menu = (mode: PaletteMode) => {
  return {
    MuiMenu: {
      defaultProps: {
        transitionDuration: 0,
      },
      styleOverrides: {
        list: ({ theme }: OwnerStateThemeType) => ({
          padding: '6px',
          paddingTop: '4px',
          backgroundColor: mode === 'dark' && theme.palette.background.paper,
          '& .MuiMenuItem-root': {
            borderRadius: '6px',
            marginTop: '2px',
            '&:hover': mode === 'dark' && {
              backgroundColor: alpha('#000000', 0.2),
            },
          },
        }),
      },
    },
  };
};

export default Menu;
