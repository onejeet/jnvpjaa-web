import { NextRequest, NextResponse } from 'next/server';
import { isProtectedRoute } from '@/utils/routeAccess';
import { isPathEnabled } from '@/config/features';
import { ROUTER_NAVIGATION_HEADER } from '@/utils/routerNavigationHeader';
import { publicProfilePath } from '@/utils/publicProfilePath';

const AUTH_ROUTES = ['/signin', '/signup', '/forgot-password'];
const isAuthRoute = (pathname: string) =>
  AUTH_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`));

const hasSessionCookie = (request: NextRequest) => {
  return Boolean(request.cookies.get('access_token')?.value || request.cookies.get('refresh_token')?.value);
};

const encodeRedirectPath = (path: string) => {
  return btoa(path);
};

// /@username is the public address; the page itself lives at /u/[username] because "@" folders are parallel routes.
const PUBLIC_PROFILE = /^\/(?:@|%40)([^/]+)\/?$/i;
const PUBLIC_PROFILE_INTERNAL = /^\/u\/([^/]+)\/?$/;

// /blog/<slug>.md and /events/<id>.md: Markdown copies of public pages for AI crawlers and agents.
const MARKDOWN_TWIN = /^\/(blog|events)\/([^/]+)\.md$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const internalProfile = PUBLIC_PROFILE_INTERNAL.exec(pathname);
  if (internalProfile) {
    // One shareable address: the internal path always forwards to /@username.
    const canonical = request.nextUrl.clone();
    canonical.pathname = publicProfilePath(internalProfile[1]);
    return NextResponse.redirect(canonical, 308);
  }
  // A module this tenant has switched off is a real 404 (notFound() in a streamed layout still answers 200).
  if (!isPathEnabled(pathname)) {
    const missing = request.nextUrl.clone();
    missing.pathname = '/__module-disabled';
    return NextResponse.rewrite(missing);
  }
  const markdownTwin = MARKDOWN_TWIN.exec(pathname);
  if (markdownTwin) {
    const target = request.nextUrl.clone();
    target.pathname = `/md/${markdownTwin[1]}/${markdownTwin[2]}/`;
    return NextResponse.rewrite(target);
  }
  if (pathname.startsWith('/auth/google')) {
    const response = NextResponse.next();
    response.headers.set('Cache-Control', 'private, no-store, max-age=0');
    response.headers.set('Referrer-Policy', 'no-referrer');
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return response;
  }
  const isLoggedIn = hasSessionCookie(request);
  const isPasswordResetLink = pathname.startsWith('/forgot-password') && request.nextUrl.searchParams.has('c');

  if (isProtectedRoute(pathname) && !isLoggedIn) {
    const signinUrl = request.nextUrl.clone();
    signinUrl.pathname = '/signin';
    signinUrl.searchParams.set('r', encodeRedirectPath(`${pathname}${request.nextUrl.search}`));

    return NextResponse.redirect(signinUrl);
  }

  if (isAuthRoute(pathname) && isLoggedIn && !isPasswordResetLink) {
    const profileUrl = request.nextUrl.clone();
    profileUrl.pathname = '/profile';
    profileUrl.search = '';

    return NextResponse.redirect(profileUrl);
  }

  const requestHeaders = new Headers(request.headers);
  // Next strips Flight headers before pages can read them. Browser fetches
  // (including router navigation and prefetch) use destination "empty";
  // direct page loads use "document". Requests without Fetch Metadata keep SSR.
  if (request.headers.get('sec-fetch-dest') === 'empty') {
    requestHeaders.set(ROUTER_NAVIGATION_HEADER, '1');
  } else {
    requestHeaders.delete(ROUTER_NAVIGATION_HEADER);
  }
  const publicProfile = PUBLIC_PROFILE.exec(pathname);
  if (publicProfile) {
    const target = request.nextUrl.clone();
    target.pathname = `/u/${publicProfile[1]}/`;
    return NextResponse.rewrite(target, { request: { headers: requestHeaders } });
  }
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.png|icons|splashscreens|assets|manifest.json|sw.js|workbox-.*\\.js).*)',
  ],
};
