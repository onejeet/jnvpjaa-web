import { ApplicantsSkeleton } from '@/containers/Jobs/JobSkeletons';
import LayoutModule from '@/layouts/Layout';

export default function ApplicantsLoading() {
  return (
    <LayoutModule disableCover title="Applicants • JNVPJAA Jobs">
      <ApplicantsSkeleton />
    </LayoutModule>
  );
}
