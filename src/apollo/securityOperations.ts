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
  hasPassword: boolean;
  googleConnected: boolean;
  currentSessionUntracked: boolean;
  sessions: SecuritySession[];
}

const OVERVIEW_FIELDS = gql`
  fragment SecurityOverviewFields on SecurityOverview {
    email
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
