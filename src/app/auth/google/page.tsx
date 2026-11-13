import { Metadata } from 'next';
import GoogleCompletion from '@/containers/Auth/Google/GoogleCompletion';
export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Google sign-in • JNVPJAA', robots: { index: false, follow: false } };
export default function GoogleCompletionPage() {
  return <GoogleCompletion />;
}
