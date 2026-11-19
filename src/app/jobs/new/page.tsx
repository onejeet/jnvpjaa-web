import { Metadata } from 'next';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { paths } from '@/config/paths';
import { constructMetadata } from '@/config/seo.config';
import LayoutModule from '@/layouts/Layout';
import { JobEditor } from '@/modules/JobEditor';
import { brand } from '@/config/tenant';

type Props = { searchParams: { slug?: string | string[] } };

const editSlug = ({ searchParams }: Props) =>
  typeof searchParams.slug === 'string' && searchParams.slug ? searchParams.slug : undefined;

export function generateMetadata(props: Props): Metadata {
  return constructMetadata({
    url: '/jobs/new/',
    noIndex: true,
    title: `${editSlug(props) ? 'Edit job' : 'Post a job'} • ${brand.shortName} Jobs`,
    description: 'Share a job or internship with fellow alumni',
  });
}

// Same pattern as the newsroom: /jobs/new posts, /jobs/new?slug=… edits. Middleware requires sign-in on /new.
export default function NewJobPage(props: Props) {
  const slug = editSlug(props);
  return (
    <LayoutModule
      disableCover
      title={`${slug ? 'Edit job' : 'Post a job'} • ${brand.shortName} Jobs`}
      containerProps={{}}
    >
      <Breadcrumbs
        items={[{ label: 'Jobs & Internships', path: paths.jobs.root }, { label: slug ? 'Edit job' : 'Post a job' }]}
      />
      <JobEditor key={slug ?? 'new'} slug={slug} />
    </LayoutModule>
  );
}
