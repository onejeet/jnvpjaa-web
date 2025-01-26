import { ApolloClient, HttpLink, InMemoryCache, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { refreshAccessToken } from './refresh';

// Error handling link
const errorLink = onError(({ graphQLErrors, networkError, forward, operation }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, extensions, locations, path }) => {
      // Handle 401 Unauthorized (Token Expired)
      console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
      if (extensions?.code === 'UNAUTHENTICATED') {
        return refreshAccessToken()
          .then((newToken: string | null) => {
            if (newToken) {
              localStorage.setItem('accessToken', newToken);
              operation.setContext(({ headers = {} }) => ({
                headers: {
                  ...headers,
                  Authorization: `Bearer ${newToken}`,
                },
              }));

              return forward(operation); // Retry the operation with a new token
            }
          })
          .catch(() => {
            console.error('Token refresh failed');
            localStorage.removeItem('accessToken');
            window.location.href = '/login'; // Redirect to login if token refresh fails
          });
      }
    });
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError.message}`);
  }
});

// Auth link to add tokens
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('accessToken'); // Replace with your token storage logic

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// HTTP link
const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:4000/client',
  credentials: 'include', // or 'include' for cookies
});

// Apollo Client
export const apolloClient = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
  connectToDevTools: true,
});
