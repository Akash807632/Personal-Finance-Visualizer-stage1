'use client';

import { Transaction } from '../types';

interface Props {
  transactions: Transaction[];
}

export default function TransactionList({ transactions }: Props) {
  return (
    <div className="space-y-3">
      {transactions.length === 0 ? (
        <p className="text-gray-500 text-sm">No transactions recorded yet.</p>
      ) : (
        transactions.map((tx) => (
          <div
            key={tx.id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700"
          >
            <div>
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                {tx.description}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {tx.date} | <span className="capitalize">{tx.category}</span>
              </p>
            </div>
            <div className="mt-2 sm:mt-0 sm:text-right text-blue-600 dark:text-blue-400 font-bold">
              ₹{tx.amount.toFixed(2)}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
