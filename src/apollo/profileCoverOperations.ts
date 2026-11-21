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

export const SET_MY_PROFILE_COVER = gql`
  mutation SetMyProfileCover($photoId: String!) {
    setMyProfileCover(photoId: $photoId) {
      photoId
      url
      alt
      caption
      photographerName
      photographerUrl
    }
  }
`;
