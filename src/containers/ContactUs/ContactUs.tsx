import FmdGoodIcon from '@mui/icons-material/FmdGood';
import { Paper, Typography } from '@mui/material';
import Box from '@mui/material/Box';

import Breadcrumbs from '@/components/common/Breadcrumbs';
import { MapPin } from '@phosphor-icons/react';

const breadcrumbsList = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: 'Contact Us',
  },
];

const ContactUs = () => {
  return (
    <Box>
      <Breadcrumbs items={breadcrumbsList} />
      <Box component={Paper} gap={2} px={2} py={4} my={2} width="100%" display="flex" alignItems="start">
        <Box
          width={{
            xs: '100%',
            // sm: 'calc(100% - 300px)',
          }}
        >
          <Typography variant="h1" mb={1}>
            ContactUs
          </Typography>
          <Typography color="grey.800" maxWidth={{ xs: '100%', md: '70%' }}>
            We’d love to hear from you! Whether you have questions, need assistance, or want to collaborate, feel free
            to reach out. Below are our contact details for any inquiries.
          </Typography>
          {/* <Box
            display={{ xs: 'block', sm: 'block' }}
            sx={{ borderRadius: '10px', maxWidth: '100%', maxHeight: '400px', overflow: 'hidden' }}
          >
            <img
              src="/assets/images/contact-us-3.webp"
              width="100%"
              alt="mission"
              style={{ objectFit: 'scale-down', position: 'relative' }}
            />
          </Box> */}
          <Typography
            color="grey.800"
            mt={2}
            fontSize="20px"
            display="flex"
            alignItems="center"
            sx={{ svg: { mr: '10px' } }}
          >
            <MapPin size={24} /> Registered Address
          </Typography>
          <Typography color="grey.800" mt={1}>
            JNV Paota Jaipur Alumni Association, <br />
            35, Karani Colony, Shanti Nagar, <br />
            Opposite NBC, Khatipura Road, Jaipur, Rajasthan 302006, India.
          </Typography>
          <Typography color="grey.800" mt={2} sx={{ a: { color: 'primary.main' } }}>
            Email: <a href="mailto:alumni@jnvpjaa.org">alumni@jnvpjaa.org</a>
          </Typography>
          <Typography color="grey.800" mt={2} fontWeight={500}>
            For any urgent help, please contact through Batch Coordinators.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ContactUs;
