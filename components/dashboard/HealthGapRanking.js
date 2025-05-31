import { AlertTriangle, Award } from "lucide-react";
import React from "react";

const getStatusBadgeProps = (status) => {
  switch (status) {
    case "low":
      return {
        className: "bg-green-200 border-green-300",
        textColor: "text-green-700",
      };
    case "moderate":
      return {
        className: "bg-yellow-200 border-yellow-300",
        textColor: "text-yellow-700",
      };
    case "high":
      return {
        className: "bg-orange-200 border-orange-300",
        textColor: "text-amber-700",
      };
    case "critical":
      return {
        className: "bg-red-200 border-red-300",
        textColor: "text-orange-700",
      };
    default:
      return {
        className: "bg-gray-100 border-gray-300",
        textColor: "text-gray-700",
      };
  }
};

export default function HealthGapRanking() {
  const healthGapRanking = [
    {
      rank: 1,
      province: "Papua",
      score: 0.92,
      status: "critical",
      change: "+0.02",
    },
    {
      rank: 2,
      province: "Papua Barat",
      score: 0.88,
      status: "critical",
      change: "+0.01",
    },
    {
      rank: 3,
      province: "Nusa Tenggara Timur",
      score: 0.85,
      status: "critical",
      change: "+0.03",
    },
    {
      rank: 4,
      province: "Maluku",
      score: 0.82,
      status: "high",
      change: "-0.01",
    },
    {
      rank: 5,
      province: "Kalimantan Utara",
      score: 0.79,
      status: "high",
      change: "+0.02",
    },
    {
      rank: 6,
      province: "Sulawesi Tenggara",
      score: 0.75,
      status: "high",
      change: "-0.02",
    },
  ];

  return (
    <div className="col-span-4 bg-white rounded-2xl  p-6 border border-gray-300">
      <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center">
        <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg mr-4  shadow-yellow-500/20">
          <Award className="h-5 w-5 text-white" />
        </div>
        Peringkat Kesenjangan Kesehatan
      </h3>
      <div className="space-y-4">
        {healthGapRanking.slice(0, 3).map((item) => (
          <div
            key={item.rank}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300 border border-gray-200 "
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-[#1FA09D] to-[#16A085] text-white rounded-full flex items-center justify-center text-sm font-bold  shadow-[#1FA09D]/30">
                {item.rank}
              </div>
              <div>
                <p className="font-bold text-gray-900">{item.province}</p>
                <div className="flex items-center space-x-3 mt-1">
                  <p className="text-sm text-gray-600">
                    Skor Kesenjangan:{" "}
                    <span className="font-bold text-gray-900">
                      {item.score.toFixed(2)}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div
              className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors ${
                getStatusBadgeProps(item.status).className
              } ${getStatusBadgeProps(item.status).textColor}`}
            >
              {item.status === "critical"
                ? "Kritis"
                : item.status === "high"
                ? "Tinggi"
                : item.status === "moderate"
                ? "Sedang"
                : "Rendah"}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl ">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
          <p className="text-sm text-blue-700 font-medium">
            Peringkat berdasarkan tingkat kesenjangan akses layanan kesehatan,
            dimana skor mendekati 1 menunjukkan kesenjangan yang lebih tinggi.
            Data diperbarui setiap minggu.
          </p>
        </div>
      </div>
    </div>
  );
}
