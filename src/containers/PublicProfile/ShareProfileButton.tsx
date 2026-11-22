'use client';

import { Box, Drawer, IconButton, Skeleton, Stack, Tooltip, Typography } from '@mui/material';
import {
  IconBrandLinkedin,
  IconBrandWhatsapp,
  IconBrandX,
  IconCheck,
  IconCopy,
  IconDownload,
  IconShare3,
  IconX,
} from '@tabler/icons-react';
import React from 'react';
import Button from '@/components/core/Button';
import { brand } from '@/config/tenant';
import { useAlert } from '@/context/AlertContext';
import { publicProfilePath } from '@/utils/publicProfilePath';

type Props = {
  username: string;
  name: string;
  /** Part of the card URL, so a new photo gets a fresh card instead of the browser's cached one. */
  photo?: string | null;
  /** "Share profile" on someone's page; "Share my profile" on your own. */
  label?: string;
  variant?: 'contained' | 'outlined';
  size?: 'small' | 'medium';
};

const cardUrl = (username: string, name: string, photo?: string | null) => {
  let hash = 5381;
  for (const char of `${name}|${photo || ''}`) hash = ((hash * 33) ^ char.charCodeAt(0)) >>> 0;
  return `/og/profile/${encodeURIComponent(username)}.png?v=${hash.toString(36)}`;
};

