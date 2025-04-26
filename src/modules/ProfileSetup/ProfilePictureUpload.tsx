'use client';

import React, { useState } from 'react';
import { Avatar, Box, Typography, IconButton, Slider, CircularProgress } from '@mui/material';
import Cropper from 'react-easy-crop';
import {
  IconChevronLeft,
  IconCircleCheck,
  IconUpload,
  IconX,
  IconXboxXFilled,
  IconArrowBackUp,
} from '@tabler/icons-react';
import Button from '@/components/core/Button';
import { useAlert } from '@/context/AlertContext';
import Dialog from '@/components/core/Dialog';
import { useGetPresignedUrlMutation, User, useUpdateUserMutation } from '@/apollo/hooks';
import { org_info, R2_BUCKET_NAME, R2_ENDPOINT } from '@/config/index';
import { useApolloClient } from '@apollo/client';
import { optimiseImageSize } from '@/utils/media';
import isBrowser from '@/utils/isBrowser';

interface ProfilePictureUploadProps {
  onBack?: () => void;
  onNext?: () => void;
  onSuccess?: () => void;
  onCancel?: () => void;
  user?: User;
}

export async function getCroppedImg(imageSrc: string, croppedAreaPixels: Record<string, any>) {
  const image = new Image();
  image.crossOrigin = 'anonymous'; // Allow CORS images
  image.src = imageSrc;
  await new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = () => reject(new Error('Failed to load image'));
  });

  if (!isBrowser()) return;

  const canvas = isBrowser() ? document.createElement('canvas') : null;
  if (!canvas) return null;
  const ctx = canvas.getContext('2d');
  if (!ctx || !croppedAreaPixels?.width) return null;

  canvas.width = croppedAreaPixels.width;
  canvas.height = croppedAreaPixels.height;

  ctx.drawImage(
    image,
    croppedAreaPixels.x,
    croppedAreaPixels.y,
    croppedAreaPixels.width,
    croppedAreaPixels.height,
    0,
    0,
    croppedAreaPixels.width,
    croppedAreaPixels.height
  );

  return new Promise<string>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        resolve(url);
      } else {
        reject(new Error('Failed to generate blob from canvas'));
      }
    }, 'image/jpeg');
  });
}

const blobToFile = async (blobUrl: string) => {
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  return new File([blob], 'my_profile_image.jpg', { type: 'image/jpeg' });
};

