import { IHeaderMenuItem } from 'src/layouts/Layout/LayoutTopbar';
import PostAddIcon from '@mui/icons-material/PostAdd';
import ExtensionIcon from '@mui/icons-material/Extension';
import { Article, ArticleNyTimes, CalendarDots, Ticket } from '@phosphor-icons/react';

export const HEADER_MENU: IHeaderMenuItem[] = [
  {
    label: 'About Us',
    path: '/about',
    menu: [
      {
        label: 'About JNVPJAA',
        path: '/about',
      },
      {
        label: 'Vision and Mission',
        path: '/vision',
      },
      {
        label: 'Message from President',
        path: '/president-message',
      },
      {
        label: 'Message from Secretary',
        path: '/secretary-message',
      },
      {
        label: 'Message from Principal',
        path: '/principal-message',
      },
      {
        label: 'Contact Us',
        path: '/contact-us',
      },
    ],
  },
  {
    label: 'Organisation',
    path: '/',
    menu: [
      {
        label: 'Executive Committee',
        path: '/executive-committee',
      },
      {
        label: 'Batch Coordinators',
        path: '/batch-coordinators',
      },
      {
        label: 'Bhamashah Pillars',
        path: '/bhamashah-pillars',
      },
      {
        label: 'Past Presidents',
        path: '/past-presidents',
      },
    ],
  },
  // {
  //   label: 'Student Hub',
  //   path: '/student-hub',
  //   menu: [
  //     {
  //       label: 'Career Counselling',
  //       path: '/student-hub/career-counselling',
  //     },
  //     {
  //       label: 'SkillUp Resources',
  //       path: '/student-hub/skillup-resources',
  //     },
  //   ],
  // },
  {
    label: 'Alumni Center',
    path: '/donations',
    menu: [
      {
        label: 'Member Directory',
        path: '/members',
      },
      {
        label: 'Donate Now',
        path: '/donations',
      },
      // {
      //   label: 'Alumni Connect',
      //   path: '#',
      // },
    ],
  },
  {
    label: 'Events',
    path: '/events',
  },
  {
    label: 'Blog',
    path: '/blog',
  },
];

export const MEMBER_HEADER_MENU: IHeaderMenuItem[] = [
  {
    label: 'Organisation',
    path: '/',
    menu: [
      {
        label: 'About JNVPJAA',
        path: '/about',
      },
      {
        label: 'Vision and Mission',
        path: '/vision',
      },
      {
        label: 'Message from President',
        path: '/president-message',
      },
      {
        label: 'Message from Secretary',
        path: '/secretary-message',
      },
      {
        label: 'Message from Principal',
        path: '/principal-message',
      },

      {
        label: 'Executive Committee',
        path: '/executive-committee',
      },
      {
        label: 'Batch Coordinators',
        path: '/batch-coordinators',
      },
      {
        label: 'Bhamashah Pillars',
        path: '/bhamashah-pillars',
      },
      {
        label: 'Past Presidents',
        path: '/past-presidents',
      },
      {
        label: 'Career Counselling',
        path: '/student-hub/career-counselling',
      },
      {
        label: 'SkillUp Resources',
        path: '/student-hub/skillup-resources',
      },
      {
        label: 'Contact Us',
        path: '/contact-us',
      },
    ],
  },

  {
    label: 'Alumni Center',
    path: '/donations',
    menu: [
      {
        label: 'Members',
        path: '/members',
      },
      {
        label: 'Billing & Transactions',
        path: '/transactions',
      },
      {
        label: 'Donate Now',
        path: '/donations',
      },
      {
        label: 'Alumni Connect',
        path: '#',
      },
    ],
  },
  {
    label: 'Events',
    path: '/events',
  },
  {
    label: 'Blog',
    path: '/blog',
  },
];

export const getHeaderMenu = (isLoggedIn?: boolean) => {
  if (isLoggedIn) {
    return MEMBER_HEADER_MENU;
  }
  return HEADER_MENU;
};

export const ADD_ENTITIES: IHeaderMenuItem[] = [
  {
    label: 'New Blog Post',
    path: '/blog/new',
    icon: <ArticleNyTimes />,
    // disabled: true,
  },
  {
    label: 'New Event',
    path: '/events/new',
    icon: <CalendarDots />,
  },
];
