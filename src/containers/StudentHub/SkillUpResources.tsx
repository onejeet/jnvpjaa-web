import { Paper, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import EmptyView from '@/components/common/EmptyView';

const breadcrumbsList = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: ' Student Hub',
  },
  {
    label: 'SkillUp Resources',
  },
];

const SkillUpResources = () => {
  return (
    <Box>
      <Breadcrumbs items={breadcrumbsList} />
      <Box component={Paper} gap={2} px={2} py={4} my={2} width="100%" display="flex" alignItems="start">
        <Box
          width={{
            xs: '100%',
          }}
        >
          <Typography variant="h1" mb={1}>
            Recommended Learning Resources
          </Typography>
          <Typography color="grey.800" mb={3}>
            Explore our curated SkillUp resources designed to help students enhance their knowledge and skills. From
            online courses to insightful articles, these learning materials will support your academic and professional
            growth.
          </Typography>
          <EmptyView message="Coming Soon" />
          {/* <Image
            src="/assets/svg/under_construction.svg"
            width={417}
            height={200}
            layout="fixed"
            alt="blog coming soon"
          />
          <Typography variant="body1" fontSize={20} color="grey.600" mt={3}>
            Coming Soon.
          </Typography> */}
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
          </Box>
          <Typography color="grey.800" mt={2} fontSize="20px" display="flex" alignItems="center">
            <FmdGoodIcon sx={{ mr: '10px' }} /> Registered Address
          </Typography>
          <Typography color="grey.800" mt={2}>
            JNV Paota Jaipur Alumni Association, <br />
            35, Karani Colony, Shanti Nagar, <br />
            Opposite NBC, Khatipura Road, Jaipur, Rajasthan 302006, India.
          </Typography>
          <Typography color="grey.800" mt={2}>
            Email: alumni@jnvpjaa.org <br /> <br />
            For any urgent help, please contact through Batch Coordinators.
          </Typography> */}
        </Box>
      </Box>
    </Box>
  );
};

export default SkillUpResources;
