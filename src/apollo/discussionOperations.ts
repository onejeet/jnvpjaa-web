import { gql } from '@apollo/client';
import type { CommentReactionSummary } from './commentOperations';

export type PostTag = 'DISCUSSION' | 'HELP' | 'NEED' | 'IDEA';

export const TAG_LABEL: Record<PostTag, string> = {
  DISCUSSION: 'Discussion',
  HELP: 'Help',
  NEED: 'Need',
  IDEA: 'Idea',
};
export const POST_TAGS = Object.keys(TAG_LABEL) as PostTag[];

export const POST_MAX_LENGTH = 5000;
export const MAX_POST_IMAGES = 4;
export const POLL_DAYS = [1, 3, 7];
export const POLL_OPTION_MAX = 80;

export interface PostAuthor {
  __typename?: 'UserBasic';
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  profileImage?: string | null;
  batch?: number | null;
  isFaculty?: boolean | null;
  publicUsername?: string | null;
}

export interface PostEmbed {
  __typename?: 'PostEmbed';
  provider: string;
  src: string;
  url: string;
  aspectRatio: number;
}

export interface PostPoll {
  __typename?: 'PostPoll';
  options: string[];
  closesAt: string;
  isClosed: boolean;
  viewerVote?: number | null;
  totalVotes: number;
  results?: number[] | null;
}

export interface DiscussionPost {
  __typename?: 'Post';
  id: string;
  body: string;
  tag?: PostTag | null;
  images: { __typename?: 'PostImage'; url: string; width: number; height: number }[];
  embed?: PostEmbed | null;
  poll?: PostPoll | null;
  author: PostAuthor;
  parentId?: string | null;
  rootId?: string | null;
  replyingTo?: PostAuthor | null;
  replyCount: number;
  reactions: CommentReactionSummary[];
  isDeleted: boolean;
  isPinned: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canPin: boolean;
  createdAt: string;
  editedAt?: string | null;
}

export interface DiscussionFeedData {
  discussionFeed: { posts: DiscussionPost[]; pinned: DiscussionPost[]; nextCursor?: string | null };
}
export interface DiscussionThreadData {
  discussionThread: { root: DiscussionPost; replies: DiscussionPost[]; nextCursor?: string | null };
}

const AUTHOR_FIELDS = `id publicUsername firstName lastName profileImage batch isFaculty`;

export const POST_FIELDS = gql`
  fragment DiscussionPostFields on Post {
    id
    body
    tag
    images { url width height }
    embed { provider src url aspectRatio }
    poll { options closesAt isClosed viewerVote totalVotes results }
    author { ${AUTHOR_FIELDS} }
    parentId
    rootId
    replyingTo { ${AUTHOR_FIELDS} }
    replyCount
    reactions { emoji count reacted }
    isDeleted
    isPinned
    canEdit
    canDelete
    canPin
    createdAt
    editedAt
  }
`;

export const DISCUSSION_FEED = gql`
  query DiscussionFeed($cursor: String, $tag: PostTag) {
    discussionFeed(cursor: $cursor, tag: $tag) {
      posts {
        ...DiscussionPostFields
      }
      pinned {
        ...DiscussionPostFields
      }
      nextCursor
    }
  }
  ${POST_FIELDS}
`;

export const DISCUSSION_NEW_COUNT = gql`
  query DiscussionNewCount($since: DateTime!, $tag: PostTag) {
    discussionNewCount(since: $since, tag: $tag)
  }
`;

export const DISCUSSION_THREAD = gql`
  query DiscussionThread($id: ID!) {
    discussionThread(id: $id) {
      root {
        ...DiscussionPostFields
      }
      replies {
        ...DiscussionPostFields
      }
      nextCursor
    }
  }
  ${POST_FIELDS}
`;

export const DISCUSSION_REPLIES = gql`
  query DiscussionReplies($rootId: ID!, $cursor: String!) {
    discussionReplies(rootId: $rootId, cursor: $cursor) {
      replies {
        ...DiscussionPostFields
      }
      nextCursor
    }
  }
  ${POST_FIELDS}
`;

export const DISCUSSION_EMBED = gql`
  query DiscussionEmbed($url: String!) {
    discussionEmbed(url: $url) {
      provider
      src
      url
      aspectRatio
    }
  }
`;

export const CREATE_DISCUSSION_IMAGE_UPLOAD = gql`
  mutation CreateDiscussionImageUpload($mimeType: String!, $sizeBytes: Int!) {
    createDiscussionImageUpload(mimeType: $mimeType, sizeBytes: $sizeBytes) {
      uploadUrl
      uploadKey
    }
  }
`;

export const CREATE_DISCUSSION_POST = gql`
  mutation CreateDiscussionPost($input: PostInput!) {
    createDiscussionPost(input: $input) {
      ...DiscussionPostFields
    }
  }
  ${POST_FIELDS}
`;

export const EDIT_DISCUSSION_POST = gql`
  mutation EditDiscussionPost($id: ID!, $body: String!) {
    editDiscussionPost(id: $id, body: $body) {
      ...DiscussionPostFields
    }
  }
  ${POST_FIELDS}
`;

export const DELETE_DISCUSSION_POST = gql`
  mutation DeleteDiscussionPost($id: ID!) {
    deleteDiscussionPost(id: $id) {
      id
      deleted
    }
  }
`;

export const TOGGLE_DISCUSSION_REACTION = gql`
  mutation ToggleDiscussionReaction($postId: ID!, $emoji: String!) {
    toggleDiscussionReaction(postId: $postId, emoji: $emoji) {
      id
      reactions {
        emoji
        count
        reacted
      }
    }
  }
`;

export const VOTE_DISCUSSION_POLL = gql`
  mutation VoteDiscussionPoll($postId: ID!, $optionIndex: Int!) {
    voteDiscussionPoll(postId: $postId, optionIndex: $optionIndex) {
      id
      poll {
        options
        closesAt
        isClosed
        viewerVote
        totalVotes
        results
      }
    }
  }
`;

export const PIN_DISCUSSION_POST = gql`
  mutation PinDiscussionPost($id: ID!, $pinned: Boolean!) {
    pinDiscussionPost(id: $id, pinned: $pinned) {
      id
      isPinned
    }
  }
`;

export interface DiscussionStatsData {
  discussionStats: { total: number; activeMembers: PostAuthor[]; tags: { tag: PostTag; count: number }[] };
}

export const DISCUSSION_STATS = gql`
  query DiscussionStats {
    discussionStats { total activeMembers { ${AUTHOR_FIELDS} } tags { tag count } }
  }
`;
