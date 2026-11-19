import LandingPage from '../LandingPage';
import Welcome, { needs } from '../Welcome';

/** Home page when landing.json says "welcome"; next.config.js aliases @landing/Home here. */
export default function Home() {
  return <LandingPage Layout={Welcome} needs={needs} />;
}
