'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useMutation, useQuery } from '@apollo/client';
import { Box, ButtonBase, IconButton, InputBase, Popover, Tooltip, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { IconCheck, IconMoodSmile, IconSend2, IconSparkles } from '@tabler/icons-react';
import { SkinTones } from 'emoji-picker-react';
import ProfilePicture from '@/components/common/ProfilePicture';
import Button from '@/components/core/Button';
import { COMMENT_MAX_LENGTH } from '@/apollo/commentOperations';
import { AI_ALLOWANCE, AI_ASSIST, type AiAllowance, type AiResult } from '@/apollo/aiOperations';
import { aiErrorMessage } from '@/modules/AiAssist/aiCopy';

// The picker is ~300 KB; only load it when someone opens it.
const EmojiPicker = dynamic(() => import('emoji-picker-react'), { ssr: false });

interface CommentComposerProps {
  user?: { id?: string; profileImage?: string | null };
  initialValue?: string;
  placeholder?: string;
  submitLabel?: string;
  autoFocus?: boolean;
  compact?: boolean;
  onSubmit: (content: string) => Promise<unknown> | void;
  onCancel?: () => void;
}

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform);

const CommentComposer: React.FC<CommentComposerProps> = ({
  user,
  initialValue = '',
  placeholder = 'Add to the conversation…',
  submitLabel = 'Post',
  autoFocus,
  compact,
  onSubmit,
  onCancel,
}) => {
  const [value, setValue] = React.useState(initialValue);
  const [focused, setFocused] = React.useState(!!autoFocus);
  const [submitting, setSubmitting] = React.useState(false);
  const [emojiAnchor, setEmojiAnchor] = React.useState<HTMLElement | null>(null);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const [assist, { loading: improving }] = useMutation<{ aiAssist: AiResult }>(AI_ASSIST);
  const { data: aiData } = useQuery<{ aiAllowance: AiAllowance }>(AI_ALLOWANCE, { fetchPolicy: 'cache-first' });
  const aiEnabled = !!aiData?.aiAllowance.enabled;
  const [suggestion, setSuggestion] = React.useState<{ text: string; from: string } | null>(null);
  const [aiNote, setAiNote] = React.useState<string | null>(null);

  const trimmed = value.trim();
  const remaining = COMMENT_MAX_LENGTH - value.length;
  const canSubmit = !!trimmed && remaining >= 0 && !submitting;
  // Stay open while the emoji picker is up, otherwise an empty composer collapses under the click.
  const expanded = focused || !!value || !!onCancel || !!emojiAnchor;

  React.useEffect(() => {
    if (!autoFocus) return;
    const input = inputRef.current;
    input?.focus();
    input?.setSelectionRange(input.value.length, input.value.length);
  }, [autoFocus]);

  const submit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    try {
      await onSubmit(trimmed);
      setValue('');
    } catch {
      // The caller already surfaced the error; keep the draft so nothing is lost.
    } finally {
      setSubmitting(false);
    }
  };

  const improve = async () => {
    setSuggestion(null);
    setAiNote(null);
    try {
      const res = await assist({ variables: { taskId: 'comment.improve', text: trimmed } });
      const text = res.data?.aiAssist.result;
      setSuggestion(text ? { text, from: trimmed } : null);
    } catch (error) {
      setAiNote(aiErrorMessage(error));
    }
  };

  const insertEmoji = (emoji: string) => {
    const input = inputRef.current;
    const start = input?.selectionStart ?? value.length;
    const end = input?.selectionEnd ?? value.length;
    setValue((v) => v.slice(0, start) + emoji + v.slice(end));
    setEmojiAnchor(null);
    requestAnimationFrame(() => {
      input?.focus();
      input?.setSelectionRange(start + emoji.length, start + emoji.length);
    });
  };

  return (
    <Box display="flex" gap={2} alignItems="flex-start">
      {!compact && (
        <ProfilePicture
          id={user?.id}
          src={user?.profileImage || undefined}
          size={40}
          containerProps={{ sx: { width: 40, flexShrink: 0, cursor: 'default' } }}
        />
      )}
      <Box
        flex={1}
        minWidth={0}
        sx={{
          border: '1px solid',
          borderColor: focused ? 'primary.main' : 'divider',
          borderRadius: 3,
          bgcolor: 'background.paper',
          boxShadow: focused ? (t) => `0 0 0 3px ${t.palette.primary.main}22` : 'none',
          transition: 'border-color .15s, box-shadow .15s',
        }}
      >
        <InputBase
          inputRef={inputRef}
          multiline
          fullWidth
          minRows={expanded ? 2 : 1}
          maxRows={12}
          value={value}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
              e.preventDefault();
              submit();
            } else if (e.key === 'Escape' && onCancel) {
              e.preventDefault();
              onCancel();
            }
          }}
          inputProps={{ 'aria-label': placeholder, maxLength: COMMENT_MAX_LENGTH + 200 }}
          sx={{ px: 2, pt: 1.5, pb: expanded ? 0.5 : 1.5, fontSize: { xs: 16, md: 15 }, lineHeight: 1.6 }}
        />
        {(suggestion || aiNote) && (
          <Box
            aria-live="polite"
            sx={{
              mx: 1,
              mb: 1,
              p: 1.5,
              borderRadius: 2,
              bgcolor: (t) => alpha(t.palette.primary.main, t.palette.mode === 'dark' ? 0.16 : 0.06),
            }}
          >
            <Typography sx={{ fontSize: 15, lineHeight: 1.6, whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>
              {suggestion?.text || aiNote}
            </Typography>
            <Box display="flex" alignItems="center" flexWrap="wrap" gap={1} mt={1}>
              {suggestion && (
                <Button
                  title="Use this"
                  size="small"
                  variant="contained"
                  startIcon={<IconCheck size={16} />}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    // Edited while AI worked: keep the member's words, ask them to retry.
                    if (suggestion.from !== trimmed) {
                      setSuggestion(null);
                      setAiNote('Your comment changed while AI was working. Try again to use your latest text.');
                      return;
                    }
                    setValue(suggestion.text);
                    setSuggestion(null);
                    inputRef.current?.focus();
                  }}
                  sx={{ borderRadius: 5 }}
                />
              )}
              <Button
                title={suggestion ? 'Discard' : 'OK'}
                size="small"
                variant="text"
                color="inherit"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  setSuggestion(null);
                  setAiNote(null);
                }}
              />
              {suggestion && (
                <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>
                  Suggestions are made with Google&apos;s AI.
                </Typography>
              )}
            </Box>
          </Box>
        )}
        {expanded && (
          <Box display="flex" alignItems="center" gap={1} px={1} pb={1}>
            <Tooltip title="Emoji">
              <IconButton
                aria-label="Insert emoji"
                // Keep focus in the textarea so the toolbar isn't unmounted by the blur before the click lands.
                onMouseDown={(e) => e.preventDefault()}
                onClick={(e) => setEmojiAnchor(e.currentTarget)}
                sx={{ width: 40, height: 40, color: emojiAnchor ? 'primary.main' : 'text.secondary' }}
              >
                <IconMoodSmile size={26} stroke={1.75} />
              </IconButton>
            </Tooltip>
            {!!trimmed && aiEnabled && (
              <ButtonBase
                onMouseDown={(e) => e.preventDefault()}
                onClick={improve}
                disabled={improving || submitting}
                aria-label="Improve with AI"
                sx={{
                  gap: 0.5,
                  height: 32,
                  px: 1.25,
                  borderRadius: 999,
                  fontSize: 13.5,
                  fontWeight: 600,
                  color: 'primary.main',
                  border: '1px solid',
                  borderColor: (t) => alpha(t.palette.primary.main, 0.45),
                  bgcolor: (t) => alpha(t.palette.primary.main, 0.06),
                  whiteSpace: 'nowrap',
                  '&:hover': { bgcolor: (t) => alpha(t.palette.primary.main, 0.12) },
                  '&.Mui-focusVisible': { outline: '2px solid', outlineColor: 'primary.main', outlineOffset: 2 },
                  '&.Mui-disabled': { opacity: 0.6 },
                }}
              >
                <IconSparkles size={16} stroke={1.75} />
                {improving ? 'Improving…' : 'Improve with AI'}
              </ButtonBase>
            )}
            <Typography
              variant="caption"
              color={remaining < 0 ? 'error.main' : 'text.secondary'}
              sx={{ display: { xs: 'none', sm: 'block' }, opacity: remaining < 200 ? 1 : 0.6 }}
            >
              {remaining < 200 ? `${remaining} characters left` : `${isMac ? '⌘' : 'Ctrl'} + Enter to post`}
            </Typography>
            <Box ml="auto" display="flex" gap={1}>
              {onCancel && <Button title="Cancel" size="small" variant="text" color="inherit" onClick={onCancel} />}
              <Button
                title={submitLabel}
                size="small"
                variant="contained"
                disabled={!canSubmit}
                loading={submitting}
                startIcon={<IconSend2 size={16} />}
                onClick={submit}
                sx={{ borderRadius: 5, px: 2 }}
              />
            </Box>
          </Box>
        )}
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

export default CommentComposer;
