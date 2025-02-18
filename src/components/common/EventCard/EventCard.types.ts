// Define the types for the event data and props
export interface IPerson {
  id: string;
  firstName: string;
  lastName: string;
  profileImage: string | null;
  batch?: number;
}

export interface IEvent {
  id: string | number;
  title: string;
  summary: string;
  description?: string;
  category: string;
  startDate: string;
  endDate?: string;
  image?: string;
  medium: 'Online' | 'Offline';
  online: boolean;
  attendees: IPerson[];
  status: 'draft' | 'published';
}

export interface EventCardProps {
  event: IEvent;
  loading?: boolean;
  markImGoing: (id: number | string) => void;
}
