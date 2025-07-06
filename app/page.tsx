'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import TransactionForm from '@/components/TransactionForm';
// import TransactionList from '@/components/TransactionList';
// import CategoryPieChart from '@/components/CategoryPieChart';
import DashboardCards from '@/components/DashboardCards';
import styles from '@/styles/Home.module.css';
import TransactionList from '@/components/TransactionList';

import type { Transaction } from '../types';
const CategoryPieChart = dynamic(() => import('@/components/CategoryPieChart'), { ssr: false });

const MonthlyChart = dynamic(() => import('@/components/MonthlyChart'), { ssr: false });

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const handleAddTransaction = (tx: Transaction) => {
    setTransactions((prev) => [tx, ...prev]);
  };

  const totalExpenses = transactions.reduce((sum, tx) => sum + tx.amount, 0);

  const categoryData = transactions.reduce<{ category: string; amount: number }[]>((acc, tx) => {
    const existing = acc.find((item) => item.category === tx.category);
    if (existing) {
      existing.amount += tx.amount;
    } else {
      acc.push({ category: tx.category, amount: tx.amount });
    }
    return acc;
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-white">
      <header className={styles.navbar}>
        <div className={styles.navContent}>
          <h1 className="text-2xl font-bold">💸 Finance Tracker</h1>
          <nav>
            <ul className={styles.navLinks}>
              <li className={styles.navLinkItem}>Dashboard</li>
              <li className={styles.navLinkItem}>Transactions</li>
              <li className={styles.navLinkItem}>Charts</li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <div className={styles.container}>
          <DashboardCards total={totalExpenses} recent={transactions} />
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>➕ Add Transaction</h2>
            <TransactionForm onAdd={handleAddTransaction} />
          </section>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>📜 Transactions</h2>
            <TransactionList transactions={transactions} />
          </section>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>📊 Monthly Expenses</h2>
            <MonthlyChart transactions={transactions} />
          </section>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>🧁 Category-wise Breakdown</h2>
            <CategoryPieChart data={categoryData} />
          </section>
        </div>
      </main>
      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Personal Finance Visualizer | Built with ❤️ using Next.js</p>
      </footer>
    </div>
  );
}
