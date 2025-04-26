'use client';

import { HttpLink, ApolloLink, from, split, Observable } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/experimental-nextjs-app-support';
import { setContext } from '@apollo/client/link/context';
import { getMainDefinition } from '@apollo/client/utilities';
import { refreshAccessToken } from './refresh';

// Define operations that don’t require auth
const publicOperations = ['signin', 'getEventList', 'getBlogList', 'getBlog', 'getUserList', 'signup'];

// Error handling link
const errorLink = new ApolloLink((operation, forward) => {
  return new Observable((observer) => {
    forward(operation).subscribe({
      next: async (result) => {
        if (result?.errors?.length) {
          const isUnauth = result.errors[0]?.extensions?.code === 'NOT_AUTHORISED';

          if (isUnauth) {
            const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('logged_in') === 'true';

            if (isLoggedIn) {
              try {
                await refreshAccessToken();
                // Retry the operation
                forward(operation).subscribe(observer);
              } catch (refreshError) {
                if (typeof window !== 'undefined') {
                  localStorage.removeItem('logged_in');
                }

                observer.error(refreshError);
              }
            } else {
              observer.error(result.errors[0]);
            }
          } else {
            observer.error(result.errors[0]);
          }
        } else {
          observer.next(result);
        }
      },
      error: (error) => {
        observer.error(error);
      },
    });
  });
});

// Auth header injection
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
    },
  };
});

// HTTP link to GraphQL API
const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:4000/client',
  credentials: 'include',
});

export const apolloClient = () => {
  return new ApolloClient({
    cache: new InMemoryCache(), // Use InMemoryCache for both SSR and client
    link:
      typeof window === 'undefined'
        ? httpLink // Server-side will use the basic HTTP link for SSR
        : from([
            errorLink,
            split(
              ({ query }) => {
                const mainDef = getMainDefinition(query);
                const operationName = mainDef?.name?.value;
                return operationName ? !publicOperations.includes(operationName) : true;
              },
              authLink,
              new ApolloLink((op, fwd) => fwd(op)) // Passthrough link for client-side
            ),
            httpLink, // HTTP link for client-side
          ]),
    connectToDevTools: typeof window !== 'undefined',
  });
};
