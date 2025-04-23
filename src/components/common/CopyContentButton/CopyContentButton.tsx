import React from 'react';
import { IconButton, Tooltip, Typography } from '@mui/material';
import { IProps } from './CopyContentButton.types';
import { Box } from '@mui/material';
import { CheckCircle, Copy } from '@phosphor-icons/react';
import Button from '@/components/core/Button';

const CopyContentButton: React.FC<IProps> = ({
  content,
  disabled,
  tooltipProps = {},
  copiedMessageProps,
  containerProps = {},
  buttonType = 'icon',
  buttonProps = {},
}) => {
  const { message = 'Copied!', placement = 'right', hide = false } = copiedMessageProps || {};
  const [linkCopied, setLinkCopied] = React.useState(false);

  const onCopy = () => {
    if (linkCopied) return;
    setLinkCopied(true);
    navigator.clipboard.writeText(content);
    setTimeout(() => setLinkCopied(false), 5000);
  };

  const direction = React.useMemo(() => {
    switch (placement) {
      case 'top':
        return 'column-reverse';
      case 'bottom':
        return 'column';
      case 'right':
        return 'row';
      case 'left':
        return 'row-reverse';
    }
  }, [placement]);

  return (
    <Box display="flex" alignItems="center">
      <Box display="flex" alignItems="center" flexDirection={direction} {...containerProps}>
        <Tooltip
          placement="top"
          arrow
          {...tooltipProps}
          title={linkCopied ? 'Copied to clipboard' : tooltipProps?.title || 'Copy Link'}
        >
          <div>
            {buttonType === 'icon' ? (
              <IconButton
                color="secondary"
                title="Copy Link"
                onClick={onCopy}
                disabled={disabled}
                sx={{
                  border: 'none',
                  cursor: linkCopied ? 'default' : 'pointer',
                  width: 34,
                  height: 34,
                  svg: {
                    color: linkCopied ? 'success.main' : 'inherit',
                  },
                }}
              >
                {linkCopied ? <CheckCircle size={30} /> : <Copy size={30} />}
              </IconButton>
            ) : (
              <Button
                variant="outlined"
                color={linkCopied ? 'success' : 'secondary'}
                size="small"
                onClick={onCopy}
                disabled={disabled}
                sx={{ cursor: linkCopied ? 'default' : 'pointer', px: '10px', py: '4px', mr: '8px' }}
                startIcon={linkCopied ? <CheckCircle size={16} /> : <Copy size={16} />}
                {...buttonProps}
                title={linkCopied ? 'Copied' : buttonProps?.title || 'Copy Link'}
              />
            )}
          </div>
        </Tooltip>

        {linkCopied && !hide && <Typography color="success.main">{message}</Typography>}
      </Box>
    </Box>
  );
};

export default React.memo(CopyContentButton);
