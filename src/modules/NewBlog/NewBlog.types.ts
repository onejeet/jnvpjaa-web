export interface INewBlogFormInput {
  title: string;
  content: string;
  category: string;
  cover?: Record<string, any>;
}
