const ButtonBase = () => {
  return {
    MuiButtonBase: {
      styleOverrides: {
        root: {
          '&.MuiLoadingButton-root.Mui-disabled': {
            color: 'rgba(0, 0, 0, 0.5)',
          },
          '&.MuiLoadingButton-root.Mui-disabled.MuiLoadingButton-loading': {
            color: 'transparent',
          },
        },
      },
    },
  };
};

export default ButtonBase;
