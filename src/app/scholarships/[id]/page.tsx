'use client';

import ScholarshipDetail from '@/containers/Scholarships/ScholarshipDetail';

export default function ScholarshipDetailPage({ params }: { params: { id: string } }) {
  return <ScholarshipDetail applicationId={params.id} />;
}
