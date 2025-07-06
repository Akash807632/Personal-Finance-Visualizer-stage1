"use client";

import { useState } from 'react';

export default function TransactionForm({ onAdd }: { onAdd: () => void }) {
  const [amount, setAmount] = useState('');
  const [description, setDesc] = useState('');
  const [date, setDate] = useState('');

  async function handleSubmit(e: any) {
    e.preventDefault();
    if (!amount || !description || !date) return alert('All fields required');
    await fetch('/api/transactions', {
      method: 'POST',
      body: JSON.stringify({ amount, description, date }),
    });
    onAdd();
    setAmount('');
    setDesc('');
    setDate('');
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-2 p-4 border rounded'>
      <input type='number' placeholder='Amount' value={amount} onChange={(e) => setAmount(e.target.value)} className='border p-2 w-full' />
      <input type='text' placeholder='Description' value={description} onChange={(e) => setDesc(e.target.value)} className='border p-2 w-full' />
      <input type='date' value={date} onChange={(e) => setDate(e.target.value)} className='border p-2 w-full' />
      <button type='submit' className='bg-blue-600 text-white px-4 py-2 rounded'>Add Transaction</button>
    </form>
  );
}