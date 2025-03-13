import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DIALOG_OKAY_BUTTON_WRAPPER_ID } from '.';
import type { DialogFooterProps } from './Dialog.types';
import Button from '../Button';
import { CheckCircle, X } from '@phosphor-icons/react';

const DialogFooter: React.FC<DialogFooterProps> = ({
  title,
  titleProps = {},
  buttonsStackProps = {},
  onOkay,
  onCancel,
  cancelButtonProps,
  okayButtonProps,
  children,
  ...restProps
}) => {
  return (
    <Box
      className="dialog-footer"
      display="flex"
      alignItems="center"
      height="60px"
      borderTop="1px solid"
      borderColor="grey.300"
      {...restProps}
    >
      <Box display="flex" flex={1}>
        {children}
        {React.isValidElement(title) ? (
          title
        ) : (
          <Typography variant="h2" {...titleProps}>
            {title}
          </Typography>
        )}
      </Box>
      {onCancel || onOkay ? (
        <Stack spacing={1.5} direction="row" {...buttonsStackProps}>
          {onCancel ? (
            <Button
              title="Cancel"
              variant="outlined"
              // size="small"
              color="secondary"
              startIcon={cancelButtonProps?.loading ? undefined : <X size={16} />}
              onClick={() => {
                onCancel();
              }}
              {...cancelButtonProps}
            />
          ) : null}
          {onOkay ? (
            <Box id={DIALOG_OKAY_BUTTON_WRAPPER_ID}>
              <Button
                title="Save"
                color="success"
                // size="small"
                variant="contained"
                startIcon={okayButtonProps?.loading ? undefined : <CheckCircle size={16} />}
                onClick={
                  onOkay
                    ? () => {
                        onOkay();
                      }
                    : () => {}
                }
                {...okayButtonProps}
              />{' '}
            </Box>
          ) : (
            <Box id={DIALOG_OKAY_BUTTON_WRAPPER_ID} />
          )}
        </Stack>
      ) : null}
    </Box>
  );
};

export default React.memo(DialogFooter);
