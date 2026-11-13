'use client';
import React from 'react';
import LoadingIndicator from '@/components/common/LoadingIndicator';
import { useQuery } from '@apollo/client';
import { GOOGLE_LOGIN_AVAILABILITY } from '@/apollo/googleAuthOperations';
import {
  Alert,
  Box,
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { getBatchOptions } from '@/utils/helpers';
import { googleStartUrl } from './GoogleButton';

type Flow = { status: string; email?: string; firstName?: string; lastName?: string; returnPath?: string };
async function request(query: string, variables: Record<string, unknown> = {}) {
  const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:4000/client', {
    method: 'POST',
    credentials: 'include',
    cache: 'no-store',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });
  const result = await response.json();
  if (!response.ok || result.errors?.length)
    throw new Error(result.errors?.[0]?.message || 'Could not complete Google sign-in. Please try again.');
  return result.data;
}
const fields = 'status email firstName lastName returnPath';
export default function GoogleCompletion() {
  const { data: availability } = useQuery(GOOGLE_LOGIN_AVAILABILITY, { fetchPolicy: 'network-only' });
  const [flow, setFlow] = React.useState<Flow | null>(null);
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [redirecting, setRedirecting] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [faculty, setFaculty] = React.useState(false);
  const accept = React.useCallback((next: Flow) => {
    if (next.status === 'SIGNED_IN') {
      setRedirecting(true);
      localStorage.setItem('logged_in', 'true');
      const path = next.returnPath || '/profile';
      window.location.replace(
        path.startsWith('/') && !path.startsWith('//') && !path.includes('\\') ? path : '/profile'
      );
    } else if (next.status === 'REGISTER' || next.status === 'LINK') {
      setFlow(next);
    } else {
      setRedirecting(true);
      localStorage.removeItem('logged_in');
      window.location.replace(
        `/signin?google=${next.status === 'PENDING' ? 'pending' : next.status === 'BLOCKED' ? 'blocked' : 'failed'}`
      );
    }
  }, []);
  React.useEffect(() => {
    let active = true;
    const failure = new URLSearchParams(window.location.search).get('error');
    if (failure) {
      setRedirecting(true);
      window.location.replace(`/signin?google=${failure === 'cancelled' ? 'cancelled' : 'failed'}`);
      return;
    }
    request(`query GoogleAuthFlow { googleAuthFlow { ${fields} } }`)
      .then((data) => {
        if (active) accept(data.googleAuthFlow);
      })
      .catch((err) => {
        if (active) {
          setRedirecting(true);
          window.location.replace('/signin?google=expired');
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [accept]);
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (saving) return;
    const form = new FormData(event.currentTarget);
    setSaving(true);
    setError('');
    try {
      if (flow?.status === 'LINK') {
        const data = await request(
          `mutation LinkGoogleAccount($password: String!) { linkGoogleAccount(password: $password) { ${fields} } }`,
          { password: form.get('password') }
        );
        accept(data.linkGoogleAccount);
      } else {
        const data = await request(
          `mutation CompleteGoogleRegistration($firstName:String!,$lastName:String!,$gender:String!,$mobile:String!,$batch:Int,$isFaculty:Boolean,$website:String) { completeGoogleRegistration(firstName:$firstName,lastName:$lastName,gender:$gender,mobile:$mobile,batch:$batch,isFaculty:$isFaculty,website:$website) { ${fields} } }`,
          {
            firstName: form.get('firstName'),
            lastName: form.get('lastName'),
            gender: form.get('gender'),
            mobile: form.get('mobile'),
            batch: faculty ? 0 : Number(form.get('batch')),
            isFaculty: faculty,
            website: form.get('website'),
          }
        );
        accept(data.completeGoogleRegistration);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };
  if (loading || redirecting || !flow) return <LoadingIndicator />;

  return (
    <Card variant="outlined" sx={{ maxWidth: 640, mx: 'auto', my: 4, p: { xs: 2, md: 4 } }}>
      <Stack spacing={3}>
        <Typography variant="h1">
          {flow?.status === 'REGISTER'
            ? 'Complete your registration'
            : flow?.status === 'LINK'
              ? 'Confirm your existing account'
              : 'Google sign-in'}
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {(flow?.status === 'REGISTER' || flow?.status === 'LINK') && (
          <Box component="form" onSubmit={submit}>
            <Stack spacing={2}>
              <TextField
                label="Google email"
                value={flow.email || ''}
                slotProps={{ input: { readOnly: true } }}
                fullWidth
              />
              {flow.status === 'LINK' ? (
                <>
                  <Typography>
                    This email already has an account. Enter its password to connect Google. Your existing approval
                    status still applies.
                  </Typography>
                  <TextField
                    name="password"
                    label="Current password"
                    type="password"
                    autoComplete="current-password"
                    required
                    disabled={saving}
                  />
                  <Link href="/forgot-password">Forgot your password? Reset it, then restart Google sign-in.</Link>
                </>
              ) : (
                <>
                  <Typography color="text.secondary">
                    Your details will be reviewed by the association or your batch coordinator before you can access the
                    member area.
                  </Typography>
                  <TextField
                    name="firstName"
                    label="First name"
                    defaultValue={flow.firstName}
                    autoComplete="given-name"
                    required
                    disabled={saving}
                    slotProps={{ htmlInput: { maxLength: 100 } }}
                  />
                  <TextField
                    name="lastName"
                    label="Last name"
                    defaultValue={flow.lastName}
                    autoComplete="family-name"
                    required
                    disabled={saving}
                    slotProps={{ htmlInput: { maxLength: 100 } }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox checked={faculty} onChange={(_, checked) => setFaculty(checked)} disabled={saving} />
                    }
                    label="I am a faculty member"
                  />
                  {!faculty && (
                    <TextField select name="batch" label="Alumni batch" defaultValue="" required disabled={saving}>
                      {getBatchOptions()
                        .filter((b) => b.value > 0)
                        .map((b) => (
                          <MenuItem key={b.value} value={b.value}>
                            {b.label}
                          </MenuItem>
                        ))}
                    </TextField>
                  )}
                  <TextField select name="gender" label="Gender" defaultValue="" required disabled={saving}>
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </TextField>
                  <TextField
                    name="mobile"
                    label="Mobile number"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+91 9876543210"
                    helperText="Include your country code."
                    required
                    disabled={saving}
                  />
                  <Box
                    aria-hidden="true"
                    sx={{ position: 'absolute', left: -10000, width: 1, height: 1, overflow: 'hidden' }}
                  >
                    <label htmlFor="google-website">Website</label>
                    <input id="google-website" name="website" tabIndex={-1} autoComplete="off" />
                  </Box>
                </>
              )}
              <Button type="submit" variant="contained" disabled={saving}>
                {saving
                  ? 'Please wait…'
                  : flow.status === 'LINK'
                    ? 'Confirm and connect Google'
                    : 'Submit for approval'}
              </Button>
            </Stack>
          </Box>
        )}
        {!loading && (
          <Stack direction="row" spacing={2}>
            {availability?.googleLoginAvailability?.enabled && (
              <Button onClick={() => window.location.assign(googleStartUrl())}>Restart Google sign-in</Button>
            )}
            <Button component={Link} href="/signin">
              Back to sign in
            </Button>
          </Stack>
        )}
      </Stack>
    </Card>
  );
}
