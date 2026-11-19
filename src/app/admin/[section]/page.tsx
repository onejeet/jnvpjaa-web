import { notFound } from 'next/navigation';

import AdminPanel, { type AdminPanelSection } from '@/containers/AdminPanel/AdminPanel';
import ScholarshipSettings from '@/containers/AdminPanel/ScholarshipSettings';
import { requireModule } from '@/config/features';

const PANEL_SECTIONS: AdminPanelSection[] = ['access', 'executive', 'coordinators', 'assignments', 'settings'];

export default async function AdminSectionPage(props: { params: Promise<{ section: string }> }) {
  const { section } = await props.params;
  if (section === 'scholarship') {
    requireModule('scholarship');
    return <ScholarshipSettings />;
  }
  if (!PANEL_SECTIONS.includes(section as AdminPanelSection)) notFound();
  return <AdminPanel section={section as AdminPanelSection} />;
}
