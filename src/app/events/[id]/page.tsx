import { Event, GetEventDetailsDocument, GetEventDetailsQuery } from '@/apollo/hooks';
import EventDetails from '@/containers/EventDetails';
import { initializeApollo } from '@/utils/apollo';
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

// Generate dynamic metadata for the event page
export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;
  const apolloClient = initializeApollo();

  try {
    const { data } = await apolloClient.query<GetEventDetailsQuery>({
      query: GetEventDetailsDocument,
      variables: { slug: id },
    });

    const event = data.getEventDetails;

    if (!event) return notFound();

    return {
      title: `${event.title} • JNVPJAA Events`,
      description: event.summary || '',
      openGraph: {
        url: `https://jnvpjaa.org/events/${event.id}`,
        title: `${event.title} • JNVPJAA Events`,
        description: event.summary || '',
        images: [
          {
            url: event.cover?.url || 'https://assets.jnvpjaa.org/images/cover-2.webp',
            width: 1280,
            height: 720,
            alt: event.title || 'JNVPJAA',
          },
        ],
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
      variables: { slug: id },
    });

    if (!data.getEventDetails) {
      return notFound();
    }

    return data.getEventDetails;
  } catch (error) {
    console.error('GraphQL Error (event):', error);
    return notFound();
  }
}

export default async function EventDetailsPage({ params }: { params: { id: string } }) {
  const event = await getEventDetails(params.id);

  return <EventDetails event={event} />;
}
