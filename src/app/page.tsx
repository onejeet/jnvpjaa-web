import { constructMetadata, SEO_CONFIG, generateSchema } from '@/config/seo.config';
import { JsonLd } from '@/components/JsonLd';
import Home from '@/containers/Home/Home';
import LayoutModule from '@/layouts/Layout';
import { Metadata } from 'next';
import { NEWS_POSTS, type NewsPost } from '@/apollo/newsroomOperations';
import { latestNews } from '@/modules/Newsroom/latestNews';
import { initializeApollo } from '@/utils/apollo';
import { isEnabled } from '@/config/features';
import { brand } from '@/config/tenant';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = constructMetadata({
  url: '/',
  title: SEO_CONFIG.title,
  description: SEO_CONFIG.description,
});

export default async function HomePage() {
  const news = isEnabled('newsroom')
    ? await latestNews<NewsPost>((o) => initializeApollo().query(o as any), NEWS_POSTS)
    : [];
  return (
    <>
      <JsonLd data={generateSchema.webPage(SEO_CONFIG.title, '/', SEO_CONFIG.description)} />
      <LayoutModule disableCover={false} title={`${brand.shortName} • ${brand.tagline}`}>
        <Home news={news} />
      </LayoutModule>
    </>
  );
}
