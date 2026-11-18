import { cache } from 'react';
import { CONTENT_PAGE, type ContentPage } from '@/apollo/contentPageOperations';
import { NO_STORE } from '@/modules/Newsroom/newsroom.utils';
import type { ContentFields } from './contentPages.schema';
import type { ContentPageSlug } from './contentPages.registry';
import { initializeApollo } from '@/utils/apollo';

/** Server-side read of a public page; null when it is hidden or missing. */
export const getContentPage = cache(
  async <F extends ContentFields>(slug: ContentPageSlug): Promise<ContentPage<F> | null> => {
    const { data, errors } = await initializeApollo().query<{ contentPage: ContentPage<F> | null }>({
      query: CONTENT_PAGE,
      variables: { slug },
      errorPolicy: 'all',
      fetchPolicy: 'no-cache',
      context: NO_STORE,
    });
    if (errors?.length) throw new Error('Could not load the page');
    return data?.contentPage || null;
  }
) as <F extends ContentFields>(slug: ContentPageSlug) => Promise<ContentPage<F> | null>;
