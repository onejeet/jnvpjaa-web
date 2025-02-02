import Dialog, { DIALOG_ALERT_WRAPPER_ID } from './Dialog';
import type { DialogFooterProps, DialogHeaderProps, DialogProps } from './Dialog.types';
import DialogFooter from './DialogFooter';
import DialogHeader from './DialogHeader';

export const DIALOG_OKAY_BUTTON_WRAPPER_ID = 'dialog_okay_button_wrapper';

export default Dialog;
export type { DialogProps, DialogFooterProps, DialogHeaderProps };
export { DialogHeader, DialogFooter, DIALOG_ALERT_WRAPPER_ID };
