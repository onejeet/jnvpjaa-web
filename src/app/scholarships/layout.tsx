'use client';

import { requireModule } from '@/config/features';
import ScholarshipGate from '@/containers/Scholarships/ScholarshipGate';

export default function ScholarshipsLayout({ children }: { children: React.ReactNode }) {
  requireModule('scholarship');
  return <ScholarshipGate>{children}</ScholarshipGate>;
}
