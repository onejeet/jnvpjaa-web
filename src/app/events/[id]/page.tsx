import { PageProps } from '@/types/global';
import { Event, GetEventDetailsDocument, GetEventDetailsQuery } from '@/apollo/hooks';
import EventDetails from '@/containers/EventDetails';
import { SEO_CONFIG, generateSchema } from '@/config/seo.config';
import { initializeApollo } from '@/utils/apollo';
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';

// Generate dynamic metadata for the event page
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = params;
  const requestHeaders = headers();
  const cookieHeader = requestHeaders.get('cookie');
  const apolloClient = initializeApollo({ cookie: cookieHeader ?? '' });

  try {
    const { data } = await apolloClient.query<GetEventDetailsQuery>({
      query: GetEventDetailsDocument,
      variables: { id: parseInt(id, 10) },
    });

    const event = data?.getEventDetails;

    if (!event) return { title: 'Event Not Found' };

    const title = `${event.title} • JNVPJAA Events`;
    const description = event.summary || SEO_CONFIG.description;
    const url = `${SEO_CONFIG.url}/events/${event.id}`;
    const image = event.cover?.url || SEO_CONFIG.defaultImage;

    return {
      title,
      description,
      alternates: { canonical: url },
      openGraph: {
        type: 'website',
        url,
        title,
        description,
        images: [{ url: image, width: 1280, height: 720, alt: event.title }],
      },
      twitter: {
        card: 'summary_large_image',
        site: SEO_CONFIG.twitterHandle,
        creator: SEO_CONFIG.twitterHandle,
        title,
        description,
        images: [image],
      },
    };
  } catch (error) {
    console.error('GraphQL Error (event):', error);
    return {
      title: 'Event Not Found',
      description: 'The requested event could not be found.',
    };
  }
}

// This is a Server Component that fetches data
async function getEventDetails(id: string) {
  const apolloClient = initializeApollo();

  try {
    const { data } = await apolloClient.query<GetEventDetailsQuery>({
      query: GetEventDetailsDocument,
      variables: { id: parseInt(id, 10) },
    });

    if (!data?.getEventDetails) {
      return notFound();
    }

    return data?.getEventDetails;
  } catch (error) {
    console.error('GraphQL Error (event):', error);
    return notFound();
  }
}

export default async function EventDetailsPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const event = await getEventDetails(id);

  return (
    <>
      {event && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateSchema.event(event)) }}
        />
      )}
      <EventDetails event={event as Event} />
    </>
  );
}
