/* REACT */
import React from 'react';
import { Skeleton, Typography } from '@mui/material';
/* MUI */
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import MuiTextField from '@mui/material/TextField';
/* ICONS */

/* TYPES */
import type { TextFieldProps } from './TextField.types';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function TextField(
  {
    viewModeIsEnabled,
    InputProps,
    startAdornment: mainStartAdornment,
    endAdornment: mainEndAdornment,
    type,
    loading,
    border = true,
    outline = true,
    height,
    sx = {},
    ...restProps
  }: TextFieldProps,
  ref: any
) {
  const { startAdornment: inputStartAdornment, endAdornment: inputEndAdornment, ...restInputProps } = InputProps || {};
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const startAdornment = inputStartAdornment || mainStartAdornment;
  const endAdornment = inputEndAdornment || mainEndAdornment;

  return loading ? (
    <Skeleton width="100%" height={41} />
  ) : (
    <MuiTextField
      InputProps={{
        startAdornment: startAdornment ? <InputAdornment position="start">{startAdornment}</InputAdornment> : undefined,
        endAdornment: endAdornment ? (
          <InputAdornment position="end">
            {React.isValidElement(endAdornment) ? (
              endAdornment
            ) : (
              <Typography variant="body1" fontSize={13}>
                {endAdornment}
              </Typography>
            )}
          </InputAdornment>
        ) : type === 'password' ? (
          <IconButton
            onClick={() => {
              setShowPassword(!showPassword);
            }}
            sx={{ border: 'none', padding: 0, borderRadius: '100%' }}
            size="small"
            aria-label={showPassword ? 'Hide Password button' : 'Show Password button'}
          >
            {showPassword ? <VisibilityOff sx={{ fontSize: '16px' }} /> : <Visibility sx={{ fontSize: '16px' }} />}
          </IconButton>
        ) : undefined,
        className: `${!border ? 'no-border' : ''} ${!outline ? 'no-outline' : ''}`,
        ...restInputProps,
      }}
      type={type === 'password' && showPassword ? 'text' : type}
      sx={{
        ...(height ? { '& .MuiInputBase-root': { minHeight: height } } : {}),
        '& .MuiFormHelperText-root': { position: 'static', marginLeft: 0, marginTop: 4 / 8 },
        ...sx,
      }}
      {...restProps}
    />
  );
}

const TextFieldRef = React.forwardRef(TextField);
export default React.memo(TextFieldRef);
