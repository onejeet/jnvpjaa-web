import { alpha } from '@mui/material/styles';

// ** Type Import
import { OwnerStateThemeType } from '.';

const Switch = () => {
  return {
    MuiSwitch: {
      styleOverrides: {
        track: ({ theme }: OwnerStateThemeType) => ({
          background: `${alpha('#ffffff', 0.05)} !important`,
        }),
        root: ({ theme }: OwnerStateThemeType) => ({
          '& .Mui-checked .MuiSwitch-thumb': {
            background: `${alpha(theme.palette.primary.main, 0.8)} !important`,
          },
        }),
      },
    },
  };
};

export default Switch;
