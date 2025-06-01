"use client";
import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Area,
  AreaChart,
} from "recharts";
import {
  AlertTriangle,
  Users,
  Building2,
  Stethoscope,
  TrendingUp,
  MapPin,
  Activity,
  Droplets,
  Wind,
  Leaf,
  Eye,
} from "lucide-react";
import GapScoreCalculator from "./Calculator";

const jakartaBaratData = {
  id: 3857,
  province: "jakarta barat",
  infrastructure: "Placeholder",
  renewable_energy: "Placeholder",
  poverty_index: 7.77,
  ndvi: 0.27,
  precipitation: 8.1,
  sentinel: -4.134,
  no2: 120.354,
  co: 33.278,
  so2: 138.503,
  o3: 0.117,
  pm25: 52.2,
  ai_investment_score: 0.0,
  period: "2025-05-31",
  level: "city",
  aqi: 96,
  kecamatan: null,
  jumlah_dokter: 2242,
  jumlah_faskes: 511,
  jumlah_penduduk: 2440302,
  longitude: null,
  latitude: null,
  humidity: 71,
  sunshine_duration: 11,
  temperature: 29,
  birth_mortality: 7.0,
  life_expectancy_rate: 74.16,
  disease_vulnerability: 7.1,
  population_density: 16.591,
  evi_characteristics: "lowland",
  living_cost: 105.58,
};

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

const financeData = [
  { name: "Infrastruktur", value: 35, color: "#3B82F6" },
  { name: "Peralatan Medis", value: 25, color: "#10B981" },
  { name: "Tenaga Medis", value: 20, color: "#F59E0B" },
  { name: "Bakti Sosial", value: 20, color: "#EF4444" },
];

const mockHealthTrends = [
  { month: "Jan", aqi: 78, reports: 45 },
  { month: "Feb", aqi: 82, reports: 52 },
  { month: "Mar", aqi: 86, reports: 48 },
  { month: "Apr", aqi: 89, reports: 61 },
  { month: "May", aqi: 86, reports: 58 },
];

