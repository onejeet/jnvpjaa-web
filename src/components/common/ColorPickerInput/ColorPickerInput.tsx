/* REACT */
import React from 'react';
//utils

import Box from '@mui/material/Box';
/* CORE */
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
/* ICONS */
import { Eyedropper as EyedropperIcon, Palette } from '@phosphor-icons/react';
/* REACT INPUT MASK */
import { HexColorPicker } from 'react-colorful';

/* TYPES */
import type { ColorPickerInputProps } from './ColorPickerInput.types';
import { Tooltip } from '@mui/material';

const ColorPickerInput: React.FC<ColorPickerInputProps> = ({
  // default colors are - primary, secondary, text, background
  defaultColors = ['#F2F3F3'],
  size = 20,
  disabled,
  onChange,
  value = '',
  pickerIconButtonProps,
  alwaysShowPickerIcon = false,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  // const [value, onChange] = React.useState<string | null>('');

  const { sx: iconButtonSx, ...restIconButtonProps } = pickerIconButtonProps || {};

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <Stack direction="row" spacing="8px">
        {defaultColors.map((color: string) => {
          return (
            <IconButton
              key={`color-block-${color}`}
              size="small"
              disableRipple
              sx={{
                p: '3px',
                width: 'auto',
                height: 'auto',
                borderColor: value === color ? 'primary.main' : 'var(--mui-palette-divider)',
              }}
              onClick={() => {
                onChange?.(color);
              }}
              disabled={disabled}
            >
              <Box
                sx={{
                  width: typeof size === 'number' ? size : 20,
                  height: typeof size === 'number' ? size : 20,
                  border: '1px solid',
                  borderColor: color?.toLowerCase() === '#ffffff' ? 'var(--mui-palette-divider)' : color,
                  borderRadius: '4px',
                  bgcolor: color,
                  opacity: disabled ? 0.5 : 1,
                }}
              />
            </IconButton>
          );
        })}
        <IconButton
          size="small"
          disableRipple
          sx={{
            p: '3px',
            width: 'auto',
            height: 'auto',
            color: 'grey.700',
            ...iconButtonSx,
          }}
          {...restIconButtonProps}
          onClick={handleClick}
          disabled={disabled}
        >
          {value && !defaultColors.includes(value) && !alwaysShowPickerIcon ? (
            <Box
              sx={{
                width: typeof size === 'number' ? size : 20,
                height: typeof size === 'number' ? size : 20,
                borderRadius: '4px',
                bgcolor: defaultColors.includes(value) ? 'none' : value,
                opacity: disabled ? 0.5 : 1,
              }}
            />
          ) : (
            <Tooltip title="Text Color" arrow>
              <IconButton size="small">
                <Palette color="inherit" size={20} />
              </IconButton>
            </Tooltip>
          )}
        </IconButton>
      </Stack>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        sx={{
          '& .MuiPopover-paper': {
            overflow: 'visible',
          },
          '& .react-colorful__hue-pointer': {
            width: '18px',
            height: '18px',
          },
          '& .react-colorful__pointer': {
            width: '18px',
            height: '18px',
          },
          '& .react-colorful__last-control': {
            borderRadius: '0px',
          },
        }}
      >
        <Box display="flex" width="100%" flexDirection="column">
          <HexColorPicker color={value || '#081D13'} onChange={onChange} />
          <Box alignItems="center" display="flex" px="10px">
            <Typography color="grey.700" variant="subtitle2">
              #
            </Typography>
            <OutlinedInput
              inputProps={{
                maxlength: 7,
                minLength: 3,
              }}
              value={value ? value.replace('#', '') : '081D13'}
              onChange={(e) => {
                onChange?.(e.target.value);
              }}
              size="small"
              sx={{
                width: '100px',
                color: 'grey.700',
                pl: '5px',
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                  color: 'grey.700',
                },
              }}
              placeholder="Hex Code"
            />
          </Box>
        </Box>
      </Popover>
    </>
  );
};

export default ColorPickerInput;
