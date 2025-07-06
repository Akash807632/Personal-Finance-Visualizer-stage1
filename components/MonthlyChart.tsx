"use client";

import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

export default function MonthlyChart({ refreshTrigger }: { refreshTrigger: number }) {
  const [data, setData] = useState<{ month: string; total: number }[]>([]);

  useEffect(() => {
    fetch("/api/transactions")
      .then((res) => res.json())
      .then((transactions) => {
        const monthly: Record<string, number> = {};
        transactions.forEach((t: any) => {
          const month = new Date(t.date).toLocaleString("default", { month: "short", year: "numeric" });
          monthly[month] = (monthly[month] || 0) + t.amount;
        });
        const chartData = Object.entries(monthly).map(([month, total]) => ({ month, total }));
        setData(chartData);
      });
  }, [refreshTrigger]);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">Monthly Expenses</h2>
      <BarChart width={500} height={300} data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="total" fill="#3b82f6" />
      </BarChart>
    </div>
  );
}
