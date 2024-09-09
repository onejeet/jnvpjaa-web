import { PopoverProps } from '@mui/material/Popover';
import React from 'react';

export interface HoverPopoverProps extends Omit<PopoverProps, 'open'> {
  render: React.ReactNode;
  children: React.ReactNode;
}
