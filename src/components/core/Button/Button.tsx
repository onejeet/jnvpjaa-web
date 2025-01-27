/* REACT */
import React from 'react';

/* MUI */
import LoadingButton from '@mui/material/Button';
import { Theme } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';

/* TYPES */
import { ButtonProps } from './Button.types';

const Button = ({ title, variant = 'contained', color = 'primary', sx = {}, ...restProps }: ButtonProps, ref: any) => (
  <LoadingButton
    variant={variant}
    disableElevation
    color={color}
    sx={{
      // keep the color intact but with opacity
      '&:disabled': {
        backgroundColor:
          variant === 'contained'
            ? // @ts-expect-error expected
              sx?.backgroundColor
              ? // @ts-expect-error expected
                sx.backgroundColor
              : // @ts-expect-error expected
                (theme: Theme) => theme.palette?.[color]?.main
            : undefined,
        color: variant === 'contained' ? 'white' : undefined,
        opacity: 0.6,
      },
      // keep the width intact
      '&.MuiLoadingButton-loading': {
        color: 'transparent',
        '& .MuiButton-startIcon': {
          opacity: 0,
        },
      },
      ...sx,
    }}
    loadingIndicator={
      <CircularProgress
        sx={{
          color: variant === 'contained' ? 'white' : 'inherit',
        }}
        size={16}
      />
    }
    ref={ref}
    {...restProps}
  >
    {restProps.loading ? '' : title}
  </LoadingButton>
);

const ButtonWithRef = React.forwardRef(Button);
export default React.memo(ButtonWithRef);
