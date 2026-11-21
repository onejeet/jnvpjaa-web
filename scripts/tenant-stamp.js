// Draws the tenant's "verified" stamp (emblem in the centre, lettering around it) from tenants/$TENANT/stamp.json.
// Output is committed under tenants/<id>/public so builds just copy it; it is redrawn only when the inputs change
// (stamp.json, brand.json, the icon, the font or this script), tracked by stamp.lock.json. `--force` redraws anyway.
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const FONT = path.join(ROOT, 'src/app/og/fonts/DMSans-Bold.ttf');
const SIZE = 640;
const TILT = -12;
const OUT_DIR = 'public/assets/branding';
const VARIANTS = ['alumni', 'faculty'];

const readConfig = (tenant) => {
  const file = path.join(tenant.dir, 'stamp.json');
  if (!fs.existsSync(file)) throw new Error(`tenants/${tenant.id}/stamp.json missing (see tenants/README.md)`);
  const config = JSON.parse(fs.readFileSync(file, 'utf8'));
  const brand = JSON.parse(fs.readFileSync(path.join(tenant.dir, 'brand.json'), 'utf8'));
  if (typeof config.icon !== 'string' || !config.icon) throw new Error('stamp.json: "icon" must be a file path');
  const icon = path.join(tenant.dir, config.icon);
  if (!fs.existsSync(icon)) throw new Error(`stamp.json: icon ${config.icon} not found in tenants/${tenant.id}/`);
  const crop = config.crop;
  if (crop && !['x', 'y', 'radius'].every((key) => Number.isInteger(crop[key]) && crop[key] >= 0))
    throw new Error('stamp.json: "crop" needs whole-number x, y and radius (pixels in the icon)');
  const text = {
    alumni: config.text?.alumni || 'VERIFIED ALUMNI',
    faculty: config.text?.faculty || 'VERIFIED FACULTY',
    bottom: config.text?.bottom || brand.shortName,
  };
  return { file, icon, crop, text, color: brand.theme.primary['500'], brandFile: path.join(tenant.dir, 'brand.json') };
};

const fingerprint = (config) => {
  const hash = crypto.createHash('sha256');
  for (const file of [config.file, config.brandFile, config.icon, FONT, __filename]) hash.update(fs.readFileSync(file));
  return hash.digest('hex').slice(0, 12);
};

/** Advance widths (em) from the font's own tables, so letters sit evenly on the ring. */
const glyphWidths = (font) => {
  const table = {};
  for (let i = 0; i < font.readUInt16BE(4); i++) {
    const at = 12 + i * 16;
    table[font.toString('ascii', at, at + 4)] = font.readUInt32BE(at + 8);
  }
  const unitsPerEm = font.readUInt16BE(table.head + 18);
  const metrics = font.readUInt16BE(table.hhea + 34);
  let cmap;
  for (let i = 0; i < font.readUInt16BE(table.cmap + 2); i++) {
    const at = table.cmap + 4 + i * 8;
    if (font.readUInt16BE(at) === 3 && font.readUInt16BE(at + 2) === 1) cmap = table.cmap + font.readUInt32BE(at + 4);
  }
  const segments = font.readUInt16BE(cmap + 6) / 2;
  const ends = cmap + 14;
  const starts = ends + segments * 2 + 2;
  const deltas = starts + segments * 2;
  const ranges = deltas + segments * 2;
  const glyphId = (code) => {
    for (let i = 0; i < segments; i++) {
      if (font.readUInt16BE(ends + i * 2) < code) continue;
      const start = font.readUInt16BE(starts + i * 2);
      if (start > code) return 0;
      const range = font.readUInt16BE(ranges + i * 2);
      if (!range) return (code + font.readInt16BE(deltas + i * 2)) & 0xffff;
      return font.readUInt16BE(ranges + i * 2 + range + (code - start) * 2);
    }
    return 0;
  };
  return (char) => font.readUInt16BE(table.hmtx + Math.min(glyphId(char.codePointAt(0)), metrics - 1) * 4) / unitsPerEm;
};

const emblemDataUri = async (config, diameter) => {
  const sharp = require('sharp');
  let image = sharp(config.icon);
  if (config.crop) {
    const { x, y, radius } = config.crop;
    image = image.extract({ left: x - radius, top: y - radius, width: radius * 2, height: radius * 2 });
  }
  const square = await image
    .resize(diameter, diameter, { fit: 'contain', background: '#ffffff' })
    .flatten({ background: '#ffffff' })
    .png()
    .toBuffer();
  const mask = Buffer.from(
    `<svg width="${diameter}" height="${diameter}"><circle cx="${diameter / 2}" cy="${diameter / 2}" r="${diameter / 2}"/></svg>`
  );
  const disc = await sharp(square)
    .ensureAlpha()
    .composite([{ input: mask, blend: 'dest-in' }])
    .png()
    .toBuffer();
  return `data:image/png;base64,${disc.toString('base64')}`;
};

