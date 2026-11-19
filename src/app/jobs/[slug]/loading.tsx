import { JobDetailSkeleton } from '@/containers/Jobs/JobSkeletons';
import LayoutModule from '@/layouts/Layout';
import { brand } from '@/config/tenant';

export default function JobLoading() {
  return (
    <LayoutModule disableCover title={`Jobs & Internships • ${brand.shortName}`}>
      <JobDetailSkeleton />
    </LayoutModule>
  );
}
