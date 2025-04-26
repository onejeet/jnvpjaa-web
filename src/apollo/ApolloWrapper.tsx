'use client';

import { ApolloNextAppProvider } from '@apollo/experimental-nextjs-app-support';
import { apolloClient } from './client';

export function ApolloWrapper({ children }: { children: React.ReactNode }) {
  return <ApolloNextAppProvider makeClient={apolloClient}>{children}</ApolloNextAppProvider>;
}
