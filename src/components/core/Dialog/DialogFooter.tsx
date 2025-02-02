import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DIALOG_OKAY_BUTTON_WRAPPER_ID } from '.';
import type { DialogFooterProps } from './Dialog.types';
import CloseIcon from '@mui/icons-material/Close';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import Button from '../Button';

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
              size="small"
              color="secondary"
              startIcon={cancelButtonProps?.loading ? undefined : <CloseIcon />}
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
                size="small"
                variant="contained"
                startIcon={okayButtonProps?.loading ? undefined : <TaskAltIcon sx={{ fontSize: '14px' }} />}
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
