import { gql } from '@apollo/client';

export interface SecuritySession {
  id: string;
  method: 'PASSWORD' | 'GOOGLE' | 'UNKNOWN' | string;
  userAgent?: string | null;
  ip?: string | null;
  createdAt: string;
  lastSeenAt: string;
  current: boolean;
}

export interface SecurityOverview {
  email: string;
  canChangeEmail: boolean;
  hasPassword: boolean;
  googleConnected: boolean;
  currentSessionUntracked: boolean;
  sessions: SecuritySession[];
}

const OVERVIEW_FIELDS = gql`
  fragment SecurityOverviewFields on SecurityOverview {
    email
    canChangeEmail
    hasPassword
    googleConnected
    currentSessionUntracked
    sessions {
      id
      method
      userAgent
      ip
      createdAt
      lastSeenAt
      current
    }
  }
`;

export const SECURITY_OVERVIEW = gql`
  query SecurityOverview {
    securityOverview {
      ...SecurityOverviewFields
    }
  }
  ${OVERVIEW_FIELDS}
`;

export const SIGN_OUT_SESSION = gql`
  mutation SignOutSession($id: String!) {
    signOutSession(id: $id)
  }
`;

export const SIGN_OUT_OTHER_SESSIONS = gql`
  mutation SignOutOtherSessions {
    signOutOtherSessions {
      ...SecurityOverviewFields
    }
  }
  ${OVERVIEW_FIELDS}
`;

export const DISCONNECT_GOOGLE = gql`
  mutation DisconnectGoogle($password: String!) {
    disconnectGoogle(password: $password) {
      ...SecurityOverviewFields
    }
  }
  ${OVERVIEW_FIELDS}
`;

export const REQUEST_EMAIL_CHANGE = gql`
  mutation RequestEmailChange($email: String!) {
    requestEmailChange(email: $email)
  }
`;

export const CONFIRM_EMAIL_CHANGE = gql`
  mutation ConfirmEmailChange($code: String!) {
    confirmEmailChange(code: $code) {
      ...SecurityOverviewFields
    }
  }
  ${OVERVIEW_FIELDS}
`;

export const START_GOOGLE_EMAIL_CHANGE = gql`
  mutation StartGoogleEmailChange {
    startGoogleEmailChange
  }
`;
