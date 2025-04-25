import React from 'react';
import { Photo } from '@/apollo/hooks';
import { downloadImage } from '@/utils/media';
import { Box, Card, CardMedia, Skeleton, IconButton } from '@mui/material';
import {
  IconCheckCircle as CheckCircle,
  IconDownload as Download,
  IconDownload as DownloadSimple,
} from '@tabler/icons-react';
import Masonry from 'react-masonry-css';

interface PhotoGridProps {
  photos: Photo[];
  loading?: boolean;
  authView?: boolean;
  onSelect?: (image: Photo) => void;
}

const breakpointColumnsObj = {
  default: 4,
  1200: 3,
  900: 2,
  600: 1,
};

const getRandomHeight = () => {
  return Math.floor(Math.random() * (300 - 180 + 1)) + 180; // height between 180px and 300px
};

export default function PhotoGrid({ photos, loading, authView, onSelect }: PhotoGridProps) {
  const [selected, setSelected] = React.useState<Photo | null>(null);
  return (
    <Masonry breakpointCols={breakpointColumnsObj} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
      {photos?.map((photo, idx) => (
        <Card
          key={`${photo.id}-${idx}`}
          sx={{
            position: 'relative',
            borderRadius: 2,
            mb: 2,
            cursor: onSelect ? 'pointer' : 'default',
            height: loading ? getRandomHeight() : 'auto',
            '&:hover .download-btn': {
              opacity: 1,
            },
          }}
          onClick={
            onSelect
              ? () => {
                  setSelected(photo);
                  onSelect?.(photo);
                }
              : undefined
          }
        >
          {selected?.id === photo?.id && (
            <Box sx={{ position: 'absolute', right: '10px', top: '10px', zIndex: 1, svg: { color: 'success.main' } }}>
              <CheckCircle size={32} />
            </Box>
          )}
          {loading ? (
            <Skeleton variant="rectangular" width="100%" height="100%" />
          ) : (
            <>
              {' '}
              <CardMedia
                component="img"
                image={photo.url}
                alt="JNVPJAA Gallery Photo"
                loading="lazy"
                referrerPolicy="no-referrer"
                sx={{ width: '100%', objectFit: 'cover', opacity: selected?.id === photo?.id ? 0.5 : 1 }}
              />
              {authView ? null : (
                // TODO: download Photo
                // <Box
                //   className="download-btn"
                //   sx={{
                //     position: 'absolute',
                //     top: 8,
                //     right: 8,
                //     opacity: 0,
                //     transition: 'opacity 0.3s ease',
                //     backgroundColor: 'rgba(0,0,0,0.6)',
                //     borderRadius: '50%',
                //   }}
                // >
                //   <IconButton sx={{ color: '#fff' }} onClick={() => downloadImage(photo.url)}>
                //     <DownloadSimple size={20} />
                //   </IconButton>
                // </Box>
                <Box
                  sx={{
                    position: 'absolute',
                    top: '5%',
                    left: '8%',
                    transform: 'translate(-50%, -50%)',
                    color: 'white',
                    fontSize: '0.5rem',
                    pointerEvents: 'none',
                    zIndex: 10,
                  }}
                >
                  JNVPJAA
                </Box>
              )}
            </>
          )}
        </Card>
      ))}
    </Masonry>
  );
}
