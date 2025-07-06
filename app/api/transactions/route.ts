import { connectDB } from '@/lib/db';
import { Transaction } from '@/models/Transaction';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectDB();
  const transactions = await Transaction.find().sort({ date: -1 });
  return NextResponse.json(transactions);
}

export async function POST(req: Request) {
  const body = await req.json();
  await connectDB();
  const transaction = await Transaction.create(body);
  return NextResponse.json(transaction);
}