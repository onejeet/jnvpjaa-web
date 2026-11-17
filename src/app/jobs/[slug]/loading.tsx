import { JobDetailSkeleton } from '@/containers/Jobs/JobSkeletons';
import LayoutModule from '@/layouts/Layout';

export default function JobLoading() {
  return (
    <LayoutModule disableCover title="Jobs & Internships • JNVPJAA">
      <JobDetailSkeleton />
    </LayoutModule>
  );
}
