'use client';

import React from 'react';
/* LIB */
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
/* TIPTAP */
import { useCurrentEditor } from '@tiptap/react';

/* CONSTANTS */
import { EDITOR_ICONS } from '../constants';
/* TYPES */
import type { EditorToolbarProps } from '../TipTapTextEditor.types';
import type { TAlign } from './components/AlignButton';
import AlignButton from './components/AlignButton';
import AnchorEditorButton from './components/AnchorEditorButton';
import ColorPicker from './components/ColorPicker';
import FontFamilySelect from './components/FontFamilySelect';
import FontSizeSelect from './components/FontSizeSelect';
import HeadingDropdown from './components/HeadingDropdown';
// import ImageButton from './components/ImageButton';
/* LOCAL */
import MarkButton from './components/MarkButton';
import ToolIcon from './components/ToolIcon';
import VideoButton from './components/VideoButton';
import IndentationButtons from './components/IndentationButtons';
import BlockquoteButton from './components/BlockquoteButton';
import { IconMoodSmile } from '@tabler/icons-react';
import EmojiPicker, { SkinTones } from 'emoji-picker-react';

const EditorToolbar: React.FC<EditorToolbarProps> = ({ toolsHidden = [], defaultColors, ...restProps }) => {
  const { editor } = useCurrentEditor();
  const [emojiAnchorEl, setEmojiAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const openEmojiPopover = Boolean(emojiAnchorEl);
  const emojiPopoverId = openEmojiPopover ? 'emoji-popover' : undefined;
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);
  const id = openPopover ? 'simple-popover' : undefined;
  const currentTextAlign = ['left', 'center', 'right', 'justify'].find((alignment) =>
    editor?.isActive({ textAlign: alignment })
  ) as TAlign;

  const AlignIcon = EDITOR_ICONS[`text_align_${currentTextAlign || 'left'}`];
  const VideoIcon = EDITOR_ICONS['video'];
  const ImageIcon = EDITOR_ICONS['image'];

  return (
    <>
      <Box
        bgcolor="grey.200"
        py={1.2}
        px={1.5}
        display="flex"
        width="100%"
        borderBottom="1px solid"
        borderColor="grey.400"
        {...restProps}
      >
        <Stack
          direction="row"
          spacing={{
            xs: 1,
            md: 2.5,
          }}
          alignItems="center"
        >
          {/* <FontFamilySelect /> */}

          <MarkButton format="bold" />
          <MarkButton format="underline" />
          <MarkButton format="italic" />
          <HeadingDropdown />
          <BlockquoteButton />
          {/* <FontSizeSelect /> */}
          <Divider orientation="vertical" />
          <IconButton
            aria-describedby={id}
            id="align"
            onClick={handleClick}
            size="small"
            sx={{
              color: currentTextAlign !== 'left' ? 'primary.main' : 'text.primary',
            }}
          >
            <ToolIcon icon={`text_align_${currentTextAlign || 'left'}`} />
          </IconButton>
          <MarkButton format="orderedList" />
          <MarkButton format="bulletList" />
          <Divider orientation="vertical" />
          <AnchorEditorButton />
          <Divider orientation="vertical" />
          <ColorPicker />
          <IconButton aria-describedby={emojiPopoverId} onClick={(e) => setEmojiAnchorEl(e.currentTarget)} size="small">
            <IconMoodSmile size={28} />
          </IconButton>
          <Divider orientation="vertical" />
          <VideoButton />

          <Divider orientation="vertical" />
          {/* <ImageButton /> */}
        </Stack>
      </Box>

      <Popover
        id={id}
        open={Boolean(openPopover)}
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
        {anchorEl?.id === 'align' && (
          <Box gap="5px" id="alignment_editor_popover" display="flex" p={1} flexDirection="row">
            <AlignButton format="left" />
            <AlignButton format="center" />
            <AlignButton format="right" />
            <AlignButton format="justify" />
          </Box>
        )}
      </Popover>
      <Popover
        id={emojiPopoverId}
        open={openEmojiPopover}
        anchorEl={emojiAnchorEl}
        onClose={() => setEmojiAnchorEl(null)}
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
        <EmojiPicker
          lazyLoadEmojis
          onEmojiClick={(obj) => {
            editor?.commands.insertContent(obj?.emoji);
            setEmojiAnchorEl(null);
          }}
          previewConfig={{
            showPreview: false,
          }}
          defaultSkinTone={SkinTones['MEDIUM_LIGHT']}
        />
      </Popover>
    </>
  );
};

export default React.memo(EditorToolbar);
