import { gql } from '@apollo/client';

export const GET_OR_CREATE_PROFILE_COVER = gql`
  mutation GetOrCreateProfileCover($userId: String!) {
    getOrCreateProfileCover(userId: $userId) {
      photoId
      url
      alt
      caption
      photographerName
      photographerUrl
    }
  }
`;
