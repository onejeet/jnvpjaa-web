'use client';
import { useQuery } from '@apollo/client';
import { GOOGLE_LOGIN_AVAILABILITY } from '@/apollo/googleAuthOperations';
import { Button, Divider, Stack } from '@mui/material';

export const googleStartUrl = () => {
  const url = new URL('/auth/google/start', process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:4000/client');
  const encoded = new URLSearchParams(window.location.search).get('r');
  try {
    const target = encoded ? atob(encoded) : '/profile';
    if (target.startsWith('/') && !target.startsWith('//') && !target.includes('\\'))
      url.searchParams.set('returnTo', target);
  } catch {
    /* Use the default profile destination. */
  }
  return url.toString();
};
export default function GoogleButton() {
  const { data } = useQuery(GOOGLE_LOGIN_AVAILABILITY, { fetchPolicy: 'network-only', pollInterval: 60000 });
  if (!data?.googleLoginAvailability?.enabled) return null;
  return (
    <Stack spacing={2} sx={{ width: '100%', my: 2, position: 'relative' }}>
      <Button variant="outlined" fullWidth onClick={() => window.location.assign(googleStartUrl())}>
        Continue with Google
      </Button>
      <Divider>or use email</Divider>
    </Stack>
  );
}
