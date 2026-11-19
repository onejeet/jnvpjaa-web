// Members store handles only; URLs are always built from these fixed domains.
// Patterns must match the backend's src/utils/socialMedia.ts, which enforces them.
export const SOCIAL_PLATFORMS = [
  { key: 'linkedin', label: 'LinkedIn', domains: ['linkedin.com'], path: 'in/', pattern: /^[A-Za-z0-9-]{3,100}$/ },
  { key: 'x', label: 'X', domains: ['x.com', 'twitter.com'], path: '', pattern: /^[A-Za-z0-9_]{1,15}$/ },
  { key: 'instagram', label: 'Instagram', domains: ['instagram.com'], path: '', pattern: /^[A-Za-z0-9._]{1,30}$/ },
  {
    key: 'facebook',
    label: 'Facebook',
    domains: ['facebook.com', 'fb.com'],
    path: '',
    pattern: /^[A-Za-z0-9.]{5,50}$/,
  },
  {
    key: 'github',
    label: 'GitHub',
    domains: ['github.com'],
    path: '',
    pattern: /^[A-Za-z0-9](?:[A-Za-z0-9]|-(?=[A-Za-z0-9])){0,38}$/,
  },
  { key: 'youtube', label: 'YouTube', domains: ['youtube.com'], path: '@', pattern: /^[A-Za-z0-9._-]{3,30}$/ },
] as const;

export type SocialPlatform = (typeof SOCIAL_PLATFORMS)[number];
export type SocialKey = SocialPlatform['key'];

/** Text shown before the handle input, e.g. "linkedin.com/in/". */
export const socialPrefix = (platform: SocialPlatform) => `${platform.domains[0]}/${platform.path}`;

/** Turns a pasted profile URL or "@handle" into the bare handle. */
export const toHandle = (key: SocialKey, input: string) => {
  const platform = SOCIAL_PLATFORMS.find((item) => item.key === key);
  let value = (input || '').trim();
  const bare = value.replace(/^https?:\/\//i, '').replace(/^(www|m)\./i, '');
  const domain = platform?.domains.find((item) => bare.toLowerCase().startsWith(`${item}/`));
  if (platform && domain) {
    value = bare.slice(domain.length + 1);
    if (platform.path && value.toLowerCase().startsWith(platform.path)) value = value.slice(platform.path.length);
    value = value.split(/[/?#]/)[0];
  }
  return value.replace(/^@/, '');
};

/** Valid links from a stored `{ platform: handle }` object, in platform order. */
export const getSocialLinks = (socialMedia: unknown) => {
  if (!socialMedia || typeof socialMedia !== 'object') return [];
  const handles = socialMedia as Record<string, unknown>;
  return SOCIAL_PLATFORMS.flatMap((platform) => {
    const handle = handles[platform.key];
    if (typeof handle !== 'string' || !platform.pattern.test(handle)) return [];
    return [{ ...platform, handle, url: `https://${socialPrefix(platform)}${handle}` }];
  });
};
