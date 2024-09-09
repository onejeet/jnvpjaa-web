const Chip = () => {
  return {
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
  };
};

export default Chip;
