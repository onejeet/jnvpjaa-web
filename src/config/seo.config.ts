import { Metadata } from 'next';

const siteUrl = 'https://jnvpjaa.org';

export const SEO_CONFIG = {
  siteName: 'JNVPJAA',
  title: 'JNVPJAA • Alumni Network of JNV Paota, Jaipur',
  titleTemplate: '%s | JNVPJAA',
  description:
    'The Official Alumni Network of Jawahar Navodaya Vidyalaya Paota, Jaipur. JNVs are a testament to innovative state-sponsored education in India. Connect with fellow alumni, share experiences, and stay updated on events that honor our shared journey and the values of our beloved school.',
  url: siteUrl,
  defaultImage: 'https://assets.jnvpjaa.org/images/cover-2.webp',
  twitterHandle: '@jnvpjaa', // Update with actual handle if available
  locale: 'en_IN',
};

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SEO_CONFIG.url),
  applicationName: SEO_CONFIG.siteName,
  title: {
    template: SEO_CONFIG.titleTemplate,
    default: SEO_CONFIG.title,
  },
  description: SEO_CONFIG.description,
  alternates: {
    canonical: SEO_CONFIG.url,
  },
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
        width: 1280,
        height: 720,
        alt: SEO_CONFIG.siteName,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: SEO_CONFIG.twitterHandle,
    creator: SEO_CONFIG.twitterHandle,
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
  url?: string;
  noIndex?: boolean;
} = {}): Metadata {
  const customTitle = title ? title : SEO_CONFIG.title; // If template is used, next.js will append the template. But we're just providing the string.

  return {
    title: customTitle,
    description: description || SEO_CONFIG.description,
    alternates: {
      canonical: url || SEO_CONFIG.url,
    },
    openGraph: {
      ...defaultMetadata.openGraph,
      title: customTitle,
      description: description || SEO_CONFIG.description,
      url: url || SEO_CONFIG.url,
      images: [
        {
          url: image || SEO_CONFIG.defaultImage,
          width: 1280,
          height: 720,
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
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.url,
    logo: `${SEO_CONFIG.url}/icons/icon-512.png`,
    description: SEO_CONFIG.description,
    sameAs: [
      'https://www.facebook.com/jnvpjaa', // Replace with actual links if any
      'https://www.linkedin.com/company/jnvpjaa',
    ],
  }),
  website: () => ({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.url,
  }),
  blogPosting: (blog: any) => ({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    image: blog.cover?.url ? [blog.cover.url] : [SEO_CONFIG.defaultImage],
    author: {
      '@type': 'Person',
      name: `${blog.author?.firstName || ''} ${blog.author?.lastName || ''}`.trim() || 'JNVPJAA',
    },
    publisher: {
      '@type': 'Organization',
      name: SEO_CONFIG.siteName,
      logo: {
        '@type': 'ImageObject',
        url: `${SEO_CONFIG.url}/icons/icon-512.png`,
      },
    },
    datePublished: blog.createdAt,
    dateModified: blog.updatedAt || blog.createdAt,
    description: blog.summary,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SEO_CONFIG.url}/blog/${blog.slug}`,
    },
  }),
  event: (event: any) => ({
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    startDate: event.date,
    endDate: event.endDate || event.date,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'Place',
      name: event.venue || 'TBD',
      address: {
        '@type': 'Text',
        streetAddress: event.address || 'TBD', // simplified address
      },
    },
    image: [event.cover?.url || SEO_CONFIG.defaultImage],
    description: event.summary,
    organizer: {
      '@type': 'Organization',
      name: SEO_CONFIG.siteName,
      url: SEO_CONFIG.url,
    },
  }),
};
