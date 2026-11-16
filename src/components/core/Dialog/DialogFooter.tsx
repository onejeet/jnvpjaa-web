import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DIALOG_OKAY_BUTTON_WRAPPER_ID } from '.';
import type { DialogFooterProps } from './Dialog.types';
import Button from '../Button';
import { IconCircleCheck as CheckCircle, IconX as X, IconCircleX as XCircle } from '@tabler/icons-react';

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
  const hasLead = Boolean(title || children);
  const { sx: buttonsStackSx, ...restButtonsStackProps } = buttonsStackProps;
  return (
    <Box
      className="dialog-footer"
      display="flex"
      alignItems="center"
      height="60px"
      borderTop="1px solid"
      borderColor="grey.300"
      minHeight={70}
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
        <Stack
          spacing={1.5}
          direction="row"
          // Phones, buttons only: share the full width like native action sheets.
          sx={[
            !hasLead && {
              flex: { xs: '1 0 100%', sm: 'none' },
              display: { xs: 'grid', sm: 'flex' },
              gridAutoFlow: 'column',
              gridAutoColumns: '1fr',
              columnGap: 1.5,
              '& > :empty': { display: { xs: 'none', sm: 'block' } },
              '& > *': { ml: { xs: '0 !important', sm: undefined } },
              '& .MuiButton-root': { width: { xs: '100%', sm: 'auto' }, minHeight: { xs: 44, sm: 'auto' } },
            },
            ...(Array.isArray(buttonsStackSx) ? buttonsStackSx : [buttonsStackSx]),
          ]}
          {...restButtonsStackProps}
        >
          {onCancel ? (
            <Button
              title="Cancel"
              variant="outlined"
              // size="small"
              color="secondary"
              startIcon={cancelButtonProps?.loading ? undefined : <XCircle size={16} />}
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
