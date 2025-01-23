module.exports = {
  overwrite: true,
  schema: 'http://localhost:4000/client',
  generates: {
    'src/apollo/all.graphql': {
      plugins: ['schema-ast'],
    },
  },
};
