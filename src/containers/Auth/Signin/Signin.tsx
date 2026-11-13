'use client';
import Link from 'next/link';
import AuthShell from '../components/AuthShell';
import GoogleButton from '../Google/GoogleButton';
import GoogleSigninNotice from './GoogleSigninNotice';
import SigninForm from './SigninForm';
export default function Signin() {
  return (
    <AuthShell
      title="Welcome back"
      description="Sign in to reconnect with your JNV Paota community."
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
