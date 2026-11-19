// Every tenant present in both repos must have the same brand.json (emails, CORS) and features.json (module guards).
// Usage: node scripts/tenant-check.js [path-to-backend]   (default ../jnvpjaa-backend)
const fs = require('fs');
const path = require('path');

const diffPaths = (a, b, at = '') => {
  if (
    typeof a !== 'object' ||
    typeof b !== 'object' ||
    a === null ||
    b === null ||
    Array.isArray(a) !== Array.isArray(b)
  )
    return JSON.stringify(a) === JSON.stringify(b) ? [] : [at || '(root)'];
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  return [...keys].flatMap((k) => diffPaths(a[k], b[k], at ? `${at}.${k}` : k));
};

function checkTenants(webRoot, backendRoot) {
  const ids = (root) =>
    fs
      .readdirSync(path.join(root, 'tenants'))
      .filter((id) => fs.existsSync(path.join(root, 'tenants', id, 'brand.json')));
  const backendIds = new Set(ids(backendRoot));
  const problems = [];
  for (const id of ids(webRoot)) {
    if (!backendIds.has(id)) {
      problems.push(`${id}: missing in backend tenants/`);
      continue;
    }
    for (const file of ['brand.json', 'features.json']) {
      const read = (root) => JSON.parse(fs.readFileSync(path.join(root, 'tenants', id, file), 'utf8'));
      for (const p of diffPaths(read(webRoot), read(backendRoot))) problems.push(`${id}: ${file} differs at ${p}`);
    }
  }
  for (const id of backendIds) if (!ids(webRoot).includes(id)) problems.push(`${id}: missing in web tenants/`);
  return problems;
}

if (require.main === module) {
  const webRoot = path.join(__dirname, '..');
  const backendRoot = path.resolve(process.argv[2] || path.join(webRoot, '../jnvpjaa-backend'));
  const problems = checkTenants(webRoot, backendRoot);
  if (problems.length) {
    console.error(`Tenant config out of sync with ${backendRoot}:\n${problems.map((p) => `  - ${p}`).join('\n')}`);
    process.exit(1);
  }
  console.log('tenant:check ok — brand.json and features.json match in both repos');
}

module.exports = { checkTenants, diffPaths };
