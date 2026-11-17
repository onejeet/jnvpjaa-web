import { Metadata } from 'next';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { paths } from '@/config/paths';
import { constructMetadata } from '@/config/seo.config';
import { JobApplicants } from '@/containers/Jobs';
import LayoutModule from '@/layouts/Layout';

type Props = { params: { slug: string } };

export function generateMetadata({ params }: Props): Metadata {
  return constructMetadata({
    url: `/jobs/${params.slug}/applicants/`,
    noIndex: true,
    title: 'Applicants • JNVPJAA Jobs',
    description: 'Members who applied to this job',
  });
}

// Private to the poster and moderators; the API authorises the applicant list.
export default function JobApplicantsPage({ params }: Props) {
  const slug = decodeURIComponent(params.slug);
  return (
    <LayoutModule disableCover title="Applicants • JNVPJAA Jobs" containerProps={{}}>
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
