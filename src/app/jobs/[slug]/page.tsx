import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import { JOB, type Job } from '@/apollo/jobsOperations';
import { JsonLd } from '@/components/JsonLd';
import { SEO_CONFIG, canonicalUrl, generateSchema } from '@/config/seo.config';
import { JobDetail } from '@/containers/Jobs';
import { NO_STORE } from '@/modules/Newsroom/newsroom.utils';
import { initializeApollo } from '@/utils/apollo';
import { brand } from '@/config/tenant';

export const dynamic = 'force-dynamic';

const getJob = cache(async (slug: string): Promise<Job | null> => {
  const { data, errors } = await initializeApollo().query<{ job: Job | null }>({
    query: JOB,
    variables: { slug },
    errorPolicy: 'all',
    fetchPolicy: 'no-cache',
    context: NO_STORE,
  });
  if (errors?.length && !data?.job) throw new Error('Could not load the job');
  return data?.job || null;
});

const plainText = (html = '') =>
  html
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const EMPLOYMENT_TYPE: Record<Job['type'], string> = {
  FULL_TIME: 'FULL_TIME',
  PART_TIME: 'PART_TIME',
  INTERNSHIP: 'INTERN',
  CONTRACT: 'CONTRACTOR',
};

// schema.org JobPosting, so open roles can show in job search results.
const jobPostingSchema = (job: Job) => ({
  '@context': 'https://schema.org',
  '@type': 'JobPosting',
  title: job.title,
  description: job.description || job.title,
  datePosted: job.createdAt,
  ...(job.deadline ? { validThrough: job.deadline } : {}),
  employmentType: EMPLOYMENT_TYPE[job.type],
  hiringOrganization: {
    '@type': 'Organization',
    name: job.company,
    ...(job.companyWebsite ? { sameAs: job.companyWebsite } : {}),
  },
  ...(job.workMode === 'REMOTE'
    ? { jobLocationType: 'TELECOMMUTE', applicantLocationRequirements: { '@type': 'Country', name: 'India' } }
    : {
        jobLocation: {
          '@type': 'Place',
          address: { '@type': 'PostalAddress', addressLocality: job.location, addressCountry: 'IN' },
        },
      }),
  ...(job.salaryMin || job.salaryMax
    ? {
        baseSalary: {
          '@type': 'MonetaryAmount',
          currency: 'INR',
          value: {
            '@type': 'QuantitativeValue',
            ...(job.salaryMin ? { minValue: job.salaryMin } : {}),
            ...(job.salaryMax ? { maxValue: job.salaryMax } : {}),
            unitText: job.salaryPeriod === 'MONTH' ? 'MONTH' : 'YEAR',
          },
        },
      }
    : {}),
});

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const job = await getJob(decodeURIComponent(params.slug));
  if (!job) return { title: 'Job not found', robots: { index: false, follow: false } };

  const url = canonicalUrl(`/jobs/${encodeURIComponent(job.slug)}`);
  const title = `${job.title} at ${job.company} | ${brand.shortName} Jobs`;
  const description = plainText(job.description).slice(0, 160) || `${job.title} at ${job.company}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    // Closed openings stay reachable by link but drop out of search results.
    robots: job.isAccepting ? undefined : { index: false, follow: true },
    openGraph: {
      type: 'website',
      url,
      siteName: SEO_CONFIG.siteName,
      locale: SEO_CONFIG.locale,
      title,
      description,
      images: [{ url: SEO_CONFIG.defaultImage, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [SEO_CONFIG.defaultImage] },
  };
}

export default async function JobPage({ params }: { params: { slug: string } }) {
  const job = await getJob(decodeURIComponent(params.slug));
  if (!job) notFound();

  return (
    <>
      {job.isAccepting && <JsonLd data={jobPostingSchema(job)} />}
      <JsonLd
        data={generateSchema.breadcrumb([
          { name: 'Home', url: '/' },
          { name: 'Jobs & Internships', url: '/jobs/' },
          { name: job.title, url: `/jobs/${encodeURIComponent(job.slug)}/` },
        ])}
      />
      <JobDetail job={job} />
    </>
  );
}
