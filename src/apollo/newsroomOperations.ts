import { gql } from '@apollo/client';

export type NewsCategory = 'ANNOUNCEMENT' | 'PRESS_RELEASE' | 'ACHIEVEMENT' | 'IN_THE_MEDIA';
export type NewsStatus = 'DRAFT' | 'PUBLISHED';

export interface NewsCover {
  url?: string | null;
  alt?: string | null;
  [key: string]: unknown;
}

export interface NewsPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  cover?: NewsCover | null;
  category: NewsCategory;
  status: NewsStatus;
  publishedAt?: string | null;
  isPinned: boolean;
  sourceUrl?: string | null;
  updateNote?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface NewsPostInput {
  id?: string | null;
  title: string;
  summary: string;
  content: string;
  cover?: NewsCover | null;
  category: NewsCategory;
  status: NewsStatus;
  publishedAt?: string | null;
  isPinned?: boolean;
  sourceUrl?: string | null;
  updateNote?: string | null;
}

export interface NewsListResult {
  newsPosts: { data: NewsPost[]; total: number };
}

const CARD_FIELDS = gql`
  fragment NewsCardFields on NewsPost {
    id
    title
    slug
    summary
    cover
    category
    publishedAt
    isPinned
    updatedAt
  }
`;

const FULL_FIELDS = gql`
  fragment NewsFullFields on NewsPost {
    ...NewsCardFields
    content
    status
    sourceUrl
    updateNote
    createdAt
  }
  ${CARD_FIELDS}
`;

export const NEWS_POSTS = gql`
  query NewsPosts($category: NewsCategory, $limit: Int, $offset: Int) {
    newsPosts(category: $category, limit: $limit, offset: $offset) {
      total
      data {
        ...NewsCardFields
      }
    }
  }
  ${CARD_FIELDS}
`;

export const NEWS_POST = gql`
  query NewsPost($slug: String!) {
    newsPost(slug: $slug) {
      ...NewsFullFields
    }
  }
  ${FULL_FIELDS}
`;

export const MANAGED_NEWS_POSTS = gql`
  query ManagedNewsPosts {
    managedNewsPosts {
      ...NewsCardFields
      status
    }
  }
  ${CARD_FIELDS}
`;

export const MANAGED_NEWS_POST = gql`
  query ManagedNewsPost($id: String!) {
    managedNewsPost(id: $id) {
      ...NewsFullFields
    }
  }
  ${FULL_FIELDS}
`;

export const SAVE_NEWS_POST = gql`
  mutation SaveNewsPost($input: NewsPostInput!) {
    saveNewsPost(input: $input) {
      ...NewsFullFields
    }
  }
  ${FULL_FIELDS}
`;

export const DELETE_NEWS_POST = gql`
  mutation DeleteNewsPost($id: String!) {
    deleteNewsPost(id: $id)
  }
`;
