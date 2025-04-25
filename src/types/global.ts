export interface EventAttendeeUser {
  id: string;
  firstName?: string;
  lastName?: string;
  batch: number;
  profileImage?: string;
}

type SegmentParams<T extends object = any> =
  T extends Record<string, any> ? { [K in keyof T]: T[K] extends string ? string | string[] | undefined : never } : T;

export interface PageProps {
  params?: Promise<SegmentParams>;
  searchParams?: Promise<any>;
}
