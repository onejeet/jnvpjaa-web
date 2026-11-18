import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { getAllPages, SNAPSHOT_FILE, STATE_DIR, TOKENS_FILE } from './support';

/** Snapshot every content page so teardown can put the site back exactly as it was. */
export default async function globalSetup() {
  if (!existsSync(TOKENS_FILE)) {
    throw new Error(`No persona tokens at ${TOKENS_FILE}. Create them first (see e2e/README.md).`);
  }
  mkdirSync(STATE_DIR, { recursive: true });
  const pages = await getAllPages();
  if (pages.length !== 7)
    throw new Error(`Expected 7 content pages, found ${pages.length}. Run the content seed first.`);
  writeFileSync(SNAPSHOT_FILE, JSON.stringify(pages, null, 2));
}
