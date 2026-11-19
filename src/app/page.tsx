import { Metadata } from 'next';
import { constructMetadata, SEO_CONFIG } from '@/config/seo.config';
// Only the layout named in tenants/<id>/landing.json is bundled: next.config.js points this alias at it.
import Home from '@landing/Home';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = constructMetadata({
  url: '/',
  title: SEO_CONFIG.title,
  description: SEO_CONFIG.description,
});

export default Home;
