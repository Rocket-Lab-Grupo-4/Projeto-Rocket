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
    const [month, year] = date.split("/");
    return { month: months[Number(month) - 1], year };
  };

  const data = uv.map((value, index) => ({
    name: `${getMonthFromDate(date[index]).month}/${getMonthFromDate(date[index]).year}`,
    AutoAvaliacao: value,
    Media_geral: pv[index],
  }));

  const renderLegend = (props: any) => {
    const { payload } = props;
    return (
      <ul style={{ fontSize: '10px', margin: 0, padding: 0, listStyleType: 'none', textAlign: 'right' }}>
        {payload.map((entry: any, index: number) => (
          <li key={`item-${index}`} style={{ display: 'inline-block', marginRight: 10 }}>
            <svg width="10" height="10" viewBox="0 0 32 32" style={{ marginRight: 4 }}>
              <circle cx="16" cy="16" r="16" fill={entry.color} />
            </svg>
            <span style={{ color: entry.color }}>{entry.value}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div style={{ background: "rgba(248, 248, 248, 1)", borderRadius: "19px", padding: "10px" }}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="top" align="right" content={renderLegend} />
          <Line type="linear" dataKey="AutoAvaliacao" stroke="#00F999" />
          <Line type="linear" dataKey="Media_geral" stroke="#084FC7" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;
