'use client';

import { useQuery } from '@apollo/client';
import { Alert, Box, Chip, Divider, Link, Paper, Skeleton, Stack, Tooltip, Typography } from '@mui/material';
import { IconExternalLink } from '@tabler/icons-react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import NextLink from 'next/link';
import { Fragment } from 'react';

import { CONTENT_PAGES_FOR_EDITOR, type ContentPage } from '@/apollo/contentPageOperations';
import Button from '@/components/core/Button';
import { CONTENT_PAGE_TYPE_LABELS, CONTENT_PAGES, type ContentPageSlug } from './contentPages.registry';

dayjs.extend(relativeTime);

const SLUGS = Object.keys(CONTENT_PAGES) as ContentPageSlug[];

/** Every editable page in registry order, with whether it is shown and who last changed it. */
const ContentPagesIndex = () => {
  const { data, loading, error } = useQuery<{ contentPagesForEditor: ContentPage[] }>(CONTENT_PAGES_FOR_EDITOR, {
    fetchPolicy: 'cache-and-network',
  });

  if (error) return <Alert severity="error">Could not load the pages. Please refresh and try again.</Alert>;
  if (loading && !data) return <Skeleton variant="rounded" height={420} />;

  const bySlug = new Map((data?.contentPagesForEditor || []).map((page) => [page.slug, page]));

  return (
    <Paper variant="outlined" sx={{ borderRadius: 2 }}>
      {SLUGS.map((slug, index) => {
        const { label, type, path } = CONTENT_PAGES[slug];
        const page = bySlug.get(slug);
        const shown = Boolean(page?.visible);
        const editor = page?.updatedBy ? `${page.updatedBy.firstName} ${page.updatedBy.lastName}`.trim() : null;
        return (
          <Fragment key={slug}>
            {index > 0 && <Divider />}
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              alignItems={{ xs: 'flex-start', sm: 'center' }}
              gap={{ xs: 1.5, sm: 2 }}
              px={{ xs: 2, md: 3 }}
              py={2}
            >
              <Box flex={1} minWidth={0}>
                <Stack direction="row" alignItems="center" gap={1} flexWrap="wrap">
                  <Link
                    component={NextLink}
                    href={`/admin/pages/${slug}`}
                    underline="hover"
                    color="text.primary"
                    fontWeight={600}
                  >
                    {label}
                  </Link>
                  <Chip
                    size="small"
                    label={page ? (shown ? 'Shown' : 'Hidden') : 'Not set up'}
                    color={shown ? 'success' : 'default'}
                    variant={shown ? 'filled' : 'outlined'}
                  />
                </Stack>
                <Typography variant="body2" color="text.secondary" mt={0.5}>
                  {CONTENT_PAGE_TYPE_LABELS[type]}
                  {page && ` · Edited ${dayjs(page.updatedAt).fromNow()}${editor ? ` by ${editor}` : ''}`}
                </Typography>
              </Box>
              <Stack direction="row" gap={1} flexShrink={0}>
                <Button
                  title="Edit"
                  size="small"
                  variant="outlined"
                  component={NextLink}
                  href={`/admin/pages/${slug}`}
                />
                <Tooltip title={shown ? '' : "Hidden pages can't be viewed"}>
                  <span>
                    <Button
                      title="View page"
                      size="small"
                      variant="text"
                      disabled={!shown}
                      startIcon={<IconExternalLink size={16} />}
                      onClick={() => window.open(`${path}/`, '_blank', 'noopener')}
                    />
                  </span>
                </Tooltip>
              </Stack>
            </Stack>
          </Fragment>
        );
      })}
    </Paper>
  );
};

export default ContentPagesIndex;
