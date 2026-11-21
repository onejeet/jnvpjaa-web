import { gql } from '@apollo/client';

export type PublicProfile = {
  username: string;
  name: string;
  profileImage?: string | null;
  cover?: {
    url: string;
    alt?: string | null;
    photographerName?: string | null;
    photographerUrl?: string | null;
  } | null;
  batch?: number | null;
  isFaculty: boolean;
  about?: string | null;
  headline?: string | null;
  positions: { title: string; term?: string | null }[];
  socialLinks: { platform: string; handle: string }[];
  eventsAttended?: number | null;
  storiesPublished?: number | null;
};

export type MyPublicProfile = {
  featureEnabled: boolean;
  username?: string | null;
  hidden: boolean;
  usernameChangeAvailableAt?: string | null;
};

export type UsernameCheck = {
  username: string;
  available: boolean;
  reason?: 'INVALID' | 'RESERVED' | 'TAKEN' | 'CURRENT' | null;
  message: string;
  suggestions: string[];
};

export const PUBLIC_PROFILE = gql`
  query PublicProfile($username: String!) {
    publicProfile(username: $username) {
      movedTo
      profile {
        username
        name
        profileImage
        cover {
          url
          alt
          photographerName
          photographerUrl
        }
        batch
        isFaculty
        about
        headline
        positions {
          title
          term
        }
        socialLinks {
          platform
          handle
        }
        eventsAttended
        storiesPublished
      }
    }
  }
`;

const MY_PUBLIC_PROFILE_FIELDS = `
  featureEnabled
  username
  hidden
  usernameChangeAvailableAt
`;

export const MY_PUBLIC_PROFILE = gql`
  query MyPublicProfile {
    myPublicProfile {
      ${MY_PUBLIC_PROFILE_FIELDS}
    }
  }
`;

export const CHECK_USERNAME = gql`
  query CheckUsername($username: String!) {
    checkUsername(username: $username) {
      username
      available
      reason
      message
      suggestions
    }
  }
`;

export const UPDATE_USERNAME = gql`
  mutation UpdateUsername($username: String!) {
    updateUsername(username: $username) {
      ${MY_PUBLIC_PROFILE_FIELDS}
    }
  }
`;

export const SET_PUBLIC_PROFILE_HIDDEN = gql`
  mutation SetPublicProfileHidden($hidden: Boolean!) {
    setPublicProfileHidden(hidden: $hidden) {
      ${MY_PUBLIC_PROFILE_FIELDS}
    }
  }
`;

export const PUBLIC_PROFILES_SETTING = gql`
  query PublicProfilesSetting {
    platformSettings {
      publicProfilesEnabled
    }
  }
`;

export const UPDATE_PUBLIC_PROFILES_SETTING = gql`
  mutation UpdatePublicProfilesSetting($enabled: Boolean!) {
    updatePublicProfilesSetting(enabled: $enabled) {
      publicProfilesEnabled
    }
  }
`;

/** Same rule the server enforces; used only to skip pointless availability requests. */
export const USERNAME_PATTERN = /^[a-z](?:[a-z0-9]|[._](?=[a-z0-9])){2,29}$/;

export { publicProfilePath } from '@/utils/publicProfilePath';

/** Another member's @username, to check whether their public page is live before offering to share it. */
export const MEMBER_USERNAME = gql`
  query MemberUsername($id: String) {
    getUserDetails(id: $id) {
      id
      username
    }
  }
`;
