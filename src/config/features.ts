import { notFound } from 'next/navigation';
import { features, type Features, type ModuleKey } from './tenant';

// Fixed route → module map: a module's whole route tree is switched by its tenant feature flag.
const MODULE_ROUTES: Record<string, ModuleKey> = {
  '/blog': 'blog',
  '/events': 'events',
  '/gallery': 'gallery',
  '/businesses': 'businesses',
  '/jobs': 'jobs',
  '/newsroom': 'newsroom',
  '/scholarships': 'scholarship',
  '/donations': 'donations',
  '/student-hub': 'studentHub',
  '/batch-coordinators': 'batchCoordinators',
  '/executive-committee': 'executiveCommittee',
  '/discussions': 'discussions',
};

export const moduleForPath = (path?: string): ModuleKey | undefined => {
  if (!path) return undefined;
  const root = '/' + (path.split(/[?#]/)[0].split('/')[1] || '');
  return MODULE_ROUTES[root];
};

export const isEnabled = (key: ModuleKey, f: Features = features) => f[key];

/** Call from a module route's layout: the whole route tree 404s when the tenant has the module off. */
export const requireModule = (key: ModuleKey) => {
  if (!isEnabled(key)) notFound();
};

export const isPathEnabled = (path?: string, f: Features = features) => {
  const key = moduleForPath(path);
  return !key || f[key];
};

/** Drops nav items whose route belongs to a disabled module, and groups left with no items. */
export function filterNav<T extends { path?: string; menu?: T[] }>(items: T[], f: Features = features): T[] {
  return items.flatMap((item) => {
    if (!item.menu) return isPathEnabled(item.path, f) ? [item] : [];
    const menu = filterNav(item.menu, f);
    return menu.length ? [{ ...item, menu }] : [];
  });
}

/** Profile tabs to show: modules the tenant has turned off are left out. */
export const profileTabs = (hasBusiness: boolean, f: Features = features) =>
  ['about', f.events && 'events', f.blog && 'blogs', hasBusiness && f.businesses && 'business'].filter(
    Boolean
  ) as string[];
