const Chip = () => {
  return {
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
        },
        sizeSmall: {
          fontSize: '13px',
        },
      },
    },
  };
};

export default Chip;
