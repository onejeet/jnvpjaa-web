import { MenuProps as MuiMenuProps } from '@mui/material/Menu';
import { MenuItemProps as MuiMenuItemProps } from '@mui/material/MenuItem';
import React from 'react';

export interface MenuItemProps extends Omit<MuiMenuItemProps, 'onChange' | 'value'> {
  label?: string | React.ReactNode;
  icon?: React.ReactNode;
  href?: string;
  active?: boolean;
  value?: string | number;
  onClick?: () => void;
  onMenuClose?: (event: object, reason: 'backdropClick' | 'escapeKeyDown') => void;
  onChange?: (value?: string | number) => void;
}

export interface MenuProps extends Omit<MuiMenuProps, 'onChange' | 'open'> {
  items: Array<MenuItemProps>;
  menuItemProps?: MenuItemProps;
  onChange?: (value?: string | number) => void;
  render: React.ReactNode;
  value?: string;
  disabled?: boolean;
}
