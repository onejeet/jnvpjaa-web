import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { useCurrentEditor } from '@tiptap/react';

import Upload from '@/components/form/Upload';

/* CONSTANTS */
import ToolIcon from './ToolIcon';

const ImageButton: React.FC = (props) => {
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
  const id = open ? 'image-upload-popover' : undefined;

  const editorSelection = React.useRef(editor.selection);

  React.useEffect(() => {
    if (open) {
      editorSelection.current = editor.selection;
    }
  }, [open]);

  const setLink = React.useCallback(
    (href) => {
      const url = href;

      // cancelled
      if (url === null || url === '') {
        return;
      }

      editor.commands.setYoutubeVideo({
        src: href,
        width: Math.max(320, parseInt(width, 10)) || 640,
        height: Math.max(180, parseInt(height, 10)) || 480,
      });
    },
    [width, height]
  );

  if (!editor) {
    return null;
  }

  return (
    <>
      <IconButton
        id="video_tool_button"
        aria-describedby={id}
        onClick={handleClick}
        sx={{
          color: editor?.isActive('link') ? 'primary.main' : 'text.primary',
        }}
        size="small"
      >
        <ToolIcon icon="image" />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl || document.getElementById('typography_editor_anchor_button')}
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
          <Upload />
        </Box>
      </Popover>
    </>
  );
};

export default ImageButton;
