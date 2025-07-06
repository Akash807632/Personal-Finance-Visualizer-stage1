'use client';

import { useState } from 'react';
import { Transaction } from '../types';

interface Props {
  onAdd: (tx: Transaction) => void;
}

export default function TransactionForm({ onAdd }: Props) {
  const [form, setForm] = useState({
    date: '',
    amount: '',
    description: '',
    category: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.date || !form.amount || !form.description || !form.category) {
      setError('All fields are required.');
      return;
    }

    const newTransaction = {
      date: form.date,
      amount: parseFloat(form.amount),
      description: form.description,
      category: form.category,
    };

    try {
      const res = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTransaction),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Failed to save transaction');
      }

      const savedTx: Transaction = await res.json();
      onAdd(savedTx); // Update local state from server response
      setForm({ date: '', amount: '', description: '', category: '' });
      setError('');
    } catch (err: any) {
      setError(err.message || 'Unexpected error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 p-4 rounded shadow space-y-4">
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <input
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        className="p-2 border rounded w-full dark:bg-gray-800 dark:text-white"
        placeholder="Date"
      />

      <input
        type="number"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
        className="p-2 border rounded w-full dark:bg-gray-800 dark:text-white"
        placeholder="Amount"
      />

      <input
        type="text"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="p-2 border rounded w-full dark:bg-gray-800 dark:text-white"
        placeholder="Description"
      />

      <select
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
        className="p-2 border rounded w-full dark:bg-gray-800 dark:text-white"
      >
        <option value="">Select Category</option>
        <option value="Food">Food</option>
        <option value="Rent">Rent</option>
        <option value="Travel">Travel</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Other">Other</option>
      </select>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Add Transaction
      </button>
    </form>
  );
}
