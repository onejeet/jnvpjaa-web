import imageCompression, { Options } from 'browser-image-compression';
import { isBrowser } from '@/utils/isBrowser';

export const optimiseImageSize = async (file: File, options?: Options) => {
  if (!file) return;

  try {
    const finalOptions = {
      maxSizeMB: 0.25,
      maxWidthOrHeight: 400,
      ...(options || {}),
    };

    const compressedFile = await imageCompression(file, finalOptions);
    console.log('Original size:', (file.size / 1024).toFixed(2), 'KB');
    console.log('Compressed size:', (compressedFile.size / 1024).toFixed(2), 'KB');

    return compressedFile;
  } catch (error) {
    console.error('Error compressing image:', error);
  }
};

export const downloadImage = (imageUrl: string) => {
  // Only run in browser environment
  if (!isBrowser()) return;
  const urlParts = imageUrl.split('/');
  const fileName = urlParts[urlParts.length - 1].split('?')[0]; // Handles URLs with query params

  fetch(imageUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.blob();
    })
    .then((blob) => {
      const blobUrl = URL.createObjectURL(blob);
      if (!isBrowser()) return;
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    })
    .catch((error) => {
      console.error('Image download failed:', error);
    });
};
