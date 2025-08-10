export interface Comment {
  id: string;
  content: string;
  author: {
    id: string;
    displayName: string | null;
    profileImage: string | null;
  };
  createdAt: string;
  replies: Comment[];
}
