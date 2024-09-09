import { OwnerStateThemeType } from '.';

const Slider = () => {
  return {
    MuiSlider: {
      styleOverrides: {
        root: {
          height: '2px',
        },
        thumb: {
          height: '18px',
          width: '18px',
          border: '2px solid #ffffff',
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.16) !important',
        },
        rail: ({ theme }: OwnerStateThemeType) => ({
          backgroundColor: theme.palette.grey[400],
        }),
      },
    },
  };
};

export default Slider;
