import { IHeaderMenuItem } from 'src/layouts/Layout/LayoutTopbar';

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
  {
    label: 'Student Hub',
    path: '/student-hub',
    menu: [
      {
        label: 'Career Counselling',
        path: '/student-hub/career-counselling',
      },
      {
        label: 'SkillUp Resources',
        path: '/student-hub/skillup-resources',
      },
    ],
  },
  {
    label: 'Alumni Center',
    path: '/donations',
    menu: [
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
    label: 'Blog',
    path: '/blog',
  },
  // {
  //   label: 'Funds',
  //   path: '/funds',
  //   menu: [
  //     {
  //       label: 'Donations',
  //       path: '/donations',
  //     },
  //     {
  //       label: 'Bhamashah Pillars',
  //       path: '/bhamashah-pillars',
  //     },
  //   ],
  // },
];
