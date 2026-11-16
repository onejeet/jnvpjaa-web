'use client';

import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useMutation, useQuery } from '@apollo/client';
import {
  Alert,
  Box,
  Chip,
  CircularProgress,
  Divider,
  Paper,
  Skeleton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  IconDeviceDesktop,
  IconDeviceMobile,
  IconDevices,
  IconKey,
  IconLock,
  IconLogout,
  IconShieldLock,
} from '@tabler/icons-react';
import Button from '@/components/core/Button';
import Dialog from '@/components/core/Dialog';
import { useAlert } from '@/context/AlertContext';
import { useAuth } from '@/context/AuthContext';
import { useForgotPasswordMutation } from '@/apollo/hooks';
import { GOOGLE_LOGIN_AVAILABILITY } from '@/apollo/googleAuthOperations';
import {
  DISCONNECT_GOOGLE,
  SECURITY_OVERVIEW,
  SecurityOverview,
  SecuritySession,
  SIGN_OUT_OTHER_SESSIONS,
  SIGN_OUT_SESSION,
} from '@/apollo/securityOperations';
import ChangePasswordForm from '@/containers/Auth/ChangePassword/ChangePasswordForm';
import { GoogleIcon, googleStartUrl } from '@/containers/Auth/Google/GoogleButton';
import { paths } from '@/config/paths';
import { describeDevice } from './describeDevice';

dayjs.extend(relativeTime);

const CHANGE_PASSWORD_FORM_ID = 'security-change-password';
const METHOD_LABEL: Record<string, string> = { PASSWORD: 'Password', GOOGLE: 'Google' };

const Section: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}> = ({ icon, title, description, action, children }) => (
  <Paper variant="outlined" sx={{ borderRadius: 3, overflow: 'hidden' }}>
    <Stack direction="row" spacing={2} alignItems="flex-start" p={{ xs: 2, sm: 3 }} pb={{ xs: 1.5, sm: 2 }}>
      <Box
        aria-hidden
        sx={{
          width: 40,
          height: 40,
          borderRadius: 2,
          display: 'grid',
          placeItems: 'center',
          flexShrink: 0,
          bgcolor: 'action.hover',
          color: 'text.primary',
        }}
      >
        {icon}
      </Box>
      <Box flex={1} minWidth={0}>
        <Typography variant="h6" component="h2" fontWeight={600} lineHeight={1.3}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={0.25}>
          {description}
        </Typography>
      </Box>
      {action && <Box flexShrink={0}>{action}</Box>}
    </Stack>
    <Box px={{ xs: 2, sm: 3 }} pb={{ xs: 2, sm: 3 }}>
      {children}
    </Box>
  </Paper>
);

const SessionRow: React.FC<{ session: SecuritySession; busy: boolean; onSignOut: () => void }> = ({
  session,
  busy,
  onSignOut,
}) => {
  const device = describeDevice(session.userAgent);
  const lastSeen = dayjs(session.lastSeenAt);
  const activeNow = dayjs().diff(lastSeen, 'minute') < 10;
  const details = [
    METHOD_LABEL[session.method] ? `Signed in with ${METHOD_LABEL[session.method]}` : null,
    session.ip,
    session.current || activeNow ? 'Active now' : `Active ${lastSeen.fromNow()}`,
  ].filter(Boolean);

  return (
    <Stack direction="row" spacing={2} alignItems="center" py={1.75}>
      <Box color={session.current ? 'primary.main' : 'text.secondary'} display="flex" flexShrink={0}>
        {device.mobile ? <IconDeviceMobile size={28} stroke={1.5} /> : <IconDeviceDesktop size={28} stroke={1.5} />}
      </Box>
      <Box flex={1} minWidth={0}>
        <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
          <Typography fontWeight={600} fontSize={15}>
            {device.name}
          </Typography>
          {session.current && <Chip size="small" color="success" variant="outlined" label="This device" />}
        </Stack>
        <Tooltip title={`Signed in ${dayjs(session.createdAt).format('D MMM YYYY, h:mm A')}`} placement="bottom-start">
          <Typography variant="body2" color="text.secondary" sx={{ overflowWrap: 'anywhere' }}>
            {details.join(' · ')}
          </Typography>
        </Tooltip>
      </Box>
      {!session.current && (
        <Button
          title="Sign out"
          size="small"
          variant="outlined"
          color="inherit"
          loading={busy}
          onClick={onSignOut}
          aria-label={`Sign out ${device.name}`}
        />
      )}
    </Stack>
  );
};

