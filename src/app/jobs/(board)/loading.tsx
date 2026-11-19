import { JobsBoardSkeleton } from '@/containers/Jobs/JobSkeletons';
import LayoutModule from '@/layouts/Layout';
import { brand } from '@/config/tenant';

export default function JobsLoading() {
  return (
    <LayoutModule disableCover title={`Jobs & Internships • ${brand.shortName}`}>
      <JobsBoardSkeleton />
    </LayoutModule>
  );
}
