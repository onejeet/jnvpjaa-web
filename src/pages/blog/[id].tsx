import EventDetails from '@/containers/EventDetails';
import { NextPage } from 'next';

const SingleBlogPage: NextPage = () => <EventDetails />;

// EventDetailsPage.getInitialProps = () => {
//   return {
//     checkAuth: true,
//   };
// };

export default SingleBlogPage;
