// ** Type Import
import { OwnerStateThemeType } from '.';

const Popover = () => {
  return {
    MuiPopover: {
      styleOverrides: {
        track: ({ theme }: OwnerStateThemeType) => ({
          backgroundColor: theme.palette.background.paper,
          backgroundImage: 'none',
        }),
      },
    },
  };
};

export default Popover;
