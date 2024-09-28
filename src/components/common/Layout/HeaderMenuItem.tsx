import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Menu, MenuItem, Paper } from '@mui/material';
import Link from '@mui/material/Link';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import HoverPopover from '../HoverPopover';
import type { IHeaderMenuItem, IMenuItemProps } from './LayoutTopbar';

const HeaderMenuItem: React.FC<IMenuItemProps> = ({ item, isMobile, expanded, setExpanded }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const { pathname } = router;
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box component="div">
      {isMobile ? (
        <Accordion
          elevation={0}
          sx={{ '& .MuiAccordionSummary-root': {} }}
          expanded={expanded}
          onChange={() => setExpanded?.(expanded ? '' : item?.path || '')}
        >
          <AccordionSummary
            aria-controls="panel2-content"
            id="panel2-header"
            sx={{
              width: '100%',
              '& .MuiAccordionSummary-content': {
                my: 0,
              },
              '& .Mui-expanded': {
                my: '4px',
              },
            }}
          >
            <Button
              sx={{
                width: '100%',
                textAlign: 'left',
                p: 0,
                justifyContent: 'space-between',
                minHeight: '20px !important',
              }}
              endIcon={<ArrowDropDownIcon sx={{ color: 'primary.main' }} />}
            >
              {item.label}
            </Button>
          </AccordionSummary>

          {item?.menu && (
            <AccordionDetails>
              {item?.menu?.map((item: IHeaderMenuItem) => (
                <NextLink
                  key={`menu-${item?.path}`}
                  href={item?.path || '/'}
                  as={item?.path}
                  passHref
                  style={{ textDecoration: 'none', pointerEvents: pathname.includes(item?.path) ? 'none' : undefined }}
                >
                  <Link sx={{ textDecoration: 'none' }}>
                    <MenuItem
                      key={item.path}
                      sx={{
                        color: pathname.includes(item?.path) ? 'primary.main' : 'grey.800',
                        px: '10px',
                        pl: '20px',
                        fontSize: '16px',
                        fontWeight: 300,
                        textAlign: 'center',
                        minHeight: 20,
                      }}
                    >
                      {item.label}
                    </MenuItem>
                  </Link>
                </NextLink>
              ))}
            </AccordionDetails>
          )}
        </Accordion>
      ) : (
        <>
          <HoverPopover
            id={`menu-${item.path}`}
            render={
              <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                disableRipple
                endIcon={<KeyboardArrowDownIcon />}
              >
                {item.label}
              </Button>
            }
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            {item?.menu?.map((mItem: IHeaderMenuItem) => (
              <NextLink
                key={`menu-${mItem?.path}`}
                href={mItem?.path || '/'}
                as={mItem?.path}
                passHref
                style={{ textDecoration: 'none' }}
              >
                <MenuItem
                  key={mItem.path}
                  onClick={handleClose}
                  sx={{
                    px: '16px',
                    py: '12px',
                    fontSize: '14px',
                    fontWeight: 400,
                    textAlign: 'center',
                    color: 'grey.900',
                    transition: 'all 0.2s linear',
                    svg: {
                      mr: '2px',
                    },
                    '&:hover': {
                      color: 'primary.main',
                      svg: {
                        ml: '2px',
                        mr: 0,
                        color: 'primary.main',
                      },
                    },
                  }}
                >
                  <ChevronRightIcon
                    sx={{ mr: '4px', color: 'grey.800', fontSize: '16px', transition: 'all 0.2s linear' }}
                  />
                  {mItem.label}
                </MenuItem>
              </NextLink>
            ))}
          </HoverPopover>
        </>
      )}
    </Box>
  );
};
export default HeaderMenuItem;
