import { SEO_CONFIG, generateSchema } from '@/config/seo.config';
import { JsonLd } from '@/components/JsonLd';
import ClassicHome from '@/containers/Home/Home';
import LayoutModule from '@/layouts/Layout';
import { NEWS_POSTS, type NewsPost } from '@/apollo/newsroomOperations';
import { latestNews } from '@/modules/Newsroom/latestNews';
import { initializeApollo } from '@/utils/apollo';
import { isEnabled } from '@/config/features';
import { brand } from '@/config/tenant';
import { Celebrating, Faq, NewMembers, OurStory } from '../extras';
import { loadLanding } from '../loadLanding';
import { rootStyle, s } from '../parts';

/** Landing sections inside the MUI page: landing tokens, but the classic page's own fonts. */
const inClassic = (node: React.ReactNode) => (
  <div
    className={s.root}
    style={{ ...rootStyle(), '--font-body': 'inherit', '--font-display': 'inherit' } as React.CSSProperties}
  >
    {node}
  </div>
);

/** The original home page, used when landing.json says "classic"; next.config.js aliases @landing/Home here. */
export default async function Home() {
  const [news, { story, members, joinedThisWeek }] = await Promise.all([
    isEnabled('newsroom') ? latestNews<NewsPost>((o) => initializeApollo().query(o as any), NEWS_POSTS) : [],
    loadLanding([]),
  ]);
  return (
    <>
      {/* Only the classic hero and slogan use this font, so only this page loads it; React hoists it into <head>. */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Playwrite+CU:wght@400&display=swap"
        rel="stylesheet"
        {...{ precedence: 'default' }}
      />
      <JsonLd data={generateSchema.webPage(SEO_CONFIG.title, '/', SEO_CONFIG.description)} />
      <LayoutModule disableCover={false} title={`${brand.shortName} • ${brand.tagline}`}>
        <ClassicHome
          news={news}
          slots={{
            story: story && inClassic(<OurStory story={story} />),
            celebrating: inClassic(<Celebrating />),
            members: inClassic(<NewMembers members={members} joinedThisWeek={joinedThisWeek} surface />),
            faq: inClassic(<Faq />),
          }}
        />
      </LayoutModule>
    </>
  );
}
