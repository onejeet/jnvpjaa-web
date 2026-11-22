import type { ComponentType } from 'react';
import { JsonLd } from '@/components/JsonLd';
import { generateSchema, SEO_CONFIG } from '@/config/seo.config';
import { brand } from '@/config/tenant';
import LayoutModule from '@/layouts/Layout';
import LandingFooter from './LandingFooter';
import { loadLanding, type LandingNeeds, type LandingProps } from './loadLanding';
import { rootStyle, s } from './parts';

/** A landing layout with the data it needs and its own footer, inside the site shell. */
export default async function LandingPage({
  Layout,
  needs,
}: {
  Layout: ComponentType<LandingProps>;
  needs: LandingNeeds;
}) {
  const data = await loadLanding(needs);
  return (
    <>
      <JsonLd data={generateSchema.webPage(SEO_CONFIG.title, '/', SEO_CONFIG.description)} />
      <LayoutModule disableCover={false} disableFooter title={`${brand.shortName} • ${brand.tagline}`}>
        <div className={s.root} style={rootStyle()}>
          <main>
            <Layout {...data} />
          </main>
          <LandingFooter />
        </div>
      </LayoutModule>
    </>
  );
}
