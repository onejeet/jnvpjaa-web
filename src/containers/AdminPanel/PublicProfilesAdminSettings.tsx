'use client';

import { useMutation, useQuery } from '@apollo/client';
import { Alert, FormControlLabel, Paper, Skeleton, Stack, Switch, Typography } from '@mui/material';
import React from 'react';
import { PUBLIC_PROFILES_SETTING, UPDATE_PUBLIC_PROFILES_SETTING } from '@/apollo/publicProfileOperations';
import AlertDialog from '@/components/common/AlertDialog';
import Button from '@/components/core/Button';
import { brand } from '@/config/tenant';
import { useAlert } from '@/context/AlertContext';

/** Super Admin switch for public /@username pages. */
const PublicProfilesAdminSettings: React.FC = () => {
  const { showAlert } = useAlert();
  const { data, loading, error, refetch } = useQuery(PUBLIC_PROFILES_SETTING, { fetchPolicy: 'cache-and-network' });
  const [update, { loading: saving }] = useMutation(UPDATE_PUBLIC_PROFILES_SETTING, {
    refetchQueries: [{ query: PUBLIC_PROFILES_SETTING }],
    awaitRefetchQueries: true,
  });
  const [confirm, setConfirm] = React.useState<boolean | null>(null);
  const enabled = data?.platformSettings?.publicProfilesEnabled;

  const save = async (next: boolean) => {
    setConfirm(null);
    try {
      await update({ variables: { enabled: next } });
      showAlert({
        visible: true,
        type: 'success',
        message: next
          ? 'Public profiles are on. Every verified member now has a username and a public page.'
          : 'Public profiles are off. Every public page now shows “not found”.',
      });
    } catch (err: any) {
      showAlert({
        visible: true,
        type: 'error',
        message: err?.message || 'Could not save the public profile setting.',
      });
    }
  };

  return (
    <Paper
      variant="outlined"
      sx={{ p: { xs: 2, md: 3 }, borderRadius: 2, maxWidth: 760, mb: 3 }}
      aria-label="Public profile settings"
    >
      <Typography variant="h3" mb={1}>
        Public profiles
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={2}>
        Verified members get a shareable page at {brand.domains.site}/@username showing their name, photo, batch and
        verification. Contact details, birthdays and addresses are never shown. Members can hide their own page.
      </Typography>

      {loading && enabled === undefined && <Skeleton variant="rounded" height={56} />}
      {error && enabled === undefined && (
        <Alert
          severity="error"
          action={<Button title="Retry" color="inherit" size="small" onClick={() => refetch()} />}
        >
          Could not load this setting.
        </Alert>
      )}
      {enabled !== undefined && (
        <FormControlLabel
          control={
            <Switch checked={enabled} disabled={saving} onChange={(event) => setConfirm(event.target.checked)} />
          }
          label={
            <Stack>
              <Typography fontWeight={600}>{saving ? 'Saving…' : 'Public profile pages'}</Typography>
              <Typography variant="body2" color="text.secondary">
                Turning this on gives every verified member without a username a generated one, e.g. rahul.sharma.
              </Typography>
            </Stack>
          }
        />
      )}

      {confirm !== null && (
        <AlertDialog
          open
          action="update"
          title={confirm ? 'Turn on public profiles?' : 'Turn off public profiles?'}
          message={
            confirm
              ? 'Every verified member who has not hidden their page becomes viewable by anyone with the link. Members are told in their settings and can hide their page at any time.'
              : 'All public pages will immediately show “not found”. Usernames are kept, so turning this back on restores every link.'
          }
          onOkay={() => save(confirm)}
          onCancel={() => setConfirm(null)}
          onClose={() => setConfirm(null)}
          okayButtonProps={{ title: confirm ? 'Turn on' : 'Turn off', color: confirm ? 'primary' : 'error' }}
        />
      )}
    </Paper>
  );
};

export default PublicProfilesAdminSettings;
