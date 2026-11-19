import { expect, test } from '@playwright/test';
import { API_URL, BASE_URL, getTokens, gql, signedIn } from './support';

// The sign-in return path (?r=base64) must never leave the site. Browsers drop tabs and newlines from URLs, so
// "/\t/evil" resolves to "//evil" (another host) unless the guard checks the resolved origin.
const ESCAPES = [
  '/\t/evil.example/',
  '/\n/evil.example/',
  '/\\evil.example/',
  '//evil.example/',
  'https://evil.example/',
];

for (const target of ESCAPES) {
  test(`sign-in return path ${JSON.stringify(target)} stays on the site`, async ({ page }) => {
    const offsite: string[] = [];
    await page.route(/evil\.example/, (route) => {
      offsite.push(route.request().url());
      return route.abort();
    });
    // Stub only the sign-in mutation: no real credentials are used.
    await page.route(API_URL, async (route) => {
      const body = route.request().postDataJSON?.() ?? {};
      if (!/\bsignin\b/.test(body.query ?? '')) return route.continue();
      return route.fulfill({
        json: {
          data: {
            signin: {
              __typename: 'AuthPayload',
              user: { __typename: 'User', id: 'qa', metadata: { isFirstLogin: false } },
            },
          },
        },
      });
    });
    await page.goto(`/signin/?r=${encodeURIComponent(Buffer.from(target).toString('base64'))}`);
    await page.getByLabel(/email/i).fill('qa@example.test');
    await page
      .getByLabel(/password/i)
      .first()
      .fill('not-a-real-password');
    await page.getByRole('button', { name: /sign in/i }).click();
    await page.waitForURL((url) => !url.pathname.startsWith('/signin'), { timeout: 15_000 }).catch(() => {});
    await page.waitForTimeout(1000);
    expect(offsite).toEqual([]);
    expect(new URL(page.url()).origin).toBe(BASE_URL);
  });
}

// A stored About Me payload must never execute wherever the profile appears (names refuse markup: see below).
// Rich-text fields are sanitised server-side; business links are covered by React 19's javascript: URL blocking.
test('stored XSS payloads never execute', async ({ browser }) => {
  test.setTimeout(180_000);
  const X = `<img src=x onerror=alert(1)><script>alert(2)</script><a href="javascript:alert(3)">j</a><svg onload=alert(5)></svg>`;
  const me = getTokens().member.id;
  const before = (
    await gql('query($id:String){getUserDetails(id:$id){displayName nickName aboutMe}}', { id: me }, 'member')
  ).data?.getUserDetails;
  await gql('mutation($id:String,$x:String){updateUser(id:$id,aboutMe:$x){id}}', { id: me, x: X }, 'member');
  const context = await signedIn(browser, 'member');
  const page = await context.newPage();
  const dialogs: string[] = [];
  page.on('dialog', (d) => {
    dialogs.push(`${page.url()} ${d.message()}`);
    return d.dismiss();
  });
  try {
    for (const url of ['/profile/', '/members/', '/activity/']) {
      await page.goto(url, { waitUntil: 'networkidle' }).catch(() => {});
      await page.waitForTimeout(800);
      // Guard against a vacuous pass: the payload-carrying records must actually be on screen.
      if (url === '/profile/') await expect(page.getByText('j', { exact: true }).first()).toBeVisible(); // sanitised About Me
      for (const link of await page.locator('a[href^="javascript:"]').all())
        await link.click({ timeout: 2000 }).catch(() => {});
    }
    expect(dialogs).toEqual([]);
  } finally {
    await context.close();
    await gql(
      'mutation($id:String,$d:String,$n:String,$a:String){updateUser(id:$id,displayName:$d,nickName:$n,aboutMe:$a){id}}',
      { id: me, d: before?.displayName ?? '', n: before?.nickName ?? '', a: before?.aboutMe ?? '' },
      'member'
    );
  }
});

