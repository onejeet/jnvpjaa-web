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
  // noSsr: read the real screen size on the first render; otherwise a sheet mounts one frame as a centred
  // desktop dialog and then jumps to the bottom. Dialogs never render open on the server, so this is safe.
  const sheet =
    useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'), { noSsr: true }) && !default_props.fullScreen;
  const theme = useTheme();
  const canSwipeClose = sheet && !!onClose && !disableBackdropClick;
  const drag = React.useRef<{ startY: number; dy: number } | null>(null);
  // State, not a ref: the portal mounts the root a render later, and the effect must re-run when it appears.
  const [root, setRoot] = React.useState<HTMLDivElement | null>(null);
  const deferredFocus = React.useRef<HTMLElement | null>(null);
  const { TransitionProps: transitionProps = {}, ...dialogProps } = default_props;

  // Keyboard open: fit the sheet into the visible area so it sits on top of the keyboard instead of under it.
  React.useEffect(() => {
    const vv = typeof window !== 'undefined' ? window.visualViewport : null;
    if (!sheet || !dialogProps.open || !vv || !root) return;
    const fit = () => {
      root.style.top = `${vv.offsetTop}px`;
      root.style.height = `${vv.height}px`;
      root.style.bottom = 'auto';
    };
    fit();
    vv.addEventListener('resize', fit);
    vv.addEventListener('scroll', fit);
    return () => {
      vv.removeEventListener('resize', fit);
      vv.removeEventListener('scroll', fit);
      root.style.top = root.style.height = root.style.bottom = '';
    };
  }, [sheet, dialogProps.open, root]);

  // An autoFocus field would grab focus while the sheet is still sliding in, so the phone scrolls and
  // raises the keyboard mid-animation. Hold the focus until the sheet has landed.
  const sheetTransitionProps = sheet
    ? {
        ...transitionProps,
        onEnter: (node: HTMLElement, isAppearing: boolean) => {
          const active = document.activeElement as HTMLElement | null;
          if (active && node.contains(active) && active.matches('input, textarea, [contenteditable="true"]')) {
            deferredFocus.current = active;
            active.blur();
          }
          transitionProps.onEnter?.(node, isAppearing);
        },
        onEntered: (node: HTMLElement, isAppearing: boolean) => {
          deferredFocus.current?.focus({ preventScroll: true });
          deferredFocus.current = null;
          transitionProps.onEntered?.(node, isAppearing);
        },
      }
    : transitionProps;

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
      ref={setRoot}
      TransitionComponent={sheet ? SheetTransition : undefined}
      TransitionProps={sheetTransitionProps}
      transitionDuration={!dialogProps?.open && transitionDirection ? 0 : undefined}
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
      {...dialogProps}
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
