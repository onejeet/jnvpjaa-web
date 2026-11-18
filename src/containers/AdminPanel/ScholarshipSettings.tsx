'use client';

import { useMutation, useQuery } from '@apollo/client';
import { Alert, FormControlLabel, Paper, Skeleton, Stack, Switch, Typography } from '@mui/material';
import { IconTrash } from '@tabler/icons-react';
import React from 'react';

import {
  PLATFORM_SETTINGS,
  SCHOLARSHIP_AVAILABILITY,
  UPDATE_SCHOLARSHIP_SETTINGS,
  WIPE_SCHOLARSHIP_TEST_DATA,
} from '@/apollo/scholarshipOperations';
import AlertDialog from '@/components/common/AlertDialog';
import Button from '@/components/core/Button';
import { useAlert } from '@/context/AlertContext';

const refetchQueries = [{ query: PLATFORM_SETTINGS }, { query: SCHOLARSHIP_AVAILABILITY }];

/** Super Admin switches for the scholarship module: on/off, test mode, and wiping test data. */
const ScholarshipSettings: React.FC = () => {
  const { showAlert } = useAlert();
  const { data, loading, error } = useQuery(PLATFORM_SETTINGS, { fetchPolicy: 'cache-and-network' });
  const [updateSettings, { loading: saving }] = useMutation(UPDATE_SCHOLARSHIP_SETTINGS, {
    refetchQueries,
    awaitRefetchQueries: true,
  });
  const [wipeTestData, { loading: wiping }] = useMutation(WIPE_SCHOLARSHIP_TEST_DATA, {
    refetchQueries,
    awaitRefetchQueries: true,
  });
  const [confirmWipe, setConfirmWipe] = React.useState(false);

  const settings = data?.platformSettings;
  const busy = saving || wiping;

  const save = async (variables: { enabled?: boolean; testMode?: boolean }, success: string) => {
    try {
      await updateSettings({ variables });
      showAlert({ visible: true, type: 'success', message: success });
    } catch (err: any) {
      showAlert({ visible: true, type: 'error', message: err?.message || 'Could not save scholarship settings.' });
    }
  };

  const wipe = async () => {
    setConfirmWipe(false);
    try {
      const result = await wipeTestData();
      const count = result.data?.wipeScholarshipTestData?.deletedRecords ?? 0;
      showAlert({ visible: true, type: 'success', message: `Scholarship test data wiped (${count} records).` });
    } catch (err: any) {
      showAlert({ visible: true, type: 'error', message: err?.message || 'Could not wipe the test data.' });
    }
  };

  return (
    <Paper
      variant="outlined"
      sx={{ p: { xs: 2, md: 3 }, borderRadius: 2, maxWidth: 760 }}
      aria-label="Scholarship settings"
    >
      <Typography variant="h3" mb={1}>
        Scholarships
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={2}>
        Scholarship requests and every scholarship page stay hidden from members until you turn them on.
      </Typography>

      {loading && !settings && <Skeleton variant="rounded" height={120} />}
      {error && !settings && <Alert severity="error">Could not load scholarship settings.</Alert>}

      {settings && (
        <Stack spacing={2}>
          {!settings.scholarshipEncryptionConfigured && (
            <Alert severity="warning">
              Payout encryption is not configured on the server (SCHOLARSHIP_PAYOUT_ENCRYPTION_KEY), so scholarships
              cannot be turned on yet.
            </Alert>
          )}

          <FormControlLabel
            control={
              <Switch
                checked={settings.scholarshipEnabled}
                disabled={busy || (!settings.scholarshipEnabled && !settings.scholarshipEncryptionConfigured)}
                onChange={(event) =>
                  save(
                    { enabled: event.target.checked },
                    event.target.checked ? 'Scholarships are now open to members.' : 'Scholarships are now hidden.'
                  )
                }
              />
            }
            label={
              <Stack>
                <Typography fontWeight={600}>Scholarship requests</Typography>
                <Typography variant="body2" color="text.secondary">
                  Members can see scholarship pages and submit requests.
                </Typography>
              </Stack>
            }
          />

          <FormControlLabel
            control={
              <Switch
                checked={settings.scholarshipTestMode}
                disabled={busy}
                onChange={(event) =>
                  save(
                    { testMode: event.target.checked },
                    event.target.checked ? 'Test mode is on.' : 'Test mode is off.'
                  )
                }
              />
            }
            label={
              <Stack>
                <Typography fontWeight={600}>Test mode</Typography>
                <Typography variant="body2" color="text.secondary">
                  Everything created while this is on is marked as test data, kept out of the association wallet, and
                  can be wiped. Only available before any real scholarship records exist.
                </Typography>
              </Stack>
            }
          />

          {(settings.scholarshipTestMode || settings.scholarshipTestRecordCount > 0) && (
            <Alert
              severity={settings.scholarshipTestRecordCount > 0 ? 'warning' : 'info'}
              action={
                <Button
                  title="Wipe test data"
                  color="error"
                  variant="outlined"
                  size="small"
                  startIcon={<IconTrash size={16} />}
                  disabled={busy || settings.scholarshipTestRecordCount === 0}
                  onClick={() => setConfirmWipe(true)}
                />
              }
            >
              {settings.scholarshipTestRecordCount
                ? `${settings.scholarshipTestRecordCount} test records (applications, allocations and transactions). Wipe them before turning test mode off.`
                : 'No test records yet.'}
            </Alert>
          )}
        </Stack>
      )}

      {confirmWipe && (
        <AlertDialog
          open
          action="delete"
          title="Wipe scholarship test data?"
          message="This permanently deletes every scholarship application, allocation, transaction and log entry recorded in test mode. Real records are not touched. This cannot be undone."
          onOkay={wipe}
          onCancel={() => setConfirmWipe(false)}
          onClose={() => setConfirmWipe(false)}
          okayButtonProps={{ title: 'Wipe test data', color: 'error' }}
        />
      )}
    </Paper>
  );
};

export default ScholarshipSettings;
