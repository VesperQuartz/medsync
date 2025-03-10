"use client"

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "Cardiology", value: 25, color: "#ff6384" },
  { name: "Neurology", value: 15, color: "#36a2eb" },
  { name: "Orthopedics", value: 20, color: "#ffce56" },
  { name: "Pediatrics", value: 18, color: "#4bc0c0" },
  { name: "Dermatology", value: 12, color: "#9966ff" },
  { name: "Oncology", value: 10, color: "#ff9f40" },
]

export function AppointmentDistribution() {
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
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
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
  )
}

