'use client';
import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Alert, Box, FormControlLabel, Skeleton, Stack, Switch, Typography } from '@mui/material';
import {
  GOOGLE_LOGIN_AVAILABILITY,
  PLATFORM_GOOGLE_SETTINGS,
  SET_GOOGLE_LOGIN_ENABLED,
} from '@/apollo/googleAuthOperations';
export default function GoogleLoginSetting() {
  const { data, loading, error } = useQuery(PLATFORM_GOOGLE_SETTINGS, { fetchPolicy: 'network-only' });
  const [save, { loading: saving }] = useMutation(SET_GOOGLE_LOGIN_ENABLED);
  const [saveError, setSaveError] = React.useState('');
  const settings = data?.platformSettings;
  const change = async (enabled: boolean) => {
    setSaveError('');
    try {
      await save({
        variables: { enabled },
        update(cache, { data: result }) {
          if (result?.setGoogleLoginEnabled) {
            cache.writeQuery({
              query: PLATFORM_GOOGLE_SETTINGS,
              data: { platformSettings: result.setGoogleLoginEnabled },
            });
            cache.writeQuery({
              query: GOOGLE_LOGIN_AVAILABILITY,
              data: {
                googleLoginAvailability: {
                  __typename: 'GoogleLoginAvailability',
                  enabled:
                    result.setGoogleLoginEnabled.googleLoginEnabled && result.setGoogleLoginEnabled.googleConfigured,
                },
              },
            });
          }
        },
      });
    } catch (err: any) {
      setSaveError(err.message || 'Could not save Google login settings.');
    }
  };
  return (
    <Box>
      <Typography variant="h3" mb={1}>
        Google login
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={2}>
        Let members sign in or register with Google. New registrations still need approval.
      </Typography>
      <Stack spacing={2}>
        {loading ? (
          <Skeleton height={40} />
        ) : error ? (
          <Alert severity="error">Could not load platform settings. Please refresh the page.</Alert>
        ) : (
          <>
            <FormControlLabel
              label={saving ? 'Saving…' : settings?.googleLoginEnabled ? 'Google login is on' : 'Google login is off'}
              control={
                <Switch
                  checked={Boolean(settings?.googleLoginEnabled)}
                  disabled={saving || (!settings?.googleConfigured && !settings?.googleLoginEnabled)}
                  onChange={(_, enabled) => void change(enabled)}
                />
              }
            />
            {!settings?.googleConfigured && (
              <Alert severity="info">
                Google login setup is not complete. Ask the platform maintainer to configure the Google credentials
                before enabling it.
              </Alert>
            )}
            <Typography variant="caption" color="text.secondary">
              Changes save immediately. Turning this off stops new Google sign-ins; members already signed in keep their
              current sessions.
            </Typography>
          </>
        )}
        {saveError && <Alert severity="error">{saveError}</Alert>}
      </Stack>
    </Box>
  );
}
