import React from 'react';
import MuiMenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { MenuItemProps } from './Menu.types';

const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  label,
  onClick,
  onMenuClose,
  onChange,
  value,
  active,
  sx,
  ...restProps
}) => (
  <MuiMenuItem
    color="inherit"
    sx={{
      minWidth: 120,
      bgcolor: active ? 'grey.200' : 'none',
      ...sx,
    }}
    onClick={(e) => {
      if (onMenuClose) {
        onMenuClose(e, 'backdropClick');
      }
      if (onChange) {
        onChange(value);
      }
      if (onClick) {
        onClick();
      }
    }}
    {...restProps}
  >
    {icon && <ListItemIcon sx={{ minWidth: '24px !important' }}>{icon}</ListItemIcon>}
    <ListItemText
      sx={{
        '& .MuiListItemText-primary': {
          color: 'inherit',
          fontSize: '14px',
        },
      }}
      primary={label}
    />
  </MuiMenuItem>
);

export default MenuItem;
