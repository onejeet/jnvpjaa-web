const InputLabel = () => ({
  MuiInputLabel: {
    styleOverrides: {
      outlined: {
        '&:not(.MuiInputLabel-shrink)': {
          transform: 'translate(14px, 10px) scale(1)',
        },
        '&.MuiInputLabel-sizeSmall:not(.MuiInputLabel-shrink)': {
          transform: 'translate(14px, 8px) scale(1)',
        },
      },
    },
  },
});

export default InputLabel;
