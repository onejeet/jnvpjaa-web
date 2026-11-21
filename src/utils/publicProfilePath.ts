// trailingSlash is on, but Next treats a last segment with a dot as a file and serves it slash-less.
export const publicProfilePath = (username: string) => `/@${username}${username.includes('.') ? '' : '/'}`;
