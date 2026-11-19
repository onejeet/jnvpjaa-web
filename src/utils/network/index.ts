// utils/network.ts
export const checkInternetConnection = async (): Promise<boolean> => {
  try {
    // no-cors gives an opaque response (status is always 0), so reaching the server at all means we're online.
    await fetch('https://www.gstatic.com/generate_204', { mode: 'no-cors', cache: 'no-store' });
    return true;
  } catch (error) {
    return false; // Network request failed, likely offline
  }
};
