import { Event, User } from '@/apollo/hooks';

// Define the types for the event data and props
export interface IPerson {
  id: string;
  firstName: string;
  lastName: string;
  profileImage: string | null;
  batch?: number;
}

export interface IEvent {
  id: number;
  title: string;
  summary: string;
  description?: string;
  category: string;
  startDate: string;
  endDate?: string;
  image?: string;
  medium: 'online' | 'offline';
  attendees: IPerson[];
  status: 'draft' | 'published';
  isVerified?: boolean;
  createdBy: string;
}

export interface EventCardProps {
  event: Event;
  loading?: boolean;
  markImGoing?: (id: number) => void;
  user?: User;
  isAdmin?: boolean;
  verifyEvent?: (id: number) => void;
  onEdit?: (id: number) => void;
  onPublish?: (id: number) => void;
}
