import { ApolloClient, HttpLink, InMemoryCache, ApolloLink, Observable } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { refreshAccessToken } from './refresh';

// Error handling link
const errorLink = new ApolloLink((operation, forward) => {
  return new Observable((observer) => {
    forward(operation).subscribe({
      next: async (result) => {
        if (result?.errors && result?.errors?.length > 0) {
          // @ts-expect-error type
          if (result?.errors?.[0]?.code === 'NOT_AUTHORISED') {
            const isLoggedIn = localStorage.getItem('logged_in');
            if (isLoggedIn) {
              try {
                // Call the refresh token mutation
                await refreshAccessToken();

                // Retry the operation with the new token
                forward(operation).subscribe(observer);
              } catch (refreshError) {
                localStorage.removeItem('logged_in');
                observer.error(refreshError);
                console.log('Error: ', refreshError);
              }
            } else {
              // No refresh token available, force logout
              observer.error(new Error('No refresh token available'));
            }
          } else {
            observer.error(result?.errors?.[0]);
            console.log('Error: ', result?.errors?.[0]);
          }
        } else {
          observer.next(result);
        }
      },
      error: async (error) => {
        observer.error(error);
        console.log('Error: ', error);
      },
    });
  });
});

// Auth link to add tokens
const authLink = setContext((_, { headers }) => {
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
