import { adventurerNeutral, bottts, botttsNeutral, thumbs } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import {
  IconMail as EnvelopeSimple,
  IconBrandFacebook as FacebookLogo,
  IconBrandInstagram as InstagramLogo,
  IconBrandLinkedin as LinkedinLogo,
  IconBrandX as XLogo,
  IconBrandYoutube as YoutubeLogo,
} from '@tabler/icons-react';
import dayjs from 'dayjs';

import parsePhoneNumber from 'libphonenumber-js';

export const getSocialMediaIcon = (iconName: string) => {
  switch (iconName) {
    case 'facebook': {
      return <FacebookLogo size={28} />;
    }
    case 'instagram': {
      return <InstagramLogo size={28} />;
    }
    case 'twitter': {
      return <XLogo size={24} />;
    }
    case 'linkedin': {
      return <LinkedinLogo size={28} />;
    }
    case 'email': {
      return <EnvelopeSimple size={28} />;
    }
    default: {
      return <YoutubeLogo size={28} />;
    }
  }
};

export const getDefaultAvatar = (gender?: string) => {
  return gender === 'female'
    ? 'https://assets.jnvpjaa.org/images/female_profile_placeholder.webp'
    : 'https://assets.jnvpjaa.org/images/male_profile_placeholder.webp';
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
  if (!str || str.length === 0) return ''; // Check for empty string

  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function getFormattedLabel(str: string, seperator = '_') {
  if (!str || str.length === 0) return ''; // Check for empty string
  const newStr = str
    ?.split(seperator)
    ?.map((st) => startCase(st))
    ?.join(' ');
  return newStr;
}

export const getBatchOptions = () => {
  const currentYear = new Date().getFullYear();
  const yearArray = [
    {
      label: 'Faculty Members',
      value: 0,
    },
  ];

  for (let year = 1993; year <= currentYear; year++) {
    yearArray.push({
      label: year.toString(),
      value: year,
    });
  }

  return yearArray;
};

export function formatPhoneNumber(phoneNumber: string): { international: string; national: string; uri: string } {
  if (!phoneNumber)
    return {
      international: '',
      national: '',
      uri: '',
    };
  if (phoneNumber?.length === 10) {
    phoneNumber = `+91${phoneNumber}`;
  }
  const parsedPhonenumber = parsePhoneNumber(phoneNumber);

  return {
    international: parsedPhonenumber?.formatInternational() || phoneNumber,
    national: parsedPhonenumber?.formatNational() || phoneNumber,
    uri: parsedPhonenumber?.getURI() || '',
  };
  // const countryCode = phoneNumber?.split('-')[0] || '+91';
  // const number = removeSpaces(removeSpaces(phoneNumber?.split('-')[1])) || '';

  // return `${countryCode} (${number.slice(0, 3)}) ${number.slice(3, 6)}-${number.slice(6)}`;
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

export const titleCase = (str: string) => {
  if (!str) return str;
  return str
    .toLowerCase()
    .split(' ')
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
};

export const phoneNumberJSONConverter = (phoneNumber?: string) => {
  if (!phoneNumber)
    return {
      countryCode: '',
      phoneNumber: '',
    };

  const parts = phoneNumber?.split(' ');
  const countryCode = parts[0];
  parts.splice(0, 1);
  const number = removeSpaces(parts.join(''));
  return {
    countryCode,
    phoneNumber: number || '',
  };
};

export const phoneNumberStringConverter = (phoneNumber: string) => {
  if (!phoneNumber) return '';

  const phoneData = phoneNumberJSONConverter(phoneNumber);

  return `${phoneData?.countryCode || '+91'}${removeSpaces(phoneData?.phoneNumber || '')}`;
};

export const removeSpaces = (st: string) => {
  if (!st) return st;
  // Step 1: Remove spaces
  return st.replace(/\s+/g, '');
};

export const isDefined = (value: any) => value !== undefined && value !== null;

export const getCurrencySymbol = (currency: string) => {
  if (!currency) return '₹';
  switch (currency) {
    case 'INR':
      return '₹';
    case 'USD':
      return '$';
  }
};

export function formatCurrency(amount: number, currency?: string) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency || 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export const isBirthdayToday = (dob?: string) => {
  if (!dob) return false;
  const birthDate = dayjs(dob);
  const today = dayjs();

  return birthDate.date() === today.date() && birthDate.month() === today.month();
};
