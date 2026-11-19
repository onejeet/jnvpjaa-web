import { Metadata } from 'next';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { paths } from '@/config/paths';
import { constructMetadata } from '@/config/seo.config';
import { JobApplicants } from '@/containers/Jobs';
import LayoutModule from '@/layouts/Layout';
import { brand } from '@/config/tenant';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  return constructMetadata({
    url: `/jobs/${params.slug}/applicants/`,
    noIndex: true,
    title: `Applicants • ${brand.shortName} Jobs`,
    description: 'Members who applied to this job',
  });
}

// Private to the poster and moderators; the API authorises the applicant list.
export default async function JobApplicantsPage(props: Props) {
  const params = await props.params;
  const slug = decodeURIComponent(params.slug);
  return (
    <LayoutModule disableCover title={`Applicants • ${brand.shortName} Jobs`} containerProps={{}}>
      <Breadcrumbs
        items={[
          { label: 'Jobs & Internships', path: paths.jobs.root },
          { label: 'Job', path: paths.jobs.getJobUrl(slug) },
          { label: 'Applicants' },
        ]}
      />
      <JobApplicants slug={slug} />
    </LayoutModule>
  );
}
