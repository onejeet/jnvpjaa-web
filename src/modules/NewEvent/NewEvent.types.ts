export interface INewEventFormInput {
  title: string;
  description: string;
  startDate: string;
  endDate?: string;
  medium: string;
  category: string;
  tags?: string;
  price?: string;
  isPublish?: boolean;
}
