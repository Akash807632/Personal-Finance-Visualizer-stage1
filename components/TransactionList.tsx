"use client";

import { useEffect, useState } from 'react';

export default function TransactionList({ refreshTrigger }: { refreshTrigger: number }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch('/api/transactions')
      .then(res => res.json())
      .then(setTransactions);
  }, [refreshTrigger]);

  return (
    <div className='p-4'>
      <h2 className='text-lg font-bold'>Transactions</h2>
      <ul className='space-y-1'>
        {transactions.map((t: any) => (
          <li key={t._id} className='border p-2 flex justify-between'>
            <div>₹{t.amount} - {t.description}</div>
            <div className='text-sm text-gray-500'>{new Date(t.date).toLocaleDateString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}