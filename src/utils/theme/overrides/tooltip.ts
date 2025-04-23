const Tooltip = () => {
  return {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#081D13',
          padding: '8px 12px',
          borderRadius: 6,
          fontSize: '12px',
          letterSpacing: '0.05em',
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
