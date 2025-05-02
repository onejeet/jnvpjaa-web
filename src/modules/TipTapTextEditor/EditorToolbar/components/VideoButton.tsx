'use client';

import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { useCurrentEditor } from '@tiptap/react';
import ToolIcon from './ToolIcon';
import { isURL } from '@/utils/helpers';
import Button from '@/components/core/Button';
import { Tooltip } from '@mui/material';
import { isBrowser } from '@/utils/isBrowser';

const VideoButton: React.FC = (props) => {
  const { editor } = useCurrentEditor();

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [url, setUrl] = React.useState<string | null>(null);
  const [width, setWidth] = React.useState<number>(640);
  const [height, setHeight] = React.useState<number>(480);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setUrl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setUrl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'video-url-popover' : undefined;

  // @ts-expect-error type-error
  const editorSelection = React.useRef(editor?.selection);

  React.useEffect(() => {
    if (open) {
      // @ts-expect-error type-error
      editorSelection.current = editor?.selection;
    }
  }, [open]);

  const setLink = React.useCallback(
    (href: string) => {
      const url = href;

      // cancelled
      if (url === null || url === '') {
        return;
      }

      editor?.commands?.setYoutubeVideo({
        src: href,
        width: Math.max(320, parseInt(width?.toString(), 10)) || 640,
        height: Math.max(180, parseInt(height?.toString(), 10)) || 480,
      });
    },
    [width, height]
  );

  if (!editor) {
    return null;
  }

  return (
    <>
      <Tooltip title="Video" arrow>
        <IconButton
          id="video_tool_button"
          aria-describedby={id}
          onClick={handleClick}
          sx={{
            color: editor?.isActive('link') ? 'primary.main' : 'text.primary',
          }}
          size="small"
        >
          <ToolIcon icon="video" />
        </IconButton>
      </Tooltip>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl || (isBrowser() ? document.getElementById('typography_editor_anchor_button') : null)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transitionDuration={0}
      >
        <Box display="flex" width={340} p={2} flexDirection="column">
          <Box display="flex" flexDirection="column" width="100%" gap="16px">
            <Box display="flex" flexDirection="column" flex={1}>
              <Typography variant="subtitle2" color="text.primary" mb={1}>
                URL
              </Typography>
              <OutlinedInput
                onChange={(e: any) => {
                  setUrl(e.target.value);
                }}
                placeholder="https://www.youtube.com/watch?v=videoid"
                size="small"
                value={url || editor?.getAttributes('youtube')?.src}
              />
            </Box>
            <Box display="flex" width="100%" gap={1.5}>
              <Box display="flex" flexDirection="column" flex={1}>
                <Typography variant="subtitle2" color="text.primary" mb={1}>
                  Width
                </Typography>
                <OutlinedInput
                  onChange={(e: any) => {
                    setWidth(Number(e.target.value));
                  }}
                  type="number"
                  placeholder="640"
                  size="small"
                  value={width || editor?.getAttributes('youtube')?.width}
                />
              </Box>
              <Box display="flex" flexDirection="column" flex={1}>
                <Typography variant="subtitle2" color="text.primary" mb={1}>
                  Height
                </Typography>
                <OutlinedInput
                  onChange={(e: any) => {
                    setHeight(Number(e.target.value));
                  }}
                  type="number"
                  placeholder="640"
                  size="small"
                  value={height || editor?.getAttributes('height')}
                />
              </Box>
            </Box>
            <Box display="flex" gap="10px" justifyContent="flex-end">
              <Button
                onClick={() => {
                  setAnchorEl(null);
                }}
                action="cancel"
                size="small"
                title="Cancel"
              />
              <Button
                onClick={() => {
                  if (url) {
                    setLink(url);
                    setAnchorEl(null);
                  }
                }}
                action="save"
                size="small"
                disabled={!isURL(url)}
                title="Add"
              />
            </Box>
          </Box>
        </Box>
      </Popover>
    </>
  );
};

export default VideoButton;
