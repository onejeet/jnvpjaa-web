import type { IBlogCardElement, IInfoCard, ILFXCardElement, ITradingStep } from '@/types/Homepage.types';

export const LFX_BENEFITS: ILFXCardElement[] = [
  {
    icon: '/assets/icons/diverse_market.svg',
    title: 'Diverse Markets',
    description: 'Multiple and convenient options for depositing and withdrawing funds from your trading account.',
  },
  {
    icon: '/assets/icons/intuitive_trading.svg',
    title: 'Intuitive Trading',
    description: 'Experience our user-friendly interface designed for both beginners and seasoned traders.',
  },
  {
    icon: '/assets/icons/tools.svg',
    title: 'Powerful Tools',
    description: 'Access advanced charts, technical analysis, and real-time data to make informed decisions.',
  },
  {
    icon: '/assets/icons/security_tools.svg',
    title: 'Security First',
    description:
      'Your financial security is our priority. Benefit from top-notch encryption and authentication protocols.',
  },
  {
    icon: '/assets/icons/wallet.svg',
    title: 'Deposit & Withdrawal Options',
    description: 'Multiple and convenient options for depositing and withdrawing funds from your trading account.',
  },
  {
    icon: '/assets/icons/pricing.svg',
    title: 'Competitive Pricing',
    description: 'Transparent fee structures, including spreads, commissions, and associated costs.',
  },

  {
    icon: '/assets/icons/educational_degree.svg',
    title: 'Educational Resources',
    description: 'Access educational materials and resources to enhance your trading skills.',
  },

  {
    icon: '/assets/icons/news_updates.svg',
    title: 'News and Market Updates',
    description:
      'Access to real-time market news, economic calendars, and updates to stay informed about relevant events.',
  },
];

export const ACCOUNT_ONBOARDING_STEPS: ILFXCardElement[] = [
  {
    icon: '/assets/icons/add_user.svg',
    title: 'Start',
    description: 'Enter your email, ID, proof of address & bank account to start your application',
  },

  {
    icon: '/assets/icons/funds.svg',
    title: 'Fund',
    description: 'Deposits range from $500 for Standard and $10,000 for Premiere accounts.',
  },

  {
    icon: '/assets/icons/trade_candles.svg',
    title: 'Trade',
    description: 'Deposits range from $500 for Standard and $10,000 for Premiere accounts.',
  },
];

export const BLOGS_DUMMY_DATA: IBlogCardElement[] = [
  {
    cover: '/assets/images/trading-psy-blog.png',
    title: 'The Psychology of Trading',
    description: 'Enter your email, ID, proof of address & bank account to start your application',
    date: 'December 12, 2023',
  },

  {
    cover: '/assets/images/forex-trading-blog.png',
    title: 'The Psychology of Trading',
    description: 'Deposits range from $500 for Standard and $10,000 for Premiere accounts.',
    date: 'December 12, 2023',
  },

  {
    cover: '/assets/images/fundamental-ana-blog.png',
    title: 'The Psychology of Trading',
    description: 'Deposits range from $500 for Standard and $10,000 for Premiere accounts.',
    date: 'December 12, 2023',
  },
  {
    cover: '/assets/images/trading-psy-blog.png',
    title: 'The Psychology of Trading',
    description: 'Enter your email, ID, proof of address & bank account to start your application',
    date: 'December 12, 2023',
  },

  {
    cover: '/assets/images/forex-trading-blog.png',
    title: 'The Psychology of Trading',
    description: 'Deposits range from $500 for Standard and $10,000 for Premiere accounts.',
    date: 'December 12, 2023',
  },

  {
    cover: '/assets/images/fundamental-ana-blog.png',
    title: 'The Psychology of Trading',
    description: 'Deposits range from $500 for Standard and $10,000 for Premiere accounts.',
    date: 'December 12, 2023',
  },
];

export const OPPORTUNITIES: ILFXCardElement[] = [
  {
    title: 'Forex',
    icon: '/assets/icons/forex.svg',
    backgroundCover: '/assets/images/forex-cover.png',
  },
  {
    title: 'Commodities',
    icon: '/assets/icons/commodities.svg',
    backgroundCover: '/assets/images/commodities-cover.png',
  },
  {
    title: 'ETFs',
    icon: '/assets/icons/etf.svg',
    backgroundCover: '/assets/images/etf-cover.png',
  },
  {
    title: 'Indices',
    icon: '/assets/icons/indices.svg',
    backgroundCover: '/assets/images/indices-cover.png',
  },
  {
    title: 'Currencies',
    icon: '/assets/icons/currencies.svg',
    backgroundCover: '/assets/images/currencies-cover.png',
  },
  {
    title: 'Energies',
    icon: '/assets/icons/energies.svg',
    backgroundCover: '/assets/images/energies-cover.png',
  },
];

export const START_TRADING_OPTIONS: IInfoCard[] = [
  {
    title: 'Take your first steps in trading with LFX.',
    subtitle: 'Start trading Now',
    cover: '/assets/images/platform-start.png',
    buttonProps: {
      title: 'Sign In',
      variant: 'contained',
    },
  },
  {
    title: 'Trade risk-free with our simulated demo account today.',
    subtitle: 'Effortless Account Opening',
    cover: '/assets/images/platform-start.png',
    buttonProps: {
      title: 'Try Demo',
      variant: 'contained',
    },
  },
];

export const TRADING_STEPS: ITradingStep[] = [
  {
    count: '01',
    title: 'Educate Yourself',
    description: 'Learn the Basics: Protect your capital. Explore both fundamental and technical analysis.',
  },
  {
    count: '02',
    title: 'Choose a Reliable Trading Platform',
    description: 'Choose a reputable brokerage platform that suits your needs. Open your account.',
  },
  {
    count: '03',
    title: ' Start Trading',
    description: 'Practice with a Demo Account Start with a small investment. Keep track of your trades',
  },
];
export const FOOTER_MENU = {
  Info: [
    {
      id: 1,
      name: 'Terms Of Use',
      url: '/',
    },
    {
      id: 2,
      name: 'Legal documentation ',
      url: '/',
    },
    {
      id: 3,
      name: 'Privacy policy',
      url: '/',
    },
  ],
  usefullLink: [
    {
      id: 1,
      name: '  About us',
      url: '/',
    },
    {
      id: 2,
      name: 'Markets',
      url: '/',
    },
    {
      id: 3,
      name: 'Accounts',
      url: '/',
    },
    {
      id: 4,
      name: 'Educational Materials',
      url: '/',
    },
    {
      id: 5,
      name: 'News',
      url: '/',
    },
  ],
  Consultant: [
    {
      id: 1,
      name: 'Atoum',
      url: '/',
    },
    {
      id: 2,
      name: '+99999999',
      url: '/',
    },
    {
      id: 2,
      name: 'lfx@lfx.com',
      url: '/',
    },
  ],
};
