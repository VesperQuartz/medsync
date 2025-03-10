"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { name: "Cardiology", revenue: 320000, patients: 1200 },
  { name: "Neurology", revenue: 250000, patients: 850 },
  { name: "Orthopedics", revenue: 280000, patients: 950 },
  { name: "Pediatrics", revenue: 210000, patients: 1500 },
  { name: "Dermatology", revenue: 190000, patients: 1100 },
  { name: "Oncology", revenue: 350000, patients: 750 },
]

export function DepartmentPerformance() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 80, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" tickFormatter={(value) => `$${value / 1000}k`} />
        <YAxis type="category" dataKey="name" />
        <Tooltip
          formatter={(value, name) => [
            name === "revenue" ? `$${value.toLocaleString()}` : value.toLocaleString(),
            name === "revenue" ? "Revenue" : "Patients",
          ]}
          contentStyle={{
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            border: "none",
          }}
        />
        <Legend />
        <Bar dataKey="revenue" fill="#8884d8" name="Revenue" />
      </BarChart>
    </ResponsiveContainer>
  )
}

