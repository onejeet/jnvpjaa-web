'use client';
import React from 'react';
import { Box, Paper, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import Link from 'next/link';

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
      spacing={3}
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
    <Box sx={{ width: '100%', maxWidth: 1080, mx: 'auto', py: { xs: 2, md: 5 }, px: { xs: 1, sm: 2 } }}>
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
          sx={{
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.06),
            color: 'text.primary',
            p: { xs: 3, md: 5 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 5,
          }}
        >
          <Box>
            <Typography variant="overline" sx={{ letterSpacing: '0.18em', color: 'primary.main' }}>
              JNVPJAA · ALUMNI COMMUNITY
            </Typography>
            <Typography
              variant="h1"
              component="p"
              sx={{ mt: { xs: 1, md: 3 }, fontSize: { xs: 24, md: 42 }, lineHeight: 1.2 }}
            >
              Our school. Our people.
              <Box component="span" sx={{ display: { xs: 'none', md: 'block' } }}>
                Our shared journey.
              </Box>
            </Typography>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Typography sx={{ color: 'text.secondary', fontSize: 15, lineHeight: 1.8, mb: 4 }}>
              A place for the alumni and faculty of JNV Paota to reconnect, contribute, and stay close to the community.
            </Typography>
            <Stack spacing={2.5}>
              {(registration
                ? ['Share your member details', 'Your registration is reviewed', 'Connect with your community']
                : ['Reconnect with your batch', 'Discover events and stories', 'Support the next generation']
              ).map((text, i) => (
                <Stack direction="row" spacing={2} alignItems="center" key={text}>
                  <Typography sx={{ fontSize: 12, color: 'primary.main', fontWeight: 600 }}>0{i + 1}</Typography>
                  <Typography variant="body2" sx={{ color: 'text.primary' }}>
                    {text}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Box>
          <Typography variant="caption" sx={{ display: { xs: 'none', md: 'block' }, color: 'text.secondary' }}>
            Jawahar Navodaya Vidyalaya · Paota, Jaipur
          </Typography>
        </Box>
        <Box sx={{ p: { xs: 3, sm: 4, md: 5 }, minWidth: 0, alignSelf: 'center' }}>{content}</Box>
      </Paper>
      <Stack direction="row" justifyContent="center" spacing={3} sx={{ mt: 3, fontSize: 12, color: 'text.secondary' }}>
        <Link href="/privacy_policy">Privacy policy</Link>
        <Link href="/contact-us">Need help?</Link>
      </Stack>
    </Box>
  );
}
