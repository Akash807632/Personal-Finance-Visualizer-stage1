// models/Transaction.ts
import mongoose, { Schema } from 'mongoose';

const TransactionSchema = new Schema({
  date: String,
  amount: Number,
  description: String,
  category: String,
});

export default mongoose.models.Transaction ||
  mongoose.model('Transaction', TransactionSchema);
