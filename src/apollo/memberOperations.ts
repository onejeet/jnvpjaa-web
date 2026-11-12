import { gql } from '@apollo/client';

export const SET_MEMBER_DISABLED = gql`
  mutation SetMemberDisabled($id: String!, $disabled: Boolean!) {
    setMemberDisabled(id: $id, disabled: $disabled) {
      id
      disabled
    }
  }
`;

export const REMOVE_MEMBER = gql`
  mutation RemoveMember($id: String!) {
    removeMember(id: $id) {
      id
    }
  }
`;
