import { constructMetadata, generateSchema } from '@/config/seo.config';
import { JsonLd } from '@/components/JsonLd';
import Vision from '@/containers/About/Vision';
import { Metadata } from 'next';
import LayoutModule from '@/layouts/Layout';

export const metadata: Metadata = constructMetadata({
  url: '/vision/',
  title: 'Vision & Mission • Alumni Network of JNV Paota, Jaipur',
  description:
    'Learn about the JNVPJAA vision and mission for connecting JNV Paota alumni and supporting students and the school community.',
});

export default function VisionPage() {
  return (
    <>
      <JsonLd data={generateSchema.webPage('JNVPJAA Vision and Mission', '/vision/', metadata.description as string)} />
      <LayoutModule disableCover title="Vision & Mission • Alumni Network of JNV Paota, Jaipur" containerProps={{}}>
        <Vision />
      </LayoutModule>
    </>
  );
}
