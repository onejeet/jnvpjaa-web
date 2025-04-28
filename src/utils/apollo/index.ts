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

export function initializeApollo(headers?: HeadersInit) {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:4000/client',
    credentials: 'include',
    fetch: (uri, options) => {
      return fetch(uri, {
        ...options,
        headers: {
          ...options?.headers,
          ...headers, // <-- forward headers including cookies
        },
      });
    },
  });

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: httpLink,
    cache: new InMemoryCache(),
  });
  // return new ApolloClient({
  //   ssrMode: true,
  //   link: new HttpLink({
  //     uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:4000/client',
  //   }),
  //   cache: new InMemoryCache(),
  // });
}
