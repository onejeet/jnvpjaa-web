import { expect, test } from '@playwright/test';
import { features } from './tenant';
import { filterNav, moduleForPath, profileTabs } from './features';

const off = (k: string) => ({ ...features, [k]: false });

test('filterNav drops disabled items and keeps siblings and module-less items', () => {
  const items = [
    { label: 'About', path: '/about' },
    {
      label: 'Alumni Center',
      path: '/donations',
      menu: [
        { label: 'Members', path: '/members' },
        { label: 'Jobs', path: '/jobs' },
      ],
    },
    { label: 'Post a Job', path: '/jobs/new' },
  ];
  const out = filterNav(items, off('jobs'));
  expect(out.map((i) => i.label)).toEqual(['About', 'Alumni Center']);
  expect(out[1].menu!.map((i) => i.label)).toEqual(['Members']);
});

test('filterNav removes a group whose children are all disabled', () => {
  const items = [
    { label: 'Community', path: '/newsroom', menu: [{ label: 'Blog', path: '/blog' }] },
    { label: 'Home', path: '/' },
  ];
  expect(filterNav(items, off('blog')).map((i) => i.label)).toEqual(['Home']);
});

test('filterNav keeps everything when all modules are on', () => {
  const items = [{ label: 'Jobs', path: '/jobs' }];
  expect(filterNav(items, features)).toEqual(items);
});

test('moduleForPath maps routes and sub-routes, not look-alikes', () => {
  expect(moduleForPath('/jobs')).toBe('jobs');
  expect(moduleForPath('/jobs/x/applicants/')).toBe('jobs');
  expect(moduleForPath('/scholarships/new')).toBe('scholarship');
  expect(moduleForPath('/student-hub/career-counselling')).toBe('studentHub');
  expect(moduleForPath('/jobsearch')).toBeUndefined();
  expect(moduleForPath('/about')).toBeUndefined();
});

test('profile tabs leave out disabled modules', () => {
  expect(profileTabs(true, features)).toEqual(['about', 'events', 'blogs', 'business']);
  expect(profileTabs(false, features)).toEqual(['about', 'events', 'blogs']);
  expect(profileTabs(true, { ...off('events'), blog: false, businesses: false })).toEqual(['about']);
});
