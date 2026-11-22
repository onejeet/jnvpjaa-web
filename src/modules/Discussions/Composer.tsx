'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useMutation, useQuery } from '@apollo/client';
import { Box, ButtonBase, CircularProgress, IconButton, InputBase, Popover, Tooltip, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { IconChartBar, IconMoodSmile, IconPhoto, IconPlus, IconX } from '@tabler/icons-react';
import { SkinTones } from 'emoji-picker-react';
import ProfilePicture from '@/components/common/ProfilePicture';
import Button from '@/components/core/Button';
import { useAuth } from '@/context/AuthContext';
import { useAlert } from '@/context/AlertContext';
import { brand } from '@/config/tenant';
import { optimiseImageSize } from '@/utils/media';
import { splitLinks } from '@/modules/CommentsModule/commentThreads';
import {
  CREATE_DISCUSSION_IMAGE_UPLOAD,
  CREATE_DISCUSSION_POST,
  DISCUSSION_EMBED,
  MAX_POST_IMAGES,
  POLL_DAYS,
  POLL_OPTION_MAX,
  POST_MAX_LENGTH,
  POST_TAGS,
  TAG_LABEL,
  type DiscussionPost,
  type PostEmbed,
  type PostTag,
} from '@/apollo/discussionOperations';
import { EmbedFrame } from './PostMedia';
import { TAG_COLOR } from './discussion.utils';

const EmojiPicker = dynamic(() => import('emoji-picker-react'), { ssr: false });
const COUNTER_FROM = 4500;
const IMAGE_TYPES = 'image/jpeg,image/png,image/webp';

interface Photo {
  id: string;
  preview: string;
  key?: string;
  failed?: boolean;
}

interface ComposerProps {
  parentId?: string;
  placeholder?: string;
  autoFocus?: boolean;
  /** Replies skip the tag picker and sit tighter. */
  compact?: boolean;
  onPosted: (post: DiscussionPost) => void;
}

const draftKey = (parentId?: string) => `${brand.id}_discussion_draft_${parentId ?? 'root'}`;
const readDraft = (parentId?: string) => {
  try {
    return JSON.parse(localStorage.getItem(draftKey(parentId)) || 'null') as { body?: string; tag?: PostTag } | null;
  } catch {
    return null;
  }
};

const toolSx = {
  width: 36,
  height: 36,
  color: 'primary.main',
  '&.Mui-disabled': { color: 'text.disabled' },
} as const;

const Composer: React.FC<ComposerProps> = ({ parentId, placeholder, autoFocus, compact, onPosted }) => {
  const { user } = useAuth();
  const { showAlert } = useAlert();
  const [body, setBody] = React.useState('');
  const [emojiAnchor, setEmojiAnchor] = React.useState<HTMLElement | null>(null);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const insertEmoji = (emoji: string) => {
    const input = inputRef.current;
    const start = input?.selectionStart ?? body.length;
    const end = input?.selectionEnd ?? body.length;
    setBody((v) => v.slice(0, start) + emoji + v.slice(end));
    setEmojiAnchor(null);
    requestAnimationFrame(() => {
      input?.focus();
      input?.setSelectionRange(start + emoji.length, start + emoji.length);
    });
  };
  const [tag, setTag] = React.useState<PostTag>('DISCUSSION');
  const [photos, setPhotos] = React.useState<Photo[]>([]);
  const [poll, setPoll] = React.useState<{ options: string[]; days: number } | null>(null);
  const [dismissedUrl, setDismissedUrl] = React.useState<string | null>(null);
  const [linkUrl, setLinkUrl] = React.useState<string | null>(null);
  const fileRef = React.useRef<HTMLInputElement>(null);

  const [requestUpload] = useMutation(CREATE_DISCUSSION_IMAGE_UPLOAD);
  const [create, { loading: posting }] = useMutation<{ createDiscussionPost: DiscussionPost }>(CREATE_DISCUSSION_POST);

  // Restore the draft after mount so server and client render the same empty box.
  React.useEffect(() => {
    const draft = readDraft(parentId);
    if (draft?.body) setBody(draft.body);
    if (draft?.tag) setTag(draft.tag);
  }, [parentId]);

  React.useEffect(() => {
    const t = setTimeout(() => {
      try {
        if (body.trim()) localStorage.setItem(draftKey(parentId), JSON.stringify({ body, tag }));
        else localStorage.removeItem(draftKey(parentId));
      } catch {
        /* storage blocked: drafts just don't persist */
      }
    }, 400);
    return () => clearTimeout(t);
  }, [body, tag, parentId]);

  // Link preview: wait for typing to settle, then ask the server whether the first link is embeddable.
  React.useEffect(() => {
    const t = setTimeout(() => setLinkUrl(splitLinks(body).find((p) => p.href)?.href ?? null), 600);
    return () => clearTimeout(t);
  }, [body]);
  const { data: embedData } = useQuery<{ discussionEmbed: PostEmbed | null }>(DISCUSSION_EMBED, {
    variables: { url: linkUrl },
    skip: !linkUrl || !!photos.length || !!poll,
    fetchPolicy: 'cache-first',
  });
  const embed = linkUrl && linkUrl !== dismissedUrl && !photos.length && !poll ? embedData?.discussionEmbed : null;

  const uploading = photos.some((p) => !p.key && !p.failed);
  const pollValid = !poll || (poll.options.filter((o) => o.trim()).length >= 2 && body.trim().length > 0);
  const hasContent = !!body.trim() || photos.some((p) => p.key) || !!poll || !!embed;
  const canPost = hasContent && pollValid && !uploading && !posting && body.length <= POST_MAX_LENGTH;

  const addPhotos = async (files: FileList | null) => {
    const picked = Array.from(files ?? []).slice(0, MAX_POST_IMAGES - photos.length);
    if (fileRef.current) fileRef.current.value = '';
    for (const file of picked) {
      const id = `${Date.now()}-${Math.random()}`;
      setPhotos((prev) => [...prev, { id, preview: URL.createObjectURL(file) }]);
      try {
        const small =
          (await optimiseImageSize(file, { maxSizeMB: 1.5, maxWidthOrHeight: 2048, useWebWorker: true })) ?? file;
        const type = small.type || file.type;
        const { data } = await requestUpload({ variables: { mimeType: type, sizeBytes: small.size } });
        const { uploadUrl, uploadKey } = data.createDiscussionImageUpload;
        const res = await fetch(uploadUrl, { method: 'PUT', body: small, headers: { 'Content-Type': type } });
        if (!res.ok) throw new Error('Photo upload failed. Please try again.');
        setPhotos((prev) => prev.map((p) => (p.id === id ? { ...p, key: uploadKey } : p)));
      } catch (err) {
        setPhotos((prev) => prev.map((p) => (p.id === id ? { ...p, failed: true } : p)));
        showAlert({ visible: true, type: 'error', message: (err as Error).message || 'Photo upload failed.' });
      }
    }
  };

  const removePhoto = (id: string) =>
    setPhotos((prev) => {
      const gone = prev.find((p) => p.id === id);
      if (gone) URL.revokeObjectURL(gone.preview);
      return prev.filter((p) => p.id !== id);
    });

  const reset = () => {
    photos.forEach((p) => URL.revokeObjectURL(p.preview));
    setBody('');
    setPhotos([]);
    setPoll(null);
    setDismissedUrl(null);
    setTag('DISCUSSION');
    try {
      localStorage.removeItem(draftKey(parentId));
    } catch {
      /* ignore */
    }
  };

  const submit = async () => {
    if (!canPost) return;
    try {
      const { data } = await create({
        variables: {
          input: {
            body: body.trim(),
            parentId,
            tag: parentId ? undefined : tag,
            imageKeys: photos.filter((p) => p.key).map((p) => p.key),
            poll: poll ? { options: poll.options.map((o) => o.trim()).filter(Boolean), days: poll.days } : undefined,
            // null tells the server the author removed the preview; leaving it out lets the server pick it up.
            embedUrl: linkUrl && linkUrl === dismissedUrl ? null : undefined,
          },
        },
      });
      if (data?.createDiscussionPost) {
        reset();
        onPosted(data.createDiscussionPost);
      }
    } catch (err) {
      showAlert({ visible: true, type: 'error', message: (err as Error).message });
    }
  };

  const remaining = POST_MAX_LENGTH - body.length;

  return (
    <Box display="flex" gap={1.5} px={2} py={1.5}>
      <ProfilePicture
        src={user?.profileImage || undefined}
        size={40}
        containerProps={{ sx: { width: 40, height: 40, flexShrink: 0, alignSelf: 'flex-start' } }}
      />
      <Box flex={1} minWidth={0}>
        <InputBase
          multiline
          fullWidth
          autoFocus={autoFocus}
          minRows={compact ? 1 : 2}
          maxRows={14}
          inputRef={inputRef}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) submit();
          }}
          placeholder={poll ? 'Ask a question…' : (placeholder ?? 'What’s on your mind?')}
          inputProps={{
            'aria-label': parentId ? 'Write your reply' : 'Write a post',
            maxLength: POST_MAX_LENGTH + 100,
          }}
          sx={{ fontSize: compact ? 16 : 19, lineHeight: 1.45, py: 0.75 }}
        />

        {!!photos.length && (
          <Box mt={1} display="grid" gap={1} gridTemplateColumns={`repeat(${Math.min(photos.length, 2)}, 1fr)`}>
            {photos.map((p) => (
              <Box
                key={p.id}
                position="relative"
                borderRadius={3}
                overflow="hidden"
                sx={{ aspectRatio: photos.length === 1 ? '16 / 10' : '1' }}
              >
                <Box
                  component="img"
                  src={p.preview}
                  alt=""
                  sx={{ width: '100%', height: '100%', objectFit: 'cover', opacity: p.failed ? 0.35 : 1 }}
                />
                {!p.key && !p.failed && (
                  <Box
                    position="absolute"
                    display="grid"
                    sx={{ inset: 0, placeItems: 'center', bgcolor: 'rgba(0,0,0,.25)' }}
                  >
                    <CircularProgress size={24} sx={{ color: '#fff' }} />
                  </Box>
                )}
                <IconButton
                  size="small"
                  aria-label="Remove photo"
                  onClick={() => removePhoto(p.id)}
                  sx={{
                    position: 'absolute',
                    top: 6,
                    right: 6,
                    color: '#fff',
                    bgcolor: 'rgba(0,0,0,.6)',
                    '&:hover': { bgcolor: 'rgba(0,0,0,.8)' },
                  }}
                >
                  <IconX size={16} />
                </IconButton>
              </Box>
            ))}
          </Box>
        )}

        {poll && (
          <Box
            mt={1}
            border={1}
            borderColor="divider"
            borderRadius={3}
            p={1.5}
            display="flex"
            flexDirection="column"
            gap={1}
          >
            {poll.options.map((opt, i) => (
              <Box key={i} display="flex" alignItems="center" gap={1}>
                <InputBase
                  fullWidth
                  value={opt}
                  placeholder={`Choice ${i + 1}${i > 1 ? ' (optional)' : ''}`}
                  onChange={(e) =>
                    setPoll({ ...poll, options: poll.options.map((o, j) => (j === i ? e.target.value : o)) })
                  }
                  inputProps={{ maxLength: POLL_OPTION_MAX, 'aria-label': `Choice ${i + 1}` }}
                  sx={{
                    border: 1,
                    borderColor: 'divider',
                    borderRadius: 2,
                    px: 1.5,
                    height: 44,
                    fontSize: 15,
                    '&.Mui-focused': { borderColor: 'primary.main' },
                  }}
                />
                {i > 1 && (
                  <IconButton
                    aria-label={`Remove choice ${i + 1}`}
                    size="small"
                    onClick={() => setPoll({ ...poll, options: poll.options.filter((_, j) => j !== i) })}
                  >
                    <IconX size={16} />
                  </IconButton>
                )}
              </Box>
            ))}
            <Box display="flex" alignItems="center" flexWrap="wrap" gap={1}>
              {poll.options.length < 4 && (
                <ButtonBase
                  onClick={() => setPoll({ ...poll, options: [...poll.options, ''] })}
                  sx={{
                    color: 'primary.main',
                    fontSize: 14,
                    fontWeight: 600,
                    gap: 0.5,
                    height: 32,
                    px: 1,
                    borderRadius: 2,
                  }}
                >
                  <IconPlus size={16} /> Add choice
                </ButtonBase>
              )}
              <Box display="flex" alignItems="center" gap={0.5} ml="auto">
                <Typography fontSize={13} color="text.secondary" mr={0.5}>
                  Runs for
                </Typography>
                {POLL_DAYS.map((d) => (
                  <ButtonBase
                    key={d}
                    aria-pressed={poll.days === d}
                    onClick={() => setPoll({ ...poll, days: d })}
                    sx={{
                      height: 28,
                      px: 1.25,
                      borderRadius: 14,
                      fontSize: 13,
                      fontWeight: 600,
                      border: 1,
                      borderColor: poll.days === d ? 'text.primary' : 'divider',
                      bgcolor: poll.days === d ? 'text.primary' : 'transparent',
                      color: poll.days === d ? 'background.default' : 'text.secondary',
                    }}
                  >
                    {d}d
                  </ButtonBase>
                ))}
              </Box>
              <ButtonBase
                onClick={() => setPoll(null)}
                sx={{ color: 'error.main', fontSize: 13, fontWeight: 600, height: 28, px: 1, borderRadius: 2 }}
              >
                Remove poll
              </ButtonBase>
            </Box>
          </Box>
        )}

        {embed && (
          <Box position="relative">
            <EmbedFrame embed={embed} />
            <IconButton
              size="small"
              aria-label="Remove link preview"
              onClick={() => setDismissedUrl(linkUrl)}
              sx={{
                position: 'absolute',
                top: 18,
                left: 6,
                color: '#fff',
                bgcolor: 'rgba(0,0,0,.6)',
                '&:hover': { bgcolor: 'rgba(0,0,0,.8)' },
              }}
            >
              <IconX size={16} />
            </IconButton>
          </Box>
        )}

        {!compact && (
          <Box display="flex" gap={0.75} flexWrap="wrap" mt={1.5} role="radiogroup" aria-label="What kind of post">
            {POST_TAGS.map((t) => {
              const on = tag === t;
              return (
                <ButtonBase
                  key={t}
                  role="radio"
                  aria-checked={on}
                  onClick={() => setTag(t)}
                  sx={{
                    height: 28,
                    px: 1.25,
                    borderRadius: 14,
                    fontSize: 13,
                    fontWeight: 600,
                    border: 1,
                    borderColor: on ? 'currentColor' : 'divider',
                    color: on ? (t === 'DISCUSSION' ? 'text.primary' : TAG_COLOR[t]) : 'text.secondary',
                    bgcolor: (th) => (on ? alpha(th.palette.text.primary, 0.04) : 'transparent'),
                  }}
                >
                  {TAG_LABEL[t]}
                </ButtonBase>
              );
            })}
          </Box>
        )}

        <Box display="flex" alignItems="center" gap={0.25} mt={1} pt={1} borderTop={1} borderColor="divider" ml={-1}>
          <input
            ref={fileRef}
            type="file"
            accept={IMAGE_TYPES}
            multiple
            hidden
            onChange={(e) => addPhotos(e.target.files)}
          />
          <Tooltip title={poll ? 'Photos and polls can’t go together' : 'Add photos'}>
            <span>
              <IconButton
                aria-label="Add photos"
                sx={toolSx}
                disabled={!!poll || photos.length >= MAX_POST_IMAGES}
                onClick={() => fileRef.current?.click()}
              >
                <IconPhoto size={20} />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title={photos.length ? 'Photos and polls can’t go together' : 'Add a poll'}>
            <span>
              <IconButton
                aria-label="Add a poll"
                sx={toolSx}
                disabled={!!photos.length || !!poll}
                onClick={() => setPoll({ options: ['', ''], days: 1 })}
              >
                <IconChartBar size={20} />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Emoji">
            <IconButton
              aria-label="Insert emoji"
              sx={toolSx}
              onMouseDown={(e) => e.preventDefault()}
              onClick={(e) => setEmojiAnchor(e.currentTarget)}
            >
              <IconMoodSmile size={20} />
            </IconButton>
          </Tooltip>
          <Box ml="auto" display="flex" alignItems="center" gap={1.5}>
            {body.length >= COUNTER_FROM && (
              <Typography
                fontSize={13}
                color={remaining < 0 ? 'error.main' : 'text.secondary'}
                sx={{ fontVariantNumeric: 'tabular-nums' }}
              >
                {remaining}
              </Typography>
            )}
            <Button
              title={parentId ? 'Reply' : 'Post'}
              disabled={!canPost}
              loading={posting}
              onClick={submit}
              sx={{ borderRadius: 999, px: 2.5 }}
            />
          </Box>
        </Box>
      </Box>
      <Popover
        open={!!emojiAnchor}
        anchorEl={emojiAnchor}
        onClose={() => setEmojiAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        slotProps={{ paper: { sx: { maxWidth: 'calc(100vw - 24px)' } } }}
      >
        <EmojiPicker
          width="min(350px, calc(100vw - 32px))"
          lazyLoadEmojis
          onEmojiClick={({ emoji }) => insertEmoji(emoji)}
          previewConfig={{ showPreview: false }}
          defaultSkinTone={SkinTones.MEDIUM_LIGHT}
        />
      </Popover>
    </Box>
  );
};

export default Composer;
