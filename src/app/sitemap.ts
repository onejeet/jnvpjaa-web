import type { MetadataRoute } from 'next';

const BASE_URL = 'https://jnvpjaa.org';

const routes = [
  { path: '/', priority: 1 },
  { path: '/events/', priority: 0.8 },
  { path: '/blog/', priority: 0.8 },
  { path: '/about/', priority: 0.8 },
  { path: '/contact-us/', priority: 0.8 },
  { path: '/student-hub/skillup-resources/', priority: 0.6 },
  { path: '/student-hub/career-counselling/', priority: 0.6 },
  { path: '/privacy_policy/', priority: 0.8 },
  { path: '/terms_condition/', priority: 0.8 },
  { path: '/vision/', priority: 0.8 },
  { path: '/president-message/', priority: 0.8 },
  { path: '/secretary-message/', priority: 0.8 },
  { path: '/executive-committee/', priority: 0.8 },
  { path: '/principal-message/', priority: 0.8 },
  { path: '/batch-coordinators/', priority: 0.8 },
  { path: '/bhamashah-pillars/', priority: 0.8 },
  { path: '/donations/', priority: 0.8 },
  { path: '/members/', priority: 0.8 },
  { path: '/past-presidents/', priority: 0.8 },
  { path: '/gallery/', priority: 0.8 },
  { path: '/businesses/', priority: 0.8 },
  { path: '/transactions/', priority: 0.8 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, priority }) => ({
    url: `${BASE_URL}${path}`,
    priority,
  }));
}
