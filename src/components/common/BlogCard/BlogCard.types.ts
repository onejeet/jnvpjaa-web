import { Blog, BlogBasic, User } from '@/apollo/hooks';

export interface IBlogCardProps {
  blog: Blog | BlogBasic;
  loading?: boolean;
  onEdit?: (id: string) => void;
  onPublish?: (id: string, isUnpublish?: boolean) => void;
  onVerify?: (id: string) => void;
  onDelete?: (id: string) => void;
  isAdminUser?: boolean;
  user?: User;
  isReadOnly?: boolean;
}
