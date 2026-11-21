// trailingSlash is on, but Next treats a last segment with a dot as a file and serves it slash-less.
export const publicProfilePath = (username: string) => `/@${username}${username.includes('.') ? '' : '/'}`;

type Member = { id?: string | null; publicUsername?: string | null } | null | undefined;

/** Members open the full profile; visitors open the public page, or nothing when the member has none. */
export const memberHref = (member: Member, signedIn: boolean) => {
  if (!member?.id) return null;
  if (signedIn) return `/profile/${member.id}`;
  return member.publicUsername ? publicProfilePath(member.publicUsername) : null;
};
