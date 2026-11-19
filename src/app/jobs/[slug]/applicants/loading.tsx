import { ApplicantsSkeleton } from '@/containers/Jobs/JobSkeletons';
import LayoutModule from '@/layouts/Layout';
import { brand } from '@/config/tenant';

export default function ApplicantsLoading() {
  return (
    <LayoutModule disableCover title={`Applicants • ${brand.shortName} Jobs`}>
      <ApplicantsSkeleton />
    </LayoutModule>
  );
}
