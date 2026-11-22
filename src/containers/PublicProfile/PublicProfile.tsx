'use client';

import { Avatar, Box, Chip, Divider, Link as MuiLink, Paper, Stack, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { IconExternalLink, IconPencil, IconRosetteDiscountCheckFilled, IconUsersGroup } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react';
import { type PublicProfile } from '@/apollo/publicProfileOperations';
import SocialLinks from '@/components/common/SocialLinks/SocialLinks';
import Button from '@/components/core/Button';
import { paths } from '@/config/paths';
import { brand } from '@/config/tenant';
import { useAuth } from '@/context/AuthContext';
import ShareProfileButton from './ShareProfileButton';
import VerifiedSeal from './VerifiedSeal';
import AlumniMilestoneBadge from '@/components/common/AlumniMilestoneBadge';

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');

const Stat: React.FC<{ value: number; label: string }> = ({ value, label }) => (
  <Box>
    <Typography component="p" variant="h3" fontWeight={700} lineHeight={1.1}>
      {value}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {label}
    </Typography>
  </Box>
);

const SECTION_TITLE = { component: 'h2', variant: 'h5', fontWeight: 600, mb: 1.5 } as const;
const clamp = (lines: number) => ({
  display: '-webkit-box',
  WebkitLineClamp: lines,
  WebkitBoxOrient: 'vertical' as const,
  overflow: 'hidden',
  overflowWrap: 'anywhere' as const,
});
const monthYear = (value: string) =>
  new Date(value).toLocaleDateString('en-IN', { month: 'short', year: 'numeric', timeZone: 'UTC' });

const Stories: React.FC<{ stories: PublicProfile['stories'] }> = ({ stories }) => (
  <Box component="section" aria-labelledby="public-stories" mt={4}>
    <Typography id="public-stories" {...SECTION_TITLE}>
      Stories
    </Typography>
    <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }} gap={1.5}>
      {stories.map((story) => (
        <Paper
          key={story.slug}
          component={Link}
          href={`/blog/${encodeURIComponent(story.slug)}/`}
          variant="outlined"
          sx={{
            p: 1.5,
            borderRadius: 3,
            display: 'flex',
            gap: 1.5,
            textDecoration: 'none',
            color: 'inherit',
            minWidth: 0,
            transition: 'border-color .15s',
            '&:hover': { borderColor: 'primary.main' },
          }}
        >
          {story.coverUrl && (
            <Box
              component="img"
              src={story.coverUrl}
              alt=""
              loading="lazy"
              sx={{ width: 72, height: 72, borderRadius: 2, objectFit: 'cover', flexShrink: 0 }}
            />
          )}
          <Box minWidth={0}>
            <Typography fontWeight={600} sx={clamp(2)}>
              {story.title}
            </Typography>
            {story.summary && (
              <Typography variant="body2" color="text.secondary" mt={0.25} sx={clamp(2)}>
                {story.summary}
              </Typography>
            )}
            <Typography variant="caption" color="text.secondary" display="block" mt={0.5}>
              {monthYear(story.publishedAt)}
            </Typography>
          </Box>
        </Paper>
      ))}
    </Box>
  </Box>
);

const Businesses: React.FC<{ businesses: PublicProfile['businesses'] }> = ({ businesses }) => (
  <Box component="section" aria-labelledby="public-businesses" mt={4}>
    <Typography id="public-businesses" {...SECTION_TITLE}>
      {businesses.length === 1 ? 'Business' : 'Businesses'}
    </Typography>
    <Stack spacing={1.5}>
      {businesses.map((business) => (
        <Paper
          key={`${business.name}-${business.location}`}
          variant="outlined"
          sx={{ p: { xs: 1.5, sm: 2 }, borderRadius: 3, display: 'flex', gap: 1.5, minWidth: 0 }}
        >
          <Avatar
            src={business.logoUrl || undefined}
            alt=""
            variant="rounded"
            sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: 'primary.light', fontWeight: 700 }}
          >
            {business.name[0]?.toUpperCase()}
          </Avatar>
          <Box minWidth={0} flex={1}>
            <Typography fontWeight={600} sx={{ overflowWrap: 'anywhere' }}>
              {business.name}
            </Typography>
            {(business.category || business.location) && (
              <Typography variant="body2" color="text.secondary">
                {[business.category, business.location].filter(Boolean).join(' · ')}
              </Typography>
            )}
            {business.description && (
              <Typography variant="body2" mt={0.75} sx={clamp(3)}>
                {business.description}
              </Typography>
            )}
            {business.website && (
              <MuiLink
                href={business.website}
                target="_blank"
                rel="noopener noreferrer nofollow ugc"
                variant="body2"
                fontWeight={500}
                sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, mt: 0.75, maxWidth: '100%' }}
              >
                <Box component="span" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {business.website.replace(/^https:\/\/(www\.)?/, '').replace(/\/$/, '')}
                </Box>
                <IconExternalLink size={14} style={{ flexShrink: 0 }} />
              </MuiLink>
            )}
          </Box>
        </Paper>
      ))}
    </Stack>
  </Box>
);

