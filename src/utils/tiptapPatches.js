/**
 * This file contains a simple utility to check if code is running in a browser environment.
 * We use this to prevent TipTap editor from executing during server-side rendering.
 */

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

// Export the isBrowser check for use elsewhere
export { isBrowser };

// We're intentionally not mocking the document object anymore
// as it was causing Object.assign issues
