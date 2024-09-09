import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#C62835',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
  components: {
    // 'MuiSvgIcon': {
    //   styleOverrides: {
    //     'root': {
    //       color: '#616B67'
    //     }
    //   }
    // },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
          textTransform: 'none',
        },
        sizeSmall: {
          fontSize: '14px',
          padding: '7px 14px',
          height: '30px',
          minWidth: '64px',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
          // paddingLeft: '14px',

          '&.MuiInputBase-sizeSmall': {
            paddingLeft: '8px',
          },
        },
        input: {
          height: '20px',
          padding: '12px 14px',

          '&.MuiInputBase-inputSizeSmall': {
            height: '16px',
            fontSize: '14px',
            padding: '7px 8px',
          },
        },
        notchedOutline: {
          borderColor: '#D2D7D6',
        },
      },
    },
  },
  typography: {
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
  },
});

export default theme;
