import { gql } from '@apollo/client';

export const SIGNUP_WITH_HONEYPOT = gql`
  mutation SignupWithHoneypot(
    $batch: Int
    $email: String!
    $firstName: String!
    $gender: String!
    $isFaculty: Boolean
    $lastName: String!
    $mobile: String!
    $password: String!
    $website: String
  ) {
    signup(
      batch: $batch
      email: $email
      firstName: $firstName
      gender: $gender
      isFaculty: $isFaculty
      lastName: $lastName
      mobile: $mobile
      password: $password
      website: $website
    ) {
      id
    }
  }
`;
