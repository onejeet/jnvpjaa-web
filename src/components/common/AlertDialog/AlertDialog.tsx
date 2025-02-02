import React from 'react';
import Dialog from '@/components/core/Dialog';
import AlertContent from './AlertContent';
import type { AlertDialogProps } from './AlertDialog.types';

const AlertDialog: React.FC<AlertDialogProps> = ({
  open,
  onClose,
  onOkay,
  onCancel,
  okayButtonProps = {},
  cancelButtonProps = {},
  ...restProps
}) => {
  const { action, maxWidth = 'xs' } = restProps || {};

  const btnColor: string = React.useMemo(() => {
    if (action === 'delete') {
      return 'error';
    } else if (action === 'unsaved') {
      return 'error';
    } else if (action === 'loading') {
      return 'Loading...';
    } else if (action === 'deleting') {
      return 'Deleting...';
    } else if (action === 'reject') {
      return 'error';
    } else if (action === 'approve') {
      return 'success';
    }
    return 'error';
  }, [action]);

  const btnText: string = React.useMemo(() => {
    if (action === 'delete') {
      return 'Yes, Delete';
    } else if (action === 'unsaved') {
      return 'Yes, Proceed';
    } else if (action === 'loading') {
      return 'Loading...';
    } else if (action === 'deleting') {
      return 'Deleting...';
    } else if (action === 'reject') {
      return 'Reject';
    } else if (action === 'approve') {
      return 'Approve';
    }
    return 'Yes, Proceed';
  }, [action]);

  return (
    <Dialog
      open={open}
      maxWidth={maxWidth}
      onClose={onClose}
      footerProps={{
        onOkay: onOkay ? onOkay : () => {},
        onCancel,
        okayButtonProps: {
          // color,
          disabled: action === 'deleting',
          title: btnText,
          // @ts-expect-error sdsd
          color: btnColor,
          ...okayButtonProps,
        },
        cancelButtonProps: {
          ...cancelButtonProps,
        },
      }}
      hideHeader
      disableBackdropClick
    >
      <AlertContent {...restProps} />
    </Dialog>
  );
};

export default AlertDialog;
