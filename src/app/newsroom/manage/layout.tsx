import { Metadata } from 'next';
import { constructMetadata } from '@/config/seo.config';
import LayoutModule from '@/layouts/Layout';
import { NewsroomGate } from '@/modules/NewsEditor';

export const metadata: Metadata = constructMetadata({
  url: '/newsroom/manage/',
  noIndex: true,
  title: 'Manage Newsroom • JNVPJAA',
  description: 'Write and publish JNVPJAA newsroom stories',
});

export default function NewsroomManageLayout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutModule disableCover title="Manage Newsroom • JNVPJAA" containerProps={{}}>
      <NewsroomGate>{children}</NewsroomGate>
    </LayoutModule>
  );
}
