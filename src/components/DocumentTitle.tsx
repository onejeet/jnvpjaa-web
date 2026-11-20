'use client';

import { useEffect } from 'react';

/** Sets the tab title once streamed data arrives (in-app navigation skips the data lookup in generateMetadata). */
export function DocumentTitle({ title }: { title: string }) {
  useEffect(() => {
    document.title = title;
  }, [title]);
  return null;
}
