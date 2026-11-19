import LandingPage from '../LandingPage';
import Homecoming, { needs } from '../Homecoming';

/** Home page when landing.json says "homecoming"; next.config.js aliases @landing/Home here. */
export default function Home() {
  return <LandingPage Layout={Homecoming} needs={needs} />;
}
