// components/DashboardCards.tsx
export default function DashboardCards({ total, recent }: { total: number; recent: any[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
      <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
        <h3 className="text-gray-700 dark:text-gray-300">Total Expenses</h3>
        <p className="text-xl font-bold text-red-600">₹{total}</p>
      </div>
      <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
        <h3 className="text-gray-700 dark:text-gray-300">Recent Transactions</h3>
        <ul className="text-sm text-gray-600 dark:text-gray-400">
          {recent.slice(0, 3).map((tx) => (
            <li key={tx.id}>
              {tx.description} - ₹{tx.amount} ({tx.category})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
