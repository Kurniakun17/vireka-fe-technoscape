import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function ProvincialBudget() {
  const provinceData = [
    { province: "DKI Jakarta", allocation: 45000, shortName: "JKT" },
    { province: "Jawa Barat", allocation: 38000, shortName: "JABAR" },
    { province: "Jawa Tengah", allocation: 35000, shortName: "JATENG" },
    { province: "Jawa Timur", allocation: 42000, shortName: "JATIM" },
    { province: "Sumatera Utara", allocation: 28000, shortName: "SUMUT" },
    { province: "Kalimantan Timur", allocation: 25000, shortName: "KALTIM" },
    { province: "Sulawesi Selatan", allocation: 22000, shortName: "SULSEL" },
    { province: "Bali", allocation: 18000, shortName: "BALI" },
  ];

  return (
    <div className="flex gap-6 w-full flex-1">
      <div className="w-full bg-white rounded-2xl  p-8 border border-gray-300 h-fit">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-bold text-gray-900 flex items-center">
            <div className="p-2 bg-gradient-to-r from-[#1FA09D] to-[#16A085] rounded-lg mr-4 ">
              <BarChart className="h-5 w-5 text-white" />
            </div>
            Alokasi Anggaran Provinsi
          </h3>
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-gradient-to-r from-[#1FA09D] to-[#16A085] rounded-full "></div>
            <span className="text-gray-600 font-medium">Juta Rupiah</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart
            data={provinceData}
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          >
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1FA09D" />
                <stop offset="50%" stopColor="#16A085" />
                <stop offset="100%" stopColor="#0F766E" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis
              dataKey="shortName"
              tick={{ fontSize: 12, fill: "#6B7280" }}
              angle={-45}
              textAnchor="end"
              height={80}
              axisLine={{ stroke: "#9CA3AF" }}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#6B7280" }}
              axisLine={{ stroke: "#9CA3AF" }}
            />
            <Tooltip
              formatter={(value, name, props) => [
                `Rp ${value.toLocaleString()}M`,
                "Alokasi Anggaran",
              ]}
              labelFormatter={(label) => {
                const province = provinceData.find(
                  (p) => p.shortName === label
                );
                return province ? province.province : label;
              }}
              contentStyle={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E5E7EB",
                borderRadius: "12px",
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                color: "#1F2937",
              }}
            />
            <Bar
              dataKey="allocation"
              fill="url(#barGradient)"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
