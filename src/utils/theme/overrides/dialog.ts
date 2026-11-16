// ** Type Import
import { OwnerStateThemeType } from '.';

const Dialog = () => {
  return {
    MuiDialog: {
      styleOverrides: {
        paper: ({ theme, ownerState }: OwnerStateThemeType) => ({
          background: theme.palette.background.paper,
          // Phones: use the screen instead of MUI's 32px desktop margins.
          ...(!ownerState.fullScreen && {
            [theme.breakpoints.down('sm')]: {
              margin: 16,
              maxHeight: 'calc(100% - 32px)',
              ...(ownerState.fullWidth ? { width: 'calc(100% - 32px)' } : {}),
              maxWidth: 'calc(100% - 32px)',
            },
          }),
        }),
      },
    },
  };
};

export default Dialog;
