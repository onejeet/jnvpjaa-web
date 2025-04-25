import Members from '@/containers/Members';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Members Directory • JNVPJAA',
  description:
    "Connect with alumni and faculty members of JNVPJAA. Whether you're catching up with old friends or expanding your network, this directory keeps our community connected!",
  openGraph: {
    url: 'https://jnvpjaa.org/members',
    title: 'Members Directory • JNVPJAA',
    description:
      "Connect with alumni and faculty members of JNVPJAA. Whether you're catching up with old friends or expanding your network, this directory keeps our community connected!",
    images: [
      {
        url: 'https://assets.jnvpjaa.org/branding/school.jpg',
        width: 1280,
        height: 720,
        alt: 'Members Directory • JNVPJAA',
      },
    ],
  },
};

export default function MembersPage() {
  return <Members />;
}
