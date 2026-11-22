// Small pure helpers the assistant uses to describe and compare form values.

/** Plain text of stored HTML, without a DOM (works in tests and on the server). */
export const htmlText = (html: string) =>
  html
    .replace(/<(br|\/p|\/h[1-6]|\/li|\/blockquote)\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s*\n+/g, '\n')
    .trim();

export const wordCount = (text: string) => (text.trim() ? text.trim().split(/\s+/).length : 0);

/** Pictures and videos that AI text would drop. */
export const hasMedia = (html: string) => /<(img|iframe|video)\b/i.test(html);

export const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Is there anything the person wrote in this value? */
export const isFilled = (v: unknown): boolean =>
  typeof v === 'string'
    ? !!htmlText(v)
    : Array.isArray(v)
      ? v.some((x) =>
          x && typeof x === 'object' ? isFilled((x as any).body) || isFilled((x as any).heading) : isFilled(x)
        )
      : false;

/** Same words, ignoring markup and spacing differences the editor introduces. */
export const sameValue = (a: unknown, b: unknown): boolean => {
  const norm = (v: unknown): string =>
    typeof v === 'string'
      ? htmlText(v).replace(/\s+/g, ' ')
      : Array.isArray(v)
        ? v
            .map((x) => (x && typeof x === 'object' ? `${norm((x as any).heading)}|${norm((x as any).body)}` : norm(x)))
            .join('§')
        : '';
  return norm(a) === norm(b);
};
