// Drawn per tenant by scripts/tenant-stamp.js from tenants/<id>/stamp.json; the hash busts caches when it is redrawn.
import stampLock from '@tenant/stamp.lock.json';

export const verifiedStampPath = (faculty?: boolean) =>
  `/assets/branding/stamp-${faculty ? 'faculty' : 'alumni'}.png?v=${(stampLock as { hash: string }).hash}`;
