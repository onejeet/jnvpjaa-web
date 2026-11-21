'use client';

import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import {
  Alert,
  Box,
  Chip,
  CircularProgress,
  FormControlLabel,
  InputAdornment,
  Skeleton,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { IconAlertCircle, IconCircleCheck, IconExternalLink } from '@tabler/icons-react';
import dayjs from 'dayjs';
import React from 'react';
import {
  CHECK_USERNAME,
  MY_PUBLIC_PROFILE,
  MyPublicProfile,
  publicProfilePath,
  SET_PUBLIC_PROFILE_HIDDEN,
  UPDATE_USERNAME,
  USERNAME_PATTERN,
  UsernameCheck,
} from '@/apollo/publicProfileOperations';
import AlertDialog from '@/components/common/AlertDialog';
import CopyContentButton from '@/components/common/CopyContentButton';
import Button from '@/components/core/Button';
import { brand } from '@/config/tenant';
import { useAlert } from '@/context/AlertContext';

const RULE_HINT = '3–30 lowercase letters, numbers, dots or underscores. Starts with a letter.';
const CHECK_DELAY_MS = 450;

type CheckState =
  | { status: 'idle' }
  | { status: 'invalid'; message: string }
  | { status: 'checking' }
  | { status: 'done'; result: UsernameCheck }
  | { status: 'error'; message: string };

const clientRuleMessage = (value: string) => {
  if (value.length < 3) return 'Usernames are at least 3 characters.';
  if (value.length > 30) return 'Usernames are at most 30 characters.';
  if (!/^[a-z]/.test(value)) return 'Start with a letter.';
  if (/[^a-z0-9._]/.test(value)) return 'Use only lowercase letters, numbers, dots and underscores.';
  return 'Dots and underscores must sit between letters or numbers, never doubled or at the end.';
};

/** A member's public /@username page: the switch to show or hide it, the link, and the username editor. */
const PublicProfileSettings: React.FC = () => {
  const client = useApolloClient();
  const { showAlert } = useAlert();
  const { data, loading, error, refetch } = useQuery<{ myPublicProfile: MyPublicProfile }>(MY_PUBLIC_PROFILE, {
    fetchPolicy: 'cache-and-network',
  });
  const theme = useTheme();
  // The settings query is a root field with no id, so a mutation result can't update it by itself.
  const refresh = { refetchQueries: [{ query: MY_PUBLIC_PROFILE }], awaitRefetchQueries: true };
  const [saveUsername, { loading: savingUsername }] = useMutation(UPDATE_USERNAME, refresh);
  const [saveHidden, { loading: savingHidden }] = useMutation(SET_PUBLIC_PROFILE_HIDDEN, refresh);

  const settings = data?.myPublicProfile;
  const [draft, setDraft] = React.useState('');
  const [check, setCheck] = React.useState<CheckState>({ status: 'idle' });
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const latest = React.useRef('');

  const value = draft.trim().replace(/^@/, '').toLowerCase();
  const changed = Boolean(value) && value !== settings?.username;
  const lockedUntil = settings?.usernameChangeAvailableAt ? dayjs(settings.usernameChangeAvailableAt) : null;

  // Debounced availability check; only the newest answer is ever shown.
  React.useEffect(() => {
    latest.current = value;
    if (!changed) return setCheck({ status: 'idle' });
    if (!USERNAME_PATTERN.test(value)) return setCheck({ status: 'invalid', message: clientRuleMessage(value) });
    setCheck({ status: 'checking' });
    const timer = setTimeout(async () => {
      try {
        const { data: result } = await client.query<{ checkUsername: UsernameCheck }>({
          query: CHECK_USERNAME,
          variables: { username: value },
          fetchPolicy: 'network-only',
        });
        if (latest.current === value) setCheck({ status: 'done', result: result.checkUsername });
      } catch (err: any) {
        if (latest.current !== value) return;
        const limited = err?.graphQLErrors?.some(
          (e: any) => e?.extensions?.code === 'TOO_MANY_REQUESTS' || e?.code === 'TOO_MANY_REQUESTS'
        );
        setCheck({
          status: 'error',
          message: limited
            ? 'Too many checks in a short time. Wait a minute and try again.'
            : "Couldn't check availability right now. You can still try saving.",
        });
      }
    }, CHECK_DELAY_MS);
    return () => clearTimeout(timer);
  }, [value, changed, client]);

  if (loading && !settings) {
    return (
      <Stack spacing={1.5} aria-busy="true" aria-label="Loading public profile settings">
        <Skeleton variant="rounded" height={44} />
        <Skeleton variant="rounded" height={56} />
      </Stack>
    );
  }
  if (error && !settings) {
    return (
      <Alert severity="error" action={<Button title="Retry" color="inherit" size="small" onClick={() => refetch()} />}>
        Could not load your public profile settings.
      </Alert>
    );
  }
  if (!settings) return null;
  if (!settings.featureEnabled) {
    return (
      <Alert severity="info">
        Public profiles aren&apos;t turned on for {brand.shortName} yet. Once they are, you&apos;ll get a shareable
        verified page here.
      </Alert>
    );
  }

  const path = settings.username ? publicProfilePath(settings.username) : null;
  const displayUrl = settings.username ? `${brand.domains.site}/@${settings.username}` : '';
  const fullUrl = `https://${displayUrl}`;
  const available = check.status === 'done' && check.result.available;
  const canSave = changed && !lockedUntil && (available || check.status === 'error') && !savingUsername;

  const toggleHidden = async (hidden: boolean) => {
    try {
      await saveHidden({ variables: { hidden } });
      showAlert({
        visible: true,
        type: 'success',
        message: hidden
          ? 'Your public profile is now hidden.'
          : 'Your public profile is now visible to anyone with the link.',
      });
    } catch (err: any) {
      showAlert({ visible: true, type: 'error', message: err?.message || 'Could not update your profile visibility.' });
    }
  };

  const submitUsername = async () => {
    setConfirmOpen(false);
    try {
      const result = await saveUsername({ variables: { username: value } });
      const next = result.data?.updateUsername?.username;
      setDraft('');
      showAlert({ visible: true, type: 'success', message: `Your username is now @${next}.` });
    } catch (err: any) {
      const message = err?.message || 'Could not change your username.';
      showAlert({ visible: true, type: 'error', message });
      // Keep what they typed so they can adjust it; the field shows why it failed.
      setCheck({
        status: 'done',
        result: { username: value, available: false, reason: null, message, suggestions: [] },
      });
    }
  };

  const status = (() => {
    if (lockedUntil)
      return {
        tone: 'text.secondary',
        text: `You can change your username again on ${lockedUntil.format('D MMM YYYY')}.`,
      };
    switch (check.status) {
      case 'invalid':
        return { tone: 'error.main', text: check.message };
      case 'checking':
        return { tone: 'text.secondary', text: 'Checking availability…' };
      case 'error':
        return { tone: 'warning.main', text: check.message };
      case 'done':
        return { tone: check.result.available ? 'success.main' : 'error.main', text: check.result.message };
      default:
        return { tone: 'text.secondary', text: RULE_HINT };
    }
  })();

  const endAdornment =
    check.status === 'checking' ? (
      <CircularProgress size={18} aria-label="Checking availability" />
    ) : check.status === 'done' ? (
      check.result.available ? (
        <IconCircleCheck size={20} color={theme.palette.success.main} aria-label="Available" />
      ) : (
        <IconAlertCircle size={20} color={theme.palette.error.main} aria-label="Not available" />
      )
    ) : null;

  return (
    <Stack spacing={2.5}>
      <FormControlLabel
        sx={{ alignItems: 'flex-start', m: 0, gap: 1.5 }}
        control={
          <Switch
            checked={!settings.hidden}
            disabled={savingHidden}
            onChange={(event) => toggleHidden(!event.target.checked)}
            inputProps={{ 'aria-describedby': 'public-profile-visibility-help' }}
          />
        }
        label={
          <Box pt={0.75}>
            <Typography fontWeight={600}>Show my verified public profile</Typography>
            <Typography id="public-profile-visibility-help" variant="body2" color="text.secondary">
              Anyone with the link sees your name, photo, batch and what you share in About. Email, phone, address and
              birthday are never shown.
            </Typography>
          </Box>
        }
      />

      {path && (
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1}
          alignItems={{ sm: 'center' }}
          p={1.5}
          borderRadius={2}
          sx={{ bgcolor: 'action.hover', opacity: settings.hidden ? 0.6 : 1 }}
        >
          <Typography variant="body2" fontWeight={600} flex={1} sx={{ overflowWrap: 'anywhere' }}>
            {displayUrl}
          </Typography>
          {settings.hidden ? (
            <Chip size="small" label="Hidden" />
          ) : (
            <Stack direction="row" spacing={1} alignItems="center">
              <CopyContentButton
                buttonType="icon"
                content={fullUrl}
                copiedMessageProps={{ message: 'Link copied', placement: 'left' }}
              />
              <Button
                title="View"
                size="small"
                variant="outlined"
                component="a"
                href={path}
                // Opens beside the settings; the core Button type doesn't list anchor attributes.
                {...({ target: '_blank', rel: 'noopener' } as object)}
                endIcon={<IconExternalLink size={16} />}
              />
            </Stack>
          )}
        </Stack>
      )}

      <Box
        component="form"
        noValidate
        onSubmit={(event: React.FormEvent) => {
          event.preventDefault();
          if (canSave) setConfirmOpen(true);
        }}
      >
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} alignItems={{ sm: 'flex-start' }}>
          <TextField
            fullWidth
            size="small"
            label="Username"
            placeholder={settings.username || 'yourname'}
            value={draft}
            disabled={Boolean(lockedUntil) || savingUsername}
            onChange={(event) => setDraft(event.target.value.slice(0, 40))}
            autoComplete="off"
            inputProps={{
              autoCapitalize: 'none',
              spellCheck: false,
              'aria-describedby': 'username-status',
              'aria-invalid': check.status === 'invalid' || (check.status === 'done' && !check.result.available),
            }}
            InputProps={{
              startAdornment: <InputAdornment position="start">@</InputAdornment>,
              endAdornment: endAdornment && <InputAdornment position="end">{endAdornment}</InputAdornment>,
            }}
          />
          <Button
            type="submit"
            title="Change username"
            loading={savingUsername}
            disabled={!canSave}
            sx={{ flexShrink: 0, minWidth: 168 }}
          />
        </Stack>
        <Typography
          id="username-status"
          role="status"
          aria-live="polite"
          variant="body2"
          sx={{ color: status.tone, mt: 0.75 }}
        >
          {status.text}
        </Typography>
        {check.status === 'done' && check.result.suggestions.length > 0 && (
          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" mt={1} alignItems="center">
            <Typography variant="body2" color="text.secondary">
              Try:
            </Typography>
            {check.result.suggestions.map((suggestion) => (
              <Chip
                key={suggestion}
                size="small"
                variant="outlined"
                clickable
                label={`@${suggestion}`}
                onClick={() => setDraft(suggestion)}
              />
            ))}
          </Stack>
        )}
        <Typography variant="caption" color="text.secondary" display="block" mt={1}>
          Links to your old username keep working for 90 days. After a change, you can change it again in 30 days.
        </Typography>
      </Box>

      {confirmOpen && (
        <AlertDialog
          open
          action="update"
          title={`Change your username to @${value}?`}
          message={`Your page moves to ${brand.domains.site}/@${value}. Old links redirect for 90 days, and you won't be able to change your username again for 30 days.`}
          onOkay={submitUsername}
          onCancel={() => setConfirmOpen(false)}
          onClose={() => setConfirmOpen(false)}
          okayButtonProps={{ title: 'Change username' }}
        />
      )}
    </Stack>
  );
};

export default PublicProfileSettings;
