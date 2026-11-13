import { isRouterNavigation } from '@/utils/isRouterNavigation';
import { EventStatus, GetEventDetailsDocument, GetEventDetailsQuery } from '@/apollo/hooks';
import { JsonLd } from '@/components/JsonLd';
import EventDetails from '@/containers/EventDetails';
import { SEO_CONFIG, canonicalUrl, generateSchema } from '@/config/seo.config';
import { initializeApollo } from '@/utils/apollo';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';

export const dynamic = 'force-dynamic';

const getPublicEvent = cache(async (id: string) => {
  const numericId = Number(id);
  if (!Number.isSafeInteger(numericId) || numericId <= 0) return null;

  const { data, errors } = await initializeApollo().query<GetEventDetailsQuery>({
    query: GetEventDetailsDocument,
    variables: { id: numericId },
    errorPolicy: 'all',
  });
  if (errors?.some((error) => error.extensions?.code !== 'NOT_FOUND')) {
    throw new Error('Could not load event');
  }
  const event = data?.getEventDetails;
  return event?.status === EventStatus.Published ? event : null;
});

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  if (isRouterNavigation()) return { title: 'Event | JNVPJAA' };
  const event = await getPublicEvent(params.id);
  if (!event) return { title: 'Event not found', robots: { index: false, follow: false } };

  const url = canonicalUrl(`/events/${event.id}`);
  const title = `${event.title} | JNVPJAA Events`;
  const description = event.summary || SEO_CONFIG.description;
  const image = event.cover?.url || SEO_CONFIG.defaultImage;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      siteName: SEO_CONFIG.siteName,
      locale: SEO_CONFIG.locale,
      title,
      description,
      images: [{ url: image, alt: event.title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}

export default async function EventDetailsPage({ params }: { params: { id: string } }) {
  if (isRouterNavigation()) return <EventDetails />;
  const event = await getPublicEvent(params.id);
  if (!event) notFound();

  return (
    <>
      <JsonLd data={generateSchema.event(event)} />
      <JsonLd
        data={generateSchema.breadcrumb([
          { name: 'Home', url: '/' },
          { name: 'Events', url: '/events/' },
          { name: event.title, url: `/events/${event.id}/` },
        ])}
      />
      <EventDetails event={event} />
    </>
  );
}
