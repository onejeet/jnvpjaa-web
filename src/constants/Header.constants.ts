import { IHeaderMenuItem } from '@/components/home/Header/Header.types';

export const HEADER_MENU: IHeaderMenuItem[] = [
  // {
  //   label: 'Home',
  //   path: '/',
  // },
  {
    label: 'About Us',
    path: '/',
    menu: [
      {
        label: 'Who we are',
        path: '',
      },
    ],
  },
  {
    label: 'Organisation',
    path: '/',
    menu: [
      {
        label: 'Who we are',
        path: '',
      },
    ],
  },
  {
    label: 'Resources',
    path: '/',
    menu: [
      {
        label: 'Who we are',
        path: '',
      },
    ],
  },
  // {
  //   label: 'Educational Materials',
  //   path: '/',
  //   menu: [
  //     {
  //       label: 'Who we are',
  //       path: '',
  //     },
  //   ],
  // },
  // {
  //   label: 'News',
  //   path: '/',
  // },
];
