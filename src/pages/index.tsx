import Home from '@/containers/Home/Home';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';

const HomePage: NextPage = () => (
  <>
    <NextSeo
      title="JNVPJAA • Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur"
      description="The Official Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur"
    />
    {/* <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100vh">
      <Image src="/assets/branding/logo-full.png" alt="logo" width={550} height={85} />
      <Typography color="grey.500" fontSize="20px" mt="30px" fontWeight={300}>
        Coming Soon. Stay Tuned.
      </Typography> 
    </Box> */}
    <Home />
  </>
);

export default HomePage;
