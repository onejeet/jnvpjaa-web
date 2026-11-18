'use client';

import LayoutModule from '@/layouts/Layout';
import NewEvent from 'src/modules/NewEvent';
import Breadcrumbs from '@/components/common/Breadcrumbs';

// Note: This is a Client Component because it requires authentication
// Metadata is defined in the layout.tsx file

const breadcrumbsList = [{ label: 'Events', path: '/events' }, { label: 'Edit event' }];

export default function EditEventPage() {
  return (
    <LayoutModule disableCover title="Edit Event • Alumni Network of JNV Paota, Jaipur" containerProps={{}}>
      <Breadcrumbs items={breadcrumbsList} />
      <NewEvent />
    </LayoutModule>
  );
}
