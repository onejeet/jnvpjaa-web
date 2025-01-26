import { gql, ApolloClient, InMemoryCache } from '@apollo/client';

// Temporary client to call refreshToken mutation
const refreshClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:4000/client',
  cache: new InMemoryCache(),
  credentials: 'include', // Send cookies for refresh token
});

const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshToken {
    refreshToken
  }
`;

export const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const response = await refreshClient.mutate({
      mutation: REFRESH_TOKEN_MUTATION,
    });

    return response.data?.refreshToken || null;
  } catch (error) {
    console.error('Failed to refresh token', error);

    return null;
  }
};
