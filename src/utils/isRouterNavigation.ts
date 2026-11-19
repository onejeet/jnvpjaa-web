import { headers } from 'next/headers';
import { ROUTER_NAVIGATION_HEADER } from './routerNavigationHeader';

export function isRouterNavigation() {
  return headers().get(ROUTER_NAVIGATION_HEADER) === '1';
}
