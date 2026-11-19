/* eslint-disable @next/next/no-img-element -- pictures on other hosts are not allowed through next/image */
import Image from 'next/image';
import { brand } from '@/config/tenant';

const OWN_HOSTS = [brand.domains.site, brand.domains.assets, brand.domains.content];

/** A small square picture: resized by next/image on the association's own hosts (allowed in next.config.js), as-is elsewhere. */
export default function SizedImg({ src, size, className }: { src: string; size: number; className?: string }) {
  let own = false;
  try {
    own = OWN_HOSTS.includes(new URL(src).hostname);
  } catch {
    // A relative or malformed URL: leave it to the browser.
  }
  return own ? (
    <Image className={className} src={src} alt="" width={size} height={size} />
  ) : (
    <img className={className} src={src} alt="" width={size} height={size} loading="lazy" />
  );
}
