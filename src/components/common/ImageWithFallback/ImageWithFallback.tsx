'use client';

import React, { useState } from 'react';
import { CardMedia } from '@mui/material';
import { Photo } from '@/apollo/hooks';

interface ImageWithFallbackProps {
  photo: Photo;
  isSelected?: boolean;
  placeholder?: string; // Optional: allow custom placeholder
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ photo, isSelected, placeholder }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const placeholderImage = placeholder || `https://placehold.co/300x300?font=playfair-display&text=Loading...`;
  const imageToShow = !error && loaded ? photo.url : placeholderImage;

  React.useEffect(() => {
    const img = new Image();
    img.src = photo.url!;

    img.onload = () => setLoaded(true);
    img.onerror = () => {
      setError(true);
      setLoaded(true);
    };
  }, [photo.url]);

  return (
    <CardMedia
      component="img"
      image={imageToShow}
      loading="lazy"
      referrerPolicy="no-referrer"
      sx={{
        width: '100%',
        objectFit: 'cover',
        opacity: isSelected ? 0.5 : 1,
        transition: 'opacity 0.3s ease-in-out',
      }}
    />
  );
};

export default ImageWithFallback;
