'use client';

import React from 'react';
import { Box, IconButton, Popover, Tooltip } from '@mui/material';
import { IconArrowBackUp, IconArrowForwardUp, IconMoodSmile } from '@tabler/icons-react';
import { useCurrentEditor } from '@tiptap/react';
import EmojiPicker, { SkinTones } from 'emoji-picker-react';
import type { EditorToolbarProps } from '../TipTapTextEditor.types';
import type { TAlign } from './components/AlignButton';
import AlignButton from './components/AlignButton';
import AnchorEditorButton from './components/AnchorEditorButton';
import BlockquoteButton from './components/BlockquoteButton';
import ColorPicker from './components/ColorPicker';
import HeadingDropdown from './components/HeadingDropdown';
import MarkButton from './components/MarkButton';
import ToolIcon from './components/ToolIcon';
import VideoButton from './components/VideoButton';

const groupSx = {
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
  gap: 0,
  px: 0.5,
  '& .MuiIconButton-root': { width: 36, height: 36, borderRadius: 1 },
  '& .MuiIconButton-root, & .MuiButton-root': { color: 'grey.700' },
  '& .MuiIconButton-root[aria-pressed="true"]': { color: 'grey.900', bgcolor: 'grey.100' },
};

const EditorToolbar: React.FC<EditorToolbarProps> = ({ toolsHidden = [], defaultColors, disabled, ...boxProps }) => {
  const { editor } = useCurrentEditor();
  const [alignAnchor, setAlignAnchor] = React.useState<HTMLButtonElement | null>(null);
  const [emojiAnchor, setEmojiAnchor] = React.useState<HTMLButtonElement | null>(null);
  const hidden = (tool: string) => toolsHidden.includes(tool);
  const unavailable = disabled || !editor;
  const currentAlign = (['left', 'center', 'right', 'justify'].find((alignment) =>
    editor?.isActive({ textAlign: alignment })
  ) || 'left') as TAlign;

  return (
    <>
      <Box
        {...boxProps}
        role="toolbar"
        aria-label="Text editor tools"
        sx={{
          px: 0.5,
          py: 0.25,
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          flexWrap: 'nowrap',
          alignItems: 'center',
          overflowX: 'auto',
          overflowY: 'hidden',
          scrollbarWidth: 'thin',
          WebkitOverflowScrolling: 'touch',
          '& > [role="group"]:not(:last-child)': {
            borderRight: '1px solid',
            borderColor: 'divider',
          },
          ...boxProps.sx,
        }}
      >
        <Box role="group" aria-label="Text style" sx={groupSx}>
          <HeadingDropdown disabled={unavailable} />
          <MarkButton format="bold" disabled={unavailable} />
          <MarkButton format="italic" disabled={unavailable} />
          <MarkButton format="underline" disabled={unavailable} />
          {!hidden('color') && <ColorPicker defaultColors={defaultColors} disabled={unavailable} />}
          <MarkButton format="strike" disabled={unavailable} />
          <MarkButton format="code" disabled={unavailable} />
        </Box>
        <Box role="group" aria-label="Paragraph" sx={groupSx}>
          <MarkButton format="bulletList" disabled={unavailable} />
          <MarkButton format="orderedList" disabled={unavailable} />
          <BlockquoteButton disabled={unavailable} />
          <Tooltip title="Alignment" arrow>
            <span>
              <IconButton
                aria-label="Alignment"
                aria-expanded={Boolean(alignAnchor)}
                disabled={unavailable}
                onClick={(event) => setAlignAnchor(event.currentTarget)}
                size="small"
              >
                <ToolIcon icon={`text_align_${currentAlign}`} />
              </IconButton>
            </span>
          </Tooltip>
        </Box>
        {(!hidden('link') || !hidden('emoji') || !hidden('video')) && (
          <Box role="group" aria-label="Insert" sx={groupSx}>
            {!hidden('link') && <AnchorEditorButton disabled={unavailable} />}
            {!hidden('emoji') && (
              <Tooltip title="Insert emoji" arrow>
                <span>
                  <IconButton
                    aria-label="Insert emoji"
                    disabled={unavailable}
                    onClick={(event) => setEmojiAnchor(event.currentTarget)}
                    size="small"
                  >
                    <IconMoodSmile size={20} />
                  </IconButton>
                </span>
              </Tooltip>
            )}
            {!hidden('video') && <VideoButton disabled={unavailable} />}
          </Box>
        )}
        <Box role="group" aria-label="History" sx={{ ...groupSx, ml: { md: 'auto' } }}>
          <Tooltip title="Undo" arrow>
            <span>
              <IconButton
                aria-label="Undo"
                disabled={unavailable || !editor?.can().undo()}
                onClick={() => editor?.chain().focus().undo().run()}
                size="small"
              >
                <IconArrowBackUp size={20} />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Redo" arrow>
            <span>
              <IconButton
                aria-label="Redo"
                disabled={unavailable || !editor?.can().redo()}
                onClick={() => editor?.chain().focus().redo().run()}
                size="small"
              >
                <IconArrowForwardUp size={20} />
              </IconButton>
            </span>
          </Tooltip>
        </Box>
      </Box>
      <Popover
        open={Boolean(alignAnchor)}
        anchorEl={alignAnchor}
        onClose={() => setAlignAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Box role="group" aria-label="Choose alignment" sx={{ display: 'flex', p: 0.5 }}>
          {(['left', 'center', 'right', 'justify'] as TAlign[]).map((format) => (
            <AlignButton key={format} format={format} />
          ))}
        </Box>
      </Popover>
      <Popover
        open={Boolean(emojiAnchor)}
        anchorEl={emojiAnchor}
        onClose={() => setEmojiAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        PaperProps={{ sx: { maxWidth: 'calc(100vw - 24px)' } }}
      >
        <EmojiPicker
          width="min(350px, calc(100vw - 32px))"
          lazyLoadEmojis
          onEmojiClick={({ emoji }) => {
            editor?.chain().focus().insertContent(emoji).run();
            setEmojiAnchor(null);
          }}
          previewConfig={{ showPreview: false }}
          defaultSkinTone={SkinTones.MEDIUM_LIGHT}
        />
      </Popover>
    </>
  );
};

export default React.memo(EditorToolbar);