const PublicProfileView: React.FC<{ profile: PublicProfile }> = ({ profile }) => {
  const theme = useTheme();
  const { user } = useAuth();
  // Your own page: offer the same Edit as your full profile.
  const isOwnProfile = Boolean(user?.id) && user?.publicUsername === profile.username;
  const actions = (
    <Stack direction="row" spacing={1}>
      {isOwnProfile && (
        <Button
          title="Edit"
          variant="outlined"
          component={Link}
          href={paths.profile.setup}
          startIcon={<IconPencil size={18} />}
          sx={{ whiteSpace: 'nowrap', flexShrink: 0 }}
        />
      )}
      <ShareProfileButton username={profile.username} name={profile.name} photo={profile.profileImage} />
    </Stack>
  );
  const primary = theme.palette.primary;
  const firstName = profile.name.split(/\s+/)[0] || profile.name;
  const socialMedia = Object.fromEntries(profile.socialLinks.map((link) => [link.platform, link.handle]));
  const stats = [
    { value: profile.eventsAttended || 0, label: profile.eventsAttended === 1 ? 'Event attended' : 'Events attended' },
    {
      value: profile.storiesPublished || 0,
      label: profile.storiesPublished === 1 ? 'Story published' : 'Stories published',
    },
  ].filter((stat) => stat.value > 0);

  return (
    <Box component="article" aria-label={`${profile.name}'s public profile`} maxWidth={880} mx="auto" width="100%">
      <Paper variant="outlined" sx={{ borderRadius: 4, overflow: 'hidden' }}>
        <Box
          sx={{
            position: 'relative',
            height: { xs: 128, md: 188 },
            background: `linear-gradient(135deg, ${primary.dark} 0%, ${primary.main} 100%)`,
            '&::after': profile.cover
              ? undefined
              : {
                  content: '""',
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `radial-gradient(${alpha('#fff', 0.14)} 1px, transparent 1px)`,
                  backgroundSize: '18px 18px',
                },
          }}
        >
          {profile.cover && (
            <>
              <Box
                component="img"
                src={profile.cover.url}
                alt={profile.cover.alt || ''}
                sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              {profile.cover.photographerName && profile.cover.photographerUrl && (
                <MuiLink
                  href={`${profile.cover.photographerUrl}?utm_source=${brand.id}&utm_medium=referral`}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="caption"
                  sx={{
                    position: 'absolute',
                    right: 8,
                    bottom: 6,
                    color: '#fff',
                    textShadow: '0 1px 2px rgba(0,0,0,.6)',
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  Photo: {profile.cover.photographerName} / Unsplash
                </MuiLink>
              )}
            </>
          )}
        </Box>

        <Box px={{ xs: 2.5, md: 5 }} pb={{ xs: 3, md: 4 }} position="relative">
          <Stack direction="row" justifyContent="space-between" alignItems="flex-end" mt={{ xs: -6, md: -8 }}>
            <Avatar
              src={profile.profileImage || undefined}
              alt={profile.name}
              sx={{
                width: { xs: 104, md: 136 },
                height: { xs: 104, md: 136 },
                fontSize: { xs: 36, md: 44 },
                fontWeight: 700,
                border: '4px solid',
                borderColor: 'background.paper',
                bgcolor: primary.light,
                boxShadow: `0 8px 24px -12px ${alpha(theme.palette.common.black, 0.5)}`,
              }}
            >
              {initials(profile.name)}
            </Avatar>
            <Box display={{ xs: 'none', sm: 'block' }} pb={0.5}>
              {actions}
            </Box>
          </Stack>

          <Stack direction="row" spacing={2} alignItems="flex-start" justifyContent="space-between" mt={2}>
            <Box minWidth={0}>
              <Stack direction="row" alignItems="center" spacing={0.75}>
                <Typography component="h1" variant="h2" fontWeight={700} sx={{ overflowWrap: 'anywhere' }}>
                  {profile.name}
                </Typography>
                <IconRosetteDiscountCheckFilled
                  size={24}
                  color={primary.main}
                  aria-label="Verified"
                  role="img"
                  style={{ flexShrink: 0 }}
                />
              </Stack>
              <Typography color="text.secondary" mt={0.25}>
                @{profile.username}
              </Typography>
              {profile.headline && (
                <Typography mt={1} fontWeight={500}>
                  {profile.headline}
                </Typography>
              )}
              <Stack direction="row" flexWrap="wrap" useFlexGap spacing={1} mt={2}>
                <Chip
                  size="small"
                  color="primary"
                  label={profile.isFaculty ? 'Faculty' : profile.batch ? `Batch ${profile.batch}` : 'Alumni'}
                />
                {!profile.isFaculty && <AlumniMilestoneBadge batch={profile.batch} />}
                <Chip size="small" variant="outlined" label={brand.institution.shortName} />
                {profile.positions.map((position) => (
                  <Chip
                    key={`${position.title}-${position.term}`}
                    size="small"
                    variant="outlined"
                    color="primary"
                    label={position.term ? `${position.title} · ${position.term}` : position.title}
                  />
                ))}
              </Stack>
              {profile.socialLinks.length > 0 && (
                <Box mt={2}>
                  <SocialLinks socialMedia={socialMedia} />
                </Box>
              )}
            </Box>
            <Box mt={-1} flexShrink={0} width={{ xs: 72, sm: 96 }}>
              <VerifiedSeal faculty={profile.isFaculty} />
            </Box>
          </Stack>

          {profile.about && (
            <Box mt={4}>
              <Typography component="h2" variant="h5" fontWeight={600} mb={1}>
                About
              </Typography>
              <Typography color="text.secondary" sx={{ whiteSpace: 'pre-line', overflowWrap: 'anywhere' }}>
                {profile.about}
              </Typography>
            </Box>
          )}

          {profile.businesses.length > 0 && <Businesses businesses={profile.businesses} />}
          {profile.stories.length > 0 && <Stories stories={profile.stories} />}

          {stats.length > 0 && (
            <>
              <Divider sx={{ my: 3 }} />
              <Stack direction="row" spacing={5}>
                {stats.map((stat) => (
                  <Stat key={stat.label} {...stat} />
                ))}
              </Stack>
            </>
          )}

          <Box display={{ xs: 'block', sm: 'none' }} mt={3}>
            {actions}
          </Box>
        </Box>
      </Paper>

      <Typography variant="caption" color="text.secondary" display="block" textAlign="center" mt={2} px={2}>
        This page shows only what {firstName} chose to share. Contact details and birthdays are never public.
      </Typography>

      {!user?.id && (
        <Paper
          variant="outlined"
          sx={{
            mt: 4,
            p: { xs: 2.5, md: 3 },
            borderRadius: 4,
            display: 'flex',
            gap: 2,
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Box sx={{ color: 'primary.main', display: 'grid' }}>
            <IconUsersGroup size={32} stroke={1.5} />
          </Box>
          <Box flex={1} minWidth={220}>
            <Typography fontWeight={600}>Studied at {brand.institution.shortName}?</Typography>
            <Typography variant="body2" color="text.secondary">
              Join {brand.shortName} to reconnect with your batch and get your own verified profile.
            </Typography>
          </Box>
          <Button title="Join the network" variant="outlined" component={Link} href="/signup" />
        </Paper>
      )}
    </Box>
  );
};

export default PublicProfileView;
