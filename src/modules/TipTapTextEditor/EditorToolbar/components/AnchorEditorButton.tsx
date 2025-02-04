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
import { EDITOR_ICONS } from '../../constants';
import ToolIcon from './ToolIcon';
import { isURL } from '@/utils/helpers';

const AnchorEditorButton: React.FC = (props) => {
  const { editor = {} } = useCurrentEditor();

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [url, setUrl] = React.useState<string | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setUrl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setUrl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'anchor-url-popover' : undefined;

  const editorSelection = React.useRef(editor.selection);

  React.useEffect(() => {
    if (open) {
      editorSelection.current = editor.selection;
    }
  }, [open]);

  const setLink = (href: string) => {
    const url = href;

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  if (!editor) {
    return null;
  }

  const Icon = EDITOR_ICONS['link'];

  return (
    <>
      <IconButton
        id="anchor_tool_button"
        aria-describedby={id}
        onClick={handleClick}
        sx={{
          color: editor?.isActive('link') ? 'primary.main' : 'text.primary',
        }}
        size="small"
      >
        <ToolIcon icon="link" />
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
          <Box display="flex" flexDirection="column" width="100%" gap="16px">
            <Box display="flex" flexDirection="column" flex={1}>
              <Typography variant="subtitle2" color="text.primary" mb={1}>
                URL
              </Typography>
              <OutlinedInput
                onChange={(e: any) => {
                  setUrl(e.target.value);
                }}
                placeholder="https://mywebsite.com"
                size="small"
                value={url || editor?.getAttributes('link')?.href}
              />
            </Box>
            <Box display="flex" gap="10px" justifyContent="flex-end">
              <Button
                onClick={
                  editor.isActive('link')
                    ? () => {
                        editor.chain().focus().unsetLink().run();
                        setAnchorEl(null);
                        setUrl(null);
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
                  setLink(url);
                  setAnchorEl(null);
                }}
                title="Save"
                size="small"
                disabled={!isURL(url)}
              />
            </Box>
          </Box>
        </Box>
      </Popover>
    </>
  );
};

export default AnchorEditorButton;
