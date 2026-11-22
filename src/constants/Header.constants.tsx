import { IHeaderMenuItem } from 'src/layouts/Layout/LayoutTopbar';
import { PERMISSION_CODES } from '@/constants/access';
import { filterNav } from '@/config/features';
import {
  IconArticle as Article,
  IconBriefcase,
  IconNews as ArticleNyTimes,
  IconCalendarEvent as CalendarDots,
  IconPhotoShare as ImagesSquare,
  IconTicket as Ticket,
} from '@tabler/icons-react';
import { brand, t } from '@/config/tenant';

// Each page once, with the one-liner the desktop dropdown shows under its name.
const PAGE = {
  about: { label: `About ${brand.shortName}`, path: '/about', description: 'Our school, story and association' },
  vision: { label: 'Vision and Mission', path: '/vision', description: 'What the association works towards' },
  contact: { label: 'Contact Us', path: '/contact-us', description: 'Reach the association team' },
  president: { label: 'Message from President', path: '/president-message', description: 'A note to all alumni' },
  secretary: {
    label: 'Message from Secretary',
    path: '/secretary-message',
    description: 'On alumni connections and activities',
  },
  principal: {
    label: 'Message from Principal',
    path: '/principal-message',
    description: `From ${brand.institution.shortName}, ${brand.institution.city}`,
  },
  committee: { label: 'Executive Committee', path: '/executive-committee', description: 'Current office bearers' },
  coordinators: {
    label: 'Batch Coordinators',
    path: '/batch-coordinators',
    description: 'Your point of contact in each batch',
  },
  pillars: {
    label: t('pages.honourRoll'),
    path: '/bhamashah-pillars',
    description: 'Supporters behind our initiatives',
  },
  pastPresidents: {
    label: 'Past Presidents',
    path: '/past-presidents',
    description: 'Leaders who built the association',
  },
  career: {
    label: 'Career Counselling',
    path: '/student-hub/career-counselling',
    description: 'Guidance from alumni mentors',
  },
  skillup: {
    label: 'SkillUp Resources',
    path: '/student-hub/skillup-resources',
    description: 'Courses and learning material',
  },
  members: { label: 'Member Directory', path: '/members', description: 'Find and connect with alumni' },
  gallery: { label: 'Photo Gallery', path: '/gallery', description: 'Albums from meets and campus' },
  businesses: { label: 'Business Directory', path: '/businesses', description: 'Businesses run by alumni' },
  jobs: { label: 'Jobs & Internships', path: '/jobs', description: 'Openings shared by alumni' },
  discussions: { label: 'Discussions', path: '/discussions', description: 'Ask, share and talk with alumni' },
  transactions: { label: 'Billing & Transactions', path: '/billing', description: 'Your payments and receipts' },
  scholarships: {
    label: 'Scholarships',
    path: '/scholarships',
    description: 'Request or support student scholarships',
  },
  donate: { label: 'Donate Now', path: '/donations', description: 'Support students and the school' },
  newsroom: { label: 'Newsroom', path: '/newsroom', description: 'Official news and announcements' },
  events: { label: 'Events', path: '/events', description: 'Meets, reunions and webinars' },
  blog: { label: 'Blog', path: '/blog', description: 'Stories and memories from alumni' },
} satisfies Record<string, IHeaderMenuItem>;

const inSection = (section: string, items: IHeaderMenuItem[]) => items.map((item) => ({ ...item, section }));

// What's happening in the community, grouped so the top bar stays short.
const COMMUNITY_MENU: IHeaderMenuItem = {
  label: 'Community',
  path: '/newsroom',
  menu: [PAGE.newsroom, PAGE.events, PAGE.blog],
};

// Members also get the discussion board, which is closed to visitors.
const MEMBER_COMMUNITY_MENU: IHeaderMenuItem = {
  ...COMMUNITY_MENU,
  menu: [PAGE.discussions, ...COMMUNITY_MENU.menu!],
};

export const HEADER_MENU: IHeaderMenuItem[] = [
  {
    label: 'About Us',
    path: '/about',
    menu: [
      ...inSection('Who we are', [PAGE.about, PAGE.vision, PAGE.contact]),
      ...inSection('Messages', [PAGE.president, PAGE.secretary, PAGE.principal]),
    ],
  },
  {
    label: 'Organisation',
    path: '/',
    menu: [PAGE.committee, PAGE.coordinators, PAGE.pillars, PAGE.pastPresidents],
  },
  {
    label: 'Alumni Center',
    path: '/donations',
    menu: [PAGE.members, PAGE.gallery, PAGE.businesses, PAGE.jobs, PAGE.donate],
  },
  COMMUNITY_MENU,
];

export const MEMBER_HEADER_MENU: IHeaderMenuItem[] = [
  {
    label: 'Organisation',
    path: '/',
    menu: [
      ...inSection('Who we are', [PAGE.about, PAGE.vision, PAGE.contact]),
      ...inSection('People', [PAGE.committee, PAGE.coordinators, PAGE.pillars, PAGE.pastPresidents]),
      ...inSection('Messages', [PAGE.president, PAGE.secretary, PAGE.principal]),
      ...inSection('Student Hub', [PAGE.career, PAGE.skillup]),
    ],
  },
  {
    label: 'Alumni Center',
    path: '/donations',
    menu: [PAGE.members, PAGE.gallery, PAGE.businesses, PAGE.jobs, PAGE.scholarships, PAGE.transactions, PAGE.donate],
  },
  MEMBER_COMMUNITY_MENU,
];

const withoutPaths = (items: IHeaderMenuItem[], paths: string[]): IHeaderMenuItem[] =>
  paths.length
    ? items.map((item) =>
        item.menu ? { ...item, menu: item.menu.filter((link) => !paths.includes(link.path)) } : item
      )
    : items;

export const getHeaderMenu = (
  isLoggedIn?: boolean,
  options: { scholarships?: boolean; hiddenPaths?: string[] } = {}
) => {
  const hidden = options.hiddenPaths || [];
  if (isLoggedIn) {
    return filterNav(
      withoutPaths(MEMBER_HEADER_MENU, options.scholarships ? hidden : [...hidden, PAGE.scholarships.path])
    );
  }
  return filterNav(withoutPaths(HEADER_MENU, hidden));
};

export const ADD_ENTITIES: IHeaderMenuItem[] = filterNav<IHeaderMenuItem>([
  {
    label: 'New Blog Post',
    path: '/blog/new',
    icon: <Article />,
    // disabled: true,
  },
  {
    label: 'New Event',
    path: '/events/new',
    icon: <CalendarDots />,
  },
  {
    label: 'Post a Job',
    path: '/jobs/new',
    icon: <IconBriefcase />,
  },
  {
    label: 'Add News',
    path: '/newsroom/new',
    icon: <ArticleNyTimes />,
    permission: PERMISSION_CODES.NEWSROOM_POST_MANAGE,
  },
  // {
  //   label: 'New Album',
  //   path: '/gallery/new',
  //   icon: <ImagesSquare />,
  // },
]);
