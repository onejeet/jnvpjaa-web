'use client';

import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import SendIcon from '@mui/icons-material/Send';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import { Breadcrumbs, List, ListItemIcon, ListItemText, Paper, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import MuiLink from '@mui/material/Link';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import NextLink from 'next/link';

const VISION_LIST = [
  'To promote contact & communication between the Association & the School.',
  'To provide a forum for the members of the Association for exchange of experience, information and views.',
  'To assist students of School and members of the Association in their academic pursuits and professional careers by organizing different seminars, lectures or may be other ways deemed to suit the Association.',
  'To hold meetings, conferences, organize lectures & social gatherings, publish newsletters for betterment of the School and members of the Association.',
  'To institute scholarships, prizes, assistantships for students of the school and members of the Association.',
  'To raise funds from its members, other individuals and organizations.',
  'Using the funds as per “Fund Utilization Policy” annexed (Annexure I) with the constitution.',
  'To encourage the members to take an active interest in the work and progress of the School so as to contribute towards improvement in the School.',
  'To frame rules and regulations, and modify the same from time to time and to take up such other activities as may be consistent with the stated objectives of the Association.',
  'To take advantage of technologies in achieving the objectives of the Association and minimizing the operational costs.',
  'To increase awareness and to provide support and facilities for gross development of Human and others by providing Education and counselling at various level and other related activities.',
  'To provide awareness and to provide support and facilities for elders and to open old age home and day care centre and other related activities.',
  'To circulate/publish periodicals & newsletters for the development and awareness in society in related fields.',
  'To organize lectures, conference seminars, workshops & other programme to impart knowledge about health care, education and other related fields.',
  'To provide counselling to patients for matters concerning hygiene, lifestyle, diseases and their cure.',
  'To provide awareness and to provide support and facilities for promoting Swachh Bharat Abhiyan, Divyang upliftment, Plantation and other Social welfare schemes run by State/ Central Government.',
  'To provide awareness and to provide support and work for the eradication of poverty and social backwardness.',
  'To provide awareness and to provide support and work for the development in the field of Art, Culture and literature.',
  'To provide support and development program for retired defence and paramilitary persons and war widows.',
  'To liaison and co-ordinate with Government/Non Government agencies & Institutions for welfare of Association members and their family.',
  'To set up infrastructure for cure, research and education in related fields.',
  'To publish advertisements and newspaper articles for creating awareness among general public in related fields.',
];

const Vision = () => {
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
          Vision & Mission
        </MuiLink>
      </Breadcrumbs>
      <Box component={Paper} gap={2} px={2} py={4} my={2} width="100%" display="flex" alignItems="start">
        <Box
          width={{
            xs: '100%',
            // sm: 'calc(100% - 300px)',
          }}
        >
          <Typography variant="h1" mb={3}>
            Vision & Mission
          </Typography>
          <Box
            display={{ xs: 'block', sm: 'block' }}
            sx={{
              borderRadius: '10px',
              maxWidth: '100%',
              maxHeight: '400px',
              overflow: 'hidden',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center bottom',
              backgroundSize: 'contain',
            }}
          >
            <img
              src="/assets/images/slider-2.jpg"
              width="100%"
              alt="mission"
              style={{
                objectFit: 'contain',
                objectPosition: 'bottom',
                width: '100%',
                height: '100%',
                // position: 'relative',
                // top: '-20px',
              }}
            />
          </Box>
          <Typography color="grey.800" mt={2}>
            Welcome to the JNV Paota Jaipur Alumni Association, where our mission is to strengthen the connection
            between our association and the school community. We aim to support students and members by facilitating the
            exchange of ideas, organizing educational events, and providing scholarships. Committed to social
            responsibility, we also focus on health awareness, social welfare, and cultural development. By leveraging
            technology and collaborating with various agencies, we strive to enhance both personal and community growth.
            Join us in making a meaningful impact through our diverse initiatives and programs.
          </Typography>
          <List
            sx={{ width: '100%', mt: 2, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            // subheader={
            //   <ListSubheader component="div" id="nested-list-subheader">
            //     Nested List Items
            //   </ListSubheader>
            // }
          >
            {VISION_LIST.map((item: string, index: number) => (
              <Box key={`vision-${index}`} display="flex" alignItems="start" mb={1}>
                <ListItemIcon sx={{ minWidth: 30, mt: '8px' }}>
                  <RadioButtonCheckedIcon sx={{ fontSize: '16px' }} />
                </ListItemIcon>
                <ListItemText primary={item} primaryTypographyProps={{ color: 'grey.800' }} />
              </Box>
            ))}
          </List>

          <Typography mt={3} color="grey.800">
            P.S. In fulfillment of above objectives there is no element of profit involved.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default dynamic(() => Promise.resolve(Vision), {
  ssr: false,
});
