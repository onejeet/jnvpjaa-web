'use client';
import Link from 'next/link';
import { Alert, Box, Button, Paper, Stack, Typography } from '@mui/material';
import { useProfile } from '@/context/ProfileContext';
import React from 'react';

export default function ProfileGuidance() {
  const { user, isCurrentUserProfile } = useProfile();
  const [showPreview, setShowPreview] = React.useState(false);
  if (!isCurrentUserProfile || !user) return null;
  const missing = [
    !user.profileImage && 'Add a photo so classmates recognise you',
    !user.aboutMe && 'Write a short introduction',
    !user.companyInfo?.[0]?.companyName && 'Add your current work',
  ].filter(Boolean) as string[];
  return (
    <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 }, mb: 3, borderRadius: 2 }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" gap={2}>
        <Box>
          <Typography variant="h3" component="h2" mb={0.5}>
            Make your profile useful
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Give batchmates enough context to recognise and reconnect with you.
          </Typography>
        </Box>
        <Button component={Link} href="/profile/setup/" variant="outlined">
          Edit profile
        </Button>
      </Stack>
      {missing.length ? (
        <Stack component="ul" spacing={0.75} sx={{ pl: 2.5, mb: 0, mt: 2, color: 'text.secondary' }}>
          {missing.map((item) => (
            <Typography component="li" variant="body2" key={item}>
              {item}
            </Typography>
          ))}
        </Stack>
      ) : (
        <Alert severity="success" sx={{ mt: 2 }}>
          Your key profile details are complete.
        </Alert>
      )}
      <Button size="small" onClick={() => setShowPreview((value) => !value)} sx={{ mt: 2 }}>
        {showPreview ? 'Hide member preview' : 'Preview what members can see'}
      </Button>
      {showPreview && (
        <Box sx={{ mt: 1, p: 2, border: 1, borderColor: 'divider', borderRadius: 1 }}>
          <Typography fontWeight={600}>
            {user.firstName} {user.lastName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user.batch === 0 ? 'Faculty' : user.batch ? `Batch of ${user.batch}` : 'JNV Paota member'}
            {user.companyInfo?.[0]?.position && user.companyInfo?.[0]?.companyName
              ? ` · ${user.companyInfo[0].position} at ${user.companyInfo[0].companyName}`
              : ''}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            {user.isConfidential
              ? 'Your contact details are masked for other members.'
              : `Email: ${user.email || 'Not added'} · Phone: ${user.mobile || 'Not added'}`}
          </Typography>
        </Box>
      )}
    </Paper>
  );
}
