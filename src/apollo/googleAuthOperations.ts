import { gql } from '@apollo/client';
export const GOOGLE_LOGIN_AVAILABILITY = gql`
  query GoogleLoginAvailability {
    googleLoginAvailability {
      enabled
    }
  }
`;
export const PLATFORM_GOOGLE_SETTINGS = gql`
  query PlatformGoogleSettings {
    platformSettings {
      googleLoginEnabled
      googleConfigured
    }
  }
`;
export const SET_GOOGLE_LOGIN_ENABLED = gql`
  mutation SetGoogleLoginEnabled($enabled: Boolean!) {
    setGoogleLoginEnabled(enabled: $enabled) {
      googleLoginEnabled
      googleConfigured
    }
  }
`;
