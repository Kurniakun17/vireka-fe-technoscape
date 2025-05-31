import { TrendingUp } from "lucide-react";
import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function EconomicTrend() {
  const economicTrendData = [
    { month: "Jan", index: 65, growth: 2.1 },
    { month: "Feb", index: 67, growth: 3.2 },
    { month: "Mar", index: 70, growth: 4.5 },
    { month: "Apr", index: 68, growth: -2.8 },
    { month: "May", index: 72, growth: 5.9 },
    { month: "Jun", index: 75, growth: 4.2 },
    { month: "Jul", index: 78, growth: 4.0 },
    { month: "Aug", index: 76, growth: -2.6 },
    { month: "Sep", index: 80, growth: 5.3 },
    { month: "Oct", index: 82, growth: 2.5 },
    { month: "Nov", index: 79, growth: -3.7 },
    { month: "Dec", index: 85, growth: 7.6 },
  ];
  return (
    <div className="w-full bg-white rounded-2xl  p-8 border border-gray-300 h-fit">
      <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center">
        <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg mr-4  shadow-green-500/20">
          <TrendingUp className="h-5 w-5 text-white" />
        </div>
        Economic Index Trend & Growth Rate
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={economicTrendData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <defs>
            <linearGradient id="areaGradientLight" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1FA09D" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#1FA09D" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: "#6B7280" }}
            axisLine={{ stroke: "#9CA3AF" }}
          />
          <YAxis
            yAxisId="left"
            tick={{ fontSize: 12, fill: "#6B7280" }}
            axisLine={{ stroke: "#9CA3AF" }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fontSize: 12, fill: "#6B7280" }}
            axisLine={{ stroke: "#9CA3AF" }}
          />
          <Tooltip
            formatter={(value, name) => [
              name === "index" ? value : `${value}%`,
              name === "index" ? "Economic Index" : "Growth Rate",
            ]}
            contentStyle={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E5E7EB",
              borderRadius: "12px",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
              color: "#1F2937",
            }}
          />
          <Area
            yAxisId="left"
            type="monotone"
            dataKey="index"
            stroke="#1FA09D"
            fillOpacity={1}
            fill="url(#areaGradientLight)"
            strokeWidth={4}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="growth"
            stroke="#F59E0B"
            strokeWidth={3}
            dot={{ fill: "#F59E0B", strokeWidth: 2, r: 5 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
