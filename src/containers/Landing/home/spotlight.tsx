import LandingPage from '../LandingPage';
import Spotlight, { needs } from '../Spotlight';

/** Home page when landing.json says "spotlight"; next.config.js aliases @landing/Home here. */
export default function Home() {
  return <LandingPage Layout={Spotlight} needs={needs} />;
}
