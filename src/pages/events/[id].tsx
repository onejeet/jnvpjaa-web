import Events from '@/containers/Events';
import { NextPage } from 'next';

const EventDetailsPage: NextPage = () => <Events />;

EventDetailsPage.getInitialProps = () => {
  return {
    checkAuth: true,
  };
};

export default EventDetailsPage;
