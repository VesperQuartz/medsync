"use client";

import { useGetAllPatient } from "@/app/hooks";
import { groupUsersByMonth } from "@/lib/utils";
import React from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Skeleton } from "./ui/skeleton";
export function Overview() {
  const patient = useGetAllPatient();
  const dat = groupUsersByMonth(patient?.data);
  const keys = Object.keys(dat! ?? {});
  const value = Object.values(dat! ?? {});
  const graph = React.useMemo(() => {
    return keys.map((x) => ({
      name: x,
      count: value[keys.indexOf(x)].length,
    }));
  }, [keys, value]);
  if (patient.isLoading) {
    return (
      <Skeleton className="flex h-[300px] m-2 w-full justify-center items-center"></Skeleton>
    );
  }
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={graph}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            border: "none",
          }}
        />
        <Line
          type="monotone"
          dataKey="count"
          stroke="#8884d8"
          strokeWidth={3}
          activeDot={{ r: 8 }}
          name="Patients"
          dot={{ stroke: "#8884d8", strokeWidth: 2, fill: "white", r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
