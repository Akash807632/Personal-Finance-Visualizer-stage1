// components/CategoryPieChart.tsx
'use client';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff6f61', '#a4de6c'];

export default function CategoryPieChart({ data }: { data: any[] }) {
  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Category Breakdown</h2>
      <PieChart width={400} height={300}>
        <Pie
          data={data}
          dataKey="amount"
          nameKey="category"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}
