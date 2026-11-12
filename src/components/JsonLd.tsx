export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  // JSON-LD can contain user-authored titles and summaries. Escape HTML-significant
  // characters so a title cannot terminate the script element.
  const json = JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
