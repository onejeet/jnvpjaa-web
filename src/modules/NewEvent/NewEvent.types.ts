import { Dayjs } from 'dayjs';

export interface INewEventFormInput {
  title: string;
  summary: string;
  description?: string;
  startDate: Dayjs;
  endDate?: Dayjs;
  medium: string;
  location: string;
  category: string;
  tags?: string;
  price?: number;
  isPublish?: boolean;
  cover?: Record<string, any>;
}
