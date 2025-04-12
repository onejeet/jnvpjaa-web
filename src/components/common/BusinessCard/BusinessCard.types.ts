import { Business, User } from '@/apollo/hooks';

export interface BusinessCardProps {
  business: Business;
  loading?: boolean;
  onEdit?: (id: string) => void;
  onPublish?: (id: string, isUnpublish?: boolean) => void;
  onVerify?: (id: string) => void;
  onDelete?: (id: string) => void;
  isAdminUser?: boolean;
  user?: User;
  isReadOnly?: boolean;
}
