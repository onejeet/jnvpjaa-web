import imageCompression, { Options } from 'browser-image-compression';

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

export const downloadImage = (imageUrl: string, fileName = 'downloaded-image') => {
  const link = document.createElement('a');
  link.href = imageUrl;
  link.download = fileName;

  // For cross-origin URLs, we fetch the image and convert to blob
  fetch(imageUrl)
    .then((response) => response.blob())
    .then((blob) => {
      const blobUrl = URL.createObjectURL(blob);
      link.href = blobUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    })
    .catch((error) => {
      console.error('Image download failed:', error);
    });
};
