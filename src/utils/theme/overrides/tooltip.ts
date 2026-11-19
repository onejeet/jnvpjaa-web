import { brand } from '@/config/tenant';

const Tooltip = () => {
  return {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: brand.theme.secondary.light,
          padding: '8px 12px',
          borderRadius: 6,
          fontSize: '12px',
          letterSpacing: '0.05em',
          fontWeight: 'normal',
        },
        arrow: {
          color: brand.theme.secondary.light,
        },
      },
    },
  };
};

export default Tooltip;
