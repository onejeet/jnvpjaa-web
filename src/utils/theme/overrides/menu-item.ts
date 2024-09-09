const MenuItem = () => {
  return {
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
  };
};

export default MenuItem;
