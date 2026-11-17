import { JobsBoardSkeleton } from '@/containers/Jobs/JobSkeletons';
import LayoutModule from '@/layouts/Layout';

export default function JobsLoading() {
  return (
    <LayoutModule disableCover title="Jobs & Internships • JNVPJAA">
      <JobsBoardSkeleton />
    </LayoutModule>
  );
}
