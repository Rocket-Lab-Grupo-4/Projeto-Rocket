"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface LineChartProps {
  date: string[];
  uv: number[];
  pv: number[];
}

const months = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

export const LineChartComponent = ({ date, uv, pv }: LineChartProps) => {

  const getMonthFromDate = (date: string) => {
    const [month] = date.split("/");
    return months[Number(month) - 1];
  }

  const data = uv.map((value, index) => ({
    name: getMonthFromDate(date[index]),
    uv: value,
    pv: pv[index],
  }))

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="linear" dataKey="uv" stroke="#82ca9d" />
        <Line type="linear" dataKey="pv" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;
