import { PopoverProps } from '@mui/material/Popover';
import React from 'react';

export interface HoverPopoverProps extends Omit<PopoverProps, 'open' | 'children'> {
  render: React.ReactNode;
  /** A function child gets `close`, so links inside can dismiss the popover. */
  children: React.ReactNode | ((close: () => void) => React.ReactNode);
}
