/** Turns a user-agent string into "Chrome on macOS"-style labels for the session list. */
export function describeDevice(userAgent?: string | null): { name: string; mobile: boolean } {
  const ua = userAgent || '';
  if (!ua) return { name: 'Unknown device', mobile: false };
  // Order matters: Edge, Opera and Samsung all claim Chrome, and Chrome claims Safari.
  const browser = /Edg\//.test(ua)
    ? 'Edge'
    : /OPR\/|Opera/.test(ua)
      ? 'Opera'
      : /SamsungBrowser/.test(ua)
        ? 'Samsung Internet'
        : /Firefox\/|FxiOS/.test(ua)
          ? 'Firefox'
          : /Chrome\/|CriOS/.test(ua)
            ? 'Chrome'
            : /Safari\//.test(ua)
              ? 'Safari'
              : 'Browser';
  const os = /iPhone/.test(ua)
    ? 'iPhone'
    : /iPad/.test(ua)
      ? 'iPad'
      : /Android/.test(ua)
        ? 'Android'
        : /Mac OS X|Macintosh/.test(ua)
          ? 'macOS'
          : /Windows/.test(ua)
            ? 'Windows'
            : /CrOS/.test(ua)
              ? 'ChromeOS'
              : /Linux/.test(ua)
                ? 'Linux'
                : '';
  return { name: os ? `${browser} on ${os}` : browser, mobile: /Mobi|iPhone|Android/.test(ua) };
}
