// Keep callback requests independent of Apollo's session refresh and SSR queries.
export async function requestGoogleAuth(query: string, variables: Record<string, unknown> = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:4000/client', {
      method: 'POST',
      credentials: 'include',
      cache: 'no-store',
      signal: controller.signal,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    });
    const result = await response.json();
    if (!response.ok || result.errors?.length || !result.data) {
      throw Object.assign(
        new Error(result.errors?.[0]?.message || 'Could not complete Google sign-in. Please try again.'),
        {
          code: result.errors?.[0]?.extensions?.code,
        }
      );
    }
    return result.data;
  } catch (error) {
    if (controller.signal.aborted) {
      throw new Error('Google sign-in took too long. Please return to sign-in and try again.');
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}
