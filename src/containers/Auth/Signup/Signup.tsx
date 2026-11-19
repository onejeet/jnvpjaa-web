'use client';
import Link from 'next/link';
import AuthShell from '../components/AuthShell';
import GoogleButton from '../Google/GoogleButton';
import SignupForm from './SignupForm';
import { brand } from '@/config/tenant';
export default function Signup() {
  return (
    <AuthShell
      registration
      title="Join your community"
      description={`For ${brand.institution.shortName} alumni and faculty. Your registration will be reviewed before member access is enabled.`}
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
