import { adventurerNeutral, bottts, botttsNeutral, thumbs } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { Options } from '@dicebear/thumbs';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';

export const getSocialMediaIcon = (iconName: string) => {
  switch (iconName) {
    case 'facebook': {
      return <FacebookIcon />;
    }
    case 'instagram': {
      return <InstagramIcon />;
    }
    case 'twitter': {
      return <XIcon sx={{ fontSize: 20 }} />;
    }
    case 'linkedin': {
      return <LinkedInIcon />;
    }
    case 'email': {
      return <EmailIcon />;
    }
    default: {
      return <YouTubeIcon />;
    }
  }
};

export const getDefaultAvatar = (gender?: string) => {
  return gender === 'female'
    ? '/assets/images/female_profile_placeholder.webp'
    : '/assets/images/male_profile_placeholder.webp';
};

export const getAvatarDataUrl = (id?: string, options?: any) => {
  return createAvatar(botttsNeutral, {
    seed: id,
    flip: false,
    size: 32,
    // backgroundColor: ['b6e3f4', 'c0aede', 'd1d4f9'],
    mouth: ['diagram', 'grill01', 'grill02', 'grill03', 'smile01', 'smile02', 'square01', 'square02'],
    ...(options || {}),
  })?.toDataUri();
};

export function startCase(str: string) {
  if (str.length === 0) return str; // Check for empty string

  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const getBatchOptions = () => {
  const currentYear = new Date().getFullYear();
  const yearArray = [];

  for (let year = 1993; year <= currentYear; year++) {
    yearArray.push({
      label: year.toString(),
      value: year,
    });
  }

  return yearArray;
};

export function formatPhoneNumber(phoneNumber: string) {
  if (phoneNumber?.includes('***')) {
    return `+91 (${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`;
  }
  if (!phoneNumber) return phoneNumber;

  // Remove any non-numeric characters
  const cleaned = phoneNumber?.replace(/\D/g, '');

  // Check if the phone number is exactly 10 digits
  if (cleaned.length !== 10) {
    // throw new Error('Phone number must be 10 digits long');
    return phoneNumber;
  }

  // Format the phone number
  const formatted = `+91 (${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  return formatted;
}

/**
 * Creates a debounced version of the provided function.
 * @param {Function} func - The function to debounce.
 * @param {number} wait - The number of milliseconds to delay.
 * @param {boolean} [immediate=false] - If `true`, triggers the function on the leading edge.
 * @returns {Function} A debounced version of the provided function.
 */
export const debounce = (
  func: (...args: any[]) => void,
  wait: number = 300,
  immediate: boolean = false
): ((...args: any[]) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function (...args: any[]) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout as NodeJS.Timeout);
    timeout = setTimeout(later, wait);

    if (callNow) {
      func(...args);
    }
  };
};

export function isURL(str: string | null) {
  if (!str) return false;
  const urlRegex = /(?:https?:\/\/|www\d{0,3}[.]|[a-z0-9.-]+\.[a-z]{2,4}\/)(?:[^\s()<>{}[\]]+|\([^\s()]*\))+/gi;
  return urlRegex.test(str);
}

export function valueToLabelFormatter(str: string) {
  if (!str) return '';
  return str
    .split('_') // Split by underscore
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter
    .join(' '); // Join the words back together
}
