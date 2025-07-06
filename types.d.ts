// type.d.ts

export {};

declare global {
  var mongoose: {
    conn: any;
    promise: any;
  };
}

// ✅ Transaction interface for finance app
// type.d.ts
export interface Transaction {
  id: string;
  date: string;
  amount: number;
  description: string;
  category: string;
}
