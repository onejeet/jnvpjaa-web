// utils/network.ts
export const checkInternetConnection = async (): Promise<boolean> => {
  try {
    const response = await fetch('https://www.gstatic.com/generate_204', {
      method: 'GET',
      mode: 'no-cors', // Prevents CORS errors by making an opaque request
    });
    return response.status === 204; // Should be true if online
  } catch (error) {
    return false; // Network request failed, likely offline
  }
};
