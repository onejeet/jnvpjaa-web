import { gql } from '@apollo/client';
import type { ContentPageSlug, ContentPageType } from '@/modules/ContentPages/contentPages.registry';
import type { ContentFields } from '@/modules/ContentPages/contentPages.schema';

export interface ContentPage<F extends ContentFields = ContentFields> {
  slug: ContentPageSlug;
  type: ContentPageType;
  visible: boolean;
  fields: F;
  seoTitle?: string | null;
  seoDescription?: string | null;
  updatedAt: string;
  updatedBy?: { id: string; firstName: string; lastName: string } | null;
}

export interface ContentPageInput {
  slug: ContentPageSlug;
  fields: ContentFields;
  visible: boolean;
  seoTitle?: string | null;
  seoDescription?: string | null;
  expectedUpdatedAt?: string | null;
}

const PUBLIC_FIELDS = gql`
  fragment ContentPagePublicFields on ContentPage {
    slug
    type
    visible
    fields
    seoTitle
    seoDescription
    updatedAt
  }
`;

const EDITOR_FIELDS = gql`
  fragment ContentPageEditorFields on ContentPage {
    ...ContentPagePublicFields
    updatedBy {
      id
      firstName
      lastName
    }
  }
  ${PUBLIC_FIELDS}
`;

export const CONTENT_PAGE = gql`
  query ContentPage($slug: String!) {
    contentPage(slug: $slug) {
      ...ContentPagePublicFields
    }
  }
  ${PUBLIC_FIELDS}
`;

export const HIDDEN_CONTENT_PAGES = gql`
  query HiddenContentPages {
    hiddenContentPages
  }
`;

export const CONTENT_PAGES_FOR_EDITOR = gql`
  query ContentPagesForEditor {
    contentPagesForEditor {
      ...ContentPageEditorFields
    }
  }
  ${EDITOR_FIELDS}
`;

export const CONTENT_PAGE_FOR_EDITOR = gql`
  query ContentPageForEditor($slug: String!) {
    contentPageForEditor(slug: $slug) {
      ...ContentPageEditorFields
    }
  }
  ${EDITOR_FIELDS}
`;

export const UPDATE_CONTENT_PAGE = gql`
  mutation UpdateContentPage($input: ContentPageInput!) {
    updateContentPage(input: $input) {
      ...ContentPageEditorFields
    }
  }
  ${EDITOR_FIELDS}
`;
