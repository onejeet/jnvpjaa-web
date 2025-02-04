import React from 'react';
import Button from '../../core/Button';
import { DropdownMenuProps } from './DropdownMenu.types';
import { Box, IconButton } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Menu from '@/components/core/Menu';

const ButtonDropdown: React.FC<DropdownMenuProps> = ({
  buttonProps = {},
  children,
  items = [],
  menuProps = {},
  value,
  onChange,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<any>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { title: buttonTitle, ...restButtonProps } = buttonProps || {};

  return (
    <div>
      <Menu
        {...menuProps}
        render={
          children ? (
            <Box component="div" onClick={handleClick}>
              {children}
            </Box>
          ) : (
            <Button
              title={value ? items.find((item) => item.value === value)?.label : buttonTitle ? buttonTitle : 'Menu'}
              endIcon={<KeyboardArrowDownIcon sx={{ fontSize: '14px !important' }} />}
              {...restButtonProps}
              id="dropdown-button"
              aria-controls={open ? 'dropdown-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            />
          )
        }
        items={items}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onChange={onChange}
        MenuListProps={{
          'aria-labelledby': 'dropdown-button',
        }}
        transitionDuration={0}
        variant="menu"
      />
    </div>
  );
};

export default ButtonDropdown;
