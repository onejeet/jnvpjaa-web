import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Hero from '@/components/home/Hero';

const Home = () => {
  return (
    <>
      <Hero />
      <Typography
        my={2}
        fontSize={24}
        fontWeight={500}
        textAlign="center"
        sx={{
          // border: '1px solid',
          // borderColor: 'grey.400',
          // borderRadius: '4px',
          p: '16px 10px',
          //   width: 'fit-content',
        }}
        color="primary.main"
      >
        नभ: स्पृशं दीप्तम् (touching the skies with glory)
        <br />
        <Box
          color="grey.800"
          component="span"
          fontSize="16px"
          fontWeight={400}
          sx={{ display: 'block', mt: 2, fontStyle: 'italic' }}
        >
          The ultimate aim of association is to lead the society with glory.
        </Box>
      </Typography>
    </>
  );
};

export default Home;
