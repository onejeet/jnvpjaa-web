'use client';

import Transactions from '@/containers/Transactions';
import { Metadata } from 'next';

// Note: This is a Client Component because it requires authentication
// Metadata is defined in the layout.tsx file

export default function TransactionsPage() {
  return <Transactions />;
}
