'use client';

import LayoutModule from '@/layouts/Layout';
import NewEvent from 'src/modules/NewEvent';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { brand } from '@/config/tenant';

// Note: This is a Client Component because it requires authentication
// Metadata is defined in the layout.tsx file

const breadcrumbsList = [{ label: 'Events', path: '/events' }, { label: 'Create an event' }];

export default function NewEventPage() {
  return (
    <LayoutModule disableCover title={`Create New Event • ${brand.shortName}`} containerProps={{}}>
      <Breadcrumbs items={breadcrumbsList} />
      <NewEvent />
    </LayoutModule>
  );
}
