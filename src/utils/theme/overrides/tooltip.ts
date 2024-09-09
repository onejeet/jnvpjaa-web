const Tooltip = () => {
  return {
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
  };
};

export default Tooltip;
