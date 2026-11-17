import { JobFormSkeleton } from '@/containers/Jobs/JobSkeletons';
import LayoutModule from '@/layouts/Layout';

export default function JobFormLoading() {
  return (
    <LayoutModule disableCover title="Post a job • JNVPJAA Jobs">
      <JobFormSkeleton />
    </LayoutModule>
  );
}