export default function ProfilePictureUpload({ user, onNext, onBack, onSuccess, onCancel }: ProfilePictureUploadProps) {
  const [image, setImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [crop, setCrop] = useState<Record<string, any>>({ x: 0, y: 0 });
  const [cropArea, setCropArea] = useState<Record<string, any>>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [openCropper, setOpenCropper] = useState(false);

  const client = useApolloClient();

  const [getPresignedUrl] = useGetPresignedUrlMutation();
  const [updateUser] = useUpdateUserMutation();

  const { showAlert } = useAlert();

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    if (user?.profileImage) {
      setCroppedImage(user?.profileImage);
    }
  }, [user]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size <= 2 * 1024 * 1024 && ['image/jpeg', 'image/png'].includes(file.type)) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImage(reader.result as string);
          setOpenCropper(true);
        };
        reader.readAsDataURL(file);
      } else {
        showAlert({
          visible: true,
          type: 'error',
          message: 'Invalid file. Try again with different image.',
        });
      }
    }
  };

  const handleCropComplete = async () => {
    if (!image) return;

    try {
      const croppedImageUrl = await getCroppedImg(image, cropArea);
      setCroppedImage(croppedImageUrl as string);
      setOpenCropper(false);
    } catch (error) {
      showAlert({
        visible: true,
        type: 'error',
        message: 'Error cropping image',
      });
      console.error('Error cropping image:', error);
    }
  };

  const handleUpload = async () => {
    if (!croppedImage) {
      if (user?.profileImage) {
        await updateUser({
          variables: {
            id: user?.id,
            profileImage: '',
          },
          onCompleted: () => {
            client.refetchQueries({
              include: ['getUserDetails', 'getUserList'],
            });
            onNext?.();
            onSuccess?.();
          },
          onError: (err) => {
            showAlert({
              visible: true,
              type: 'error',
              message: err?.message || 'Image upload failed. Please try again.',
            });
          },
        });
      }
      // showAlert({
      //   visible: true,
      //   type: 'error',
      //   message: 'Please select profiile image.',
      // });

      return;
    }
    if (croppedImage === user?.profileImage) {
      onNext?.();
      onSuccess?.();
      return;
    }
    setLoading(true);

    const profileImage = await blobToFile(croppedImage);

    const fileName = `${user?.firstName?.replace(/ +/g, '')?.toLowerCase()}-${user?.lastName?.replace(/ +/g, '')?.toLowerCase() || 'jnv'}-${user?.batch !== null ? user?.batch : 'batch'}.jpeg`;
    const response = await getPresignedUrl({
      variables: {
        fileName,
        contentType: profileImage.type,
      },
    });
    if (response?.data?.getPresignedUrl) {
      const compressedIImage = await optimiseImageSize(profileImage);
      await fetch(response?.data?.getPresignedUrl, {
        method: 'PUT',
        body: compressedIImage,
        headers: {
          'Content-Type': profileImage.type,
          'Access-Control-Allow-Origin': '*',
        },
      });
      const uploadedFileUrl = `${org_info.content_domain}/${R2_BUCKET_NAME}/profile/${fileName}`;

      await updateUser({
        variables: {
          id: user?.id,
          profileImage: uploadedFileUrl,
        },
        onCompleted: () => {
          client.refetchQueries({
            include: ['getUserDetails', 'getUserList'],
          });
          setCroppedImage(uploadedFileUrl);
          onNext?.();
          onSuccess?.();
        },
        onError: (err) => {
          showAlert({
            visible: true,
            type: 'error',
            message: err?.message || 'Image upload failed. Please try again.',
          });
        },
      });
      setLoading(false);
      return;
    }
    setLoading(false);
    console.log('ERROR: Presigned URL failed');
  };

  const handleRemove = () => {
    setImage(null);
    setCroppedImage(null);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  console.log('ZZ: croppedImage', croppedImage);

  return (
    <Box
      p={{ xs: 2, md: 3 }}
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, position: 'relative' }}
    >
      <Box sx={{ position: 'relative', display: 'inline-block' }}>
        <Avatar
          key={croppedImage}
          src={croppedImage || ''}
          sx={{ width: 180, height: 180, bgcolor: 'grey.300' }}
          onClick={handleButtonClick}
          slotProps={{
            img: {
              referrerPolicy: 'no-referrer',
            },
          }}
        >
          {!croppedImage && (
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
              <IconUpload size={32} color="#333333" />
              <Typography mt={1} variant="body2" color="grey.900">
                Upload Image
              </Typography>
            </Box>
          )}
        </Avatar>
        {croppedImage && (
          <IconButton
            onClick={handleRemove}
            disabled={loading}
            // size="small"
            sx={{
              position: 'absolute',
              top: -10,
              right: 5,

              svg: {
                color: 'error.main',
                bgcolor: 'common.white',
                borderRadius: '100%',
              },
              // backgroundColor: 'white',
              // '&:hover': { backgroundColor: 'gray.200' },
              // transform: 'translate(50%, -50%)',
            }}
          >
            <IconXboxXFilled size={32} />
          </IconButton>
        )}
      </Box>
      <Box display="flex" gap={2} alignItems="center">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg, image/png"
          style={{ display: 'none' }}
          id="profile-pic-input"
          disabled={loading}
          onChange={handleImageChange}
        />

        {/* {croppedImage !== user?.profileImage && croppedImage ? (
          <Button
            variant="contained"
            title={loading ? 'Uploading' : 'Upload'}
            startIcon={<CameraPlus size={18} />}
            color="primary"
            loading={loading}
            onClick={handleUpload}
            disabled={loading || !croppedImage}
          />
        ) : ( */}
        <Button
          variant="outlined"
          title={croppedImage ? 'Change Image' : 'Choose Image'}
          onClick={handleButtonClick}
          startIcon={<IconUpload size={18} />}
          disabled={loading}
        />
        {user?.profileImage && croppedImage !== user?.profileImage && (
          <Button
            variant="outlined"
            title="Reset"
            onClick={() => setCroppedImage(user?.profileImage || null)}
            startIcon={<IconArrowBackUp size={18} />}
            disabled={loading}
          />
        )}

        {/* )} */}
      </Box>

      <Typography variant="body2" color="textSecondary">
        Allowed formats: JPEG, PNG. Max size: 2MB.
      </Typography>

      <Box display="flex" width="100%" alignItems="center" gap={2}>
        {onBack && (
          <Button
            title="Back"
            variant="outlined"
            startIcon={<IconChevronLeft size={16} />}
            disabled={loading}
            onClick={onBack}
          />
        )}

        <Box display="flex" gap={2} ml="auto">
          {!onNext && (
            <Button
              title="Cancel"
              variant="outlined"
              startIcon={<IconX size={16} />}
              disabled={loading}
              onClick={() => {
                onCancel?.();
              }}
            />
          )}

          <Button
            title={onNext ? (croppedImage && croppedImage !== user?.profileImage ? 'Update & Next' : 'Next') : 'Update'}
            onClick={handleUpload}
            loading={loading}
            startIcon={<IconCircleCheck size={16} />}
          />
        </Box>
      </Box>

      {/* Cropper Dialog */}
      <Dialog
        title="Crop Image"
        open={openCropper}
        onClose={() => setOpenCropper(false)}
        fullWidth
        maxWidth="sm"
        footerProps={{ onOkay: handleCropComplete, okayButtonProps: { title: 'Crop' } }}
      >
        <Box px={2}>
          <Typography my={1.5} color="grey.600">
            Adjust the image by zooming in, out, and dragging it to position the desired area.
          </Typography>
          <Box sx={{ position: 'relative', width: '100%', height: 300 }}>
            <Cropper
              image={image!}
              // @ts-expect-error type error
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropComplete={(croppedArea, croppedAreaPixels) => setCropArea(croppedAreaPixels)}
              onCropChange={setCrop}
              onZoomChange={setZoom}
            />
          </Box>
          <Box mt={2} px={2}>
            <Typography variant="body2" color="textSecondary">
              Zoom
            </Typography>
            <Slider value={zoom} min={1} max={3} step={0.1} onChange={(_, value) => setZoom(value as number)} />
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
}
