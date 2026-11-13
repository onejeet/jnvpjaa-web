import { headers } from 'next/headers';

export function isRouterNavigation() {
  return headers().get('x-jnvpjaa-router-navigation') === '1';
}
