import { Event, EventBasic, EventStatus, User, UserBasic } from '@/apollo/hooks';
import { EventAttendeeUser } from '@/types/global';

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
  attendees: EventAttendeeUser[];
  status: 'draft' | 'published';
  isVerified?: boolean;
  createdBy: string;
}

export interface EventCardProps {
  event: Event & { isGoing?: boolean };
  loading?: boolean;
  markImGoing?: (id: number) => void;
  user?: User;
  isAdmin?: boolean;
  verifyEvent?: (id: number) => void;
  onEdit?: (id: number) => void;
  onPublish?: (id: number, satus?: EventStatus) => void;
  showDescription?: boolean;
  isReadOnly?: boolean;
  onDelete?: (id: number) => void;
}
