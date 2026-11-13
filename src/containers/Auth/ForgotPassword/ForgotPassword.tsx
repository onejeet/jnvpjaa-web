'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import AuthShell from '../components/AuthShell';
import ForgotPasswordForm from './ForgotPasswordForm';
export default function ForgotPassword() {
  const reset = Boolean(useSearchParams().get('c'));
  return (
    <AuthShell
      title={reset ? 'Choose a new password' : 'Forgot your password?'}
      description={
        reset
          ? 'Choose a strong password to secure your account.'
          : 'Enter your registered email and we’ll send you a link to reset your password.'
      }
      footer={<Link href="/signin">Back to sign in</Link>}
    >
      <ForgotPasswordForm />
    </AuthShell>
  );
}
