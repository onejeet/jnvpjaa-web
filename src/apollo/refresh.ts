import { gql, ApolloClient, InMemoryCache } from '@apollo/client';

// Temporary client to call refreshToken mutation
const refreshClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:4000/client',
  cache: new InMemoryCache(),
  credentials: 'include', // Send cookies for refresh token
});

const REFRESH_TOKEN_MUTATION = gql`
  mutation refreshToken {
    refreshToken {
      user {
        aboutMe
        batch
        createdAt
        disabled
        displayName
        dob
        email
        emergency_mobile
        firstName
        gender
        google_auth_id
        id
        isVerified
        lastName
        membershipYear
        mobile
        nickName
        profileImage
        role {
          id
          name
        }
        updatedAt
      }
    }
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
    localStorage.removeItem('logged_in');
    return null;
  }
};
