"use client";

import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  { name: "0-17", value: 15, color: "#8884d8" },
  { name: "18-24", value: 10, color: "#83a6ed" },
  { name: "25-34", value: 18, color: "#8dd1e1" },
  { name: "35-44", value: 22, color: "#82ca9d" },
  { name: "45-54", value: 15, color: "#a4de6c" },
  { name: "55-64", value: 12, color: "#d0ed57" },
  { name: "65+", value: 8, color: "#ffc658" },
];

export const PatientDemographics = () => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) =>
            `${name}: ${(percent * 100).toFixed(0)}%`
          }
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => [`${value}%`, "Percentage"]}
          contentStyle={{
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            border: "none",
          }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};
