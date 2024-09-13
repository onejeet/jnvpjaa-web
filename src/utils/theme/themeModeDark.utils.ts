import { PaletteOptions } from '@mui/material';
import { ThemeOptions, alpha } from '@mui/material/styles';

const PRIMARY_COLOR = '#018270';
const SECONDARY_COLOR = '#212a33';
const GREY_COLOR_BASE = '#c9d1d9';
const TEXT_COLOR = '#e8eaed';
const BACKGROUND_COLOR = '#192128';
const PAPER_COLOR = SECONDARY_COLOR;
const SNOW_COLOR = '#ffffff';

const GREY_COLOR = {
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

const Default = (): DefaultPaletteOptions => ({
  mode: 'dark',
  primary: {
    main: PRIMARY_COLOR,
    snow: '#ffffff',
    light: alpha(PRIMARY_COLOR, 0.4),
    medium: '#A8D5CE',
  },
  secondary: {
    main: SECONDARY_COLOR,
    medium: '#343f47',
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
  text: {
    primary: TEXT_COLOR,
    disabled: alpha(TEXT_COLOR, 0.4),
  },
  background: {
    default: BACKGROUND_COLOR,
    paper: PAPER_COLOR,
  },
});

const lightMode: ThemeOptions = {
  palette: {
    ...Default(),
  },
  typography: {
    allVariants: {
      color: TEXT_COLOR,
    },
    fontFamily: [
      'AktivGrotesk',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: {
      fontSize: '20px',
      lineHeight: '26px',
      fontWeight: 500,
      letterSpacing: '-0.24%',
    },
    h2: {
      fontSize: '18px',
      lineHeight: '24px',
      fontWeight: 500,
      letterSpacing: '-0.25%',
    },
    h3: {
      fontSize: '16px',
      lineHeight: '22px',
      fontWeight: 500,
      letterSpacing: '-0.25%',
    },
    h4: {
      fontSize: '15px',
      lineHeight: '20px',
      fontWeight: 500,
      letterSpacing: '-0.24%',
    },
    h5: {
      fontSize: '14px',
      lineHeight: '20px',
      fontWeight: 500,
      letterSpacing: '-0.24%',
    },
    h6: {
      fontSize: '12px',
      lineHeight: '18px',
      fontWeight: 500,
      letterSpacing: '-0.24%',
    },
    subtitle1: {
      fontSize: '13px',
      lineHeight: '20px',
      fontWeight: 500,
      letterSpacing: '-0.24%',
    },
    body1: {
      fontSize: '14px',
      lineHeight: '20px',
      fontWeight: 400,
      letterSpacing: '-0.24%',
    },
    body2: {
      fontSize: '13px',
      lineHeight: '19px',
      fontWeight: 400,
      letterSpacing: '-0.24%',
    },
  },
  components: {
    /* components in alphabetical order */
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: GREY_COLOR[400],
        },
      },
    },
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
        outlinedSecondary: {
          borderColor: GREY_COLOR[400],
          color: GREY_COLOR[800],
          '&:hover': {
            borderColor: alpha(GREY_COLOR[500], 0.2),
          },
          '&.MuiLoadingButton-root.Mui-disabled': {
            color: alpha(TEXT_COLOR, 0.5),
            borderColor: GREY_COLOR[400],
          },
        },
        outlinedPrimary: {
          '&.MuiLoadingButton-root.Mui-disabled': {
            color: alpha(PRIMARY_COLOR, 0.5),
          },
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
    MuiButtonBase: {
      styleOverrides: {
        root: {
          '&.MuiLoadingButton-root.Mui-disabled': {
            color: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
        },
        sizeSmall: {
          fontSize: '13px',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        sizeSmall: {
          width: '24px',
          height: '24px',
        },
      },
    },
    MuiInputBase: {
      defaultProps: {
        disableInjectingGlobalStyles: true,
      },
      styleOverrides: {
        root: {
          height: '36px',
          '& .MuiOutlinedInput-input': {
            height: '36px',
          },
          '& .MuiOutlinedInput-input.MuiInputBase-inputSizeSmall': {
            height: '30px',
            paddingTop: 0,
            paddingBottom: 0,
          },
          '&.Mui-disabled': {
            backgroundColor: `${GREY_COLOR[100]} !important`,
          },
          '&.Mui-focused fieldset': {
            borderWidth: '1px !important',
          },
        },
        sizeSmall: {
          height: '30px',
        },
      },
    },
    MuiMenu: {
      defaultProps: {
        transitionDuration: 0,
      },
      styleOverrides: {
        list: {
          padding: '6px',
          paddingTop: '4px',
          backgroundColor: PAPER_COLOR,
          '& .MuiMenuItem-root': {
            borderRadius: '6px',
            marginTop: '2px',
            '&:hover': {
              backgroundColor: alpha('#000000', 0.2),
            },
          },
        },
      },
    },
    MuiMenuItem: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          padding: '7px 8px',
        },
      },
    },
    MuiOutlinedInput: {
      defaultProps: {
        disableInjectingGlobalStyles: true,
      },
      styleOverrides: {
        root: {
          width: '100%',
          padding: '0px 10px',
          '& .MuiOutlinedInput-input': {
            paddingLeft: 0,
            paddingRight: 0,
          },
          '&.Mui-disabled:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: GREY_COLOR[500],
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: alpha(GREY_COLOR[500], 0.2),
          },
          '&:focus .MuiOutlinedInput-notchedOutline': {
            borderColor: `${PRIMARY_COLOR} !important`,
          },
          '&:active .MuiOutlinedInput-notchedOutline': {
            borderColor: `${PRIMARY_COLOR} !important`,
          },
        },
        notchedOutline: {
          padding: '0px 0px !important',
          borderColor: GREY_COLOR[400],
          borderRadius: '6px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: '8px',
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          backgroundColor: PAPER_COLOR,
          backgroundImage: 'none',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          borderRadius: '6px !important',
          '&.MuiSelect-root': {
            borderRadius: '6px !important',
          },
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          height: '2px',
        },
        thumb: {
          height: '18px',
          width: '18px',
          border: `2px solid ${PAPER_COLOR}`,
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.16) !important',
        },
        rail: {
          backgroundColor: GREY_COLOR[600],
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        track: {
          background: `${alpha(SNOW_COLOR, 0.05)} !important`,
        },
        thumb: {
          // background: `${alpha(PRIMARY_COLOR, 0.2)} !important`,
        },
        root: {
          '& .Mui-checked .MuiSwitch-thumb': {
            background: `${alpha(PRIMARY_COLOR, 0.8)} !important`,
          },
        },
      },
    },
    // MuiDataGrid: {
    //   styleOverrides: {
    //     root: {
    //       '& .MuiDataGrid-pinnedColumnHeaders': {
    //         background: BACKGROUND_COLOR,
    //       },
    //       '& .MuiDataGrid-pinnedColumns': {
    //         background: BACKGROUND_COLOR,
    //       },
    //       '& .MuiDataGrid-cell': {
    //         borderBottomColor: GREY_COLOR[300],
    //       },
    //       '& .MuiDataGrid-row.Mui-hovered': {
    //         background: GREY_COLOR[300],
    //       },
    //       '& .MuiDataGrid-columnHeaders': {
    //         borderBottomColor: GREY_COLOR[300],
    //       },
    //     },
    //   },
    // },
    MuiDialog: {
      styleOverrides: {
        paper: {
          background: PAPER_COLOR,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#081D13',
          padding: '6px 12px 8px',
          borderRadius: 6,
          fontWeight: 'normal',
        },
        arrow: {
          color: '#081D13',
        },
      },
    },
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
          backgroundColor: alpha(GREY_COLOR[400], 0.2),
          borderRadius: '12px',
          border: '1px solid transparent',
          backgroundClip: 'content-box',
          cursor: 'grab !important',
        },
        '*::-webkit-scrollbar-thumb:hover': {
          backgroundColor: alpha(GREY_COLOR[400], 0.2),
          borderRadius: '12px',
          border: `1px solid ${alpha(GREY_COLOR[400], 0.2)}`,
          backgroundClip: 'content-box',
          cursor: 'grab !important',
        },
        '*::-webkit-scrollbar-button': {
          display: 'none',
        },
      }),
    },
  },
};

export default lightMode;
