'use client';

import React from 'react';
import { Box, ButtonBase, Typography, type SxProps, type Theme } from '@mui/material';
import { IconPhotoPlus } from '@tabler/icons-react';
import Button from '@/components/core/Button';
import FormTextField from '@/components/form/FormTextField';

/**
 * One frame for every create/edit screen (events, blog, newsroom, jobs):
 * a writing column on the left and a sticky side panel with Publish and settings on the right.
 * On phones the Publish panel sits under the heading and the remaining settings follow the content.
 */

const surface: SxProps<Theme> = {
  bgcolor: 'background.paper',
  border: '1px solid',
  borderColor: 'divider',
  borderRadius: 3,
};

type ShellProps = {
  heading: string;
  description: string;
  publish: React.ReactNode;
  aside?: React.ReactNode;
  /** The AI writing assistant: top of the side column; it brings its own phone button and sheet. */
  assistant?: React.ReactNode;
  children: React.ReactNode;
  /** Set when the shell sits beside another sidebar (admin): keeps one column until there is room for two. */
  inset?: boolean;
} & Omit<React.ComponentProps<'form'>, 'children'>;

export function EditorShell({
  heading,
  description,
  publish,
  aside,
  assistant,
  children,
  inset,
  ...formProps
}: ShellProps) {
  const [two, wide] = inset ? (['lg', 'xl'] as const) : (['md', 'lg'] as const);
  return (
    <Box
      component="form"
      {...(formProps as any)}
      sx={{
        display: 'grid',
        gap: { xs: 2, md: 3 },
        gridTemplateColumns: { xs: 'minmax(0, 1fr)', [two]: 'minmax(0, 1fr) 300px', [wide]: 'minmax(0, 1fr) 340px' },
        gridTemplateAreas: { xs: '"header" "publish" "main" "aside"', [two]: '"header header" "main side"' },
        alignItems: 'start',
        maxWidth: 1240,
        mx: 'auto',
        pt: { xs: 1, md: 2 },
        pb: { xs: 4, md: 8 },
      }}
    >
      <Box component="header" sx={{ gridArea: 'header', mb: { xs: 0.5, md: 1 } }}>
        <Typography component="h1" variant="h2" sx={{ textWrap: 'balance' }}>
          {heading}
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1, maxWidth: '62ch' }}>
          {description}
        </Typography>
      </Box>

      <Box sx={{ ...surface, gridArea: 'main', p: { xs: 2.5, sm: 4, md: 5 }, minWidth: 0 }}>{children}</Box>

      {/* On phones this wrapper dissolves so Publish and settings can take separate grid rows. */}
      <Box
        sx={{
          gridArea: 'side',
          display: { xs: 'contents', [two]: 'flex' },
          flexDirection: 'column',
          gap: 2,
          position: { [two]: 'sticky' },
          top: { [two]: 88 },
        }}
      >
        {assistant}
        <Box sx={{ gridArea: 'publish' }}>{publish}</Box>
        {aside && <Box sx={{ gridArea: 'aside', display: 'flex', flexDirection: 'column', gap: 2 }}>{aside}</Box>}
      </Box>
    </Box>
  );
}

type Tone = 'neutral' | 'live' | 'scheduled' | 'attention';

const toneColor: Record<Tone, string> = {
  neutral: 'grey.600',
  live: 'success.main',
  scheduled: 'info.main',
  attention: 'warning.main',
};

/** Status, a one-line explanation of who can see it, then the actions, primary first. */
export function PublishPanel({
  status,
  tone = 'neutral',
  note,
  children,
}: {
  status: string;
  tone?: Tone;
  note: string;
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ ...surface, p: 2.5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box aria-hidden sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: toneColor[tone], flexShrink: 0 }} />
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          {status}
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
        {note}
      </Typography>
      <Box
        sx={{
          mt: 2.5,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          '& .MuiButton-root': { width: '100%', justifyContent: 'center' },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

/** A titled settings group in the side panel. */
export function EditorPanel({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <Box sx={{ ...surface, p: 2.5 }}>
      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
        {title}
      </Typography>
      {hint && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {hint}
        </Typography>
      )}
      <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2.5 }}>{children}</Box>
    </Box>
  );
}

