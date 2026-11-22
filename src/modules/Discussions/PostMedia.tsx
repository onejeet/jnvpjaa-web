'use client';

import React from 'react';
import { Box, ButtonBase, Dialog, IconButton } from '@mui/material';
import { IconChevronLeft, IconChevronRight, IconX } from '@tabler/icons-react';
import type { DiscussionPost, PostEmbed } from '@/apollo/discussionOperations';

type Img = DiscussionPost['images'][number];

// Grid areas per photo count: one fills, two split, three = tall left + two stacked, four = 2×2.
const AREAS: Record<number, { template: string; areas: string[] }> = {
  2: { template: '"a b"', areas: ['a', 'b'] },
  3: { template: '"a b" "a c"', areas: ['a', 'b', 'c'] },
  4: { template: '"a b" "c d"', areas: ['a', 'b', 'c', 'd'] },
};

export const PhotoGrid: React.FC<{ images: Img[] }> = ({ images }) => {
  const [open, setOpen] = React.useState<number | null>(null);
  if (!images.length) return null;
  const single = images.length === 1;
  const layout = AREAS[images.length];
  const first = images[0];

  return (
    <>
      <Box
        mt={1.5}
        borderRadius={4}
        overflow="hidden"
        border={1}
        borderColor="divider"
        sx={
          single
            ? { maxWidth: '100%', width: 'fit-content' }
            : {
                display: 'grid',
                gap: '2px',
                gridTemplateColumns: '1fr 1fr',
                gridTemplateAreas: layout.template,
                aspectRatio: '16 / 9',
              }
        }
      >
        {images.map((img, i) => (
          <ButtonBase
            key={img.url}
            aria-label={`Open photo ${i + 1} of ${images.length}`}
            onClick={() => setOpen(i)}
            sx={{
              display: 'block',
              gridArea: single ? undefined : layout.areas[i],
              minHeight: 0,
              bgcolor: 'action.hover',
              '&:hover img': { filter: 'brightness(0.94)' },
            }}
          >
            <Box
              component="img"
              src={img.url}
              alt=""
              loading="lazy"
              width={single ? first.width : undefined}
              height={single ? first.height : undefined}
              sx={{
                display: 'block',
                width: '100%',
                height: single ? 'auto' : '100%',
                maxHeight: single ? 510 : undefined,
                objectFit: 'cover',
                transition: 'filter .15s',
              }}
            />
          </ButtonBase>
        ))}
      </Box>
      {open !== null && <Lightbox images={images} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />}
    </>
  );
};

const Lightbox: React.FC<{ images: Img[]; index: number; onIndex: (i: number) => void; onClose: () => void }> = ({
  images,
  index,
  onIndex,
  onClose,
}) => {
  const many = images.length > 1;
  const go = (step: number) => onIndex((index + step + images.length) % images.length);
  const arrow = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#fff',
    bgcolor: 'rgba(0,0,0,.45)',
    '&:hover': { bgcolor: 'rgba(0,0,0,.65)' },
  } as const;

  return (
    <Dialog
      open
      fullScreen
      onClose={onClose}
      onKeyDown={(e) => {
        if (!many) return;
        if (e.key === 'ArrowRight') go(1);
        if (e.key === 'ArrowLeft') go(-1);
      }}
      PaperProps={{ sx: { bgcolor: 'rgba(0,0,0,.92)', display: 'grid', placeItems: 'center' } }}
      aria-label="Photo viewer"
    >
      <Box
        component="img"
        src={images[index].url}
        alt=""
        sx={{ maxWidth: '100vw', maxHeight: '100dvh', objectFit: 'contain' }}
      />
      <IconButton aria-label="Close" onClick={onClose} sx={{ ...arrow, top: 16, left: 16, transform: 'none' }}>
        <IconX size={20} />
      </IconButton>
      {many && (
        <>
          <IconButton aria-label="Previous photo" onClick={() => go(-1)} sx={{ ...arrow, left: 16 }}>
            <IconChevronLeft size={22} />
          </IconButton>
          <IconButton aria-label="Next photo" onClick={() => go(1)} sx={{ ...arrow, right: 16 }}>
            <IconChevronRight size={22} />
          </IconButton>
        </>
      )}
    </Dialog>
  );
};

/** Official player iframe. Tall formats (Reels, TikTok) stay phone-width instead of filling the column. */
export const EmbedFrame: React.FC<{ embed: PostEmbed }> = ({ embed }) => {
  const tall = embed.aspectRatio < 1;
  return (
    <Box
      mt={1.5}
      borderRadius={4}
      overflow="hidden"
      border={1}
      borderColor="divider"
      bgcolor="action.hover"
      sx={{ aspectRatio: String(embed.aspectRatio), width: '100%', maxWidth: tall ? 340 : '100%' }}
    >
      <Box
        component="iframe"
        src={embed.src}
        title={`${embed.provider} post`}
        loading="lazy"
        allow="encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
        sandbox="allow-scripts allow-same-origin allow-popups allow-presentation"
        referrerPolicy="strict-origin-when-cross-origin"
        sx={{ display: 'block', width: '100%', height: '100%', border: 0 }}
      />
    </Box>
  );
};
