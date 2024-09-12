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
  return gender === 'female' ? '/assets/svg/female.svg' : '/assets/svg/male.svg';
};
