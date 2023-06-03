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

  return (
    <div>
      <ResponsiveContainer width={"100%"} height={300}>
        <BarChart data={barData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="completedLocations" fill="#8884d8" />
          <Bar dataKey="totalLocations" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
