// ** Type Import
import { OwnerStateThemeType } from '.';

const Button = () => {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
          textTransform: 'none',
          fontSize: '14px',
          lineHeight: '18px',
          height: '36px',
        },
        sizeSmall: {
          height: '30px',
          lineHeight: '16px',
          paddingRight: '14px',
          paddingLeft: '14px',
        },
        sizeMedium: {
          height: '36px',
          paddingRight: '18px',
          paddingLeft: '18px',
        },
        sizeLarge: {
          height: '40px',
          paddingRight: '18px',
          paddingLeft: '18px',
        },
        outlinedSecondary: ({ theme, ownerState }: OwnerStateThemeType) => ({
          borderColor: theme.palette.grey[400],
          '&.MuiLoadingButton-root.Mui-disabled': {
            // color: GREY_COLOR[700],
            borderColor: theme.palette.grey[400],
          },
        }),
        outlinedPrimary: {
          '&.MuiLoadingButton-root.Mui-disabled': {},
        },
        contained: {
          '&.MuiLoadingButton-root.Mui-disabled': {
            color: 'rgba(255, 255, 255, 0.75)',
          },
        },
        startIcon: {
          marginRight: '6px',
        },
      },
    },
  };
};

export default Button;
