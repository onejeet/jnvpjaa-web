'use client';
import AuthShell from '../components/AuthShell';
import ChangePasswordForm from './ChangePasswordForm';
export default function ChangePassword({ onNext }: { onNext?: () => void }) {
  return (
    <AuthShell
      embedded={Boolean(onNext)}
      title="Change your password"
      description="Confirm your current password, then choose a new one."
    >
      <ChangePasswordForm onNext={onNext} />
    </AuthShell>
  );
}
