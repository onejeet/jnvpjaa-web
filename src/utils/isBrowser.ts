/**
 * Utility function to check if code is running in a browser environment
 * This helps prevent "document is not defined" errors during static rendering
 */
export const isBrowser = (): boolean => {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
};
