import React from 'react';
import MuiMenu from '@mui/material/Menu';
import { MenuProps, MenuItemProps } from './Menu.types';
import MenuItem from './MenuItem';

const Menu: React.FC<MenuProps> = ({ items = [], onClose, menuItemProps = {}, onChange, ...restProps }) => {
  return (
    <MuiMenu onClose={onClose} {...restProps}>
      {items.map(({ href, ...restMenuItemProps }: MenuItemProps, index: number) => (
        <MenuItem
          onMenuClose={onClose}
          onChange={onChange}
          key={`list-item-${index}`}
          {...menuItemProps}
          {...restMenuItemProps}
        />
      ))}
    </MuiMenu>
  );
};

export default Menu;
