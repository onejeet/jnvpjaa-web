'use client';
import React from 'react';
import { Alert } from '@mui/material';
const messages: Record<string, string> = {
  pending: 'Your registration is awaiting approval. You can sign in after it is approved.',
  blocked: 'This account cannot sign in. Please contact the association for help.',
  cancelled: 'Google sign-in was cancelled. You can try again.',
  failed: 'Google sign-in could not be completed. Please try again.',
  expired: 'Google sign-in expired or is unavailable. Please try again or use email and password.',
};
export default function GoogleSigninNotice() {
  const [status, setStatus] = React.useState('');
  React.useEffect(() => {
    setStatus(new URLSearchParams(window.location.search).get('google') || '');
  }, []);
  return messages[status] ? (
    <Alert severity={status === 'pending' || status === 'cancelled' ? 'info' : 'warning'} sx={{ mb: 2, width: '100%' }}>
      {messages[status]}
    </Alert>
  ) : null;
}
