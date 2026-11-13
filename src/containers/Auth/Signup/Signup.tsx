'use client';
import Link from 'next/link';
import AuthShell from '../components/AuthShell';
import GoogleButton from '../Google/GoogleButton';
import SignupForm from './SignupForm';
export default function Signup() {
  return (
    <AuthShell
      registration
      title="Join your community"
      description="For JNV Paota alumni and faculty. Your registration will be reviewed before member access is enabled."
      footer={
        <>
          Already registered? <Link href="/signin">Sign in</Link>
        </>
      }
    >
      <GoogleButton />
      <SignupForm />
    </AuthShell>
  );
}
