import { Photo } from '@/apollo/hooks';
import { Box, Card, CardMedia } from '@mui/material';
import Masonry from 'react-masonry-css';

interface PhotoGridProps {
  photos: Photo[];
}

const breakpointColumnsObj = {
  default: 4,
  1200: 3,
  900: 2,
  600: 1,
};

export default function PhotoGrid({ photos }: PhotoGridProps) {
  return (
    <Masonry breakpointCols={breakpointColumnsObj} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
      {photos?.map((photo) => (
        <Card key={photo.id} sx={{ borderRadius: 2, mb: 2 }}>
          <CardMedia
            component="img"
            image={photo.url}
            alt="JNVPJAA Gallery Photo"
            loading="lazy"
            referrerPolicy="no-referrer"
            sx={{ width: '100%', objectFit: 'cover' }}
          />
        </Card>
      ))}
    </Masonry>
  );
}
