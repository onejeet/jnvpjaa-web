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
  newsroom: {
    root: '/newsroom',
    feed: '/newsroom/feed.xml',
    new: '/newsroom/new',
    getPostUrl: (slug: string) => `/newsroom/${encodeURIComponent(slug)}`,
    getEditUrl: (id: string) => `/newsroom/new?id=${encodeURIComponent(id)}`,
  },
  jobs: {
    root: '/jobs',
    new: '/jobs/new',
    getJobUrl: (slug: string) => `/jobs/${encodeURIComponent(slug)}`,
    getEditUrl: (slug: string) => `/jobs/new?slug=${encodeURIComponent(slug)}`,
    getApplicantsUrl: (slug: string) => `/jobs/${encodeURIComponent(slug)}/applicants`,
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
