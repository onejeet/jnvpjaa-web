export interface EventAttendeeUser {
  id: string;
  firstName?: string;
  lastName?: string;
  batch: number;
  profileImage?: string;
}

export interface PageProps {
  params: {
    id: string;
  };
}
