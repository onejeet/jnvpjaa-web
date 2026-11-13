// ** Type Import
import { OwnerStateThemeType } from '.';
import { CONTROL_HEIGHT } from '../controlSizes';

const Button = () => {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
          textTransform: 'none',
          fontSize: '14px',
          lineHeight: '18px',
          minHeight: CONTROL_HEIGHT.medium,
        },
        sizeSmall: {
          minHeight: CONTROL_HEIGHT.small,
          lineHeight: '16px',
          paddingRight: '14px',
          paddingLeft: '14px',
        },
        sizeMedium: {
          minHeight: CONTROL_HEIGHT.medium,
          paddingRight: '18px',
          paddingLeft: '18px',
        },
        sizeLarge: {
          minHeight: CONTROL_HEIGHT.large,
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
