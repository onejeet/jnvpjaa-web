import * as React from 'react';
import Box from '@mui/material/Box';
// MUI
import MuiDialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import type { Theme } from '@mui/material/styles';
import type { TransitionProps } from '@mui/material/transitions';
import type { Breakpoint } from '@mui/system';

// TYPES
import type { DialogProps } from './Dialog.types';
import DialogFooter from './DialogFooter';
//LOCAL
import DialogHeader from './DialogHeader';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export const DIALOG_ALERT_WRAPPER_ID = 'dialog_alert_wrapper';

const Dialog: React.FC<DialogProps> = (props) => {
  const {
    title,
    maxWidth,
    header,
    headerProps = {},
    footerProps = {},
    hideHeader,
    hideFooter,
    sx,
    disablePadding,
    children,
    dialogContentProps = {},
    disableBackdropClick,
    onClose,
    subTitle,
    alertWrapperId,
    alertWrapperProps = {},
    transitionDirection,
    ...default_props
  } = props;

  const { sx: dialogContentSx, ...restDialogContentProps } = dialogContentProps || {};
  return (
    <MuiDialog
      maxWidth={maxWidth as false | Breakpoint | undefined}
      // TransitionComponent={transitionDirection ? Transition : undefined}
      // TransitionProps={transitionDirection ? ({ direction: transitionDirection } as any) : undefined}
      transitionDuration={!default_props?.open && transitionDirection ? 0 : undefined}
      onClose={(event: any, reason: any) => {
        if (disableBackdropClick && reason && reason === 'backdropClick') {
          return;
        }
        onClose?.(event, reason);
      }}
      fullWidth
      sx={{
        [`& .MuiDialog-paperWidth${maxWidth}`]: {
          maxWidth: `${maxWidth}`,
          transition: 'max-width 0.5s',
        },
        '& .MuiDialog-paper': {
          borderRadius: 2,
          boxShadow: (theme: Theme) => theme.shadows[1],
          transition: 'max-width 0.5s',
        },
        ...sx,
      }}
      {...default_props}
    >
      <DialogContent
        sx={{ p: 0, display: 'flex', flexDirection: 'column', position: 'relative', ...dialogContentSx }}
        {...restDialogContentProps}
      >
        {!hideHeader &&
          (header || (
            <DialogHeader height={60} px={2.5} onClose={onClose} subTitle={subTitle} title={title} {...headerProps} />
          ))}

        <Box justifyContent="center" left={0} display="flex" top={0} position="absolute" width="100%">
          <Box
            id={alertWrapperId || DIALOG_ALERT_WRAPPER_ID}
            display="flex"
            width="100%"
            sx={{
              zIndex: (theme: Theme) => theme.zIndex.modal + 1,
            }}
            {...alertWrapperProps}
          />
        </Box>
        {children}
        {!hideFooter && <DialogFooter height={60} px={2.5} {...footerProps} />}
      </DialogContent>
    </MuiDialog>
  );
};

export default React.memo(Dialog);
