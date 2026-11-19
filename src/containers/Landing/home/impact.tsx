import LandingPage from '../LandingPage';
import Impact, { needs } from '../Impact';

/** Home page when landing.json says "impact"; next.config.js aliases @landing/Home here. */
export default function Home() {
  return <LandingPage Layout={Impact} needs={needs} />;
}
