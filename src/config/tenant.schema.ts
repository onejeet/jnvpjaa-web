import { z } from 'zod';

const hex = z.string().regex(/^#[0-9a-f]{6}$/i, 'must be a #rrggbb colour');
const httpsUrl = z.string().url().startsWith('https://');
// Bare hostname: no scheme, path or port.
const host = z.string().regex(/^[a-z0-9.-]+\.[a-z]{2,}$/i, 'must be a hostname like example.org (no https://)');
const text = z.string().trim().min(1);

export const MODULE_KEYS = [
  'blog',
  'events',
  'gallery',
  'businesses',
  'jobs',
  'newsroom',
  'scholarship',
  'donations',
  'studentHub',
  'batchCoordinators',
  'executiveCommittee',
  'discussions',
] as const;
export type ModuleKey = (typeof MODULE_KEYS)[number];

const scale = z.object(
  Object.fromEntries(
    ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'].map((k) => [k, hex])
  ) as Record<'50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900', typeof hex>
);

export const brandSchema = z
  .object({
    id: z.string().regex(/^[a-z0-9_-]+$/),
    name: text,
    shortName: text,
    legalName: text,
    tagline: text,
    institution: z.object({ name: text, shortName: text, city: text }).strict(),
    logo: z.object({ full: httpsUrl, square: httpsUrl, emailFull: httpsUrl, emailGreyIcon: httpsUrl }).strict(),
    theme: z
      .object({
        primary: scale.strict(),
        secondary: z.object({ light: hex, dark: hex }).strict(),
        manifestBackground: hex,
      })
      .strict(),
    socials: z
      .object({
        facebook: httpsUrl,
        instagram: httpsUrl,
        twitter: httpsUrl,
        linkedin: httpsUrl,
        youtube: httpsUrl,
        github: httpsUrl,
      })
      .partial()
      .strict(),
    contact: z.object({ email: z.string().email(), phone: text.optional(), address: z.array(text).min(1) }).strict(),
    domains: z.object({ site: host, api: host, assets: host, content: host }).strict(),
    email: z.object({ from: z.string().email(), domain: host, host: host }).strict(),
    analytics: z
      .object({
        gtmId: z
          .string()
          .regex(/^GTM-[A-Z0-9]+$/)
          .optional(),
      })
      .strict()
      .optional(),
  })
  .strict();

export const seoSchema = z
  .object({
    siteName: text,
    title: text,
    titleTemplate: z.string().includes('%s'),
    description: text,
    defaultImage: z.string().startsWith('/'),
    defaultImageSize: z.object({ width: z.number().int().positive(), height: z.number().int().positive() }).strict(),
    locale: z.string().regex(/^[a-z]{2}_[A-Z]{2}$/),
    language: z.string().regex(/^[a-z]{2}-[A-Z]{2}$/),
  })
  .strict();

export const featuresSchema = z
  .object(Object.fromEntries(MODULE_KEYS.map((k) => [k, z.boolean()])) as Record<ModuleKey, z.ZodBoolean>)
  .strict();

export const contentSchema = z.record(text);

/** Home page design. `classic` is the original page; the others are the landing layouts in src/containers/Landing. */
export const LANDING_LAYOUTS = ['classic', 'homecoming', 'welcome', 'spotlight', 'impact'] as const;
export type LandingLayout = (typeof LANDING_LAYOUTS)[number];

const assetPath = z.string().startsWith('/');
export const landingSchema = z
  .object({
    layout: z.enum(LANDING_LAYOUTS),
    hero: z.object({ title: text, subtitle: text, images: z.array(assetPath).min(1) }).strict(),
    vision: text,
    // The association's own published figures; shown as they are written.
    stats: z.array(z.object({ value: text, label: text }).strict()).max(4),
    join: z.object({ title: text, body: text }).strict(),
    // Home page FAQ; also published as FAQPage structured data.
    faq: z
      .array(z.object({ question: text, answer: text }).strict())
      .max(8)
      .optional(),
    giving: z
      .object({
        title: text,
        body: text,
        areas: z.array(z.object({ title: text, body: text }).strict()).max(3),
        quote: z.object({ text, by: text, image: assetPath }).strict().optional(),
      })
      .strict(),
  })
  .strict();

export type Brand = z.infer<typeof brandSchema>;
export type Seo = z.infer<typeof seoSchema>;
export type Features = z.infer<typeof featuresSchema>;
export type Content = z.infer<typeof contentSchema>;
export type Landing = z.infer<typeof landingSchema>;
export type Tenant = { id: string; brand: Brand; seo: Seo; features: Features; content: Content; landing: Landing };

/** Validate a tenant's five config files; the error names every bad field so a broken tenant fails the build clearly. */
export function parseTenant(
  raw: { brand: unknown; seo: unknown; features: unknown; content: unknown; landing: unknown },
  id: string | undefined
): Tenant {
  const result = z
    .object({
      brand: brandSchema,
      seo: seoSchema,
      features: featuresSchema,
      content: contentSchema,
      landing: landingSchema,
    })
    .safeParse(raw);
  if (!result.success) {
    const issues = result.error.issues.map((i) => `  - ${i.path.join('.')}: ${i.message}`).join('\n');
    throw new Error(`Invalid tenant "${id}":\n${issues}`);
  }
  return { id: id as string, ...result.data };
}
