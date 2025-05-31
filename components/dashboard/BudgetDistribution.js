import { PieChart, Target } from "lucide-react";
import React from "react";
import { Cell, Pie, ResponsiveContainer, Tooltip } from "recharts";

export default function BudgetDistribution() {
  const budgetDistribution = [
    { name: "Infrastructure", value: 35, color: "#1FA09D" },
    { name: "Medical Equipment", value: 28, color: "#16A085" },
    { name: "Human Resources", value: 22, color: "#48C9B0" },
    { name: "Research & Development", value: 15, color: "#85E3D3" },
  ];
  return (
    <div className="col-span-4 bg-white rounded-2xl  p-6 border border-gray-300">
      <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center">
        <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mr-4  shadow-purple-500/20">
          <Target className="h-5 w-5 text-white" />
        </div>
        Budget Distribution
      </h3>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={budgetDistribution}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={90}
            paddingAngle={8}
            dataKey="value"
          >
            {budgetDistribution.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => [`${value}%`, "Allocation"]}
            contentStyle={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E5E7EB",
              borderRadius: "12px",
              color: "#1F2937",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="space-y-3 mt-6">
        {budgetDistribution.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
          >
            <div className="flex items-center space-x-3">
              <div
                className="w-4 h-4 rounded-full "
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-gray-700 font-medium">{item.name}</span>
            </div>
            <span className="font-bold text-gray-900 text-lg">
              {item.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
