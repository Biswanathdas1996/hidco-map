import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Chart = ({ data }) => {
  // create data for bar chart
  const barData = data.map((item) => ({
    name: item.user?.name || "No User",
    completedLocations: item.completedLocations,
    totalLocations: item.totalLocations,
  }));

  // create data for line chart
  const lineData = data.map((item) => ({
    name: item.user?.name || "No User",
    completedDuty: item.completedDuty,
    totalDuty: item.totalDuty,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={lineData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line dataKey="completedDuty" stroke="#8884d8" />
        <Line dataKey="totalDuty" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
