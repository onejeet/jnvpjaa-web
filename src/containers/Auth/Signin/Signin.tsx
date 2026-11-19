'use client';
import Link from 'next/link';
import AuthShell from '../components/AuthShell';
import GoogleButton from '../Google/GoogleButton';
import GoogleSigninNotice from './GoogleSigninNotice';
import SigninForm from './SigninForm';
import { brand } from '@/config/tenant';
export default function Signin() {
  return (
    <AuthShell
      title="Welcome back"
      description={`Sign in to reconnect with your ${brand.institution.shortName} community.`}
      footer={
        <>
          New to the portal? <Link href="/signup">Create an account</Link>
        </>
      }
    >
      <GoogleSigninNotice />
      <GoogleButton />
      <SigninForm />
    </AuthShell>
  );
}
