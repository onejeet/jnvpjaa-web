'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Alert, Box, Button, Divider, Stack, Typography } from '@mui/material';
import { IconExternalLink } from '@tabler/icons-react';
import type { NewsPost } from '@/apollo/newsroomOperations';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import CopyContentButton from '@/components/common/CopyContentButton';
import { paths } from '@/config/paths';
import { canonicalUrl } from '@/config/seo.config';
import { PERMISSION_CODES } from '@/constants/access';
import { useAuth } from '@/context/AuthContext';
import LayoutModule from '@/layouts/Layout';
import NewsPostActions from '@/modules/NewsEditor/NewsPostActions';
import { NEWS_BYLINE, formatDateline, formatNewsDate } from '@/modules/Newsroom/newsroom.utils';
import { notoSerif } from '@/utils/theme/fonts';
import { Kicker } from './NewsCard';
import PressContact from './PressContact';

const NewsArticle: React.FC<{ post: NewsPost }> = ({ post }) => {
  const url = canonicalUrl(paths.newsroom.getPostUrl(post.slug));
  const router = useRouter();
  const { can } = useAuth();
  const canManage = can(PERMISSION_CODES.NEWSROOM_POST_MANAGE);
  return (
    <LayoutModule disableCover title={`${post.title} • JNVPJAA Newsroom`}>
      <Breadcrumbs items={[{ label: 'Newsroom', path: paths.newsroom.root }, { label: post.title }]} />
      {canManage && (
        <Stack direction="row" justifyContent="flex-end" sx={{ maxWidth: 760, mx: 'auto' }}>
          <NewsPostActions
            post={post}
            variant="buttons"
            afterDelete={() => {
              router.push(paths.newsroom.root);
              router.refresh();
            }}
          />
        </Stack>
      )}
      <Box component="article" sx={{ maxWidth: 760, mx: 'auto', pt: { xs: 1, md: 2 }, pb: { xs: 4, md: 6 } }}>
        <Stack spacing={1.5}>
          <Kicker category={post.category} />
          <Typography variant="h1" sx={{ fontSize: { xs: 28, md: 40 }, lineHeight: 1.2 }}>
            {post.title}
          </Typography>
          <Typography color="text.secondary" sx={{ fontSize: { xs: 18, md: 20 }, lineHeight: 1.5 }}>
            {post.summary}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {post.publishedAt && (
              <Box component="time" dateTime={post.publishedAt} sx={{ fontWeight: 700, color: 'text.primary' }}>
                {formatDateline(post.publishedAt)}
              </Box>
            )}
            {' — '}
            {NEWS_BYLINE}
          </Typography>
          {post.updateNote && (
            <Alert severity="info" variant="outlined" sx={{ borderRadius: 2 }}>
              Updated {formatNewsDate(post.updatedAt)}: {post.updateNote}
            </Alert>
          )}
        </Stack>

        {post.cover?.url && (
          <Box
            component="img"
            src={post.cover.url}
            alt={post.cover.alt || post.title}
            sx={{ width: '100%', aspectRatio: '16 / 9', objectFit: 'cover', borderRadius: 3, mt: 3, display: 'block' }}
          />
        )}

        <Typography
          component="div"
          className="rich_content"
          color="text.primary"
          sx={{ fontFamily: notoSerif.style.fontFamily, fontSize: { xs: 18, md: 20 }, lineHeight: 1.75, mt: 3 }}
          // Sanitised by the API with the newsroom allowlist before storage.
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {post.category === 'IN_THE_MEDIA' && post.sourceUrl && (
          <Button
            component="a"
            href={post.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
            endIcon={<IconExternalLink size={16} />}
            sx={{ mt: 3 }}
          >
            Read the original coverage
          </Button>
        )}

        <Divider sx={{ my: { xs: 3, md: 4 } }} />
        <Stack direction="row" alignItems="center" spacing={1.5} mb={{ xs: 3, md: 4 }}>
          <Typography variant="body2" color="text.secondary">
            Share this news
          </Typography>
          <CopyContentButton content={url} buttonType="button" />
        </Stack>
        <PressContact />
      </Box>
    </LayoutModule>
  );
};

export default NewsArticle;
