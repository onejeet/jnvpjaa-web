import { ApolloClient, DocumentNode, NormalizedCacheObject, Unmasked, InMemoryCache, HttpLink } from '@apollo/client';

export const updateCache = ({
  client,
  query,
  data,
  variables,
}: {
  client: ApolloClient<object>;
  query: DocumentNode;
  data: any;
  variables?: Record<string, any>;
}) => {
  console.log('ZZ: CACHE', query, data);
  client.writeQuery<any>({
    query,
    data,
    variables,
  });
};

export function initializeApollo() {
  return new ApolloClient({
    ssrMode: true,
    link: new HttpLink({
      uri: process.env.GRAPHQL_ENDPOINT || 'http://localhost:4000/client',
    }),
    cache: new InMemoryCache(),
  });
}
