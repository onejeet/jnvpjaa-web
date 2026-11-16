import { gql } from '@apollo/client';

export type CommentTarget = 'BLOG' | 'EVENT';

export const COMMENT_MAX_LENGTH = 2000;
// Quick reactions shown in emoji-picker-react's reaction bar (unified codes: 👍 ❤️ 😂 🎉 😮 🙏).
// "+" expands to the full picker; the backend accepts any single emoji.
export const COMMENT_REACTION_CODES = ['1f44d', '2764-fe0f', '1f602', '1f389', '1f62e', '1f64f'];

export interface CommentReactionSummary {
  __typename?: 'CommentReactionSummary';
  emoji: string;
  count: number;
  reacted: boolean;
}

export interface ThreadComment {
  __typename?: 'Comment';
  id: string;
  parentId?: string | null;
  content: string;
  isDeleted?: boolean | null;
  createdAt: string;
  editedAt?: string | null;
  authorId: string;
  author?: {
    __typename?: 'UserBasic';
    id: string;
    firstName?: string | null;
    lastName?: string | null;
    profileImage?: string | null;
    batch?: number | null;
    isFaculty?: boolean | null;
  } | null;
  reactions: CommentReactionSummary[];
}

const COMMENT_FIELDS = gql`
  fragment ThreadCommentFields on Comment {
    id
    parentId
    content
    isDeleted
    createdAt
    editedAt
    authorId
    author {
      id
      firstName
      lastName
      profileImage
      batch
      isFaculty
    }
    reactions {
      emoji
      count
      reacted
    }
  }
`;

export const COMMENT_THREAD = gql`
  query CommentThread($targetId: String!, $targetType: CommentTargetType!) {
    getComments(targetId: $targetId, targetType: $targetType) {
      ...ThreadCommentFields
    }
  }
  ${COMMENT_FIELDS}
`;

export const POST_COMMENT = gql`
  mutation PostComment($targetId: String!, $targetType: CommentTargetType!, $content: String!, $parentId: String) {
    addComment(targetId: $targetId, targetType: $targetType, content: $content, parentId: $parentId) {
      ...ThreadCommentFields
    }
  }
  ${COMMENT_FIELDS}
`;

export const EDIT_COMMENT = gql`
  mutation EditComment($id: String!, $content: String!) {
    updateComment(id: $id, content: $content) {
      ...ThreadCommentFields
    }
  }
  ${COMMENT_FIELDS}
`;

export const REMOVE_COMMENT = gql`
  mutation RemoveComment($id: String!) {
    deleteComment(id: $id)
  }
`;

export const TOGGLE_COMMENT_REACTION = gql`
  mutation ToggleCommentReaction($commentId: String!, $emoji: String!) {
    toggleCommentReaction(commentId: $commentId, emoji: $emoji) {
      id
      reactions {
        emoji
        count
        reacted
      }
    }
  }
`;
