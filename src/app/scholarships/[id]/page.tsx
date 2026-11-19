'use client';

import { use } from 'react';
import ScholarshipDetail from '@/containers/Scholarships/ScholarshipDetail';

export default function ScholarshipDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <ScholarshipDetail applicationId={id} />;
}
