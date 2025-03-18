import { Blog, BlogBasic } from '@/apollo/hooks';

export interface IBlogCardProps {
  blog: Blog | BlogBasic;
  loading?: boolean;
}
