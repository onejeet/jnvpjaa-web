import React from 'react';
import { Button as MuiButton } from '@mui/material';
import { ButtonProps } from './Button.types';

const Button: React.FC<ButtonProps> = ({ title, loading, sx = {}, ...props }) => {
  return (
    <MuiButton
      sx={{
        borderColor: (theme) => `${theme.palette.common.black} !important`,
        borderRadius: '100px',
        border: '1px solid',
        px: '24px',
        maxHeight: '30px',
        fontSize: '14px',
        textTransform: 'none',
        ...sx,
      }}
      {...props}
    >
      {title}
    </MuiButton>
  );
};

export default Button;
