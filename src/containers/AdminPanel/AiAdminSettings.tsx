'use client';

import { useMutation, useQuery } from '@apollo/client';
import { Alert, FormControlLabel, Paper, Skeleton, Stack, Switch, TextField, Typography } from '@mui/material';
import { IconSparkles } from '@tabler/icons-react';
import React from 'react';
import { AI_ALLOWANCE, AI_SETTINGS, UPDATE_AI_SETTINGS, type AiSettings } from '@/apollo/aiOperations';
import AlertDialog from '@/components/common/AlertDialog';
import Button from '@/components/core/Button';
import { useAlert } from '@/context/AlertContext';

type Limits = { memberDaily: string; adminDaily: string; dailyCap: string };

const LIMIT_FIELDS: { key: keyof Limits; label: string; hint: string }[] = [
  { key: 'memberDaily', label: 'Uses per member, per day', hint: 'Each member’s own allowance.' },
  { key: 'adminDaily', label: 'Uses per admin, per day', hint: 'Admins usually write more.' },
  { key: 'dailyCap', label: 'Uses for the whole portal, per day', hint: 'Keep this below Google’s free daily limit.' },
];

const toLimits = (s: AiSettings): Limits => ({
  memberDaily: String(s.aiMemberDaily),
  adminDaily: String(s.aiAdminDaily),
  dailyCap: String(s.aiDailyCap),
});

/** Super Admin controls for AI writing help: on/off and daily limits. Off means no one can use it. */
const AiAdminSettings: React.FC = () => {
  const { showAlert } = useAlert();
  const { data, loading, error, refetch } = useQuery<{ platformSettings: AiSettings }>(AI_SETTINGS, {
    fetchPolicy: 'cache-and-network',
  });
  const [update, { loading: saving }] = useMutation(UPDATE_AI_SETTINGS, {
    refetchQueries: [{ query: AI_SETTINGS }, { query: AI_ALLOWANCE }],
    awaitRefetchQueries: true,
  });
  const settings = data?.platformSettings;
  const [limits, setLimits] = React.useState<Limits | null>(null);
  const [confirm, setConfirm] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    if (settings) setLimits(toLimits(settings));
  }, [settings]);

  const invalid = (v: string) => !/^\d{1,6}$/.test(v.trim()) || Number(v) > 100000;
  const dirty = !!settings && !!limits && JSON.stringify(limits) !== JSON.stringify(toLimits(settings));
  const hasError = !!limits && Object.values(limits).some(invalid);

  const save = async (variables: Record<string, unknown>, success: string) => {
    try {
      await update({ variables });
      showAlert({ visible: true, type: 'success', message: success });
    } catch (err: any) {
      showAlert({ visible: true, type: 'error', message: err?.message || 'Could not save the AI settings.' });
    }
  };

  return (
    <Paper
      variant="outlined"
      sx={{ p: { xs: 2, md: 3 }, borderRadius: 2, maxWidth: 760, mb: 3 }}
      aria-label="AI settings"
    >
      <Stack direction="row" alignItems="center" spacing={1} mb={1}>
        <IconSparkles size={22} stroke={1.75} aria-hidden />
        <Typography variant="h3">AI writing help</Typography>
      </Stack>
      <Typography variant="body2" color="text.secondary" mb={2}>
        Lets signed-in members draft, improve, shorten and title their posts, events, jobs and comments with Google’s
        free AI. Only the text being edited is sent, never members’ personal details. When this is off, the AI buttons
        disappear for everyone.
      </Typography>

      {loading && !settings && <Skeleton variant="rounded" height={56} />}
      {error && !settings && (
        <Alert
          severity="error"
          action={<Button title="Retry" color="inherit" size="small" onClick={() => refetch()} />}
        >
          Could not load the AI settings.
        </Alert>
      )}

      {settings && (
        <Stack spacing={2.5}>
          {!settings.aiKeyConfigured && (
            <Alert severity="info">
              AI can’t be turned on yet: the server has no Gemini key. Ask the platform maintainer to add one.
            </Alert>
          )}
          <FormControlLabel
            control={
              <Switch
                checked={settings.aiEnabled && settings.aiKeyConfigured}
                disabled={saving || (!settings.aiEnabled && !settings.aiKeyConfigured)}
                onChange={(event) => setConfirm(event.target.checked)}
              />
            }
            label={
              <Stack>
                <Typography fontWeight={600}>{saving ? 'Saving…' : 'AI writing help'}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {settings.aiEnabled && settings.aiKeyConfigured
                    ? 'On for every signed-in member, within the daily limits below.'
                    : 'Off. No one can use AI on the portal.'}
                </Typography>
              </Stack>
            }
          />

          {limits && (
            <Stack
              component="form"
              spacing={2}
              onSubmit={(event) => {
                event.preventDefault();
                if (!dirty || hasError) return;
                save(
                  {
                    memberDaily: Number(limits.memberDaily),
                    adminDaily: Number(limits.adminDaily),
                    dailyCap: Number(limits.dailyCap),
                  },
                  'Daily AI limits saved.'
                );
              }}
            >
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                {LIMIT_FIELDS.map(({ key, label, hint }) => (
                  <TextField
                    key={key}
                    label={label}
                    value={limits[key]}
                    onChange={(event) => setLimits({ ...limits, [key]: event.target.value })}
                    error={invalid(limits[key])}
                    helperText={invalid(limits[key]) ? 'Use a whole number from 0 to 100000.' : hint}
                    size="small"
                    fullWidth
                    disabled={saving}
                    slotProps={{ htmlInput: { inputMode: 'numeric', pattern: '[0-9]*' } }}
                  />
                ))}
              </Stack>
              <Typography variant="body2" color="text.secondary">
                Limits reset every day at midnight US Pacific time, when Google resets its free allowance.
              </Typography>
              <Stack direction="row" spacing={1}>
                <Button title="Save limits" type="submit" disabled={!dirty || hasError || saving} />
                {dirty && (
                  <Button
                    title="Undo changes"
                    variant="text"
                    color="inherit"
                    onClick={() => setLimits(toLimits(settings))}
                    disabled={saving}
                  />
                )}
              </Stack>
            </Stack>
          )}
        </Stack>
      )}

      {confirm !== null && (
        <AlertDialog
          open
          action="update"
          title={confirm ? 'Turn on AI writing help?' : 'Turn off AI writing help?'}
          message={
            confirm
              ? 'Every signed-in member will see AI buttons in the editors and comments, within their daily limit. Text they choose to send is processed by Google.'
              : 'The AI buttons disappear for everyone straight away. Drafts are not affected.'
          }
          onOkay={() => {
            const next = confirm;
            setConfirm(null);
            save({ enabled: next }, next ? 'AI writing help is on.' : 'AI writing help is off.');
          }}
          onCancel={() => setConfirm(null)}
          onClose={() => setConfirm(null)}
          okayButtonProps={{ title: confirm ? 'Turn on' : 'Turn off', color: confirm ? 'primary' : 'error' }}
        />
      )}
    </Paper>
  );
};

export default AiAdminSettings;
