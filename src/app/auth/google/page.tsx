import { Metadata } from 'next';
import GoogleCompletion from '@/containers/Auth/Google/GoogleCompletion';
import { brand } from '@/config/tenant';
export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: `Google sign-in • ${brand.shortName}`,
  robots: { index: false, follow: false },
};
export default function GoogleCompletionPage() {
  return <GoogleCompletion />;
}
