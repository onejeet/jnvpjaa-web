// Define the types for the event data and props
export interface IPerson {
  name: string;
  avatar: string;
}

export interface IEvent {
  id: string | number;
  title: string;
  description: string;
  startDate: string;
  endDate?: string;
  image?: string;
  medium: 'Online' | 'Offline';
  online: boolean;
  people: IPerson[];
}

export interface EventCardProps {
  event: IEvent;
  loading?: boolean;
}
