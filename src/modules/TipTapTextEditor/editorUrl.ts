export const isSafeWebUrl = (value: string): boolean => {
  try {
    const url = new URL(value.trim());
    return ['https:', 'http:'].includes(url.protocol) && Boolean(url.hostname) && !url.username && !url.password;
  } catch {
    return false;
  }
};

export const isYouTubeUrl = (value: string): boolean => {
  if (!isSafeWebUrl(value)) return false;
  const host = new URL(value.trim()).hostname.toLowerCase();
  return ['youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtu.be', 'www.youtu.be'].includes(host);
};
