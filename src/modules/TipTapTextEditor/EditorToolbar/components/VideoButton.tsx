'use client';

import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { useCurrentEditor } from '@tiptap/react';
import ToolIcon from './ToolIcon';
import Button from '@/components/core/Button';
import { Tooltip } from '@mui/material';
import { isYouTubeUrl } from '../../editorUrl';

const VideoButton: React.FC<{ disabled?: boolean }> = ({ disabled }) => {
  const { editor } = useCurrentEditor();

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [url, setUrl] = React.useState('');
  const [width, setWidth] = React.useState<number>(640);
  const [height, setHeight] = React.useState<number>(480);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setUrl('');
  };

  const handleClose = () => {
    setAnchorEl(null);
    setUrl('');
  };

  const open = Boolean(anchorEl);
  const id = open ? 'video-url-popover' : undefined;

  if (!editor) {
    return null;
  }

  return (
    <>
      <Tooltip title="Video" arrow>
        <IconButton
          id="video_tool_button"
          aria-label="Insert YouTube video"
          aria-describedby={id}
          disabled={disabled}
          onClick={handleClick}
          sx={{
            color: editor?.isActive('youtube') ? 'primary.main' : 'text.primary',
          }}
          size="small"
        >
          <ToolIcon icon="video" />
        </IconButton>
      </Tooltip>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
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
        <Box display="flex" width="min(340px, calc(100vw - 32px))" p={2} flexDirection="column">
          <Box display="flex" flexDirection="column" width="100%" gap="16px">
            <Box display="flex" flexDirection="column" flex={1}>
              <Typography variant="subtitle2" color="text.primary" mb={1}>
                URL
              </Typography>
              <OutlinedInput
                onChange={(e) => {
                  setUrl(e.target.value);
                }}
                aria-label="YouTube URL"
                type="url"
                placeholder="https://www.youtube.com/watch?v=videoid"
                size="small"
                value={url}
              />
            </Box>
            <Box display="flex" width="100%" gap={1.5}>
              <Box display="flex" flexDirection="column" flex={1}>
                <Typography variant="subtitle2" color="text.primary" mb={1}>
                  Width
                </Typography>
                <OutlinedInput
                  onChange={(e) => {
                    setWidth(Number(e.target.value));
                  }}
                  inputProps={{ min: 320, max: 1920 }}
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
                  onChange={(e) => {
                    setHeight(Number(e.target.value));
                  }}
                  inputProps={{ min: 180, max: 1080 }}
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
                  if (isYouTubeUrl(url)) {
                    editor
                      .chain()
                      .focus()
                      .setYoutubeVideo({
                        src: url.trim(),
                        width: Math.min(1920, Math.max(320, width || 640)),
                        height: Math.min(1080, Math.max(180, height || 480)),
                      })
                      .run();
                    setAnchorEl(null);
                  }
                }}
                action="save"
                size="small"
                disabled={!isYouTubeUrl(url)}
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
