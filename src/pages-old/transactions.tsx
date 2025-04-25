import Transactions from '@/containers/Transactions';
import { NextPage } from 'next';

const TransactionsPage: NextPage = () => <Transactions />;

TransactionsPage.getInitialProps = () => {
  return {
    checkAuth: true,
  };
};

export default TransactionsPage;
