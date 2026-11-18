import { TransactionStatus, TransactionType } from '@/apollo/hooks';
import { Dayjs } from 'dayjs';

export interface IAddTransactionRecordInput {
  type: TransactionType;
  title: string;
  transactionDate: Dayjs;
  amount: number;
  currency: string;
  status: TransactionStatus;
  billingCategory?: string;
  description?: string;
  method?: string;
  referenceId?: string;
}
