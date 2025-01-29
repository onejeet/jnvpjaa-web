import React, { FormEventHandler } from 'react';
import { ButtonProps } from '@/components/core/Button/Button.types';
import { IconButtonProps, MenuItemProps } from '@mui/material';
import { MenuProps } from '@/components/core/Menu';

export interface DropdownMenuProps {
  buttonProps?: Partial<ButtonProps>;
  items: MenuProps['items'];
  icon?: React.ReactNode;
  menuProps?: Partial<MenuProps>;
  value?: string | number;
  onChange?: (value: string | number) => void;
  children?: React.ReactNode;
}
