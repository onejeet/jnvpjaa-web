import { brand } from '@/config/tenant';

export const withUnsplashReferral = (value: string) => {
  const url = new URL(value);
  url.searchParams.set('utm_source', brand.id);
  url.searchParams.set('utm_medium', 'referral');
  return url.toString();
};

export const UNSPLASH_HOME = withUnsplashReferral('https://unsplash.com/');
