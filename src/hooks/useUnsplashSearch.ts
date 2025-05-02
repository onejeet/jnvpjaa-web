import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Photo } from '@/apollo/hooks';

export interface UnsplashImage extends Photo {
  id: string;
  urls?: { small: string; regular: string; thumb: string };
  alt_description: string;
  user: Record<string, any>;
  links: Record<string, any>;
}

interface UseUnsplashSearch {
  images: UnsplashImage[];
  loading: boolean;
  error: string | null;
  search: (query: string) => void;
  trackDownload: (id: string) => void;
}

const ACCESS_KEY = 'SQV5Wt1cMwCf1yo-7paZl9x281eLekHTpLUwhMIyKS0';

export const useUnsplashSearch = (defaultKeyword?: string): UseUnsplashSearch => {
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState(defaultKeyword || '');

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('https://api.unsplash.com/search/photos', {
          params: {
            query,
            per_page: 40,
            orientation: 'landscape',
          },
          headers: {
            Authorization: `Client-ID ${ACCESS_KEY}`,
          },
        });

        setImages(response.data.results);
      } catch (err) {
        setError('Failed to fetch images.');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [query]);

  const search = (newQuery: string) => {
    setQuery(newQuery);
  };

  const trackDownload = async (id: string) => {
    if (!id) return;
    try {
      const image: any = images?.find((image) => image?.id === id);
      await axios.get(`${image.links.download_location}?client_id=${ACCESS_KEY}`);
    } catch (err) {
      console.warn('Failed to track Unsplash download', err);
    }
  };

  const formattedImageList = React.useMemo(() => {
    if (loading) {
      return new Array(10).fill({ id: '', title: '', url: '' });
    }
    return (
      images?.map((i) => ({
        id: i.id,
        thumbUrl: i?.urls?.thumb,
        url: i?.urls?.regular,
        altDescription: i?.alt_description,
        urls: i?.urls,
        credits: {
          name: i?.user?.name,
          url: i?.links?.html,
          source: 'Unsplash',
        },
      })) || []
    );
  }, [images, loading]);

  return { images: formattedImageList, loading, error, search, trackDownload };
};
