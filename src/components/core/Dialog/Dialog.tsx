import * as React from 'react';
import Box from '@mui/material/Box';
// MUI
import MuiDialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import { useTheme } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import type { TransitionProps } from '@mui/material/transitions';
import useMediaQuery from '@mui/material/useMediaQuery';
import type { Breakpoint } from '@mui/system';

// TYPES
import type { DialogProps } from './Dialog.types';
import DialogFooter from './DialogFooter';
//LOCAL
import DialogHeader from './DialogHeader';

const SheetTransition = React.forwardRef(function SheetTransition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const DIALOG_ALERT_WRAPPER_ID = 'dialog_alert_wrapper';

const SWIPE_CLOSE_PX = 90;

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

  // Phones get a bottom sheet: slides up, grab handle, scrolling body between a fixed header and footer.
  const sheet = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm')) && !default_props.fullScreen;
  const theme = useTheme();
  const canSwipeClose = sheet && !!onClose && !disableBackdropClick;
  const drag = React.useRef<{ startY: number; dy: number } | null>(null);

  const paperOf = (el: HTMLElement) => el.closest('.MuiDialog-paper') as HTMLElement | null;
  const onHandleTouchStart = (e: React.TouchEvent<HTMLElement>) => {
    drag.current = { startY: e.touches[0].clientY, dy: 0 };
    const paper = paperOf(e.currentTarget);
    if (paper) paper.style.transition = 'none';
  };
  const onHandleTouchMove = (e: React.TouchEvent<HTMLElement>) => {
    if (!drag.current) return;
    drag.current.dy = Math.max(0, e.touches[0].clientY - drag.current.startY);
    const paper = paperOf(e.currentTarget);
    if (paper) paper.style.transform = `translateY(${drag.current.dy}px)`;
  };
  const onHandleTouchEnd = (e: React.TouchEvent<HTMLElement>) => {
    const dy = drag.current?.dy || 0;
    drag.current = null;
    if (dy > SWIPE_CLOSE_PX) {
      onClose?.(e, 'backdropClick');
      return;
    }
    const paper = paperOf(e.currentTarget);
    if (paper) {
      paper.style.transition = `transform ${theme.transitions.duration.shorter}ms ${theme.transitions.easing.easeOut}`;
      paper.style.transform = '';
    }
  };

  const { sx: dialogContentSx, ...restDialogContentProps } = dialogContentProps || {};
  return (
    <MuiDialog
      maxWidth={maxWidth as false | Breakpoint | undefined}
      TransitionComponent={sheet ? SheetTransition : undefined}
      transitionDuration={!default_props?.open && transitionDirection ? 0 : undefined}
      onClose={(event: any, reason: any) => {
        if (disableBackdropClick && reason && reason === 'backdropClick') {
          return;
        }
        onClose?.(event, reason);
      }}
      fullWidth
      sx={{
        overflow: 'hidden',
        [`& .MuiDialog-paperWidth${maxWidth}`]: {
          maxWidth: `${maxWidth}`,
          transition: 'max-width 0.5s',
        },
        '& .MuiDialog-paper': {
          borderRadius: 2,
          boxShadow: (theme: Theme) => theme.shadows[1],
          transition: 'max-width 0.5s',
        },
        ...(sheet && {
          '& .MuiDialog-container': { alignItems: 'flex-end' },
          '& .MuiDialog-paper.MuiDialog-paper': {
            m: 0,
            pt: 1.5,
            width: '100%',
            maxWidth: '100%',
            maxHeight: 'calc(100% - 40px - env(safe-area-inset-top, 0px))',
            borderRadius: '20px 20px 0 0',
            boxShadow: '0 -8px 32px rgba(0, 0, 0, 0.16)',
          },
          '& .dialog-footer': {
            height: 'auto',
            minHeight: 64,
            pt: 1.5,
            pb: 'calc(12px + env(safe-area-inset-bottom, 0px))',
          },
        }),
        ...sx,
      }}
      {...default_props}
    >
      {sheet && (
        <Box
          aria-hidden
          onTouchStart={canSwipeClose ? onHandleTouchStart : undefined}
          onTouchMove={canSwipeClose ? onHandleTouchMove : undefined}
          onTouchEnd={canSwipeClose ? onHandleTouchEnd : undefined}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 24,
            zIndex: 1,
            display: 'flex',
            justifyContent: 'center',
            pt: 1,
            touchAction: 'none',
          }}
        >
          <Box sx={{ width: 36, height: 4, borderRadius: 2, bgcolor: 'grey.400' }} />
        </Box>
      )}
      <DialogContent
        sx={{
          p: 0,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          minHeight: 0,
          ...dialogContentSx,
        }}
        {...restDialogContentProps}
      >
        {!hideHeader &&
          (header || (
            <DialogHeader height={60} px={2.5} onClose={onClose} subTitle={subTitle} title={title} {...headerProps} />
          ))}

        {/* Shrinks before the footer does, so action buttons stay on screen on short phones. */}
        <Box
          maxHeight={sheet ? undefined : '80vh'}
          sx={{
            overflowY: 'auto',
            flex: '1 1 auto',
            minHeight: 0,
            WebkitOverflowScrolling: 'touch',
            ...(sheet && hideFooter && { pb: 'env(safe-area-inset-bottom, 0px)' }),
          }}
        >
          {children}
        </Box>
        {!hideFooter && <DialogFooter height={60} px={2.5} {...footerProps} />}
      </DialogContent>
    </MuiDialog>
  );
};

export default React.memo(Dialog);
