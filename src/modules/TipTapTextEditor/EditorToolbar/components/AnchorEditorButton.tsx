import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useCurrentEditor } from '@tiptap/react';
import Button from '@/components/core/Button';
import ToolIcon from './ToolIcon';
import { Tooltip } from '@mui/material';
import { isSafeWebUrl } from '../../editorUrl';

const AnchorEditorButton: React.FC<{ disabled?: boolean }> = ({ disabled }) => {
  const { editor } = useCurrentEditor();

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [url, setUrl] = React.useState('');

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setUrl(editor?.getAttributes('link')?.href || '');
  };

  const handleClose = () => {
    setAnchorEl(null);
    setUrl('');
  };

  const open = Boolean(anchorEl);
  const id = open ? 'anchor-url-popover' : undefined;

  if (!editor) {
    return null;
  }

  return (
    <>
      <Tooltip title="Add Link" arrow>
        <IconButton
          id="anchor_tool_button"
          aria-label="Insert or edit link"
          aria-describedby={id}
          disabled={disabled}
          onClick={handleClick}
          sx={{
            color: editor?.isActive('link') ? 'primary.main' : 'text.primary',
          }}
          size="small"
        >
          <ToolIcon icon="link" />
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
                aria-label="Link URL"
                type="url"
                placeholder="https://mywebsite.com"
                size="small"
                value={url}
              />
            </Box>
            <Box display="flex" gap="10px" justifyContent="flex-end">
              <Button
                onClick={
                  editor.isActive('link')
                    ? () => {
                        editor.chain().focus().unsetLink().run();
                        setAnchorEl(null);
                        setUrl('');
                      }
                    : handleClose
                }
                variant="outlined"
                color={editor.isActive('link') ? 'error' : 'secondary'}
                title={editor.isActive('link') ? 'Remove' : 'Cancel'}
                size="small"
                startIcon={
                  editor.isActive('link') ? (
                    <DeleteIcon sx={{ fontSize: '14px' }} />
                  ) : (
                    <HighlightOffIcon sx={{ fontSize: '14px' }} />
                  )
                }
              />
              <Button
                startIcon={<TaskAltIcon sx={{ fontSize: '18px' }} />}
                onClick={() => {
                  if (isSafeWebUrl(url)) {
                    editor.chain().focus().extendMarkRange('link').setLink({ href: url.trim() }).run();
                    setAnchorEl(null);
                  }
                }}
                title="Save"
                size="small"
                disabled={!isSafeWebUrl(url)}
              />
            </Box>
          </Box>
        </Box>
      </Popover>
    </>
  );
};

export default AnchorEditorButton;
