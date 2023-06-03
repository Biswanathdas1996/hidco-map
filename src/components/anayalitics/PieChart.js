import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import Card from "@mui/material/Card";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

export default function Dashboard({ data, colors }) {
  return (
    <ResponsiveContainer width={"100%"} height={180}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={30}
          outerRadius={60}
          fill="#8884d8"
          //   label={(entry) => entry.name}
          //   labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Legend verticalAlign="bottom" align="center" />
      </PieChart>
    </ResponsiveContainer>
  );
}
