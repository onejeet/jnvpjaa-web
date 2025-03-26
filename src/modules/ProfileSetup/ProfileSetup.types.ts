import { Dayjs } from 'dayjs';

export interface IPersonalInfoFormInput {
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

export interface IAddressFormInput {
  id?: string;
  type: string;
  address: string;
  country: string;
  state: string;
  city: string;
  postalCode: string;
  current_id?: string;
  current_address: string;
  current_country: string;
  current_state: string;
  current_city: string;
  current_postalCode: string;
}
