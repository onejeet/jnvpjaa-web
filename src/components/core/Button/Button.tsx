import React, { ForwardRefRenderFunction } from 'react';
import MuiButton from '@mui/material/Button';
import { Theme } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import { ButtonProps } from './Button.types';
import { CheckCircle, X } from '@phosphor-icons/react';

const actionConfig: any = {
  // add: {
  //   startIcon: PlusIcon,
  //   color: 'primary',
  //   variant: 'contained',
  //   text: 'New',
  // },
  // edit: {
  //   startIcon: PencilSimpleIcon,
  //   color: 'secondary',
  //   variant: 'outlined',
  //   text: 'Edit',
  // },
  // delete: {
  //   startIcon: TrashIcon,
  //   color: 'error',
  //   variant: 'contained',
  //   text: 'Delete',
  // },
  // filter: {
  //   startIcon: FunnelIcon,
  //   color: 'secondary',
  //   variant: 'outlined',
  //   text: 'Add Filter',
  // },
  // export: {
  //   startIcon: ExportIcon,
  //   color: 'primary',
  //   variant: 'outlined',
  //   text: 'Export',
  // },
  // call: {
  //   startIcon: PhoneIcon,
  //   color: 'primary',
  //   variant: 'outlined',
  //   text: 'Call',
  // },
  // email: {
  //   startIcon: EnvelopeSimpleIcon,
  //   color: 'primary',
  //   variant: 'outlined',
  //   text: 'Email',
  // },
  // sms: {
  //   startIcon: ChatIcon,
  //   color: 'primary',
  //   variant: 'outlined',
  //   text: 'SMS',
  // },
  save: {
    startIcon: CheckCircle,
    color: 'primary',
    variant: 'contained',
    text: 'Save',
  },
  // submit: {
  //   startIcon: CheckCircleIcon,
  //   color: 'primary',
  //   variant: 'contained',
  //   text: 'Submit',
  // },
  cancel: {
    startIcon: X,
    color: 'secondary',
    variant: 'outlined',
    text: 'Cancel',
  },
  // next: {
  //   endIcon: CaretRightIcon,
  //   color: 'primary',
  //   variant: 'contained',
  //   text: 'Next',
  // },
  // previous: {
  //   startIcon: CaretLeftIcon,
  //   color: 'secondary',
  //   variant: 'outlined',
  //   text: 'Previous',
  // },
  // back: {
  //   startIcon: CaretLeftIcon,
  //   color: 'secondary',
  //   variant: 'outlined',
  //   text: 'Back',
  // },
  // send: {
  //   startIcon: PaperPlaneTiltIcon,
  //   color: 'primary',
  //   variant: 'contained',
  //   text: 'Send',
  // },
  // upload: {
  //   startIcon: UploadSimpleIcon,
  //   color: 'secondary',
  //   variant: 'outlined',
  //   text: 'Upload',
  // },
};

const Button = (
  {
    title,
    variant = 'contained',
    startIcon,
    action = '',
    endIcon,
    loading,
    color = 'primary',
    sx = {},
    ...restProps
  }: ButtonProps,
  ref: any
): any => (
  <MuiButton
    variant={variant || actionConfig[action]?.variant}
    disableElevation
    loading={loading}
    color={color || actionConfig[action]?.color}
    startIcon={
      loading
        ? undefined
        : actionConfig[action]?.startIcon
          ? React.createElement(actionConfig[action]?.startIcon, { size: 16 })
          : startIcon
    }
    endIcon={
      loading
        ? undefined
        : actionConfig[action]?.endIcon
          ? React.createElement(actionConfig[action]?.endIcon, { size: 16 })
          : endIcon
    }
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
    {loading ? '' : title || actionConfig[action]?.title}
  </MuiButton>
);
const ButtonWithRef = React.forwardRef(Button);
export default React.memo(ButtonWithRef);
