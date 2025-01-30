import { ApolloClient, HttpLink, InMemoryCache, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { refreshAccessToken } from './refresh';
import Cookies from 'universal-cookie';

const cookies = new Cookies(null, { path: '/' });

// Error handling link
const errorLink = onError(({ graphQLErrors, networkError, forward, operation }) => {
  if (graphQLErrors) {
    // @ts-expect-error dff
    graphQLErrors.forEach(({ message, code }) => {
      // Handle 401 Unauthorized (Token Expired)
      console.error(`[GraphQL error]: Message: ${message}`);
      if (code === 'NOT_AUTHORISED') {
        const isLoggedIn = localStorage.getItem('logged_in');
        console.log('ZZ :COOKEIIS', isLoggedIn);
        if (isLoggedIn === 'true') {
          return refreshAccessToken()
            .then(() => {
              operation.setContext(({ headers = {} }) => ({
                headers: {
                  ...headers,
                },
              }));
              console.log('ZZ: operation', operation.operationName);

              return forward(operation); // Retry the operation with a new token
            })
            .catch(() => {
              localStorage.removeItem('logged_in');
              console.error('Token refresh failed');
              window.location.href = '/signin'; // Redirect to login if token refresh fails
            });
        }
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
      // authorization: token ? `Bearer ${token}` : '',
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
