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
