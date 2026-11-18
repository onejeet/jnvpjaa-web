'use client';

import ScholarshipGate from '@/containers/Scholarships/ScholarshipGate';

export default function ScholarshipsLayout({ children }: { children: React.ReactNode }) {
  return <ScholarshipGate>{children}</ScholarshipGate>;
}
