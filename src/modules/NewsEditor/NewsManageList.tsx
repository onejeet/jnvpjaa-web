'use client';

import React from 'react';
import NextLink from 'next/link';
import { useMutation, useQuery } from '@apollo/client';
import { Box, Chip, CircularProgress, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { IconEdit, IconExternalLink, IconPinFilled, IconPlus, IconTrash } from '@tabler/icons-react';
import { DELETE_NEWS_POST, MANAGED_NEWS_POSTS, type NewsPost } from '@/apollo/newsroomOperations';
import AlertDialog from '@/components/common/AlertDialog';
import Button from '@/components/core/Button';
import { paths } from '@/config/paths';
import { useAlert } from '@/context/AlertContext';
import { NEWS_CATEGORY_LABELS, formatNewsDate, newsStatusLabel } from '@/modules/Newsroom/newsroom.utils';

type ManagedPost = Pick<
  NewsPost,
  'id' | 'title' | 'slug' | 'category' | 'status' | 'publishedAt' | 'isPinned' | 'updatedAt'
>;

const STATUS_COLOR = { Draft: 'default', Scheduled: 'warning', Published: 'success' } as const;

const NewsManageList = () => {
  const { showAlert } = useAlert();
  const [toDelete, setToDelete] = React.useState<ManagedPost | null>(null);
  const { data, loading } = useQuery<{ managedNewsPosts: ManagedPost[] }>(MANAGED_NEWS_POSTS, {
    fetchPolicy: 'cache-and-network',
  });
  const [deleteNews, { loading: deleting }] = useMutation(DELETE_NEWS_POST, { refetchQueries: ['ManagedNewsPosts'] });
  const posts = data?.managedNewsPosts ?? [];

  const confirmDelete = async () => {
    if (!toDelete) return;
    try {
      await deleteNews({ variables: { id: toDelete.id } });
      showAlert({ visible: true, type: 'success', message: 'Story deleted.' });
    } catch (err: any) {
      showAlert({ visible: true, type: 'error', message: err?.message || 'Could not delete the story.' });
    }
    setToDelete(null);
  };

  return (
    <Box sx={{ width: '100%', p: { xs: 2, sm: 3, md: 4 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 2, mb: 3 }}>
        <Box>
          <Typography variant="overline" sx={{ color: 'text.secondary', letterSpacing: '0.1em' }}>
            Newsroom
          </Typography>
          <Typography component="h1" variant="h2">
            Manage stories
          </Typography>
        </Box>
        <Button
          title="New story"
          startIcon={<IconPlus size={18} />}
          LinkComponent={NextLink}
          href={paths.newsroom.getEditUrl('new')}
        />
      </Box>

      {loading && !posts.length ? (
        <Box display="flex" justifyContent="center" my={6}>
          <CircularProgress />
        </Box>
      ) : !posts.length ? (
        <Typography color="text.secondary" sx={{ my: 6, textAlign: 'center' }}>
          No stories yet. Start with “New story”.
        </Typography>
      ) : (
        <Stack sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, bgcolor: 'background.paper' }}>
          {posts.map((post, index) => {
            const status = newsStatusLabel(post.status, post.publishedAt);
            return (
              <Box
                key={post.id}
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  alignItems: { xs: 'flex-start', md: 'center' },
                  gap: { xs: 1, md: 2 },
                  px: 2,
                  py: 1.75,
                  borderTop: index ? '1px solid' : 'none',
                  borderColor: 'divider',
                }}
              >
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Stack direction="row" alignItems="center" gap={0.75} sx={{ minWidth: 0 }}>
                    {post.isPinned && <IconPinFilled size={14} aria-label="Pinned" style={{ flexShrink: 0 }} />}
                    <Typography
                      sx={{
                        fontWeight: 600,
                        minWidth: 0,
                        // Wrap on phones; one ellipsised line in the wider desktop row.
                        whiteSpace: { md: 'nowrap' },
                        overflow: { md: 'hidden' },
                        textOverflow: { md: 'ellipsis' },
                      }}
                    >
                      {post.title}
                    </Typography>
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    {NEWS_CATEGORY_LABELS[post.category]}
                    {post.publishedAt ? ` · ${formatNewsDate(post.publishedAt)}` : ''}
                  </Typography>
                </Box>
                <Stack direction="row" alignItems="center" gap={0.5}>
                  <Chip size="small" label={status} color={STATUS_COLOR[status]} sx={{ mr: 1 }} />
                  <Tooltip title="Edit">
                    <IconButton
                      component={NextLink}
                      href={paths.newsroom.getEditUrl(post.id)}
                      aria-label={`Edit ${post.title}`}
                    >
                      <IconEdit size={18} />
                    </IconButton>
                  </Tooltip>
                  {status === 'Published' && (
                    <Tooltip title="View">
                      <IconButton
                        component="a"
                        href={paths.newsroom.getPostUrl(post.slug)}
                        target="_blank"
                        aria-label={`View ${post.title}`}
                      >
                        <IconExternalLink size={18} />
                      </IconButton>
                    </Tooltip>
                  )}
                  <Tooltip title="Delete">
                    <IconButton color="error" onClick={() => setToDelete(post)} aria-label={`Delete ${post.title}`}>
                      <IconTrash size={18} />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Box>
            );
          })}
        </Stack>
      )}

      <AlertDialog
        open={Boolean(toDelete)}
        action={deleting ? 'deleting' : 'delete'}
        title="Delete this story?"
        message={`“${toDelete?.title}” will be removed from the newsroom. This cannot be undone.`}
        onOkay={confirmDelete}
        onCancel={() => setToDelete(null)}
        onClose={() => setToDelete(null)}
        okayButtonProps={{ title: 'Delete', disabled: deleting }}
      />
    </Box>
  );
};

export default NewsManageList;
