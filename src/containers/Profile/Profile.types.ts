import { User } from '@/apollo/hooks';
import { Dayjs } from 'dayjs';

export interface ProfileHeaderProps {}
export interface IProfileFormInput {
  firstName: string;
  lastName: string;
  gender: string;
  mobile: string;
  aboutMe?: string;
  dob: Dayjs | null;
  extraMobile?: string;
  emergencyMobile?: string;
  whatsAppMobile?: string;
}
