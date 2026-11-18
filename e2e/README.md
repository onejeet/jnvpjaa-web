# End-to-end tests (Playwright)

Runs against the **local** stack: web on `http://localhost:3890` (`npm run dev`) and the API on
`http://localhost:4000` started with `NODE_ENV=development`. Tests run one at a time against the
shared local database; every content page is snapshotted first and restored afterwards.

1. Create the test personas (super admin, President, Treasurer, member). The script refuses to run
   against anything but a local database:

   ```bash
   cd ../jnvpjaa-backend && DOTENV_CONFIG_PATH=.env.local NODE_ENV=development npx ts-node -r dotenv/config -r tsconfig-paths/register prisma/scripts/e2e_personas.ts create ../jnvpjaa-web/e2e/.state/tokens.json
   ```

2. Run the suite (tokens last one hour):

   ```bash
   npm run test:e2e
   ```

   To reuse an installed Chromium instead of downloading Playwright's, set `E2E_CHROMIUM` to its binary.

3. Remove the personas afterwards:

   ```bash
   cd ../jnvpjaa-backend && DOTENV_CONFIG_PATH=.env.local NODE_ENV=development npx ts-node -r dotenv/config -r tsconfig-paths/register prisma/scripts/e2e_personas.ts remove
   ```
