'use client';

import dynamic from 'next/dynamic';
import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';
import { useState } from 'react';
import styles from '@/styles/Home.module.css';

const MonthlyChart = dynamic(() => import('@/components/MonthlyChart'), { ssr: false });

export default function Home() {
  const [refresh, setRefresh] = useState(0);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900">
      {/* Nav */}
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

      {/* Main */}
      <main className="flex-1">
        <div className={styles.container}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>➕ Add Transaction</h2>
            <TransactionForm onAdd={() => setRefresh((r) => r + 1)} />
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>📜 Transactions</h2>
            <TransactionList refreshTrigger={refresh} />
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>📊 Monthly Expenses</h2>
            <MonthlyChart refreshTrigger={refresh} />
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Personal Finance Visualizer | Built with ❤️ using Next.js</p>
      </footer>
    </div>
  );
}
