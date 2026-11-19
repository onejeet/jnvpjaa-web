import { JobFormSkeleton } from '@/containers/Jobs/JobSkeletons';
import LayoutModule from '@/layouts/Layout';
import { brand } from '@/config/tenant';

export default function JobFormLoading() {
  return (
    <LayoutModule disableCover title={`Post a job • ${brand.shortName} Jobs`}>
      <JobFormSkeleton />
    </LayoutModule>
  );
}
