import React from 'react';
import Dialog from '@/components/core/Dialog';
import AlertContent from './AlertContent';
import type { AlertDialogProps } from './AlertDialog.types';
import { Box } from '@mui/material';

const AlertDialog: React.FC<AlertDialogProps> = ({
  open,
  onClose,
  onOkay,
  onCancel,
  okayButtonProps = {},
  cancelButtonProps = {},
  ...restProps
}) => {
  const { action, maxWidth = 'sm' } = restProps || {};
  // MUI labels the dialog by a DialogTitle id this dialog never renders; point it at the visible title instead.
  const titleId = React.useId();

  const btnColor: string = React.useMemo(() => {
    if (action === 'delete') {
      return 'error';
    } else if (action === 'unsaved') {
      return 'error';
    } else if (action === 'loading') {
      return 'success';
    } else if (action === 'deleting') {
      return 'error';
    } else if (action === 'reject') {
      return 'error';
    } else if (action === 'app') {
      // White on the success green is 3.3:1; the brand primary passes 4.5:1.
      return 'primary';
    } else if (action === 'approve' || action === 'update') {
      return 'success';
    } else if (action === 'success') {
      return 'success';
    }
    return 'error';
  }, [action]);

  const btnText: string = React.useMemo(() => {
    if (action === 'delete') {
      return 'Yes, Delete';
    } else if (action === 'unsaved' || action === 'app') {
      return 'Yes, Proceed';
    } else if (action === 'loading') {
      return 'Loading...';
    } else if (action === 'deleting') {
      return 'Deleting...';
    } else if (action === 'reject') {
      return 'Reject';
    } else if (action === 'approve') {
      return 'Approve';
    } else if (action === 'update') {
      return 'Update';
    } else if (action === 'success') {
      return 'Okay';
    } else if (action === 'error') {
      return 'Okay';
    }
    return 'Yes, Proceed';
  }, [action]);

  const onOKayHandler = React.useMemo(() => {
    return onOkay || (action === 'success' || action === 'error' ? onCancel : () => {});
  }, [action, onOkay, onCancel]);

  return (
    <Dialog
      open={open}
      maxWidth={maxWidth}
      onClose={onClose}
      footerProps={{
        onOkay: onOKayHandler,
        onCancel,
        sx: {
          borderTop: 'none',
        },
        okayButtonProps: {
          // color,
          disabled: action === 'deleting',
          title: btnText,
          loading: action === 'loading',
          // @ts-expect-error sdsd
          color: btnColor,
          ...okayButtonProps,
        },
        cancelButtonProps: {
          ...cancelButtonProps,
          disabled: action === 'loading' || action === 'deleting',
        },
      }}
      hideHeader
      disableBackdropClick
      aria-labelledby={titleId}
    >
      <AlertContent {...restProps} titleId={titleId} />
    </Dialog>
  );
};

export default AlertDialog;
