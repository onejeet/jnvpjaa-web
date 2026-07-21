export interface ProfileCardProps {
  profilePicture?: string;
  name: string;
  designation?: string;
  batch: string;
  email?: string;
  mobile?: string;
  socialMedia?: { name: string; url: string }[];
  color?: string;
}
