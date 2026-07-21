import type { User } from '@/apollo/hooks';

export type BatchCoordinatorRoleAssignment = {
  id: string;
  userId: string;
  batch?: number | null;
  assignedAt?: string | null;
  user?: Partial<User> | null;
};
