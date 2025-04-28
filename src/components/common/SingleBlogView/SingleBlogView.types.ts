import { Blog } from '@/apollo/hooks';

export interface ISingleBlogViewProps {
  blog?: Blog;
  claps?: Int;
  loading?: boolean;
  updateClap: (clap: number) => void;
}
