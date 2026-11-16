// No imports: tests load this file in isolation, so the query runner and document are passed in.
type LatestNewsQuery = (opts: {
  query: unknown;
  variables: { limit: number };
  errorPolicy: 'all';
  fetchPolicy: 'no-cache';
  context: { fetchOptions: { cache: 'no-store' } };
}) => Promise<{ data?: any }>;

/** The newest published news for the homepage; [] when there are none or the API fails, so the section hides. */
export async function latestNews<T = any>(query: LatestNewsQuery, document: unknown): Promise<T[]> {
  try {
    const { data } = await query({
      query: document,
      variables: { limit: 3 },
      errorPolicy: 'all',
      fetchPolicy: 'no-cache',
      // Next caches server POST fetches even on dynamic routes.
      context: { fetchOptions: { cache: 'no-store' } },
    });
    return data?.newsPosts?.data ?? [];
  } catch {
    return [];
  }
}
