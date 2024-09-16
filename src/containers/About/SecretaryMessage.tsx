'use client';

import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { Breadcrumbs, Paper, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import MuiLink from '@mui/material/Link';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import NextLink from 'next/link';

const SecretaryMessage = () => {
  return (
    <Box>
      <Breadcrumbs
        sx={{
          //   fontSize: '7px',
          alignItems: 'center',
          color: 'grey.500',
        }}
        // separator=">"
        aria-label="breadcrumb"
      >
        <NextLink
          href={{
            pathname: '/',
          }}
          as={{
            pathname: '/',
          }}
          passHref
        >
          <MuiLink variant="body2" underline="none" color="primary">
            Home
          </MuiLink>
        </NextLink>
        <MuiLink variant="body2" underline="none" sx={{ color: 'grey.800', pointerEvents: 'none' }}>
          Message from secretary
        </MuiLink>
      </Breadcrumbs>
      <Box component={Paper} gap={2} px={2} py={4} my={2} display="flex" alignItems="start">
        <Box
          width={{
            xs: '100%',
            sm: 'calc(100% - 300px)',
          }}
        >
          <Typography variant="h1" mb={3}>
            Message from Secretary
          </Typography>
          <Box
            display={{ xs: 'block', sm: 'none' }}
            sx={{ borderRadius: '10px', width: '100%', overflow: 'hidden' }}
            mb={2}
          >
            <img src="/assets/people/dinesh_2002.webp" width="100%" alt="JNVPJAA Secretary" />
          </Box>
          <Typography color="grey.800" fontWeight={600} display="flex">
            Embracing Unity, Striving for Excellence
            <FormatQuoteIcon sx={{ fontSize: '32px', color: 'grey.500', position: 'relative', top: '-10px' }} />
          </Typography>
          <Typography color="grey.800" mt={2}>
            As we embark on this journey of rekindling connections and fostering a sense of belonging within the JNV
            Paota Alumni community, it is imperative to outline a vision that not only encapsulates our aspirations but
            also serves as a guiding light for our endeavors. Our vision is rooted in the values of unity, inclusivity,
            and excellence, aiming to empower and uplift every member of our esteemed association.
          </Typography>
          <Typography color="grey.800" mt={2}>
            <b>Fostering Strong Bonds:</b> Our vision entails creating a vibrant and interconnected network where every
            alumni member feels a sense of camaraderie and belonging. Through regular communication channels, reunions,
            and social events, we aspire to strengthen the bonds that tie us together, transcending geographical
            boundaries and fostering lifelong friendships.
          </Typography>
          <Typography color="grey.800" mt={2}>
            <b>Promoting Service and Giving Back:</b> Central to our vision is the belief in the power of giving back to
            our alma mater and society at large. We envision actively engaging in philanthropic endeavors, mentorship
            programs, and community service initiatives that positively impact the lives of those around us. By
            harnessing the collective talents and resources of our alumni, we aim to make meaningful contributions
            towards the betterment of our school and society.
          </Typography>
          <Typography color="grey.800" mt={2}>
            <b>Nurturing Personal and Professional Growth:</b> We are committed to providing avenues for continuous
            learning, skill development, and professional networking opportunities for our members. Through workshops,
            seminars, and career guidance sessions, we aim to empower alumni to excel in their respective fields and
            pursue their passions with confidence and determination.
          </Typography>
          <Typography color="grey.800" mt={2}>
            <b>Embracing Diversity and Inclusivity:</b> Our vision is to celebrate the rich diversity of our alumni
            community, embracing individuals from all walks of life, backgrounds, and experiences. We are dedicated to
            creating an inclusive environment where every voice is heard, valued, and respected, fostering a culture of
            mutual understanding and appreciation.
          </Typography>
          <Typography color="grey.800" mt={2}>
            <b>Upholding Excellence and Integrity:</b> At the core of our vision lies a commitment to upholding the
            highest standards of excellence, integrity, and ethical conduct in all our endeavors. We aspire to be
            ambassadors of our alma mater, embodying the values of honesty, diligence, and compassion in everything we
            do, both as individuals and as a collective entity.
          </Typography>
          <Typography color="grey.800" mt={2}>
            In essence, our vision for the JNV Paota Alumni Association is one of unity, service, and excellence. As we
            embark on this journey together, let us stand united in our shared commitment to creating a brighter future
            for ourselves, our alma mater, and the communities we serve. Together, we can strive towards realizing our
            collective vision and making a lasting impact that transcends generations.
          </Typography>

          <Typography color="grey.800" variant="h3" fontWeight={600} mt={3}>
            Dinesh Kumar Verma
          </Typography>
          <Typography color="grey.800">Secretory, JNVPJAA</Typography>
        </Box>
        <Box
          display={{ xs: 'none', sm: 'block' }}
          sx={{ borderRadius: '10px', width: 250, height: 400, overflow: 'hidden' }}
        >
          <Image src="/assets/people/dinesh_2002.webp" width={250} height={400} alt="JNVPJAA Secretary" />
        </Box>
      </Box>
    </Box>
  );
};

export default dynamic(() => Promise.resolve(SecretaryMessage), {
  ssr: false,
});
