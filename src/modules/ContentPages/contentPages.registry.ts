export type ContentPageType = 'message' | 'text' | 'people-list';

// Fixed page set. Keep identical to jnvpjaa-backend/src/services/contentPages/schema.ts (a test checks it).
export const CONTENT_PAGES = {
  'president-message': { type: 'message', label: "President's Message", path: '/president-message' },
  'principal-message': { type: 'message', label: "Principal's Message", path: '/principal-message' },
  'secretary-message': { type: 'message', label: "Secretary's Message", path: '/secretary-message' },
  vision: { type: 'text', label: 'Vision & Mission', path: '/vision' },
  about: { type: 'text', label: 'About', path: '/about' },
  'past-presidents': { type: 'people-list', label: 'Past Presidents', path: '/past-presidents' },
  'bhamashah-pillars': { type: 'people-list', label: 'Bhamashah Pillars', path: '/bhamashah-pillars' },
} as const satisfies Record<string, { type: ContentPageType; label: string; path: string }>;

export type ContentPageSlug = keyof typeof CONTENT_PAGES;

export const isContentPageSlug = (slug: string): slug is ContentPageSlug =>
  Object.prototype.hasOwnProperty.call(CONTENT_PAGES, slug);

export const CONTENT_PAGE_TYPE_LABELS: Record<ContentPageType, string> = {
  message: 'Message',
  text: 'Text page',
  'people-list': 'People list',
};
