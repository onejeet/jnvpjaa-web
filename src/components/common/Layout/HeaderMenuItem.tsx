import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Menu, MenuItem } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

import type { IHeaderMenuItem, IMenuItemProps } from './LayoutTopbar';

const HeaderMenuItem: React.FC<IMenuItemProps> = ({ item, isMobile }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box component="div">
      {isMobile ? (
        <Accordion elevation={0} sx={{ '& .MuiAccordionSummary-root': {} }}>
          <AccordionSummary
            aria-controls="panel2-content"
            id="panel2-header"
            sx={{
              width: '100%',
              '& .MuiAccordionSummary-content': {
                my: 0,
              },
            }}
          >
            <Button
              sx={{ width: '100%', textAlign: 'left', p: 0, justifyContent: 'start' }}
              endIcon={<ArrowDropDownIcon sx={{ color: 'primary.main' }} />}
            >
              {item.label}
            </Button>
          </AccordionSummary>

          {item?.menu && (
            <AccordionDetails>
              {item?.menu?.map((item: IHeaderMenuItem) => (
                <MenuItem
                  key={item.path}
                  onClick={handleClose}
                  sx={{ px: '10px', pl: '20px', fontSize: '16px', fontWeight: 300, textAlign: 'center' }}
                >
                  {item.label}
                </MenuItem>
              ))}
            </AccordionDetails>
          )}
        </Accordion>
      ) : (
        <>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            disableRipple
          >
            {item.label}
            {item.menu &&
              (open ? (
                <KeyboardArrowUpIcon
                  sx={{ ml: '8px', color: 'primary.main', display: 'block', fontWeight: 400, fontSize: '16px' }}
                />
              ) : (
                <KeyboardArrowDownIcon
                  sx={{ ml: '8px', color: 'primary.main', display: 'block', fontWeight: 400, fontSize: '16px' }}
                />
              ))}
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {item?.menu?.map((mItem: IHeaderMenuItem) => (
              <MenuItem
                key={mItem.path}
                onClick={handleClose}
                sx={{ px: '10px', fontSize: '16px', fontWeight: 300, textAlign: 'center' }}
              >
                {mItem.label}
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
    </Box>
  );
};

export default HeaderMenuItem;
