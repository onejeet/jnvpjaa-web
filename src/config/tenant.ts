// The tenant folder is chosen at build time: next.config.js aliases `@tenant` to tenants/$TENANT.
// JSON imports (not fs) so the same validated objects work in server and client components.
import brandJson from '@tenant/brand.json';
import contentJson from '@tenant/content.json';
import featuresJson from '@tenant/features.json';
import landingJson from '@tenant/landing.json';
import seoJson from '@tenant/seo.json';
import { parseTenant } from './tenant.schema';

export type { Brand, Content, Features, Landing, LandingLayout, ModuleKey, Seo } from './tenant.schema';

const tenant = parseTenant(
  { brand: brandJson, seo: seoJson, features: featuresJson, content: contentJson, landing: landingJson },
  (brandJson as { id?: string })?.id
);

export const { brand, seo, features, content, landing } = tenant;

/** URL of a file on the tenant's assets host (logos, illustrations, gallery images). */
export const assetUrl = (path: string) => `https://${brand.domains.assets}${path.startsWith('/') ? '' : '/'}${path}`;

/** Tenant copy (tenants/<id>/content.json). A missing key is a loud error, never a silent blank. */
export const t = (key: string): string => {
  const value = content[key];
  if (value === undefined) throw new Error(`Missing content key "${key}" for tenant "${tenant.id}"`);
  return value;
};
