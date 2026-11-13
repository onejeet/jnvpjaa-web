'use client';
import React from 'react';
import { Box, Paper, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import Link from 'next/link';
import AlumniArtwork from './AlumniArtwork';

type Props = {
  title: string;
  description: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  registration?: boolean;
  embedded?: boolean;
};
export default function AuthShell({
  title,
  description,
  children,
  footer,
  registration = false,
  embedded = false,
}: Props) {
  const content = (
    <Stack
      spacing={2.5}
      sx={{
        width: '100%',
        minWidth: 0,
        '&& .MuiFormHelperText-root': { position: 'static', bottom: 'auto', mt: 0.75, fontSize: 12 },
        '& .MuiInputBase-root': { minHeight: 48 },
        '& button[type="submit"]': { minHeight: 48 },
        '& a': { textUnderlineOffset: '3px' },
      }}
    >
      <Box>
        <Typography component="h1" variant="h1" mb={1}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
          {description}
        </Typography>
      </Box>
      {children}
      {footer && (
        <Box sx={{ pt: 2, borderTop: 1, borderColor: 'divider', textAlign: 'center', fontSize: 14 }}>{footer}</Box>
      )}
    </Stack>
  );
  if (embedded) return content;
  return (
    <Box sx={{ width: '100%', maxWidth: 1000, mx: 'auto', py: { xs: 2, md: 3 }, px: { xs: 1, sm: 2 } }}>
      <Paper
        variant="outlined"
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '0.85fr 1.15fr' },
          overflow: 'hidden',
          borderRadius: 3,
          boxShadow: '0 18px 60px rgba(8,29,19,0.06)',
        }}
      >
        <Box
          component="aside"
          sx={{
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04),
            color: 'text.primary',
            p: { xs: 2.5, md: 4 },
          }}
        >
          <Typography variant="overline" sx={{ fontSize: 11, letterSpacing: '0.12em', color: 'primary.main' }}>
            JNVPJAA · PAOTA, JAIPUR
          </Typography>
          <Typography
            component="p"
            sx={{
              mt: { xs: 0.75, md: 2 },
              fontFamily: 'h1.fontFamily',
              fontSize: { xs: 23, md: 32 },
              lineHeight: 1.25,
            }}
          >
            A familiar place.
            <br />A lifelong connection.
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 1.5, maxWidth: 270, lineHeight: 1.65, display: { xs: 'none', md: 'block' } }}
          >
            {registration
              ? 'Your next chapter with the JNV Paota community starts here.'
              : 'Back to the people who made school feel like home.'}
          </Typography>
          <Box sx={{ mt: 4, color: 'primary.main', display: { xs: 'none', md: 'block' } }}>
            <AlumniArtwork />
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: { xs: 'none', md: 'block' } }}>
            Jawahar Navodaya Vidyalaya · Paota
          </Typography>
        </Box>
        <Box sx={{ p: { xs: 2.5, sm: 3, md: 4 }, minWidth: 0, alignSelf: 'center' }}>{content}</Box>
      </Paper>
      <Stack direction="row" justifyContent="center" spacing={3} sx={{ mt: 2, fontSize: 12, color: 'text.secondary' }}>
        <Link href="/privacy_policy">Privacy policy</Link>
        <Link href="/contact-us">Need help?</Link>
      </Stack>
    </Box>
  );
}
