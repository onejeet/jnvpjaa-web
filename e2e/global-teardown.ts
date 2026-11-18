import { readFileSync } from 'fs';
import { getAllPages, restorePage, SNAPSHOT_FILE, type StoredPage } from './support';

/** Restore any page whose content, visibility or SEO differs from the pre-run snapshot. */
export default async function globalTeardown() {
  const before: StoredPage[] = JSON.parse(readFileSync(SNAPSHOT_FILE, 'utf8'));
  const now = await getAllPages();
  const key = (p: StoredPage) => JSON.stringify([p.fields, p.visible, p.seoTitle, p.seoDescription]);
  for (const original of before) {
    const current = now.find((p) => p.slug === original.slug);
    if (current && key(current) !== key(original)) await restorePage(original.slug);
  }
  const after = await getAllPages();
  const drift = before.filter((o) => key(after.find((p) => p.slug === o.slug)!) !== key(o)).map((p) => p.slug);
  if (drift.length) throw new Error(`Content not restored for: ${drift.join(', ')}`);
}
