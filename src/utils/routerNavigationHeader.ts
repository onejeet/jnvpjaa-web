import { brand } from '@/config/tenant';

/** Set by middleware on client-side router fetches (x-<tenant id>-router-navigation). */
export const ROUTER_NAVIGATION_HEADER = `x-${brand.id}-router-navigation`;
