'use client';

import React from 'react';
import { Box, IconButton, Stack, Typography, useTheme } from '@mui/material';
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';
import {
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandReddit,
  IconBrandTelegram,
  IconBrandWhatsapp,
  IconBrandX,
  IconCheck,
  IconCopy,
  IconDots,
  IconLink,
  IconMail,
  IconShare,
} from '@tabler/icons-react';
import type { Icon } from '@tabler/icons-react';
import Image from 'next/image';
import Button from '@/components/core/Button';
import Dialog from '@/components/core/Dialog';

interface SocialShareModalProps {
  title?: string | null;
  btn_type?: 'button' | 'icon';
  url?: string | null;
  /** Cover image shown in the preview, so the sharer sees what they are sending. */
  image?: string | null;
}

type Channel = { key: string; label: string; Icon: Icon; color?: string; Share: React.ElementType; extra?: object };

const TILE = 52;

/** Share sheet: a preview of what is being shared, one-tap channels, and the link to copy. */
const SocialShareModal: React.FC<SocialShareModalProps> = ({ title: rawTitle, url, btn_type = 'icon', image }) => {
  const title = rawTitle || '';
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [link, setLink] = React.useState(url || '');
  const [copied, setCopied] = React.useState(false);
  const [copyBlocked, setCopyBlocked] = React.useState(false);
  const [canNativeShare, setCanNativeShare] = React.useState(false);
  const fieldRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (!url && typeof window !== 'undefined') setLink(window.location.href);
    setCanNativeShare(typeof navigator !== 'undefined' && typeof navigator.share === 'function');
  }, [url, open]);

  React.useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2500);
    return () => clearTimeout(t);
  }, [copied]);

  const host = link.replace(/^https?:\/\/(www\.)?/, '').split('/')[0];

  const copy = () =>
    navigator.clipboard
      .writeText(link)
      .then(() => {
        setCopyBlocked(false);
        setCopied(true);
      })
      // Clipboard blocked (permissions, insecure origin): select the text so a manual copy is one keystroke.
      .catch(() => {
        setCopyBlocked(true);
        fieldRef.current?.select();
      });

  const nativeShare = () => navigator.share({ title, url: link }).catch(() => undefined);

  const channels: Channel[] = [
    {
      key: 'whatsapp',
      label: 'WhatsApp',
      Icon: IconBrandWhatsapp,
      color: '#25D366',
      Share: WhatsappShareButton,
      extra: { separator: ' — ' },
    },
    { key: 'linkedin', label: 'LinkedIn', Icon: IconBrandLinkedin, color: '#0A66C2', Share: LinkedinShareButton },
    { key: 'facebook', label: 'Facebook', Icon: IconBrandFacebook, color: '#1877F2', Share: FacebookShareButton },
    { key: 'x', label: 'X', Icon: IconBrandX, Share: TwitterShareButton },
    { key: 'telegram', label: 'Telegram', Icon: IconBrandTelegram, color: '#26A5E4', Share: TelegramShareButton },
    { key: 'reddit', label: 'Reddit', Icon: IconBrandReddit, color: '#FF4500', Share: RedditShareButton },
    {
      key: 'email',
      label: 'Email',
      Icon: IconMail,
      Share: EmailShareButton,
      extra: { subject: title, body: `${title}\n\n` },
    },
  ];

  const tile = (Icon: Icon, label: string, color = theme.palette.text.primary) => (
    <Stack alignItems="center" spacing={0.75} className="share-tile">
      <Box
        className="share-tile-icon"
        sx={{
          width: TILE,
          height: TILE,
          borderRadius: '50%',
          display: 'grid',
          placeItems: 'center',
          color,
          bgcolor: `${color}1A`,
          transition:
            'transform 0.18s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.18s, color 0.18s, box-shadow 0.18s',
          '--brand': color,
        }}
      >
        <Icon size={26} stroke={1.75} />
      </Box>
      <Typography variant="caption" color="text.secondary" fontWeight={500} lineHeight={1.2}>
        {label}
      </Typography>
    </Stack>
  );

  const tileButtonSx = {
    display: 'flex',
    justifyContent: 'center',
    p: 0.5,
    borderRadius: 2,
    '&:hover .share-tile-icon, &:focus-visible .share-tile-icon': {
      bgcolor: 'var(--brand)',
      color: theme.palette.background.paper,
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 14px -8px var(--brand)',
    },
    '&:focus-visible': { outline: `2px solid ${theme.palette.primary.main}`, outlineOffset: 2 },
  };

  return (
    <div>
      {btn_type === 'icon' ? (
        <IconButton onClick={() => setOpen(true)} aria-label="Share">
          <IconShare size={28} />
        </IconButton>
      ) : (
        <Button
          onClick={() => setOpen(true)}
          title="Share"
          variant="text"
          aria-label="Share"
          startIcon={<IconShare size={20} />}
          size="large"
        />
      )}

      <Dialog open={open} onClose={() => setOpen(false)} title="Share" maxWidth="440px" fullWidth hideFooter>
        <Stack spacing={3} px={{ xs: 2, sm: 2.5 }} pt={1} pb={{ xs: 3, sm: 2.5 }}>
          {/* What the recipient will see */}
          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            sx={{ p: 1.25, borderRadius: 2, border: '1px solid', borderColor: 'divider', bgcolor: 'action.hover' }}
          >
            <Box
              sx={{
                position: 'relative',
                flexShrink: 0,
                width: 64,
                height: 64,
                borderRadius: 1.5,
                overflow: 'hidden',
                bgcolor: 'background.paper',
                color: 'text.disabled',
                display: 'grid',
                placeItems: 'center',
              }}
            >
              {image ? (
                <Image src={image} alt="" fill sizes="64px" style={{ objectFit: 'cover' }} />
              ) : (
                <IconLink size={24} />
              )}
            </Box>
            <Box minWidth={0}>
              <Typography
                fontWeight={600}
                lineHeight={1.35}
                sx={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
              >
                {title || 'This page'}
              </Typography>
              <Typography variant="caption" color="text.secondary" noWrap component="p" mt={0.25}>
                {host}
              </Typography>
            </Box>
          </Stack>

          {/* One tap per channel */}
          <Box
            role="list"
            aria-label="Share to"
            sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', rowGap: 2, columnGap: 1 }}
          >
            {channels.map(({ key, label, Icon, color, Share, extra }) => (
              <Box role="listitem" key={key}>
                <Box
                  component={Share}
                  url={link}
                  title={title}
                  {...extra}
                  aria-label={`Share on ${label}`}
                  style={{ width: '100%' }}
                  sx={tileButtonSx}
                >
                  {tile(Icon, label, color)}
                </Box>
              </Box>
            ))}
            {canNativeShare && (
              <Box role="listitem">
                <Box
                  component="button"
                  type="button"
                  onClick={nativeShare}
                  aria-label="More sharing options"
                  sx={{
                    ...tileButtonSx,
                    width: '100%',
                    border: 0,
                    bgcolor: 'transparent',
                    cursor: 'pointer',
                    font: 'inherit',
                  }}
                >
                  {tile(IconDots, 'More')}
                </Box>
              </Box>
            )}
          </Box>

          {/* The link itself */}
          <Box>
            <Typography
              component="label"
              htmlFor="share-link"
              variant="body2"
              fontWeight={600}
              display="block"
              mb={0.75}
            >
              Page link
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              sx={{
                pl: 1.5,
                pr: 0.5,
                py: 0.5,
                borderRadius: 2,
                border: '1px solid',
                borderColor: copied ? 'success.main' : 'divider',
                transition: 'border-color 0.2s',
                '&:focus-within': { borderColor: copied ? 'success.main' : 'primary.main' },
              }}
            >
              <Box
                component="input"
                id="share-link"
                ref={fieldRef}
                readOnly
                value={link}
                onClick={(e: React.MouseEvent<HTMLInputElement>) => e.currentTarget.select()}
                sx={{
                  flex: 1,
                  minWidth: 0,
                  border: 0,
                  outline: 0,
                  bgcolor: 'transparent',
                  color: 'text.primary',
                  font: 'inherit',
                  fontSize: 14,
                  textOverflow: 'ellipsis',
                }}
              />
              <Button
                onClick={copy}
                title={copied ? 'Copied' : 'Copy'}
                variant={copied ? 'text' : 'contained'}
                color={copied ? 'success' : 'primary'}
                size="small"
                startIcon={copied ? <IconCheck size={18} /> : <IconCopy size={18} />}
                sx={{ flexShrink: 0, minWidth: 96 }}
              />
            </Stack>
            <Typography
              role="status"
              aria-live="polite"
              variant="caption"
              color={copied ? 'success.main' : 'text.secondary'}
              sx={{ display: 'block', minHeight: 20, mt: 0.5 }}
            >
              {copied
                ? 'Link copied. Paste it anywhere.'
                : copyBlocked
                  ? 'Your browser blocked copying. The link is selected: press Ctrl+C (⌘C on Mac).'
                  : ''}
            </Typography>
          </Box>
        </Stack>
      </Dialog>
    </div>
  );
};

export default SocialShareModal;
