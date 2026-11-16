// Dependency-free so the middleware rules can be unit tested.
const EXACT_PROTECTED_ROUTES = [
  '/admin',
  '/profile',
  '/transactions',
  '/change-password',
  '/security',
  '/newsroom/manage',
];

// Whole path segments only: "/newsroom" or "/blog/new-year" must not count as a "/new" create screen.
const CREATE_OR_EDIT_SEGMENT = /\/(new|edit)(\/|$)/;

export const isProtectedRoute = (pathname: string) =>
  EXACT_PROTECTED_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`)) ||
  CREATE_OR_EDIT_SEGMENT.test(pathname);
