export const paths = {
  home: '/',
  auth: {
    signin: '/signin',
    signup: '/signup',
    change_password: '/change-password',
  },
  security: '/security',
  signin: '/signin',
  events: {
    root: '/events',
    new: '/events/new',
    getEventDetailUrl: (id: number) => `/events/${id}`,
  },
  gallery: {
    root: '/gallery',
    new: '/gallery/new',
    getAlbumDetailUrl: (id: string) => `/gallery/${id}`,
  },
  business: {
    root: '/business',
    new: '/business/new',
    getBusinessDetailUrl: (id: string) => `/business/${id}`,
  },
  newsroom: {
    root: '/newsroom',
    feed: '/newsroom/feed.xml',
    new: '/newsroom/new',
    getPostUrl: (slug: string) => `/newsroom/${encodeURIComponent(slug)}`,
    getEditUrl: (id: string) => `/newsroom/new?id=${encodeURIComponent(id)}`,
  },
  blog: {
    root: '/blog',
    new: '/blog/new',
    getBlogPostUrl: (id: string) => `/blog/${id}`,
    getBlogPostEditUrl: (id: string) => `/blog/new?id=${id}`,
  },
  discussions: {
    root: '/discussions',
    getThreadUrl: (id: string) => `/discussions/${id}`,
  },
  profile: {
    root: '/profile',
    getProfileUrl: (id: string) => `/profile/${id}`,
    setup: '/profile/setup',
  },
};