/** Opens the system share sheet; where there is none, our sheet with the card, link and the usual places to post it. */
const ShareProfileButton: React.FC<Props> = ({
  username,
  name,
  photo,
  label = 'Share profile',
  variant = 'contained',
  size = 'medium',
}) => {
  const [open, setOpen] = React.useState(false);
  const image = cardUrl(username, name, photo);

  // Render the card while the page sits idle, so the sheet opens with it already in the browser cache.
  React.useEffect(() => {
    const warm = () => {
      const img = new Image();
      img.decoding = 'async';
      img.src = image;
    };
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(warm, { timeout: 4000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(warm, 1500);
    return () => clearTimeout(id);
  }, [image]);

  // Native share must run straight from the tap (Safari refuses it after an await), so no fetching first.
  // The link unfurls into the share card; the sheet is only for browsers without native share.
  const share = () => {
    if (typeof navigator.share !== 'function') return setOpen(true);
    const url = new URL(publicProfilePath(username), window.location.origin).toString();
    navigator.share({ title: `${name} on ${brand.shortName}`, url }).catch((error) => {
      if (error?.name !== 'AbortError') setOpen(true);
    });
  };

  return (
    <>
      <Button
        title={label}
        variant={variant}
        size={size}
        startIcon={<IconShare3 size={18} />}
        onClick={share}
        sx={{ whiteSpace: 'nowrap', flexShrink: 0 }}
      />
      {open && <ShareSheet username={username} name={name} image={image} onClose={() => setOpen(false)} />}
    </>
  );
};

const ShareSheet: React.FC<{ username: string; name: string; image: string; onClose: () => void }> = ({
  username,
  name,
  image,
  onClose,
}) => {
  const { showAlert } = useAlert();
  const [copied, setCopied] = React.useState(false);
  const [imageState, setImageState] = React.useState<'loading' | 'ready' | 'failed'>('loading');
  const [busy, setBusy] = React.useState(false);
  const path = publicProfilePath(username);
  const url = new URL(path, window.location.origin).toString();
  const display = `${brand.domains.site}/@${username}`;
  const shareText = `${name} on ${brand.shortName}`;

  React.useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2500);
    return () => clearTimeout(timer);
  }, [copied]);

  const fail = (message: string) => showAlert({ visible: true, type: 'error', message });

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      fail(`Couldn't copy automatically. The link is ${url}`);
    }
  };

  const cardFile = async () => {
    const response = await fetch(image);
    if (!response.ok) throw new Error('card');
    return new File([await response.blob()], `${username}-${brand.id}.png`, { type: 'image/png' });
  };

  const download = async () => {
    setBusy(true);
    try {
      const file = await cardFile();
      const href = URL.createObjectURL(file);
      const link = Object.assign(document.createElement('a'), { href, download: file.name });
      link.click();
      setTimeout(() => URL.revokeObjectURL(href), 1000);
    } catch {
      fail('Could not download the image. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  const encoded = encodeURIComponent(url);
  const targets = [
    {
      label: 'WhatsApp',
      icon: <IconBrandWhatsapp size={22} />,
      href: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${url}`)}`,
    },
    {
      label: 'LinkedIn',
      icon: <IconBrandLinkedin size={22} />,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`,
    },
    {
      label: 'X',
      icon: <IconBrandX size={20} />,
      href: `https://x.com/intent/post?url=${encoded}&text=${encodeURIComponent(shareText)}`,
    },
  ];

  return (
    <Drawer
      anchor="bottom"
      open
      onClose={onClose}
      aria-labelledby="share-profile-title"
      PaperProps={{
        sx: {
          maxWidth: 560,
          mx: 'auto',
          width: '100%',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          px: { xs: 2, sm: 3 },
          pt: 1.5,
          pb: 'calc(24px + env(safe-area-inset-bottom))',
        },
      }}
    >
      <Box mx="auto" mb={1.5} width={40} height={4} borderRadius={2} bgcolor="divider" aria-hidden />
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography id="share-profile-title" variant="h4" fontWeight={600}>
          Share profile
        </Typography>
        <IconButton aria-label="Close" onClick={onClose} edge="end">
          <IconX size={20} />
        </IconButton>
      </Stack>

      <Box
        position="relative"
        borderRadius={3}
        overflow="hidden"
        border="1px solid"
        borderColor="divider"
        sx={{ aspectRatio: '1200 / 630' }}
      >
        {imageState === 'loading' && (
          <Skeleton variant="rectangular" sx={{ position: 'absolute', inset: 0, height: '100%' }} />
        )}
        {imageState === 'failed' ? (
          <Stack height="100%" alignItems="center" justifyContent="center" bgcolor="grey.50" p={2}>
            <Typography variant="body2" color="text.secondary" textAlign="center">
              The preview image could not load. The link still works.
            </Typography>
          </Stack>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element -- generated card, already sized
          <img
            src={image}
            alt={`Share card for ${name}`}
            width={1200}
            height={630}
            onLoad={() => setImageState('ready')}
            onError={() => setImageState('failed')}
            style={{ display: 'block', width: '100%', height: 'auto' }}
          />
        )}
      </Box>

      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        mt={2}
        pl={2}
        pr={0.5}
        py={0.5}
        borderRadius={2}
        border="1px solid"
        borderColor="divider"
      >
        <Typography flex={1} minWidth={0} noWrap fontWeight={500} title={url}>
          {display}
        </Typography>
        <Button
          title={copied ? 'Copied' : 'Copy link'}
          size="small"
          color={copied ? 'success' : 'primary'}
          startIcon={copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
          onClick={copy}
          aria-live="polite"
        />
      </Stack>

      <Stack direction="row" spacing={1} mt={2} flexWrap="wrap" useFlexGap>
        <Button
          title="Download image"
          variant="outlined"
          startIcon={<IconDownload size={18} />}
          onClick={download}
          disabled={busy || imageState === 'failed'}
        />
        <Stack direction="row" spacing={0.5} ml={{ sm: 'auto' }}>
          {targets.map((target) => (
            <Tooltip key={target.label} title={`Share on ${target.label}`}>
              <IconButton
                component="a"
                href={target.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Share on ${target.label}`}
                sx={{ border: '1px solid', borderColor: 'divider' }}
              >
                {target.icon}
              </IconButton>
            </Tooltip>
          ))}
        </Stack>
      </Stack>
    </Drawer>
  );
};

export default ShareProfileButton;
