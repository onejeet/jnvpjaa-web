'use client';

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
  Typography,
} from '@mui/material';
import Link from '@mui/material/Link';
import NextLink from 'next/link';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useRouter } from 'next/navigation';
import React from 'react';

import HoverPopover from '../../components/common/HoverPopover';
import type { IHeaderMenuItem, IMenuItemProps } from './LayoutTopbar';
import { ADD_ENTITIES } from '@/constants/Header.constants';
import { IconCirclePlus } from '@tabler/icons-react';

interface HeaderAddButtonProps {
  isMobile?: boolean;
}

const HeaderAddButton: React.FC<HeaderAddButtonProps> = ({ isMobile }) => {
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
    <Box component="div" gap={0}>
      <HoverPopover
        id="header-add-btn"
        render={
          <IconButton
            sx={{
              width: isMobile ? 59 : 42,
              height: isMobile ? 59 : 42,
              display: 'flex',
              flexDirection: 'column',
              svg: {
                color: 'primary.main',
              },
            }}
          >
            <IconCirclePlus />
            {isMobile && (
              <Typography fontSize="10px" variant="body2">
                Add
              </Typography>
            )}
          </IconButton>
        }
        anchorOrigin={{
          vertical: isMobile ? 'top' : 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: isMobile ? 'bottom' : 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem
          // disabled
          // onClick={handleClose}
          sx={{
            px: '16px',
            py: '12px',
            fontSize: '14px',
            fontWeight: 400,
            textAlign: 'center',
            pointerEvents: 'none',
            color: 'grey.900 !important',
            transition: 'all 0.2s linear',
            svg: {
              mr: '4px',
              color: 'grey.800',
              fontSize: '20px',
            },
          }}
        >
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: 400,
              background: 'linear-gradient(90deg,#C62835 0,#217bfe 70%, #078efb 100%)',
              backgroundClip: 'text',
              color: 'transparent',
              opacity: 1,
            }}
          >
            Have something to share?
          </Typography>
        </MenuItem>
        {ADD_ENTITIES?.map((mItem: IHeaderMenuItem) => (
          <NextLink
            key={`menu-${mItem?.path}`}
            href={mItem?.path || '/'}
            as={mItem?.path}
            style={{ textDecoration: 'none', pointerEvents: mItem?.disabled ? 'none' : 'all' }}
          >
            <MenuItem
              key={mItem.path}
              onClick={handleClose}
              disabled={mItem?.disabled}
              sx={{
                px: '16px',
                py: '12px',
                fontSize: '14px',
                fontWeight: 400,
                textAlign: 'center',
                color: 'grey.900',
                transition: 'all 0.2s linear',
                svg: {
                  mr: '8px',
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
