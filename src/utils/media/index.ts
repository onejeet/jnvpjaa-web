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
