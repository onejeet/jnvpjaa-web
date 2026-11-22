import { Suspense } from 'react';
import { DiscussionFeed } from '@/containers/Discussions';

export default function DiscussionsPage() {
  // useSearchParams needs a Suspense boundary.
  return (
    <Suspense>
      <DiscussionFeed />
    </Suspense>
  );
}
