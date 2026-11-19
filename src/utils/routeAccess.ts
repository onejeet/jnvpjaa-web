// Dependency-free so the middleware rules can be unit tested.
const EXACT_PROTECTED_ROUTES = [
  '/admin',
  '/profile',
  '/billing',
  '/transactions',
  '/scholarships',
  '/change-password',
  '/security',
];

// Whole path segments only: "/newsroom" or "/blog/new-year" must not count as a "/new" create screen.
const CREATE_OR_EDIT_SEGMENT = /\/(new|edit)(\/|$)/;

// A job's applicant list is only for its poster; send signed-out visitors to sign in first.
const JOB_APPLICANTS = /^\/jobs\/[^/]+\/applicants\/?$/;

export const isProtectedRoute = (pathname: string) =>
  EXACT_PROTECTED_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`)) ||
  CREATE_OR_EDIT_SEGMENT.test(pathname) ||
  JOB_APPLICANTS.test(pathname);

// Decodes a base64 `?r=` return path, keeping it only if it resolves to this site. Browsers strip tabs and newlines
// from URLs, so "/\t/evil.example" would become "//evil.example": check the resolved origin, not the raw string.
export const safeReturnPath = (encoded?: string | null): string | null => {
  if (!encoded) return null;
  try {
    const url = new URL(atob(encoded), 'https://return.invalid');
    return url.origin === 'https://return.invalid' ? `${url.pathname}${url.search}${url.hash}` : null;
  } catch {
    return null;
  }
};
