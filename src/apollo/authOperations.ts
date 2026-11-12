import { gql } from '@apollo/client';

export const CHANGE_PASSWORD_MUTATION = gql`
  mutation ChangePassword($currentPassword: String!, $newPassword: String!) {
    resetPassword(currentPassword: $currentPassword, newPassword: $newPassword)
  }
`;
