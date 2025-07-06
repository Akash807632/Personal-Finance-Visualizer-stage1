// app/api/transactions/route.ts

import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Transaction from '@/models/Transaction';

// POST /api/transactions
export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();

    // Basic validation
    if (!body.date || !body.amount || !body.description || !body.category) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    const saved = await Transaction.create(body);
    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    console.error('POST /api/transactions error:', error);
    return NextResponse.json({ error: 'Error saving transaction' }, { status: 500 });
  }
}

// GET /api/transactions
export async function GET() {
  try {
    await connectToDatabase();
    const transactions = await Transaction.find().sort({ date: -1 });
    return NextResponse.json(transactions, { status: 200 });
  } catch (error) {
    console.error('GET /api/transactions error:', error);
    return NextResponse.json({ error: 'Error fetching transactions' }, { status: 500 });
  }
}
