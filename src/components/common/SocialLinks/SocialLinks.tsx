import { Box, Tooltip } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import {
  IconBrandFacebookFilled,
  IconBrandGithubFilled,
  IconBrandInstagramFilled,
  IconBrandLinkedinFilled,
  IconBrandXFilled,
  IconBrandYoutubeFilled,
} from '@tabler/icons-react';
import type { Icon } from '@tabler/icons-react';
import React from 'react';
import { getSocialLinks, type SocialKey } from '@/utils/socialMedia';

export const SOCIAL_BRANDS: Record<SocialKey, { Icon: Icon; color: string }> = {
  linkedin: { Icon: IconBrandLinkedinFilled, color: '#0A66C2' },
  x: { Icon: IconBrandXFilled, color: '#0F1419' },
  instagram: { Icon: IconBrandInstagramFilled, color: '#E1306C' },
  facebook: { Icon: IconBrandFacebookFilled, color: '#1877F2' },
  github: { Icon: IconBrandGithubFilled, color: '#24292F' },
  youtube: { Icon: IconBrandYoutubeFilled, color: '#FF0000' },
};

/** A member's social profiles as brand icons; renders nothing when there are none. */
const SocialLinks: React.FC<{ socialMedia: unknown; sx?: SxProps<Theme> }> = ({ socialMedia, sx }) => {
  const links = getSocialLinks(socialMedia);
  if (!links.length) return null;
  return (
    <Box
      component="ul"
      aria-label="Social profiles"
      sx={[{ display: 'flex', flexWrap: 'wrap', gap: 1, m: 0, p: 0 }, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      {links.map(({ key, label, handle, url }) => {
        const { Icon, color } = SOCIAL_BRANDS[key];
        return (
          <Box component="li" key={key} sx={{ listStyle: 'none' }}>
            <Tooltip arrow title={`${label} · @${handle}`}>
              <Box
                component="a"
                href={url}
                target="_blank"
                rel="me noopener noreferrer"
                aria-label={`${label}: @${handle} (opens in a new tab)`}
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  display: 'grid',
                  placeItems: 'center',
                  color,
                  bgcolor: `${color}14`,
                  transition: 'all 0.18s ease',
                  '&:hover, &:focus-visible': {
                    bgcolor: color,
                    color: '#fff',
                    transform: 'translateY(-2px)',
                    boxShadow: `0 6px 14px -6px ${color}`,
                  },
                  '&:focus-visible': { outline: '2px solid', outlineColor: color, outlineOffset: 2 },
                }}
              >
                <Icon size={21} />
              </Box>
            </Tooltip>
          </Box>
        );
      })}
    </Box>
  );
};

export default SocialLinks;
