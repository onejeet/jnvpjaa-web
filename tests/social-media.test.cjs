const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

const source = ts.transpileModule(readFileSync('src/utils/socialMedia.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;
const social = {};
vm.runInNewContext(source, { exports: social });
// Values from the vm context have foreign prototypes, so compare plain copies.
const plain = (value) => JSON.parse(JSON.stringify(value));

test('a pasted profile URL or @handle becomes the bare handle', () => {
  assert.equal(social.toHandle('linkedin', 'https://www.linkedin.com/in/jane-doe/?trk=x'), 'jane-doe');
  assert.equal(social.toHandle('x', 'https://twitter.com/jane_d'), 'jane_d');
  assert.equal(social.toHandle('x', '@jane_d'), 'jane_d');
  assert.equal(social.toHandle('youtube', 'youtube.com/@janevlogs'), 'janevlogs');
  assert.equal(social.toHandle('instagram', ' jane.d '), 'jane.d');
});

test('links are built only from valid stored handles, in platform order', () => {
  const links = social.getSocialLinks({ github: 'jane', x: 'jane_d', instagram: 'bad/handle', myspace: 'jane' });
  assert.deepEqual(
    plain(links).map(({ key, handle, url }) => ({ key, handle, url })),
    [
      { key: 'x', handle: 'jane_d', url: 'https://x.com/jane_d' },
      { key: 'github', handle: 'jane', url: 'https://github.com/jane' },
    ]
  );
  assert.equal(social.getSocialLinks(null).length, 0);
  assert.equal(social.getSocialLinks('jane').length, 0);
});
