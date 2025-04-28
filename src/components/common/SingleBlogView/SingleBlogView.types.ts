import { Blog } from '@/apollo/hooks';

export interface ISingleBlogViewProps {
  blog?: Blog;
  claps?: number;
  loading?: boolean;
  updateClap: (clap: number) => void;
}
