"use client";
import React from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";

import {
  DollarSign,
  TrendingUp,
  Activity,
  MapPin,
  Award,
  AlertTriangle,
  Users,
  Target,
  Building,
  Heart,
} from "lucide-react";

export default function Home() {
  // Sample data
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

  const healthGapRanking = [
    {
      rank: 1,
      province: "DKI Jakarta",
      score: 92,
      status: "excellent",
      change: "+2",
    },
    { rank: 2, province: "Bali", score: 88, status: "excellent", change: "±0" },
    {
      rank: 3,
      province: "Yogyakarta",
      score: 85,
      status: "good",
      change: "+1",
    },
    {
      rank: 4,
      province: "Jawa Barat",
      score: 82,
      status: "good",
      change: "-1",
    },
    {
      rank: 5,
      province: "Jawa Timur",
      score: 79,
      status: "good",
      change: "+3",
    },
    {
      rank: 6,
      province: "Sumatera Utara",
      score: 75,
      status: "fair",
      change: "-2",
    },
  ];

  const budgetDistribution = [
    { name: "Infrastructure", value: 35, color: "#1FA09D" },
    { name: "Medical Equipment", value: 28, color: "#16A085" },
    { name: "Human Resources", value: 22, color: "#48C9B0" },
    { name: "Research & Development", value: 15, color: "#85E3D3" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "excellent":
        return "text-white bg-gradient-to-r from-emerald-500 to-green-600  shadow-emerald-500/20";
      case "good":
        return "text-white bg-gradient-to-r from-blue-500 to-blue-600  shadow-blue-500/20";
      case "fair":
        return "text-white bg-gradient-to-r from-amber-500 to-orange-600  shadow-amber-500/20";
      case "needs improvement":
        return "text-white bg-gradient-to-r from-red-500 to-red-600  shadow-red-500/20";
      default:
        return "text-white bg-gradient-to-r from-gray-500 to-gray-600  shadow-gray-500/20";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white  border-r border-gray-200 z-10">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-3 bg-gradient-to-r from-[#1FA09D] to-[#16A085] rounded-xl ">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Vireka</h1>
              <p className="text-xs text-gray-500">National Analytics</p>
            </div>
          </div>

          <nav className="space-y-3">
            <div className="p-4 bg-gradient-to-r from-[#1FA09D] to-[#16A085] text-white rounded-xl font-medium ">
              <div className="flex items-center space-x-3">
                <Activity className="h-5 w-5" />
                <span>Dashboard</span>
              </div>
            </div>
            <div className="p-4 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-xl cursor-pointer transition-all duration-300 border border-gray-200">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5" />
                <span>Regional Analysis</span>
              </div>
            </div>
            <div className="p-4 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-xl cursor-pointer transition-all duration-300 border border-gray-200">
              <div className="flex items-center space-x-3">
                <TrendingUp className="h-5 w-5" />
                <span>Financial Reports</span>
              </div>
            </div>
            <div className="p-4 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-xl cursor-pointer transition-all duration-300 border border-gray-200">
              <div className="flex items-center space-x-3">
                <Users className="h-5 w-5" />
                <span>Health Metrics</span>
              </div>
            </div>
          </nav>

          <div className="mt-8 p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl  shadow-purple-500/20">
            <div className="text-white text-center">
              <p className="text-sm font-medium">System Status</p>
              <p className="text-xs opacity-90 mt-1">All systems operational</p>
              <div className="w-full bg-purple-300/30 rounded-full h-2 mt-2">
                <div
                  className="bg-white h-2 rounded-full"
                  style={{ width: "87%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-600 bg-clip-text text-transparent mb-2">
                National Health Overview
              </h1>
              <p className="text-gray-600 text-lg">
                Real-time insights into Indonesia's healthcare ecosystem
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="px-6 py-3 bg-white rounded-xl  border border-gray-200">
                <span className="text-sm text-gray-600">Last Updated:</span>
                <span className="ml-2 font-medium text-gray-900">
                  {new Date().toLocaleDateString("id-ID")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Top Row - KPIs */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl  p-6 border border-gray-300 hover:shadow-[#1FA09D]/10 hover: transition-all duration-300 hover:border-[#1FA09D]/30">
            <div className="flex items-center justify-between mb-6">
              <div className="p-4 bg-gradient-to-r from-[#1FA09D] to-[#16A085] rounded-2xl  shadow-[#1FA09D]/30">
                <DollarSign className="h-7 w-7 text-white" />
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-green-600 bg-green-100 px-3 py-2 rounded-xl border border-green-200">
                  +12.5%
                </div>
              </div>
            </div>
            <div>
              <p className="text-gray-600 mb-2 font-medium">Total Budget</p>
              <p className="text-3xl font-bold text-gray-900 mb-1">Rp 247.5T</p>
              <p className="text-sm text-gray-500">Allocated nationwide</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl  p-6 border border-gray-300 hover:shadow-blue-500/10 hover: transition-all duration-300 hover:border-blue-500/30">
            <div className="flex items-center justify-between mb-6">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl  shadow-blue-500/30">
                <TrendingUp className="h-7 w-7 text-white" />
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-blue-600 bg-blue-100 px-3 py-2 rounded-xl border border-blue-200">
                  +3.2pts
                </div>
              </div>
            </div>
            <div>
              <p className="text-gray-600 mb-2 font-medium">Economic Index</p>
              <p className="text-3xl font-bold text-gray-900 mb-1">78.5</p>
              <p className="text-sm text-gray-500">Above target (75.0)</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl  p-6 border border-gray-300 hover:shadow-amber-500/10 hover: transition-all duration-300 hover:border-amber-500/30">
            <div className="flex items-center justify-between mb-6">
              <div className="p-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl  shadow-amber-500/30">
                <Building className="h-7 w-7 text-white" />
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-amber-600 bg-amber-100 px-3 py-2 rounded-xl border border-amber-200">
                  Moderate
                </div>
              </div>
            </div>
            <div>
              <p className="text-gray-600 mb-2 font-medium">
                Infrastructure Gap
              </p>
              <p className="text-3xl font-bold text-gray-900 mb-1">6.8/10</p>
              <p className="text-sm text-gray-500">Improving gradually</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl  p-6 border border-gray-300 hover:shadow-purple-500/10 hover: transition-all duration-300 hover:border-purple-500/30">
            <div className="flex items-center justify-between mb-6">
              <div className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl  shadow-purple-500/30">
                <Target className="h-7 w-7 text-white" />
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-purple-600 bg-purple-100 px-3 py-2 rounded-xl border border-purple-200">
                  100%
                </div>
              </div>
            </div>
            <div>
              <p className="text-gray-600 mb-2 font-medium">Coverage</p>
              <p className="text-3xl font-bold text-gray-900 mb-1">34</p>
              <p className="text-sm text-gray-500">Provinces monitored</p>
            </div>
          </div>
        </div>

        {/* Middle Row - Charts */}
        <div className="flex gap-6 mb-8">
          {/* Financial Allocation Chart */}
          <div className="col-span-8 bg-white rounded-2xl  p-8 border border-gray-300 h-fit">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-gray-900 flex items-center">
                <div className="p-2 bg-gradient-to-r from-[#1FA09D] to-[#16A085] rounded-lg mr-4 ">
                  <BarChart className="h-5 w-5 text-white" />
                </div>
                Provincial Budget Allocation
              </h3>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-gradient-to-r from-[#1FA09D] to-[#16A085] rounded-full "></div>
                <span className="text-gray-600 font-medium">Million IDR</span>
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
                    "Budget Allocation",
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

        {/* Bottom Row */}
        <div className="flex w-full gap-6 flex-1">
          {/* Economic Trend */}
          <div className="col-span-8 bg-white rounded-2xl  p-8 border border-gray-300 h-fit">
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
                  <linearGradient
                    id="areaGradientLight"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
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
        </div>

        {/* Map Section - Full Width */}
        <div className="mt-8 bg-white rounded-2xl  p-8 border border-gray-300">
          <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center">
            <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg mr-4  shadow-cyan-500/20">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            Indonesia Health Infrastructure Distribution Map
          </h3>
          <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center h-96 border border-gray-200">
            <div className="text-center">
              <div className="p-8 bg-gradient-to-r from-[#1FA09D] to-[#16A085] rounded-full  shadow-[#1FA09D]/30 mb-8 inline-block">
                <MapPin className="h-16 w-16 text-white" />
              </div>
              <p className="text-gray-900 font-bold text-2xl mb-4">
                Interactive Indonesia Map
              </p>
              <p className="text-gray-600 mb-6 max-w-md mx-auto text-lg">
                Comprehensive visualization of health infrastructure
                distribution across all 34 provinces with real-time data
                integration
              </p>
              <div className="flex items-center justify-center space-x-6 text-sm">
                <span className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg border border-gray-300 shadow-sm">
                  <div className="w-4 h-4 bg-gradient-to-r from-[#1FA09D] to-[#16A085] rounded-full "></div>
                  <span className="text-gray-700 font-medium">
                    High Coverage
                  </span>
                </span>
                <span className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg border border-gray-300 shadow-sm">
                  <div className="w-4 h-4 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full  shadow-amber-400/20"></div>
                  <span className="text-gray-700 font-medium">
                    Medium Coverage
                  </span>
                </span>
                <span className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg border border-gray-300 shadow-sm">
                  <div className="w-4 h-4 bg-gradient-to-r from-red-400 to-red-600 rounded-full  shadow-red-400/20"></div>
                  <span className="text-gray-700 font-medium">
                    Low Coverage
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* Health Gap Ranking */
}
{
  /* <div className="col-span-4 bg-white rounded-2xl  p-6 border border-gray-300">
<h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center">
  <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg mr-4  shadow-yellow-500/20">
    <Award className="h-5 w-5 text-white" />
  </div>
  Health Gap Ranking
</h3>
<div className="space-y-4">
  {healthGapRanking.map((item) => (
    <div
      key={item.rank}
      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300 border border-gray-200 shadow-sm"
    >
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-[#1FA09D] to-[#16A085] text-white rounded-full flex items-center justify-center text-sm font-bold  shadow-[#1FA09D]/30">
          {item.rank}
        </div>
        <div>
          <p className="font-bold text-gray-900">{item.province}</p>
          <div className="flex items-center space-x-3 mt-1">
            <p className="text-sm text-gray-600">
              Score:{" "}
              <span className="font-bold text-gray-900">
                {item.score}
              </span>
            </p>
            <span
              className={`text-xs px-2 py-1 rounded-full font-bold ${
                item.change.includes("+")
                  ? "text-green-700 bg-green-100 border border-green-200"
                  : item.change.includes("-")
                  ? "text-red-700 bg-red-100 border border-red-200"
                  : "text-gray-700 bg-gray-100 border border-gray-200"
              }`}
            >
              {item.change}
            </span>
          </div>
        </div>
      </div>
      <div
        className={`px-3 py-2 rounded-xl text-xs font-bold ${getStatusColor(
          item.status
        )}`}
      >
        {item.status === "excellent"
          ? "Excellent"
          : item.status === "good"
          ? "Good"
          : item.status === "fair"
          ? "Fair"
          : "Needs Attention"}
      </div>
    </div>
  ))}
</div>
<div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl shadow-sm">
  <div className="flex items-start space-x-3">
    <AlertTriangle className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
    <p className="text-sm text-blue-700 font-medium">
      Rankings based on healthcare accessibility, infrastructure
      quality, and service coverage metrics updated monthly.
    </p>
  </div>
</div>
</div> */
}


{/* Budget Distribution Pie Chart */}
{/* <div className="col-span-4 bg-white rounded-2xl  p-6 border border-gray-300">
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
        <span className="text-gray-700 font-medium">
          {item.name}
        </span>
      </div>
      <span className="font-bold text-gray-900 text-lg">
        {item.value}%
      </span>
    </div>
  ))}
</div>
</div> */}