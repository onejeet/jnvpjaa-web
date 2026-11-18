'use client';

import { Avatar, Box, ButtonBase, CircularProgress, Stack, TextField, Typography } from '@mui/material';
import { IconPhotoPlus } from '@tabler/icons-react';
import React from 'react';

import { useGetPresignedUrlMutation } from '@/apollo/hooks';
import { CoverField } from '@/components/editor/EditorShell';
import Button from '@/components/core/Button';
import { org_info } from '@/config/index';
import { useAlert } from '@/context/AlertContext';
import type { ContentImage } from '../contentPages.schema';

const ACCEPTED = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_BYTES = 5 * 1024 * 1024;

/** Uploads one image and returns its public URL, or null after telling the editor what went wrong. */
const useImageUpload = () => {
  const [getPresignedUrl] = useGetPresignedUrlMutation();
  const { showAlert } = useAlert();
  const [uploading, setUploading] = React.useState(false);

  const upload = async (file: File): Promise<string | null> => {
    const fail = (message: string) => {
      showAlert({ visible: true, type: 'error', message });
      return null;
    };
    if (!ACCEPTED.includes(file.type)) return fail('Use a JPEG, PNG or WebP image.');
    if (file.size > MAX_BYTES) return fail('Use an image under 5 MB.');
    setUploading(true);
    try {
      // The avatar category has a known public domain; the server picks a fresh file name, so no profile changes.
      const { data } = await getPresignedUrl({ variables: { fileName: file.name, contentType: file.type } });
      const signed = data?.getPresignedUrl;
      const ok =
        signed &&
        (await fetch(signed, { method: 'PUT', body: file, headers: { 'Content-Type': file.type } })
          .then((res) => res.ok)
          .catch(() => false));
      if (!signed || !ok) return fail('Image upload failed. Please try again.');
      return `${org_info.content_domain}${new URL(signed).pathname}`;
    } catch {
      return fail('Image upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return { upload, uploading };
};

interface PageImageFieldProps {
  value?: ContentImage;
  onChange: (value?: ContentImage) => void;
  /** Shown as alt text default and as the image's accessible name. */
  defaultAlt?: string;
  /** A small round photo for people instead of a wide cover. */
  compact?: boolean;
  error?: string;
  disabled?: boolean;
}

/** Image upload with required alt text. Files go to the site's own storage only. */
const PageImageField = ({ value, onChange, defaultAlt = '', compact, error, disabled }: PageImageFieldProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { upload, uploading } = useImageUpload();
  const pick = () => inputRef.current?.click();

  const onFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    const url = await upload(file);
    if (url) onChange({ url, alt: value?.alt || defaultAlt });
  };

  const input = (
    <input ref={inputRef} type="file" accept={ACCEPTED.join(',')} hidden onChange={onFile} aria-hidden tabIndex={-1} />
  );
  const busy = disabled || uploading;

  if (compact) {
    return (
      <Stack direction="row" alignItems="center" gap={1.5}>
        {input}
        <ButtonBase
          onClick={pick}
          disabled={busy}
          aria-label={value ? 'Change photo' : 'Add photo'}
          sx={{ borderRadius: '50%', '&.Mui-focusVisible': { outline: '2px solid', outlineColor: 'primary.main' } }}
        >
          <Avatar
            src={value?.url}
            alt={value?.alt}
            sx={{ width: 48, height: 48, bgcolor: 'grey.200', color: 'grey.600' }}
          >
            {uploading ? <CircularProgress size={20} /> : <IconPhotoPlus size={20} stroke={1.5} />}
          </Avatar>
        </ButtonBase>
        {value && (
          <Button
            title="Remove photo"
            variant="text"
            size="small"
            color="inherit"
            onClick={() => onChange(undefined)}
            disabled={busy}
          />
        )}
      </Stack>
    );
  }

  return (
    <Box>
      {input}
      <Box position="relative">
        <CoverField
          src={value?.url}
          alt={value?.alt}
          onPick={pick}
          onRemove={() => onChange(undefined)}
          disabled={busy}
          label="Add an image"
          hint="JPEG, PNG or WebP, up to 5 MB"
        />
        {uploading && (
          <Stack
            position="absolute"
            sx={{ inset: 0, bgcolor: 'rgba(255,255,255,0.7)', borderRadius: 2 }}
            alignItems="center"
            justifyContent="center"
            gap={1}
          >
            <CircularProgress size={24} />
            <Typography variant="body2">Uploading…</Typography>
          </Stack>
        )}
      </Box>
      {value && (
        <TextField
          fullWidth
          size="small"
          label="Describe the image"
          value={value.alt}
          onChange={(event) => onChange({ ...value, alt: event.target.value })}
          error={Boolean(error)}
          helperText={error || 'Read aloud by screen readers. Say what the image shows.'}
          disabled={disabled}
          sx={{ mt: 2 }}
        />
      )}
    </Box>
  );
};

export default PageImageField;
