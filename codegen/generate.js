// eslint-disable-next-line @typescript-eslint/no-var-requires
const { execSync } = require('child_process');

execSync('npx graphql-code-generator --config ./codegen/generateSchema.js', { stdio: 'inherit' });

execSync('npx gqlg --schemaFilePath ./src/apollo/all.graphql --destDirPath ./src/apollo/gqlg/ --depthLimit 5', {
  stdio: 'inherit',
});

execSync('npx graphql-code-generator --config ./codegen/generateOperations.js', { stdio: 'inherit' });

execSync('rm -rf ./src/apollo/all.graphql ./src/apollo/gqlg', { stdio: 'inherit' });

execSync('npx prettier --write ./src/apollo/**/*.ts', { stdio: 'inherit' });

// eslint-disable-next-line no-console
console.log('Codegen complete!');
