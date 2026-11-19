import { JOBS, type Job, type JobExperience, type JobType, type WorkMode } from '@/apollo/jobsOperations';
import { JsonLd } from '@/components/JsonLd';
import { constructMetadata, generateSchema } from '@/config/seo.config';
import { JobsBoard } from '@/containers/Jobs';
import {
  EXPERIENCE_LABEL,
  JOB_TYPE_LABEL,
  JOBS_PER_PAGE,
  WORK_MODE_LABEL,
  type JobFilters,
} from '@/modules/Jobs/jobs.utils';
import { NO_STORE } from '@/modules/Newsroom/newsroom.utils';
import { initializeApollo } from '@/utils/apollo';
import { brand } from '@/config/tenant';

// New openings must appear as soon as they are posted.
export const dynamic = 'force-dynamic';

const description = `Jobs and internships shared by alumni of ${brand.institution.shortName}, ${brand.institution.city} — apply in one step with your profile.`;

export const metadata = constructMetadata({
  url: '/jobs/',
  title: `Jobs & Internships • ${brand.shortName}`,
  description,
});

type SearchParams = Record<string, string | string[] | undefined>;

const pick = <T extends string>(value: unknown, options: Record<string, string>) =>
  typeof value === 'string' && value in options ? (value as T) : undefined;

const readFilters = (params: SearchParams): JobFilters => ({
  type: pick<JobType>(params.type, JOB_TYPE_LABEL),
  mode: pick<WorkMode>(params.mode, WORK_MODE_LABEL),
  exp: pick<JobExperience>(params.exp, EXPERIENCE_LABEL),
  q: typeof params.q === 'string' ? params.q.trim().slice(0, 80) || undefined : undefined,
  page: Math.max(Number(params.page) || 1, 1),
});

async function getJobs(filters: JobFilters): Promise<{ data: Job[]; total: number; failed?: boolean }> {
  try {
    const { data, errors } = await initializeApollo().query<{ jobs: { data: Job[]; total: number } }>({
      query: JOBS,
      variables: {
        type: filters.type,
        workMode: filters.mode,
        experience: filters.exp,
        search: filters.q,
        limit: JOBS_PER_PAGE,
        offset: (filters.page - 1) * JOBS_PER_PAGE,
      },
      errorPolicy: 'all',
      fetchPolicy: 'no-cache',
      context: NO_STORE,
    });
    return data?.jobs || { data: [], total: 0, failed: Boolean(errors?.length) };
  } catch {
    return { data: [], total: 0, failed: true };
  }
}

export default async function JobsPage({ searchParams }: { searchParams: SearchParams }) {
  const filters = readFilters(searchParams || {});
  const { data, total, failed } = await getJobs(filters);
  return (
    <>
      <JsonLd data={generateSchema.collectionPage(`${brand.shortName} Jobs & Internships`, '/jobs/', description)} />
      <JobsBoard jobs={data} total={total} filters={filters} failed={failed} />
    </>
  );
}
