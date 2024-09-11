import { IHeaderMenuItem } from '@/components/common/Layout/LayoutTopbar';

export const HEADER_MENU: IHeaderMenuItem[] = [
  // {
  //   label: 'Home',
  //   path: '/',
  // },
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
    ],
  },
  {
    label: 'Organisation',
    path: '/',
    menu: [
      {
        label: 'Executive-Committee',
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
    ],
  },
  {
    label: 'Funds',
    path: '/funds',
    menu: [
      {
        label: 'Donations',
        path: '/donations',
      },
      {
        label: 'Bhamashah Pillars',
        path: '/bhamashah-pillars',
      },
    ],
  },
  // {
  //   label: 'Educational Materials',
  //   path: '/',
  //   menu: [
  //     {
  //       label: 'Who we are',
  //       path: '/',
  //     },
  //   ],
  // },
  // {
  //   label: 'News',
  //   path: '/',
  // },
];
