import { gql } from '@apollo/client';
export const GOOGLE_LOGIN_AVAILABILITY = gql`
  query GoogleLoginAvailability {
    googleLoginAvailability {
      enabled
    }
  }
`;
