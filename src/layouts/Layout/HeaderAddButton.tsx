import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Tooltip,
} from '@mui/material';
import Link from '@mui/material/Link';
import NextLink from 'next/link';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useRouter } from 'next/router';
import React from 'react';

import HoverPopover from '../../components/common/HoverPopover';
import type { IHeaderMenuItem, IMenuItemProps } from './LayoutTopbar';
import { ADD_ENTITIES } from '@/constants/Header.constants';

const HeaderAddButton: React.FC = () => {
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
    <Box component="div" gap={0}>
      <HoverPopover
        id="header-add-btn"
        render={
          <IconButton>
            <AddCircleOutlineIcon sx={{ color: 'primary.main' }} />
          </IconButton>
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
        <MenuItem
          disabled
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
              mr: '4px',
              color: 'grey.700',
              fontSize: '20px',
            },
            // '&:hover': {
            //   color: 'primary.main',
            //   svg: {
            //     ml: '2px',
            //     mr: 0,
            //     color: 'primary.main',
            //   },
            // },
          }}
        >
          Create new blog and events.
        </MenuItem>
        {ADD_ENTITIES?.map((mItem: IHeaderMenuItem) => (
          <NextLink
            key={`menu-${mItem?.path}`}
            href={mItem?.path || '/'}
            as={mItem?.path}
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
                  mr: '4px',
                  color: 'grey.700',
                  fontSize: '20px',
                },
                // '&:hover': {
                //   color: 'primary.main',
                //   svg: {
                //     ml: '2px',
                //     mr: 0,
                //     color: 'primary.main',
                //   },
                // },
              }}
            >
              {mItem?.icon}
              {/* <ChevronRightIcon
                sx={{ mr: '4px', color: 'grey.800', fontSize: '16px', transition: 'all 0.2s linear' }}
              /> */}
              {mItem.label}
            </MenuItem>
          </NextLink>
        ))}
      </HoverPopover>
    </Box>
  );
};
export default HeaderAddButton;
