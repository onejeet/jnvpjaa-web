import { Event } from '@/apollo/hooks';
import { EventCardProps } from '../EventCard/EventCard.types';

export interface SingleEventViewProps extends Omit<EventCardProps, 'event'> {
  event: Event;
}
