import { notFound } from 'next/navigation';
import LandingPage from '@/containers/Landing/LandingPage';
import Homecoming, { needs as homecoming } from '@/containers/Landing/Homecoming';
import Impact, { needs as impact } from '@/containers/Landing/Impact';
import Spotlight, { needs as spotlight } from '@/containers/Landing/Spotlight';
import Welcome, { needs as welcome } from '@/containers/Landing/Welcome';

export const dynamic = 'force-dynamic';
export const metadata = { robots: { index: false, follow: false } };

const LAYOUTS = {
  homecoming: { Layout: Homecoming, needs: homecoming },
  welcome: { Layout: Welcome, needs: welcome },
  spotlight: { Layout: Spotlight, needs: spotlight },
  impact: { Layout: Impact, needs: impact },
};

// `next dev` only (the .dev.tsx extension is not a page in production builds, see next.config.js):
// shows every landing layout with the current tenant's content before one is chosen in landing.json.
export default async function LandingPreview(props: { params: Promise<{ layout: string }> }) {
  const params = await props.params;
  const entry = LAYOUTS[params.layout as keyof typeof LAYOUTS];
  if (!entry) notFound();
  return <LandingPage {...entry} />;
}