/** A titled group inside the writing column, separated from the previous one by a hairline. */
export function EditorSection({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <Box
      component="section"
      sx={{
        pt: { xs: 3.5, md: 4.5 },
        mt: { xs: 3.5, md: 4.5 },
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Typography component="h2" variant="h5" sx={{ fontWeight: 600 }}>
        {title}
      </Typography>
      {hint && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {hint}
        </Typography>
      )}
      <Box sx={{ mt: 2.5 }}>{children}</Box>
    </Box>
  );
}

/** Label above, optional marker, short hint, then the control. */
export function EditorField({
  label,
  optional,
  hint,
  htmlFor,
  children,
  sx,
}: {
  label: string;
  optional?: boolean | string;
  hint?: string;
  htmlFor?: string;
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}) {
  return (
    <Box
      sx={[
        // The heading above names the field, so the control's own floating label would repeat it once filled.
        {
          '& .MuiInputLabel-shrink': { display: 'none' },
          '& .MuiOutlinedInput-notchedOutline legend': { maxWidth: 0, p: 0 },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Typography
        component={htmlFor ? 'label' : 'div'}
        htmlFor={htmlFor}
        variant="subtitle2"
        sx={{ display: 'block', fontWeight: 600, mb: hint ? 0.25 : 0.75 }}
      >
        {label}
        {optional && (
          <Typography component="span" variant="body2" color="text.secondary" sx={{ fontWeight: 400, ml: 0.75 }}>
            {typeof optional === 'string' ? optional : 'Optional'}
          </Typography>
        )}
      </Typography>
      {hint && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {hint}
        </Typography>
      )}
      {children}
    </Box>
  );
}

/** The big serif title at the top of the writing column, with no box around it. */
export function EditorTitleField({
  control,
  name,
  placeholder,
  ariaLabel,
  rules,
  disabled,
}: {
  control: any;
  name: string;
  placeholder: string;
  ariaLabel: string;
  rules?: any;
  disabled?: boolean;
}) {
  return (
    <FormTextField
      fullWidth
      multiline
      minRows={1}
      autoFocus
      control={control}
      name={name}
      disabled={disabled}
      placeholder={placeholder}
      variant="standard"
      rules={rules}
      inputProps={{ 'aria-label': ariaLabel }}
      InputProps={{
        disableUnderline: true,
        sx: {
          p: 0,
          fontFamily: 'Playfair Display',
          fontSize: { xs: '1.75rem', md: '2.25rem' },
          fontWeight: 500,
          lineHeight: 1.2,
          '& textarea::placeholder': { color: 'text.secondary', opacity: 0.75 },
        },
      }}
    />
  );
}

/** 16:9 cover preview, or an inviting empty slot that opens the photo picker. */
export function CoverField({
  src,
  alt,
  onPick,
  onRemove,
  disabled,
  label = 'Add a cover image',
  hint = 'Free photos from Unsplash',
}: {
  src?: string | null;
  alt?: string;
  onPick: () => void;
  onRemove?: () => void;
  disabled?: boolean;
  label?: string;
  hint?: string;
}) {
  if (!src) {
    return (
      <ButtonBase
        onClick={onPick}
        disabled={disabled}
        sx={{
          width: '100%',
          aspectRatio: '16 / 9',
          borderRadius: 2,
          border: '1.5px dashed',
          borderColor: 'grey.400',
          bgcolor: 'grey.100',
          display: 'flex',
          flexDirection: 'column',
          gap: 0.75,
          color: 'text.secondary',
          transition: 'border-color 160ms ease-out, background-color 160ms ease-out, color 160ms ease-out',
          '&:hover, &.Mui-focusVisible': { borderColor: 'primary.main', color: 'primary.main', bgcolor: 'grey.200' },
        }}
      >
        <IconPhotoPlus size={26} stroke={1.5} />
        <Typography variant="body2" sx={{ fontWeight: 600, color: 'inherit' }}>
          {label}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {hint}
        </Typography>
      </ButtonBase>
    );
  }
  return (
    <Box>
      <Box
        component="img"
        src={src}
        alt={alt || 'Cover image'}
        sx={{
          display: 'block',
          width: '100%',
          aspectRatio: '16 / 9',
          objectFit: 'cover',
          borderRadius: 2,
          bgcolor: 'grey.200',
        }}
      />
      <Box sx={{ display: 'flex', gap: 1, mt: 1.25 }}>
        <Button title="Change" variant="outlined" size="small" onClick={onPick} disabled={disabled} />
        {onRemove && (
          <Button title="Remove" variant="text" size="small" color="inherit" onClick={onRemove} disabled={disabled} />
        )}
      </Box>
    </Box>
  );
}
