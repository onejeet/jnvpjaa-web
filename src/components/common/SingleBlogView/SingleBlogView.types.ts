import { Blog } from '@/apollo/hooks';

export interface ISingleBlogViewProps {
  blog?: Blog;
  loading?: boolean;
  updateClap: (clap: number) => void;
}
