export interface CommentThread<T> {
  comment: T;
  replies: T[];
}

/**
 * Turns the flat, oldest-first list from `getComments` into two-level threads:
 * newest conversations first, replies in reading order. Tombstoned parents with no
 * replies left are dropped.
 */
export function buildCommentThreads<T extends { id: string; parentId?: string | null; isDeleted?: boolean | null }>(
  comments: T[]
): CommentThread<T>[] {
  const threads = new Map<string, CommentThread<T>>();
  for (const comment of comments) if (!comment.parentId) threads.set(comment.id, { comment, replies: [] });
  for (const comment of comments) if (comment.parentId) threads.get(comment.parentId)?.replies.push(comment);
  return Array.from(threads.values())
    .filter((t) => !t.comment.isDeleted || t.replies.length > 0)
    .reverse();
}

/** Applies a reaction toggle locally so the pill updates before the server answers. */
export function toggleReaction<R extends { emoji: string; count: number; reacted: boolean }>(
  reactions: R[],
  emoji: string
): R[] {
  const existing = reactions.find((r) => r.emoji === emoji);
  if (!existing) return [...reactions, { emoji, count: 1, reacted: true } as R];
  const count = existing.count + (existing.reacted ? -1 : 1);
  return reactions
    .map((r) => (r.emoji === emoji ? { ...r, count, reacted: !r.reacted } : r))
    .filter((r) => r.count > 0);
}

const URL_PATTERN = /(https?:\/\/[^\s<]+[^\s<.,:;"')\]!?])/g;

/** Splits text into plain and URL parts so links can be rendered as anchors without HTML injection. */
export function splitLinks(text: string): { text: string; href?: string }[] {
  return text
    .split(URL_PATTERN)
    .filter(Boolean)
    .map((part) => (/^https?:\/\//.test(part) ? { text: part, href: part } : { text: part }));
}
