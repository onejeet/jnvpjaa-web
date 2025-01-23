module.exports = {
  schema: './src/apollo/all.graphql',
  documents: ['./src/apollo/gqlg/**/*.gql'],
  overwrite: true,
  generates: {
    'src/apollo/hooks.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
      config: {
        withHooks: true,
        withComponent: false,
        withHOC: false,
        maybeValue: 'T | undefined',
        inlineFragmentTypes: 'mask',
      },
    },
  },
};
