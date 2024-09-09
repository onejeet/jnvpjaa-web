// ** Type Import
import { OwnerStateThemeType } from '.';

const Dialog = () => {
  return {
    MuiDialog: {
      styleOverrides: {
        paper: ({ theme }: OwnerStateThemeType) => ({
          background: theme.palette.background.paper,
        }),
      },
    },
  };
};

export default Dialog;
