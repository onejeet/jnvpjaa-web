/**
 * Utility function to check if code is running in a browser environment
 * This helps prevent "document is not defined" errors during server-side rendering
 * or static site generation.
 */
export const isBrowser = (): boolean => {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
};

export default isBrowser;