// Flex-only inline styles: next/og (satori) has no SVG textPath, so the ring is placed one glyph at a time.
const stampElement = ({ React, top, bottom, color, emblem, widthOf }) => {
  const h = React.createElement;
  const size = SIZE;
  const centre = size / 2;
  const radius = size * 0.375;
  const DEG = 180 / Math.PI;
  const advance = (glyph) => widthOf(glyph) + 0.16;
  const span = (text) => Array.from(text).reduce((sum, glyph) => sum + advance(glyph), 0);
  // Each arc may use up to 140° of the ring; long names shrink the lettering rather than overlap.
  const fontSize = Math.min(size * 0.092, ((140 / DEG) * radius) / Math.max(span(top), span(bottom)));
  const box = fontSize * 2.4;
  const arc = (text, middle, direction) => {
    let cursor = -span(text) / 2;
    return Array.from(text).map((glyph) => {
      const angle = middle + (direction * ((cursor + advance(glyph) / 2) * fontSize * DEG)) / radius;
      cursor += advance(glyph);
      return { glyph, angle, rotate: direction === 1 ? angle : angle - 180 };
    });
  };
  const at = (angle, extent) => ({
    position: 'absolute',
    left: centre + radius * Math.sin(angle / DEG) - extent / 2,
    top: centre - radius * Math.cos(angle / DEG) - extent / 2,
    width: extent,
    height: extent,
  });
  const ring = (diameter, border) => ({
    position: 'absolute',
    left: centre - diameter / 2,
    top: centre - diameter / 2,
    width: diameter,
    height: diameter,
    borderRadius: '50%',
    border: `${border}px solid ${color}`,
  });
  const emblemSize = size * 0.5;
  const dot = fontSize * 0.34;
  return h(
    'div',
    { style: { position: 'relative', display: 'flex', width: size, height: size } },
    h('div', { style: { ...ring(size * 0.995, 0), background: 'rgba(255,255,255,0.9)', border: 'none' } }),
    h('div', { style: ring(size * 0.995, size * 0.022) }),
    h('div', { style: ring(size * 0.92, size * 0.007) }),
    h('div', { style: ring(emblemSize + size * 0.07, size * 0.012) }),
    ...[90 + TILT, 270 + TILT].map((angle) =>
      h('div', { key: angle, style: { ...at(angle, dot), borderRadius: '50%', background: color } })
    ),
    ...[...arc(top, TILT, 1), ...arc(bottom, 180 + TILT, -1)]
      .filter(({ glyph }) => glyph.trim())
      .map(({ glyph, angle, rotate }, index) =>
        h(
          'div',
          {
            key: index,
            style: {
              ...at(angle, box),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: `rotate(${rotate}deg)`,
              color,
              fontSize,
              fontFamily: 'Stamp',
              fontWeight: 700,
              lineHeight: 1,
            },
          },
          glyph
        )
      ),
    h('img', {
      src: emblem,
      width: emblemSize,
      height: emblemSize,
      style: {
        position: 'absolute',
        left: centre - emblemSize / 2,
        top: centre - emblemSize / 2,
        width: emblemSize,
        height: emblemSize,
        borderRadius: '50%',
        transform: `rotate(${TILT}deg)`,
      },
    })
  );
};

async function generateStamps(tenant, { force = false } = {}) {
  const config = readConfig(tenant);
  const lockFile = path.join(tenant.dir, 'stamp.lock.json');
  const outputs = VARIANTS.map((variant) => path.join(tenant.dir, OUT_DIR, `stamp-${variant}.png`));
  const hash = fingerprint(config);
  const lock = fs.existsSync(lockFile) ? JSON.parse(fs.readFileSync(lockFile, 'utf8')) : {};
  if (!force && lock.hash === hash && outputs.every((file) => fs.existsSync(file))) return { hash, changed: false };

  const React = require('react');
  const { ImageResponse } = require('next/og');
  const font = fs.readFileSync(FONT);
  const widthOf = glyphWidths(font);
  const emblem = await emblemDataUri(config, Math.round(SIZE * 0.5 * 2));
  fs.mkdirSync(path.join(tenant.dir, OUT_DIR), { recursive: true });
  for (const [index, variant] of VARIANTS.entries()) {
    const element = stampElement({
      React,
      top: config.text[variant].toUpperCase(),
      bottom: config.text.bottom.toUpperCase(),
      color: config.color,
      emblem,
      widthOf,
    });
    const response = new ImageResponse(element, {
      width: SIZE,
      height: SIZE,
      fonts: [{ name: 'Stamp', data: font, weight: 700, style: 'normal' }],
    });
    fs.writeFileSync(outputs[index], Buffer.from(await response.arrayBuffer()));
  }
  fs.writeFileSync(lockFile, `${JSON.stringify({ hash }, null, 2)}\n`);
  return { hash, changed: true };
}

if (require.main === module) {
  require('@next/env').loadEnvConfig(ROOT);
  const { resolveTenant } = require('../tenants/resolve');
  const tenant = resolveTenant();
  generateStamps(tenant, { force: process.argv.includes('--force') })
    .then(({ changed, hash }) =>
      console.log(`tenant ${tenant.id}: stamp ${changed ? 'redrawn' : 'unchanged'} (${hash})`)
    )
    .catch((error) => {
      console.error(error.message);
      process.exit(1);
    });
}

module.exports = { generateStamps };
