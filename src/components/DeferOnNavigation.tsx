import { Suspense, type ReactNode } from 'react';
import { isRouterNavigation } from '@/utils/isRouterNavigation';

/**
 * Direct loads wait for `children` (complete server HTML and real status codes, e.g. 404).
 * In-app navigation shows `fallback` at once and streams `children` in when its data arrives.
 * Used instead of loading.tsx, which would also wrap direct loads and turn notFound() into a soft 404.
 */
export async function DeferOnNavigation({ fallback, children }: { fallback: ReactNode; children: ReactNode }) {
  return (await isRouterNavigation()) ? <Suspense fallback={fallback}>{children}</Suspense> : children;
}
