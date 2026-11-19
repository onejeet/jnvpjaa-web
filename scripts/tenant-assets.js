// Copies tenants/$TENANT/public/* into public/ and tenants/$TENANT/fonts/* into the theme's font folder.
// Run by predev/prebuild. A record of what was copied is kept so switching tenants never leaves the previous brand behind.
const fs = require('fs');
const path = require('path');
const { resolveTenant } = require('../tenants/resolve');

const FONTS = ['body', 'display', 'serif'];
const RECORD = 'public/.tenant-assets.json';

const listFiles = (dir, base = dir) =>
  fs.existsSync(dir)
    ? fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
        const full = path.join(dir, e.name);
        return e.isDirectory() ? listFiles(full, base) : [path.relative(base, full)];
      })
    : [];

function copyTenantAssets(tenant, root) {
  for (const f of FONTS) {
    if (!fs.existsSync(path.join(tenant.dir, 'fonts', `${f}.woff2`)))
      throw new Error(`tenants/${tenant.id}/fonts/${f}.woff2 missing`);
  }
  const recordPath = path.join(root, RECORD);
  if (fs.existsSync(recordPath)) {
    for (const rel of JSON.parse(fs.readFileSync(recordPath, 'utf8'))) fs.rmSync(path.join(root, rel), { force: true });
  }
  const pairs = [
    ...listFiles(path.join(tenant.dir, 'public')).map((rel) => [path.join('public', rel), path.join('public', rel)]),
    ...FONTS.map((f) => [path.join('fonts', `${f}.woff2`), path.join('src/utils/theme/fonts/files', `${f}.woff2`)]),
  ];
  for (const [from, to] of pairs) {
    fs.mkdirSync(path.dirname(path.join(root, to)), { recursive: true });
    fs.copyFileSync(path.join(tenant.dir, from), path.join(root, to));
  }
  const copied = pairs.map(([, to]) => to.split(path.sep).join('/'));
  fs.mkdirSync(path.dirname(recordPath), { recursive: true });
  fs.writeFileSync(recordPath, JSON.stringify(copied));
  return copied;
}

if (require.main === module) {
  // Same env files Next reads, so TENANT from .env.local works for `npm run dev`.
  require('@next/env').loadEnvConfig(path.join(__dirname, '..'));
  const tenant = resolveTenant();
  const copied = copyTenantAssets(tenant, path.join(__dirname, '..'));
  console.log(`tenant ${tenant.id}: ${copied.length} asset files in place`);
}

module.exports = { copyTenantAssets };
