"use client";

import { useGetAllPayment, useGetTotalRevenue } from "@/app/hooks";
import { groupPaymentByMonth, groupUsersByMonth } from "@/lib/utils";
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { month: "Jan", revenue: 45000 },
  { month: "Feb", revenue: 52000 },
  { month: "Mar", revenue: 48000 },
  { month: "Apr", revenue: 61000 },
  { month: "May", revenue: 55000 },
  { month: "Jun", revenue: 67000 },
  { month: "Jul", revenue: 72000 },
  { month: "Aug", revenue: 70000 },
  { month: "Sep", revenue: 81000 },
  { month: "Oct", revenue: 75000 },
  { month: "Nov", revenue: 85000 },
  { month: "Dec", revenue: 91000 },
];

export const RevenueChart = () => {
  const revenue = useGetAllPayment();
  const data1 = groupPaymentByMonth(revenue?.data);
  console.log(data1, "PP");
  const rev = React.useMemo(() => {
    const temp = Object.keys(data1 ?? {});
    const val = Object.values(data1 ?? {});
    return temp?.map((rev, index) => ({
      month: rev,
      revenue: val[index].reduce((acc, curr) => acc + curr.amount, 0),
    }));
  }, [data1]);
  console.log(rev);
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={rev}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
        <Tooltip
          formatter={(value) => [`$${value}`, "Revenue"]}
          contentStyle={{
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            border: "none",
          }}
        />
        <Legend />
        <Bar dataKey="revenue" fill="#4f46e5" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};
