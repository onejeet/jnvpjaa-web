'use client';

import { useQuery } from '@apollo/client';
import { HIDDEN_CONTENT_PAGES } from '@/apollo/contentPageOperations';
import { CONTENT_PAGES, isContentPageSlug } from './contentPages.registry';

const NONE: string[] = [];

/** Paths of pages an editor has hidden, so menus stop linking to a 404. */
export default function useHiddenPagePaths(): string[] {
  const { data } = useQuery<{ hiddenContentPages: string[] }>(HIDDEN_CONTENT_PAGES);
  const slugs = data?.hiddenContentPages;
  return slugs?.length ? slugs.filter(isContentPageSlug).map((slug) => CONTENT_PAGES[slug].path) : NONE;
}
