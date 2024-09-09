import { IHeaderMenuItem } from '@/components/common/Layout/LayoutTopbar';

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
        label: 'JNVPJAA',
        path: '',
      },
      {
        label: 'Vision and Mission',
        path: '',
      },
      {
        label: 'Message from President',
        path: '',
      },
      {
        label: 'Message from Secretary',
        path: '',
      },
      {
        label: 'Message from Principal',
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
