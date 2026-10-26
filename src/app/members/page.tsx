import { constructMetadata } from '@/config/seo.config';
import Members from '@/containers/Members';
import { Metadata } from 'next';

export const metadata: Metadata = constructMetadata({
  title: 'Members Directory • JNVPJAA',
  description: 'Connect with alumni and faculty members of JNVPJAA. Whether you',
});

export default function MembersPage() {
  return <Members />;
}
