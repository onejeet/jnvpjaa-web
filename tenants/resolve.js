const fs = require('fs');
const path = require('path');

/** Which tenant folder this build/process uses. Never defaults: a wrong brand must not ship silently. */
function resolveTenant(env = process.env) {
  const id = (env.TENANT || '').trim();
  if (!id) throw new Error('TENANT is not set. Set TENANT=<id> to one of the folders in tenants/.');
  if (!/^[a-z0-9][a-z0-9_-]*$/i.test(id)) throw new Error(`TENANT "${id}" is not a valid tenant id.`);
  const dir = path.join(__dirname, id);
  if (!fs.existsSync(path.join(dir, 'brand.json'))) throw new Error(`tenants/${id}/ not found (no brand.json).`);
  return { id, dir };
}

module.exports = { resolveTenant };
