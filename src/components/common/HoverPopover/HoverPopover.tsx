import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { usePopupState, bindHover, bindPopover } from 'material-ui-popup-state/hooks';
import MuiHoverPopover from 'material-ui-popup-state/HoverPopover';
import React from 'react';

import { HoverPopoverProps } from './HoverPopover.types';

const HoverPopover: React.FC<HoverPopoverProps> = ({ id, render, children, ...restProps }) => {
  const popupState = usePopupState({ variant: 'popover', popupId: id || 'hoverPopover' });

  return (
    <>
      <Box id="dropdown-button" display="flex" {...bindHover(popupState)}>
        {render || (
          <IconButton>
            <KeyboardArrowDownIcon />
          </IconButton>
        )}
      </Box>
      <MuiHoverPopover
        {...bindPopover(popupState)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        {...restProps}
      >
        {children}
      </MuiHoverPopover>
    </>
  );
};

export default HoverPopover;
