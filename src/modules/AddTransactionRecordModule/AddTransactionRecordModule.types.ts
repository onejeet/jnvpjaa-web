import { TransactionStatus, TransactionType } from '@/apollo/hooks';
import { Dayjs } from 'dayjs';

export interface IAddTransactionRecordInput {
  type: TransactionType;
  title: string;
  transactionDate: Dayjs;
  amount: string;
  currency: string;
  status: TransactionStatus;
  description?: string;
}
