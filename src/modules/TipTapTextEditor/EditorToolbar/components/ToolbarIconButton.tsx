import React from 'react';
/* MUI */
import IconButton from '@mui/material/IconButton';

const ToolbarIconButton: React.FC<any> = ({ sx, children, ...restProps }) => {
  return (
    <IconButton
      sx={{
        color: 'grey.600',
        width: 25,
        height: 25,
        border: 'none',
        ...sx,
      }}
      {...restProps}
    >
      {children}
    </IconButton>
  );
};

export default React.memo(ToolbarIconButton);