const SecurityCenter = () => {
  const { user, logoutUser } = useAuth();
  const { showAlert } = useAlert();
  const { data, loading, error, refetch } = useQuery<{ securityOverview: SecurityOverview }>(SECURITY_OVERVIEW, {
    skip: !user?.id,
    fetchPolicy: 'cache-and-network',
  });
  const { data: googleData } = useQuery(GOOGLE_LOGIN_AVAILABILITY, { skip: !user?.id });
  const [signOutSession] = useMutation(SIGN_OUT_SESSION);
  const [signOutOthers, { loading: signingOutOthers }] = useMutation(SIGN_OUT_OTHER_SESSIONS);
  const [disconnectGoogle, { loading: disconnecting }] = useMutation(DISCONNECT_GOOGLE);
  const [sendPasswordLink, { loading: sendingLink }] = useForgotPasswordMutation();
  const [busySession, setBusySession] = React.useState<string | null>(null);
  const [disconnectOpen, setDisconnectOpen] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [disconnectError, setDisconnectError] = React.useState('');
  const [passwordOpen, setPasswordOpen] = React.useState(false);
  const [savingPassword, setSavingPassword] = React.useState(false);

  const overview = data?.securityOverview;
  const googleEnabled = Boolean(googleData?.googleLoginAvailability?.enabled);
  const otherSessions = overview?.sessions.filter((s) => !s.current) || [];
  const fail = (err: Error) =>
    showAlert({ visible: true, type: 'error', message: err.message || 'Something went wrong.' });

  const endSession = (session: SecuritySession) => {
    setBusySession(session.id);
    signOutSession({
      variables: { id: session.id },
      onCompleted: () => {
        setBusySession(null);
        refetch();
        showAlert({ visible: true, type: 'success', message: `Signed out ${describeDevice(session.userAgent).name}.` });
      },
      onError: (err) => {
        setBusySession(null);
        fail(err);
      },
    });
  };

  const endOtherSessions = () =>
    showAlert(
      {
        visible: true,
        type: 'custom',
        action: 'approve',
        title: 'Sign out of all other devices?',
        message: 'Every other browser and phone will need to sign in again. You stay signed in here.',
        okayButtonProps: { title: 'Sign out others', color: 'error' },
        onOkay: () => {
          showAlert({ visible: true, type: 'loading', message: 'Signing out other devices…' });
          signOutOthers({
            // The mutation returns the fresh overview; write it straight into the page's query.
            update: (cache, { data: result }) =>
              cache.writeQuery({ query: SECURITY_OVERVIEW, data: { securityOverview: result?.signOutOtherSessions } }),
            onCompleted: () => showAlert({ visible: true, type: 'success', message: 'Other devices signed out.' }),
            onError: fail,
          });
        },
      },
      true
    );

  const confirmDisconnect = () => {
    setDisconnectError('');
    disconnectGoogle({
      variables: { password },
      update: (cache, { data: result }) =>
        cache.writeQuery({ query: SECURITY_OVERVIEW, data: { securityOverview: result?.disconnectGoogle } }),
      onCompleted: () => {
        setDisconnectOpen(false);
        setPassword('');
        showAlert({ visible: true, type: 'success', message: 'Google account disconnected.' });
      },
      onError: (err) => setDisconnectError(err.message || 'Could not disconnect Google.'),
    });
  };

  const emailPasswordLink = () =>
    sendPasswordLink({
      variables: { email: overview?.email || '' },
      onCompleted: () =>
        showAlert({ visible: true, type: 'success', message: `We emailed a link to ${overview?.email}.` }),
      onError: fail,
    });

  if (!user?.id || (loading && !overview)) {
    return (
      <Stack width="100%" maxWidth={820} py={3} spacing={2}>
        <Skeleton variant="text" width={260} height={48} />
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} variant="rounded" height={160} sx={{ borderRadius: 3 }} />
        ))}
      </Stack>
    );
  }
  if (error && !overview) {
    return (
      <Alert severity="error" action={<Button title="Retry" color="inherit" onClick={() => refetch()} />}>
        Could not load your security settings.
      </Alert>
    );
  }
  if (!overview) return <CircularProgress />;

  return (
    <Stack width="100%" maxWidth={820} py={3} spacing={3}>
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" spacing={2}>
        <Box>
          <Typography variant="h2">Security Center</Typography>
          <Typography color="text.secondary">
            Manage how you sign in to {overview.email} and where you&apos;re signed in.
          </Typography>
        </Box>
        <Box flexShrink={0} alignSelf={{ sm: 'center' }}>
          <Button
            title="Log out"
            variant="outlined"
            color="inherit"
            startIcon={<IconLogout size={18} />}
            onClick={logoutUser}
          />
        </Box>
      </Stack>

      <Section
        icon={<IconDevices size={22} stroke={1.75} />}
        title="Where you're signed in"
        description="Devices with access to your account. Sign out of any you don't recognise."
        action={
          <Button
            title="Sign out others"
            size="small"
            color="error"
            variant="text"
            loading={signingOutOthers}
            onClick={endOtherSessions}
          />
        }
      >
        {overview.currentSessionUntracked && (
          <Alert severity="info" sx={{ mb: 1 }}>
            This browser signed in before device tracking was added. It will appear here after its next sign-in refresh,
            within the hour.
          </Alert>
        )}
        <Stack divider={<Divider flexItem />}>
          {overview.sessions.map((session) => (
            <SessionRow
              key={session.id}
              session={session}
              busy={busySession === session.id}
              onSignOut={() => endSession(session)}
            />
          ))}
        </Stack>
        {!otherSessions.length && (
          <Typography variant="body2" color="text.secondary" pt={1}>
            You&apos;re not signed in anywhere else.
          </Typography>
        )}
      </Section>

      <Section
        icon={<IconKey size={22} stroke={1.75} />}
        title="Password"
        description={
          overview.hasPassword
            ? 'Changing your password signs out every other device.'
            : 'You sign in with Google and have no password yet.'
        }
      >
        {overview.hasPassword ? (
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'center' }}>
            <Typography variant="body2" color="text.secondary" flex={1}>
              Use a strong password you don&apos;t use anywhere else.
            </Typography>
            <Button
              title="Change password"
              variant="outlined"
              startIcon={<IconLock size={18} />}
              onClick={() => setPasswordOpen(true)}
            />
          </Stack>
        ) : (
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'center' }}>
            <Typography variant="body2" color="text.secondary" flex={1}>
              We&apos;ll email {overview.email} a link to set one, so you can also sign in with email.
            </Typography>
            <Button title="Email me a link" variant="outlined" loading={sendingLink} onClick={emailPasswordLink} />
          </Stack>
        )}
      </Section>

      <Section
        icon={<GoogleIcon />}
        title="Google account"
        description={
          overview.googleConnected
            ? 'You can sign in with Google.'
            : 'Connect Google to sign in without typing your password.'
        }
        action={
          overview.googleConnected ? (
            <Chip size="small" color="success" label="Connected" />
          ) : (
            <Chip size="small" variant="outlined" label="Not connected" />
          )
        }
      >
        {overview.googleConnected ? (
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'center' }}>
            <Typography variant="body2" color="text.secondary" flex={1}>
              {overview.hasPassword
                ? 'Disconnecting keeps your account; you will sign in with your email and password.'
                : 'Set a password first so you can still sign in after disconnecting.'}
            </Typography>
            <Button
              title="Disconnect"
              variant="outlined"
              color="error"
              disabled={!overview.hasPassword}
              onClick={() => setDisconnectOpen(true)}
            />
          </Stack>
        ) : googleEnabled ? (
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'center' }}>
            <Typography variant="body2" color="text.secondary" flex={1}>
              Choose the Google account for {overview.email}. You&apos;ll confirm with your password once.
            </Typography>
            <Button
              title="Connect Google"
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={() => window.location.assign(googleStartUrl(paths.security))}
            />
          </Stack>
        ) : (
          <Typography variant="body2" color="text.secondary">
            Google sign-in is currently turned off for the portal.
          </Typography>
        )}
      </Section>

      <Stack direction="row" spacing={1} alignItems="center" color="text.secondary">
        <IconShieldLock size={16} />
        <Typography variant="caption">
          Signing out a device takes effect immediately. Sessions end on their own after 7 days without use.
        </Typography>
      </Stack>

      <Dialog
        open={passwordOpen}
        title="Change password"
        maxWidth="xs"
        onClose={() => !savingPassword && setPasswordOpen(false)}
        footerProps={{
          onCancel: () => setPasswordOpen(false),
          // Submits the form below through its id, so Enter in any field works too.
          onOkay: () => undefined,
          cancelButtonProps: { disabled: savingPassword },
          okayButtonProps: {
            title: 'Update',
            type: 'submit',
            form: CHANGE_PASSWORD_FORM_ID,
            loading: savingPassword,
          },
        }}
      >
        <Box p={2.5}>
          <ChangePasswordForm
            formId={CHANGE_PASSWORD_FORM_ID}
            onLoadingChange={setSavingPassword}
            onNext={() => {
              setPasswordOpen(false);
              refetch();
            }}
            containerProps={{ alignItems: 'stretch' }}
          />
        </Box>
      </Dialog>

      <Dialog
        open={disconnectOpen}
        title="Disconnect Google?"
        maxWidth="xs"
        onClose={() => setDisconnectOpen(false)}
        footerProps={{
          onCancel: () => setDisconnectOpen(false),
          onOkay: confirmDisconnect,
          okayButtonProps: { title: 'Disconnect', color: 'error', loading: disconnecting, disabled: !password },
        }}
      >
        <Stack spacing={2} p={2.5}>
          <Typography variant="body2" color="text.secondary">
            Enter your password to confirm. You can connect Google again at any time.
          </Typography>
          {disconnectError && <Alert severity="error">{disconnectError}</Alert>}
          <TextField
            autoFocus
            fullWidth
            type="password"
            label="Current password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && password) confirmDisconnect();
            }}
          />
        </Stack>
      </Dialog>
    </Stack>
  );
};

export default SecurityCenter;
