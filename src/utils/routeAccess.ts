// Dependency-free so the middleware rules can be unit tested.
const EXACT_PROTECTED_ROUTES = ['/admin', '/profile', '/transactions', '/change-password', '/security'];

// Whole path segments only: "/newsroom" or "/blog/new-year" must not count as a "/new" create screen.
const CREATE_OR_EDIT_SEGMENT = /\/(new|edit)(\/|$)/;

// A job's applicant list is only for its poster; send signed-out visitors to sign in first.
const JOB_APPLICANTS = /^\/jobs\/[^/]+\/applicants\/?$/;

export const isProtectedRoute = (pathname: string) =>
  EXACT_PROTECTED_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`)) ||
  CREATE_OR_EDIT_SEGMENT.test(pathname) ||
  JOB_APPLICANTS.test(pathname);
