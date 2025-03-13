import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import type { Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Button from '../Button';
import ClearIcon from '@mui/icons-material/Clear';
import type { DialogHeaderProps } from './Dialog.types';
import type { ButtonProps } from '../Button/Button.types';
import type { MouseEventHandler } from 'react';

const DialogHeader: React.FC<DialogHeaderProps> = ({
  title,
  titleProps = {},
  subTitle,
  subTitleProps = {},
  icon,
  buttons = [],
  buttonsStackProps = {},
  iconContainerProps = {},
  onClose,
  children,
  closeIconContainerProps = {},
  closeIcon,
  ...restProps
}) => {
  const { sx: closeIconSx, ...restCloseIconContainerProps } = closeIconContainerProps;
  return (
    <Box display="flex" alignItems="center" {...restProps}>
      <Box display="flex" flex={1}>
        {icon ? (
          <Box display="flex" mr={1.1} {...iconContainerProps}>
            {icon}
          </Box>
        ) : null}
        {title || subTitle ? (
          <Box display="flex" flexDirection="column">
            {title && React.isValidElement(title) ? (
              title
            ) : (
              <Box display="flex" flexDirection="column">
                <Typography variant="h3" fontSize="20px" {...titleProps}>
                  {title}
                </Typography>
              </Box>
            )}
            {subTitle ? (
              React.isValidElement(subTitle) ? (
                subTitle
              ) : (
                <Box display="flex" flexDirection="column">
                  <Typography color="var(--mui-palette-neutral-800)" {...subTitleProps}>
                    {subTitle}
                  </Typography>
                </Box>
              )
            ) : null}
          </Box>
        ) : null}
      </Box>
      {buttons.length > 0 && (
        <Stack direction="row" spacing="10px" {...buttonsStackProps}>
          {buttons.map((button: ButtonProps, index: number) => (
            <Button key={`form-header-button-${index}`} {...button} />
          ))}
        </Stack>
      )}

      {onClose ? (
        <Box
          display="flex"
          justifySelf="flex-end"
          sx={{
            position: 'absolute',
            top: '15px',
            right: '12px',
            zIndex: (theme: Theme) => theme.zIndex.drawer + 2,
            ...closeIconSx,
          }}
          {...(restCloseIconContainerProps || {})}
        >
          <IconButton
            onClick={onClose as MouseEventHandler}
            sx={{
              width: 30,
              height: 30,
              padding: 0,
              borderRadius: 30,
              border: 'none',
              '&:hover svg': {
                transform: 'rotate(180deg)',
              },
              '& svg': {
                transition: 'all .2s cubic-bezier(.785,.135,.15,.86) 0s',
              },
            }}
          >
            {closeIcon || <ClearIcon sx={{ fontSize: '22px' }} />}
          </IconButton>
        </Box>
      ) : null}
    </Box>
  );
};

export default React.memo(DialogHeader);