export default function RegionDetailTabs({ data }) {
  const [activeTab, setActiveTab] = useState("finance");

  const tabs = [
    {
      id: "finance",
      label: "Keuangan",
      icon: <TrendingUp className="w-5 h-5" />,
      gradient: "from-blue-500 to-blue-600",
    },
    {
      id: "infrastructure",
      label: "Infrastruktur",
      icon: <Building2 className="w-5 h-5" />,
      gradient: "from-emerald-500 to-emerald-600",
    },
    {
      id: "health",
      label: "Kesehatan",
      icon: <Stethoscope className="w-5 h-5" />,
      gradient: "from-purple-500 to-purple-600",
    },
  ];

  const calculateGap = (current, target, total) => {
    const currentRatio = current / total;
    const gap = target - currentRatio;
    return {
      current: current,
      needed: Math.max(0, Math.ceil(gap * total)),
      percentage: Math.min(100, (currentRatio / target) * 100),
      ratio: Math.round(total / current),
    };
  };

  const doctorGap = calculateGap(
    data.jumlah_dokter,
    1 / 1000,
    data.jumlah_penduduk
  );
  const facilityGap = calculateGap(
    data.jumlah_faskes,
    1 / 10000,
    data.jumlah_penduduk
  );

  const getAQIStatus = (aqi) => {
    if (aqi <= 50)
      return { text: "Baik", color: "text-green-600", bg: "bg-green-50" };
    if (aqi <= 100)
      return { text: "Sedang", color: "text-yellow-600", bg: "bg-yellow-50" };
    if (aqi <= 150)
      return {
        text: "Tidak Sehat",
        color: "text-orange-600",
        bg: "bg-orange-50",
      };
    return { text: "Berbahaya", color: "text-red-600", bg: "bg-red-50" };
  };

  const aqiStatus = getAQIStatus(data.aqi);

  data.budget_allocation = data.budget_allocation || 2305600000;
  data.diseases = data.diseases || {
    overview:
      "Berdasarkan analisis data lingkungan di Jakarta Barat, terdapat risiko kesehatan yang tinggi terkait infeksi saluran pernapasan (ISPA dan Asma) serta potensi penyakit DBD akibat kualitas udara yang buruk dan curah hujan yang tinggi. Masalah kemiskinan juga dapat meningkatkan kerentanan penduduk terhadap penyakit.",
    diseaseData: [
      {
        name: "ISPA",
        riskLevel: "tinggi",
        percentage: 0.6,
        prevention: [
          "Menggunakan masker saat berada di luar rumah.",
          "Mengurangi aktivitas di luar saat kualitas udara buruk.",
          "Meningkatkan ventilasi dan kualitas udara dalam ruangan.",
        ],
        explanationWhyItsFeasible:
          "Kualitas udara yang buruk dengan PM2.5 tinggi (52.2 μg/m³) dan NO2 tinggi (120.354 μg/m³) meningkatkan risiko infeksi saluran pernapasan akut (ISPA).",
      },
      {
        name: "Asma",
        riskLevel: "tinggi",
        percentage: 0.5,
        prevention: [
          "Hindari pemicu alergi dan polusi udara.",
          "Gunakan inhaler sesuai resep dokter.",
          "Lakukan pemeriksaan kondisi kesehatan secara berkala.",
        ],
        explanationWhyItsFeasible:
          "Kadar polutan udara yang tinggi dapat memicu serangan asma, terutama di kalangan individu yang sudah rentan.",
      },
      {
        name: "Dengue (DBD)",
        riskLevel: "medium",
        percentage: 0.4,
        prevention: [
          "Menguras genangan air di sekitar rumah.",
          "Menggunakan obat nyamuk dan kawalan biologis.",
          "Menanam tanaman yang tidak mengundang nyamuk.",
        ],
        explanationWhyItsFeasible:
          "Curah hujan yang tinggi (8.1 mm) dan NDVI yang rendah (0.27) dapat menciptakan kondisi yang mendukung perkembangbiakan nyamuk Aedes aegypti penyebar DBD.",
      },
    ],
  };

  data.jumlah_dokter = data.jumlah_dokter || 2242;
  data.jumlah_faskes = data.jumlah_faskes || 204;
  data.jumlah_penduduk = data.jumlah_penduduk || 2440302;
  data.budget_allocation = data.budget_allocation || 2305600000;
  data.poverty_index = data.poverty_index || 7.77;
  data.diseases = data.diseases || {
    overview:
      "Berdasarkan analisis data lingkungan di Jakarta Barat, terdapat risiko kesehatan yang tinggi terkait infeksi saluran pernapasan (ISPA dan Asma) serta potensi penyakit DBD akibat kualitas udara yang buruk dan curah hujan yang tinggi. Masalah kemiskinan juga dapat meningkatkan kerentanan penduduk terhadap penyakit.",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header */}
      <div className=" border-gray-200 mb-8">
        <div className="max-w-7xl mx-auto border border-gray-300 rounded-xl px-6 py-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <MapPin className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 capitalize">
                {data.province}
              </h1>
              <p className="text-gray-600">
                Dashboard Regional - {data.period}
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl">
              <div className="text-sm text-blue-700 font-medium">Populasi</div>
              <div className="text-xl font-bold text-blue-900">
                {data.jumlah_penduduk?.toLocaleString() || "3.221.727"}
              </div>
            </div>
            <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 p-4 rounded-xl">
              <div className="text-sm text-emerald-700 font-medium">Dokter</div>
              <div className="text-xl font-bold text-emerald-900">
                {data.jumlah_dokter}
              </div>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-xl">
              <div className="text-sm text-purple-700 font-medium">Faskes</div>
              <div className="text-xl font-bold text-purple-900">
                {data.jumlah_faskes}
              </div>
            </div>
            <div className={`bg-gradient-to-r ${aqiStatus.bg} p-4 rounded-xl`}>
              <div className={`text-sm font-medium ${aqiStatus.color}`}>
                AQI Status
              </div>
              <div className={`text-xl font-bold ${aqiStatus.color}`}>
                {aqiStatus.text}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Enhanced Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-2xl w-fit mx-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-6 py-3 text-sm font-medium rounded-xl transition-all duration-300 ${
                activeTab === tab.id
                  ? `bg-gradient-to-r ${tab.gradient} text-white transform scale-105`
                  : "text-gray-600 hover:text-gray-800 hover:bg-white "
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="pb-8">
          {activeTab === "finance" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Financial Allocation Chart */}

                <div className="lg:col-span-2  p-8 rounded-2xl border border-gray-300">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Alokasi Anggaran Saat Ini
                    </h3>
                  </div>
                  <p className="text-xl text-gray-600 font-medium mb-4">
                    Total:{" "}
                    <span className="font-bold text-blue-600">
                      {" "}
                      {data.budget_allocation.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </span>
                  </p>
                  <div className="h-[320px] relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={financeData}
                          cx="50%"
                          cy="50%"
                          innerRadius={80}
                          outerRadius={120}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {financeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "white",
                            border: "none",
                            borderRadius: "12px",
                            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    {/* Legend */}
                    <div className="absolute right-4 top-4 space-y-2">
                      {financeData.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-sm text-gray-600">
                            {item.name}
                          </span>
                          <span className="text-sm font-semibold">
                            {item.value}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Poverty Index */}
                <div className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-2xl border border-orange-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <Users className="w-5 h-5 text-orange-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">
                      Indeks Kemiskinan
                    </h3>
                  </div>
                  <div className="text-5xl font-bold text-orange-600 mb-4">
                    {data.poverty_index}
                  </div>
                  <div className="space-y-3">
                    <div className="bg-white/70 p-4 rounded-xl">
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Indeks kemiskinan menunjukkan persentase penduduk yang
                        hidup di bawah garis kemiskinan.
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                      <span className="text-gray-600">
                        Memerlukan perhatian khusus
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <GapScoreCalculator regionData={data} isCompact />
            </div>
          )}

          {activeTab === "infrastructure" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Health Facilities */}
                <div className="bg-white p-8 rounded-2xl border border-gray-300">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-emerald-100 rounded-lg">
                      <Building2 className="w-5 h-5 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Fasilitas Kesehatan
                    </h3>
                  </div>

                  <div className="text-5xl font-bold text-emerald-600 mb-6">
                    {data.jumlah_faskes}
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-600">
                          Rasio Saat Ini
                        </span>
                        <span className="text-lg font-bold text-gray-900">
                          1:{facilityGap.ratio.toLocaleString()}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${Math.min(100, facilityGap.percentage)}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-4 rounded-xl text-center">
                        <div className="text-sm text-blue-600 mb-1">
                          Target Rasio
                        </div>
                        <div className="text-xl font-bold text-blue-700">
                          1:10,000
                        </div>
                      </div>
                      <div className="bg-red-50 p-4 rounded-xl text-center">
                        <div className="text-sm text-red-600 mb-1">
                          Kebutuhan Tambahan
                        </div>
                        <div className="text-xl font-bold text-red-700">
                          {facilityGap.needed}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Medical Doctors */}
                <div className="bg-white p-8 rounded-2xl border border-gray-300">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Stethoscope className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Dokter</h3>
                  </div>

                  <div className="text-5xl font-bold text-blue-600 mb-6">
                    {data.jumlah_dokter}
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-600">
                          Rasio Saat Ini
                        </span>
                        <span className="text-lg font-bold text-gray-900">
                          1:{doctorGap.ratio.toLocaleString()}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${Math.min(100, doctorGap.percentage)}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-emerald-50 p-4 rounded-xl text-center">
                        <div className="text-sm text-emerald-600 mb-1">
                          Target Rasio
                        </div>
                        <div className="text-xl font-bold text-emerald-700">
                          1:1,000
                        </div>
                      </div>
                      <div className="bg-red-50 p-4 rounded-xl text-center">
                        <div className="text-sm text-red-600 mb-1">
                          Kebutuhan Tambahan
                        </div>
                        <div className="text-xl font-bold text-red-700">
                          {doctorGap.needed}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Infrastructure Insights */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Insight Infrastruktur
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white/80 p-6 rounded-xl">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {facilityGap.percentage.toFixed(1)}%
                    </div>
                    <div className="text-sm text-gray-600">
                      Target Fasilitas Kesehatan Tercapai
                    </div>
                  </div>
                  <div className="bg-white/80 p-6 rounded-xl">
                    <div className="text-3xl font-bold text-emerald-600 mb-2">
                      {doctorGap.percentage.toFixed(1)}%
                    </div>
                    <div className="text-sm text-gray-600">
                      Target Dokter Tercapai
                    </div>
                  </div>
                  <div className="bg-white/80 p-6 rounded-xl">
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      {(
                        (facilityGap.percentage + doctorGap.percentage) /
                        2
                      ).toFixed(1)}
                      %
                    </div>
                    <div className="text-sm text-gray-600">
                      Rata-rata Pencapaian Target
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "health" && (
            <div className="space-y-8">
              {/* Environmental Conditions */}
              <div className="bg-white p-8 rounded-2xl border border-gray-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Activity className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Kondisi Lingkungan
                  </h3>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
                    <div className="flex items-center gap-2 mb-3">
                      <Eye className="w-5 h-5 text-blue-600" />
                      <div className="text-sm text-blue-700 font-medium">
                        Air Quality Index
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-blue-800">
                      {data.aqi}
                    </div>
                    <div
                      className={`text-xs font-medium mt-1 ${aqiStatus.color}`}
                    >
                      {aqiStatus.text}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
                    <div className="flex items-center gap-2 mb-3">
                      <Leaf className="w-5 h-5 text-green-600" />
                      <div className="text-sm text-green-700 font-medium">
                        NDVI
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-green-800">
                      {data.ndvi}
                    </div>
                    <div className="text-xs text-green-600 mt-1">Vegetasi</div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
                    <div className="flex items-center gap-2 mb-3">
                      <Droplets className="w-5 h-5 text-purple-600" />
                      <div className="text-sm text-purple-700 font-medium">
                        Curah Hujan
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-purple-800">
                      {data.precipitation}
                    </div>
                    <div className="text-xs text-purple-600 mt-1">mm</div>
                  </div>

                  <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-xl">
                    <div className="flex items-center gap-2 mb-3">
                      <Wind className="w-5 h-5 text-amber-600" />
                      <div className="text-sm text-amber-700 font-medium">
                        PM2.5
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-amber-800">
                      {data.pm25}
                    </div>
                    <div className="text-xs text-amber-600 mt-1">μg/m³</div>
                  </div>
                </div>
              </div>

              {/* Potential Diseases */}
              <div className="bg-white p-8 rounded-2xl border border-gray-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Potensi Penyakit
                  </h3>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl mb-6">
                  <p className="text-gray-700 leading-relaxed">
                    {data.diseases.overview}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {data.diseases.diseaseData.map((disease, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200  transition-all duration-300"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="text-lg font-bold text-gray-900">
                          {disease.name}
                        </h4>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                            disease.riskLevel === "tinggi"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {disease.riskLevel}
                        </span>
                      </div>

                      <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                        {disease.explanationWhyItsFeasible}
                      </p>

                      <div className="bg-white p-4 rounded-lg">
                        <h5 className="text-sm font-bold text-gray-900 mb-3">
                          Pencegahan:
                        </h5>
                        <ul className="space-y-2">
                          {disease.prevention.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-sm text-gray-700">
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Health Insights */}
              <div className="bg-white p-8 rounded-2xl border border-gray-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Activity className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Insight Kesehatan
                  </h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">
                      Tren Kesehatan Lingkungan
                    </h4>
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={mockHealthTrends}>
                          <defs>
                            <linearGradient
                              id="aqiGradient"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor="#3B82F6"
                                stopOpacity={0.3}
                              />
                              <stop
                                offset="95%"
                                stopColor="#3B82F6"
                                stopOpacity={0}
                              />
                            </linearGradient>
                          </defs>
                          <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                          />
                          <YAxis axisLine={false} tickLine={false} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "white",
                              border: "none",
                              borderRadius: "8px",
                              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                            }}
                          />
                          <Area
                            type="monotone"
                            dataKey="aqi"
                            stroke="#3B82F6"
                            fillOpacity={1}
                            fill="url(#aqiGradient)"
                            strokeWidth={3}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-xl">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">
                      Laporan Kesehatan Warga
                    </h4>
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={mockHealthTrends}>
                          <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                          />
                          <YAxis axisLine={false} tickLine={false} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "white",
                              border: "none",
                              borderRadius: "8px",
                              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                            }}
                          />
                          <Bar
                            dataKey="reports"
                            fill="#10B981"
                            radius={[4, 4, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
