// No imports: unit tests load this file on its own.
/** Run a landing-page query and pick its list; [] when the API fails, so that section hides instead of the page erroring. */
export async function safeList<T>(
  run: () => Promise<{ data?: any }>,
  pick: (data: any) => (T | null)[] | null | undefined
) {
  try {
    const { data } = await run();
    return (pick(data ?? {}) ?? []).filter(Boolean) as T[];
  } catch {
    return [] as T[];
  }
}
