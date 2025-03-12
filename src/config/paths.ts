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
  profile: {
    root: '/profile',
  },
};
