import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { usePopupState, bindHover, bindPopover, bindTrigger } from 'material-ui-popup-state/hooks';
import MuiHoverPopover from 'material-ui-popup-state/HoverPopover';
import React from 'react';

import { HoverPopoverProps } from './HoverPopover.types';
import { ClickAwayListener, useMediaQuery } from '@mui/material';

const HoverPopover: React.FC<HoverPopoverProps> = ({ id, render, children, ...restProps }) => {
  const popupState = usePopupState({ variant: 'popover', popupId: id || 'hoverPopover' });
  const isMobile = useMediaQuery('(hover: none)');

  const handleClose = () => {
    if (popupState.isOpen) {
      popupState.close();
    }
  };

  return (
    <>
      <Box id="dropdown-button" display="flex" {...(isMobile ? bindTrigger(popupState) : bindHover(popupState))}>
        {render || (
          <IconButton>
            <KeyboardArrowDownIcon />
          </IconButton>
        )}
      </Box>
      <ClickAwayListener onClickAway={handleClose}>
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
      </ClickAwayListener>
    </>
  );
};

export default HoverPopover;
