import { AlbumBasic, Event, User } from '@/apollo/hooks';
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

export interface AlbumCardProps {
  album: AlbumBasic;
  loading?: boolean;
  // markImGoing?: (id: number) => void;
  user?: User;
  isAdmin?: boolean;
  // verifyEvent?: (id: number) => void;
  // onEdit?: (id: number) => void;
  // onPublish?: (id: number) => void;
  isMinimal?: boolean;
  // isReadOnly?: boolean;
}