test('responses keep the baseline security headers and do not advertise the framework', async ({ request }) => {
  for (const url of ['/', '/signin/', '/blog/']) {
    const headers = (await request.get(url)).headers();
    expect(headers['x-powered-by'], url).toBeUndefined();
    expect(headers['x-frame-options'], url).toBe('DENY');
    expect(headers['x-content-type-options'], url).toBe('nosniff');
    expect(headers['referrer-policy'], url).toBe('strict-origin-when-cross-origin');
    const csp = headers['content-security-policy'] ?? '';
    for (const directive of ["object-src 'none'", "base-uri 'self'", "frame-ancestors 'none'", "form-action 'self'"])
      expect(csp, `${url} CSP`).toContain(directive);
  }
});

// Super-admins appointed through role assignments (not the legacy user.role) must pass admin checks.
// One member-owned business reused by the moderation and validation tests (businesses can't be deleted).
async function businessFixture() {
  const name = 'QA moderation fixture';
  const listed = await gql('{getBusinesses(options:{limit:500}){data{id name}}}', {}, 'superadmin');
  const id: string | undefined =
    listed.data?.getBusinesses?.data?.find((b: { name: string }) => b.name === name)?.id ??
    (
      await gql(
        'mutation($b:CreateBusinessInput!){createBusiness(body:$b){id}}',
        { b: { name, description: 'QA fixture for admin moderation', category: 'Other', tags: ['qa'] } },
        'member'
      )
    ).data?.createBusiness?.id;
  expect(id).toBeTruthy();
  return id!;
}

test('an RBAC super-admin can moderate businesses', async () => {
  const id = await businessFixture();
  const approve = await gql(
    'mutation($id:String!){verifyBusiness(id:$id,isVerified:true){isVerified}}',
    { id },
    'superadmin'
  );
  expect(approve.errors).toBeUndefined();
  const reject = await gql(
    'mutation($id:String!){verifyBusiness(id:$id,isVerified:false){isVerified}}',
    { id },
    'superadmin'
  );
  expect(reject.data?.verifyBusiness?.isVerified).toBe(false);
  // Unverified businesses stay visible to the admin who moderates them.
  expect((await gql('query($id:String!){getBusiness(id:$id){id}}', { id }, 'superadmin')).data?.getBusiness?.id).toBe(
    id
  );
});

test('profile writes reject markup in names and member-set metadata', async () => {
  const me = getTokens().member.id;
  const update = (vars: Record<string, unknown>) =>
    gql(
      'mutation($id:String,$d:String,$n:String,$m:JSON){updateUser(id:$id,displayName:$d,nickName:$n,metadata:$m){id}}',
      { id: me, ...vars },
      'member'
    );
  expect((await update({ d: '<b>QA</b>' })).errors, 'displayName markup').toBeDefined();
  expect((await update({ n: 'QA<script>' })).errors, 'nickName markup').toBeDefined();
  expect((await update({ m: { isFirstLogin: false, role: 'admin' } })).errors, 'member metadata').toBeDefined();
});

test('business links must be https and descriptions are sanitised on update', async () => {
  const id = await businessFixture();
  const update = (body: Record<string, unknown>) =>
    gql(
      'mutation($id:String!,$b:UpdateBusinessInput!){updateBusiness(id:$id,body:$b){id website logoUrl description}}',
      { id, b: body },
      'member'
    );
  expect((await update({ website: 'javascript:alert(1)' })).errors, 'javascript: website').toBeDefined();
  expect((await update({ logoUrl: 'javascript:alert(1)' })).errors, 'javascript: logo').toBeDefined();
  const ok = await update({
    website: 'https://example.test/',
    description: '<p>QA</p><img src=x onerror=alert(1)>',
  });
  expect(ok.errors).toBeUndefined();
  expect(ok.data?.updateBusiness?.website).toBe('https://example.test/');
  expect(ok.data?.updateBusiness?.description).not.toContain('onerror');
});
