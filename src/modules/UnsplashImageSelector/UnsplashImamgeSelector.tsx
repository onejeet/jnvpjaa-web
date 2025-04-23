import React from 'react';
import { CircularProgress, Typography, Box } from '@mui/material';
import { useUnsplashSearch } from '@/hooks/useUnsplashSearch';
import Dialog from '@/components/core/Dialog';
import TextField from '@/components/core/TextField';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { debounce } from '@/utils/helpers';
import PhotoGrid from '@/components/common/PhotoGrid';
import { Photo } from '@/apollo/hooks';
import EmptyView from '@/components/common/EmptyView';
import { useAlert } from '@/context/AlertContext';

interface Props {
  open: boolean;
  onClose: () => void;
  onSelect?: (photo: Photo) => void;
  defaultKeyword?: string;
}

export const UnsplashImageSelector: React.FC<Props> = ({ open, onClose, onSelect, defaultKeyword = '' }) => {
  const [selected, setSelected] = React.useState<Photo | null>(null);
  const { images, loading, error, search, trackDownload } = useUnsplashSearch(defaultKeyword);

  const { showAlert } = useAlert();
  const onSearch = debounce((value: string) => {
    search(value || '');
  }, 1000);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      title="Select a Cover Image"
      footerProps={{
        onCancel: onClose,
        onOkay: () => {
          if (selected?.id) {
            onSelect?.(selected);
            onClose?.();
            trackDownload?.(selected.id);
          } else {
            showAlert({
              visible: true,
              type: 'error',
              message: 'No Images selected. ',
            });
          }
        },
        okayButtonProps: { title: 'Add Cover' },
      }}
    >
      <Box p={2} minHeight={{ xs: 200, md: 500 }}>
        <TextField
          placeholder="Search Images..."
          size="small"
          fullWidth
          // value={searchInput}
          onChange={(e) => onSearch(e.target.value)}
          variant="outlined"
          startAdornment={<MagnifyingGlass size={24} style={{ marginRight: '8px' }} />}
          endAdornment={loading ? <CircularProgress size={20} /> : null}
          helperText="Start searching with generic keywords like school, alumni, friends, india etc."
        />

        {error && <Typography color="error">{error}</Typography>}

        <Box py={3} width="100%">
          {images?.length === 0 ? (
            <EmptyView
              message={
                <Typography color="grey.500" textAlign="center" mb={{ xs: 3, md: 4 }}>
                  No Images found. <br />
                  Start searching with generic keywords like school, alumni, friends, india etc.
                </Typography>
              }
            />
          ) : (
            <PhotoGrid loading={loading} photos={images} authView onSelect={(image: any) => setSelected(image)} />
          )}
        </Box>
      </Box>
    </Dialog>
  );
};
