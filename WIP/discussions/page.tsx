import Discussions from '@/containers/Discussions';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Discussions • Alumni Network of JNV Paota, Jaipur',
  description: 'Community discussion board for alumni to start threads and reply.',
};

export default function DiscussionsPage() {
  return <Discussions />;
}
