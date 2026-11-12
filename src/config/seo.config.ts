import { Metadata } from 'next';

const siteUrl = 'https://jnvpjaa.org';

export const SEO_CONFIG = {
  siteName: 'JNVPJAA',
  title: 'JNVPJAA | JNV Paota Jaipur Alumni Association',
  titleTemplate: '%s | JNVPJAA',
  description:
    'Connect with alumni of Jawahar Navodaya Vidyalaya Paota, Jaipur. Explore JNVPJAA events, alumni stories, photo galleries and community initiatives.',
  url: siteUrl,
  defaultImage: `${siteUrl}/assets/images/cover-2.webp`,
  locale: 'en_IN',
};

export function canonicalUrl(path: string): string {
  const url = new URL(path, SEO_CONFIG.url);
  if (!url.pathname.endsWith('/')) url.pathname += '/';
  url.search = '';
  url.hash = '';
  return url.href;
}

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SEO_CONFIG.url),
  applicationName: SEO_CONFIG.siteName,
  title: {
    template: SEO_CONFIG.titleTemplate,
    default: SEO_CONFIG.title,
  },
  description: SEO_CONFIG.description,
  alternates: { canonical: canonicalUrl('/') },
  openGraph: {
    type: 'website',
    locale: SEO_CONFIG.locale,
    url: SEO_CONFIG.url,
    siteName: SEO_CONFIG.siteName,
    title: SEO_CONFIG.title,
    description: SEO_CONFIG.description,
    images: [
      {
        url: SEO_CONFIG.defaultImage,
        width: 1300,
        height: 585,
        alt: SEO_CONFIG.siteName,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO_CONFIG.title,
    description: SEO_CONFIG.description,
    images: [SEO_CONFIG.defaultImage],
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.png' },
      { url: '/icons/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icons/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [{ url: '/icons/icon-512.png' }],
  },
  other: {
    'mobile-web-app-capable': 'yes',
  },
};

export function constructMetadata({
  title,
  description,
  image,
  url,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  url: string;
  noIndex?: boolean;
}): Metadata {
  const customTitle = title || SEO_CONFIG.title;
  const canonical = canonicalUrl(url);

  return {
    title: { absolute: customTitle.includes('JNVPJAA') ? customTitle : `${customTitle} | JNVPJAA` },
    description: description || SEO_CONFIG.description,
    alternates: {
      canonical,
    },
    openGraph: {
      ...defaultMetadata.openGraph,
      title: customTitle,
      description: description || SEO_CONFIG.description,
      url: canonical,
      images: [
        {
          url: image || SEO_CONFIG.defaultImage,
          alt: title || SEO_CONFIG.siteName,
        },
      ],
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: customTitle,
      description: description || SEO_CONFIG.description,
      images: [image || SEO_CONFIG.defaultImage],
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}

export const generateSchema = {
  organization: () => ({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SEO_CONFIG.url}/#organization`,
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.url,
    logo: `${SEO_CONFIG.url}/icons/icon-512.png`,
    description: SEO_CONFIG.description,
  }),
  website: () => ({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SEO_CONFIG.url}/#website`,
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.url,
    inLanguage: 'en-IN',
    publisher: { '@id': `${SEO_CONFIG.url}/#organization` },
  }),
  breadcrumb: (items: { name: string; url: string }[]) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: canonicalUrl(item.url),
    })),
  }),
  collectionPage: (name: string, path: string, description: string) => ({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${canonicalUrl(path)}#webpage`,
    name,
    description,
    url: canonicalUrl(path),
    inLanguage: 'en-IN',
    isPartOf: { '@id': `${SEO_CONFIG.url}/#website` },
  }),
  webPage: (name: string, path: string, description: string, type = 'WebPage') => ({
    '@context': 'https://schema.org',
    '@type': type,
    '@id': `${canonicalUrl(path)}#webpage`,
    name,
    description,
    url: canonicalUrl(path),
    inLanguage: 'en-IN',
    isPartOf: { '@id': `${SEO_CONFIG.url}/#website` },
  }),
  blogPosting: (blog: any) => ({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${canonicalUrl(`/blog/${encodeURIComponent(blog.slug)}`)}#article`,
    headline: blog.title,
    ...(blog.cover?.url ? { image: [blog.cover.url] } : {}),
    author: blog.author?.firstName
      ? {
          '@type': 'Person',
          name: `${blog.author.firstName} ${blog.author.lastName || ''}`.trim(),
        }
      : { '@id': `${SEO_CONFIG.url}/#organization` },
    publisher: {
      '@type': 'Organization',
      name: SEO_CONFIG.siteName,
      logo: {
        '@type': 'ImageObject',
        url: `${SEO_CONFIG.url}/icons/icon-512.png`,
      },
    },
    dateCreated: blog.createdAt,
    dateModified: blog.updatedAt || blog.createdAt,
    description: blog.summary || undefined,
    inLanguage: 'en-IN',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl(`/blog/${encodeURIComponent(blog.slug)}`),
    },
  }),
  event: (event: any) => ({
    '@context': 'https://schema.org',
    '@type': 'Event',
    '@id': `${canonicalUrl(`/events/${event.id}`)}#event`,
    name: event.title,
    url: canonicalUrl(`/events/${event.id}`),
    startDate: event.startDate,
    ...(event.endDate ? { endDate: event.endDate } : {}),
    eventAttendanceMode:
      event.medium === 'online'
        ? 'https://schema.org/OnlineEventAttendanceMode'
        : 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    // Public event data masks private locations. Never publish a fabricated venue.
    ...(event.location && event.location !== 'protected'
      ? { location: { '@type': 'Place', name: event.location, address: event.location } }
      : {}),
    ...(event.cover?.url ? { image: [event.cover.url] } : {}),
    description: event.summary || event.description,
    organizer: {
      '@type': 'Organization',
      name: SEO_CONFIG.siteName,
      url: SEO_CONFIG.url,
    },
  }),
};
