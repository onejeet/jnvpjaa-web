import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';
import type { SvgIconComponent } from '@mui/icons-material';
import { Box, Tooltip } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import React from 'react';
import { getSocialLinks, type SocialKey } from '@/utils/socialMedia';

export const SOCIAL_BRANDS: Record<SocialKey, { Icon: SvgIconComponent; color: string }> = {
  linkedin: { Icon: LinkedInIcon, color: '#0A66C2' },
  x: { Icon: XIcon, color: '#0F1419' },
  instagram: { Icon: InstagramIcon, color: '#E1306C' },
  facebook: { Icon: FacebookIcon, color: '#1877F2' },
  github: { Icon: GitHubIcon, color: '#24292F' },
  youtube: { Icon: YouTubeIcon, color: '#FF0000' },
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
                <Icon sx={{ fontSize: 21 }} />
              </Box>
            </Tooltip>
          </Box>
        );
      })}
    </Box>
  );
};

export default SocialLinks;
