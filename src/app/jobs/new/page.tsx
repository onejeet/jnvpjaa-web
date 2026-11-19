import { Metadata } from 'next';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { paths } from '@/config/paths';
import { constructMetadata } from '@/config/seo.config';
import LayoutModule from '@/layouts/Layout';
import { JobEditor } from '@/modules/JobEditor';
import { brand } from '@/config/tenant';

type Props = { searchParams: Promise<{ slug?: string | string[] }> };

const editSlug = async (props: Props) => {
  const searchParams = await props.searchParams;
  return typeof searchParams.slug === 'string' && searchParams.slug ? searchParams.slug : undefined;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  return constructMetadata({
    url: '/jobs/new/',
    noIndex: true,
    title: `${(await editSlug(props)) ? 'Edit job' : 'Post a job'} • ${brand.shortName} Jobs`,
    description: 'Share a job or internship with fellow alumni',
  });
}

// Same pattern as the newsroom: /jobs/new posts, /jobs/new?slug=… edits. Middleware requires sign-in on /new.
export default async function NewJobPage(props: Props) {
  const slug = await editSlug(props);
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
