import { headers } from 'next/headers';
import { ROUTER_NAVIGATION_HEADER } from './routerNavigationHeader';

export async function isRouterNavigation(): Promise<boolean> {
  return (await headers()).get(ROUTER_NAVIGATION_HEADER) === '1';
}
