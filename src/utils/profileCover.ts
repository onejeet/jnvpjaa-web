const profileCovers = [
  '/assets/images/cover-2.webp',
  '/assets/images/slider-1.webp',
  '/assets/images/slider-2.webp',
] as const;

export const getProfileCover = (userId?: string | null) => {
  if (!userId) return profileCovers[0];

  // The member ID gives the same cover on every visit without storing a URL.
  let hash = 2166136261;
  for (let index = 0; index < userId.length; index += 1) {
    hash ^= userId.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return profileCovers[(hash >>> 0) % profileCovers.length];
};
