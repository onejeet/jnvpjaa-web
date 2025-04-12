export const paths = {
  home: '/',
  auth: {
    signin: '/signin',
    signup: '/signup',
    change_password: '/change-password',
  },
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
  blog: {
    root: '/blog',
    new: '/blog/new',
    getBlogPostUrl: (id: string) => `/blog/${id}`,
    getBlogPostEditUrl: (id: string) => `/blog/new?id=${id}`,
  },
  profile: {
    root: '/profile',
    getProfileUrl: (id: string) => `/profile/${id}`,
    setup: '/profile/setup',
  },
};
