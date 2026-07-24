import { NextRequest, NextResponse } from 'next/server';

const AUTH_ROUTES = ['/signin', '/signup', '/forgot-password'];
const EXACT_PROTECTED_ROUTES = ['/admin', '/profile', '/billing', '/transactions', '/change-password'];

const isProtectedRoute = (pathname: string) => {
  return (
    EXACT_PROTECTED_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`)) ||
    pathname.includes('/new') ||
    pathname.includes('/edit')
  );
};

const isAuthRoute = (pathname: string) =>
  AUTH_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`));

const hasSessionCookie = (request: NextRequest) => {
  return Boolean(request.cookies.get('access_token')?.value || request.cookies.get('refresh_token')?.value);
};

const encodeRedirectPath = (path: string) => {
  return btoa(path);
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLoggedIn = hasSessionCookie(request);

  if (isProtectedRoute(pathname) && !isLoggedIn) {
    const signinUrl = request.nextUrl.clone();
    signinUrl.pathname = '/signin';
    signinUrl.searchParams.set('r', encodeRedirectPath(`${pathname}${request.nextUrl.search}`));

    return NextResponse.redirect(signinUrl);
  }

  if (isAuthRoute(pathname) && isLoggedIn) {
    const profileUrl = request.nextUrl.clone();
    profileUrl.pathname = '/profile';
    profileUrl.search = '';

    return NextResponse.redirect(profileUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.png|icons|splashscreens|assets|manifest.json|sw.js|workbox-.*\\.js).*)',
  ],
};
