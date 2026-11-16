'use client';

import React from 'react';
import NextLink from 'next/link';
import { useMutation } from '@apollo/client';
import { IconButton, Stack, Tooltip } from '@mui/material';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { DELETE_NEWS_POST, type NewsPost } from '@/apollo/newsroomOperations';
import AlertDialog from '@/components/common/AlertDialog';
import Button from '@/components/core/Button';
import { paths } from '@/config/paths';
import { useAlert } from '@/context/AlertContext';

interface NewsPostActionsProps {
  post: Pick<NewsPost, 'id' | 'title'>;
  /** Buttons on the article page, icons in list rows. */
  variant?: 'buttons' | 'icons';
  afterDelete?: () => void;
}

/** Edit and delete for newsroom editors. Callers decide visibility; the API authorises each action. */
const NewsPostActions: React.FC<NewsPostActionsProps> = ({ post, variant = 'icons', afterDelete }) => {
  const { showAlert } = useAlert();
  const [confirming, setConfirming] = React.useState(false);
  const [deleteNews, { loading: deleting }] = useMutation(DELETE_NEWS_POST, { refetchQueries: ['ManagedNewsPosts'] });
  const editHref = paths.newsroom.getEditUrl(post.id);

  const confirmDelete = async () => {
    try {
      await deleteNews({ variables: { id: post.id } });
      showAlert({ visible: true, type: 'success', message: 'Article deleted.' });
      setConfirming(false);
      afterDelete?.();
    } catch (err: any) {
      showAlert({ visible: true, type: 'error', message: err?.message || 'Could not delete the article.' });
      setConfirming(false);
    }
  };

  return (
    <>
      {variant === 'buttons' ? (
        <Stack direction="row" gap={1}>
          <Button
            title="Edit"
            variant="outlined"
            size="small"
            startIcon={<IconPencil size={16} />}
            LinkComponent={NextLink}
            href={editHref}
          />
          <Button
            title="Delete"
            variant="outlined"
            color="error"
            size="small"
            startIcon={<IconTrash size={16} />}
            onClick={() => setConfirming(true)}
          />
        </Stack>
      ) : (
        <>
          <Tooltip title="Edit">
            <IconButton component={NextLink} href={editHref} aria-label={`Edit ${post.title}`}>
              <IconPencil size={18} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton color="error" onClick={() => setConfirming(true)} aria-label={`Delete ${post.title}`}>
              <IconTrash size={18} />
            </IconButton>
          </Tooltip>
        </>
      )}
      <AlertDialog
        open={confirming}
        action={deleting ? 'deleting' : 'delete'}
        title="Delete this article?"
        message={`“${post.title}” will be removed from the newsroom. This cannot be undone.`}
        onOkay={confirmDelete}
        onCancel={() => setConfirming(false)}
        onClose={() => setConfirming(false)}
        okayButtonProps={{ title: 'Delete', disabled: deleting }}
      />
    </>
  );
};

export default NewsPostActions;
